import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Globe, MapPin } from 'lucide-react';
import { SiteTranslation } from '../data/translations';
import {
  afterDraw,
  detectSoftwareWebGL,
  disposeHierarchy,
  prefersReducedMotion,
} from '../utils/webglUtils';

interface MobilityGlobe3DProps {
  t: SiteTranslation['education']['globe'];
}

type GlobeFocus = 'overview' | 'kyrgyzstan' | 'prague' | 'seoul';

function latLonToVector3(latDeg: number, lonDeg: number, radius: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - latDeg);
  const theta = THREE.MathUtils.degToRad(lonDeg + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createGlobeGridTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#0a1324';
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle latitude & longitude grid lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
    ctx.lineWidth = 1;
    for (let lon = 0; lon <= 24; lon++) {
      const x = (lon / 24) * 1024;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let lat = 0; lat <= 12; lat++) {
      const y = (lat / 12) * 512;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Stylized continental clusters
    const regions: { lonMin: number; lonMax: number; latMin: number; latMax: number; density: number }[] = [
      { lonMin: -125, lonMax: -70, latMin: 25, latMax: 60, density: 55 }, // North America
      { lonMin: -75, lonMax: -38, latMin: -45, latMax: 10, density: 42 }, // South America
      { lonMin: -10, lonMax: 42, latMin: 36, latMax: 65, density: 50 }, // Europe (incl. Prague)
      { lonMin: -15, lonMax: 48, latMin: -32, latMax: 32, density: 55 }, // Africa
      { lonMin: 45, lonMax: 138, latMin: 18, latMax: 62, density: 90 }, // Eurasia (incl. Kyrgyzstan & Seoul)
      { lonMin: 115, lonMax: 152, latMin: -38, latMax: -14, density: 28 }, // Australia
    ];

    let seed = 1337;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    regions.forEach((reg) => {
      for (let i = 0; i < reg.density; i++) {
        const lon = reg.lonMin + rand() * (reg.lonMax - reg.lonMin);
        const lat = reg.latMin + rand() * (reg.latMax - reg.latMin);
        const x = ((lon + 180) / 360) * 1024;
        const y = ((90 - lat) / 180) * 512;
        ctx.fillStyle = rand() > 0.35 ? 'rgba(56, 189, 248, 0.55)' : 'rgba(16, 185, 129, 0.55)';
        ctx.beginPath();
        ctx.arc(x, y, 2.2 + rand() * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

const KYRGYZSTAN_POS = latLonToVector3(42.8746, 74.5698, 1.55);
const PRAGUE_POS = latLonToVector3(50.0755, 14.4378, 1.55);
const SEOUL_POS = latLonToVector3(37.5665, 126.978, 1.55);
const OVERVIEW_DIR = latLonToVector3(44, 72, 1).normalize();

const FOCUS_CAMERA: Record<GlobeFocus, THREE.Vector3> = {
  overview: OVERVIEW_DIR.clone().multiplyScalar(4.8),
  kyrgyzstan: KYRGYZSTAN_POS.clone().normalize().multiplyScalar(4.15),
  prague: PRAGUE_POS.clone().normalize().multiplyScalar(4.15),
  seoul: SEOUL_POS.clone().normalize().multiplyScalar(4.15),
};

const _projVec = new THREE.Vector3();

const CITY_MARKERS: {
  id: Exclude<GlobeFocus, 'overview'>;
  label: string;
  sub: string;
  badgeClass: string;
}[] = [
  {
    id: 'kyrgyzstan',
    label: 'Kyrgyzstan',
    sub: 'Home',
    badgeClass: 'border-amber-400/70 text-amber-300',
  },
  {
    id: 'prague',
    label: 'Prague',
    sub: 'CZU',
    badgeClass: 'border-emerald-400/70 text-emerald-300',
  },
  {
    id: 'seoul',
    label: 'Seoul',
    sub: 'Exchange',
    badgeClass: 'border-cyan-400/70 text-cyan-300',
  },
];

export function MobilityGlobe3D({ t }: MobilityGlobe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focus, setFocus] = useState<GlobeFocus>('overview');
  const targetCamRef = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const reducedMotion = prefersReducedMotion();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));

    const initialW = container.clientWidth || 420;
    const initialH = container.clientHeight || 340;
    renderer.setSize(initialW, initialH);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(40, initialW / initialH, 0.1, 40);
    camera.position.copy(FOCUS_CAMERA.overview);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 2.9;
    controls.maxDistance = 6.6;

    const handleControlStart = () => {
      targetCamRef.current = null;
    };
    controls.addEventListener('start', handleControlStart);

    const hemi = new THREE.HemisphereLight(0x93c5fd, 0x060e20, 0.9);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff1e0, 1.9);
    key.position.set(5, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x06b6d4, 1.2);
    rim.position.set(-5, -3, -4);
    scene.add(rim);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Core Globe Sphere
    const globeTex = createGlobeGridTexture(renderer.capabilities.getMaxAnisotropy());
    const globeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.52, 48, 36),
      new THREE.MeshStandardMaterial({
        map: globeTex,
        roughness: 0.42,
        metalness: 0.32,
      })
    );
    globeGroup.add(globeMesh);

    // Outer Atmosphere Wireframe Shell
    const atmoShell = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 24, 18),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      })
    );
    globeGroup.add(atmoShell);

    // Tilted Orbital Gimbal Frame
    const orbitalFrame = new THREE.Mesh(
      new THREE.TorusGeometry(1.92, 0.015, 12, 80),
      new THREE.MeshStandardMaterial({
        color: 0x64748b,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    orbitalFrame.rotation.set(Math.PI * 0.42, 0.28, 0);
    globeGroup.add(orbitalFrame);

    // Multi-part Beacon Pins for Kyrgyzstan (Amber), Prague (Emerald), and Seoul (Cyan)
    const createCityBeacon = (pos: THREE.Vector3, colorHex: number) => {
      const beacon = new THREE.Group();
      beacon.position.copy(pos);
      beacon.lookAt(pos.clone().multiplyScalar(2));

      const baseRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.08, 0.014, 10, 24),
        new THREE.MeshStandardMaterial({
          color: colorHex,
          emissive: colorHex,
          emissiveIntensity: 0.8,
          metalness: 0.5,
          roughness: 0.2,
        })
      );

      const spire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.025, 0.22, 12),
        new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          metalness: 0.9,
          roughness: 0.15,
        })
      );
      spire.rotation.x = Math.PI / 2;
      spire.position.z = 0.11;

      const tip = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.055, 0),
        new THREE.MeshStandardMaterial({
          color: colorHex,
          emissive: colorHex,
          emissiveIntensity: 1.2,
          roughness: 0.15,
          metalness: 0.3,
        })
      );
      tip.position.z = 0.24;

      beacon.add(baseRing, spire, tip);
      return { beacon, tip };
    };

    const kyrgyzstanBeacon = createCityBeacon(KYRGYZSTAN_POS, 0xf59e0b);
    const pragueBeacon = createCityBeacon(PRAGUE_POS, 0x10b981);
    const seoulBeacon = createCityBeacon(SEOUL_POS, 0x06b6d4);
    globeGroup.add(kyrgyzstanBeacon.beacon, pragueBeacon.beacon, seoulBeacon.beacon);

    const buildArcPoints = (start: THREE.Vector3, end: THREE.Vector3, maxLift: number) => {
      const pts: THREE.Vector3[] = [];
      const steps = 36;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const v = new THREE.Vector3().lerpVectors(start, end, t).normalize();
        const elevation = 1.54 + Math.sin(t * Math.PI) * maxLift;
        pts.push(v.multiplyScalar(elevation));
      }
      return pts;
    };

    // Leg 1: Kyrgyzstan -> Prague (Amber/Emerald arc)
    const leg1Curve = new THREE.CatmullRomCurve3(buildArcPoints(KYRGYZSTAN_POS, PRAGUE_POS, 0.34));
    const leg1Tube = new THREE.Mesh(
      new THREE.TubeGeometry(leg1Curve, 40, 0.016, 8, false),
      new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xd97706,
        emissiveIntensity: 0.75,
        roughness: 0.2,
        metalness: 0.5,
      })
    );
    globeGroup.add(leg1Tube);

    // Leg 2: Prague -> Seoul (Cyan arc)
    const leg2Curve = new THREE.CatmullRomCurve3(buildArcPoints(PRAGUE_POS, SEOUL_POS, 0.45));
    const leg2Tube = new THREE.Mesh(
      new THREE.TubeGeometry(leg2Curve, 48, 0.018, 8, false),
      new THREE.MeshStandardMaterial({
        color: 0x7bd0ff,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.5,
      })
    );
    globeGroup.add(leg2Tube);

    // 3-Part Animated Shuttle Satellite gliding Kyrgyzstan -> Prague -> Seoul
    const shuttle = new THREE.Group();
    const shuttleCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.06, 0),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        emissive: 0x38bdf8,
        emissiveIntensity: 1.0,
        metalness: 0.85,
        roughness: 0.15,
      })
    );
    const shuttleWing = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.014, 0.06),
      new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    shuttle.add(shuttleCore, shuttleWing);
    globeGroup.add(shuttle);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const handleResize = () => {
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const rafRef = { current: 0 };
    const timerRef = { current: 0 };
    let disposed = false;

    const markerTips = [kyrgyzstanBeacon.tip, pragueBeacon.tip, seoulBeacon.tip];
    const camDir = new THREE.Vector3();
    const markerDir = new THREE.Vector3();

    const updateCityLabels = () => {
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 340;
      camDir.copy(camera.position).normalize();

      markerTips.forEach((tip, idx) => {
        const el = labelRefs.current[idx];
        if (!el) return;
        tip.getWorldPosition(_projVec);
        markerDir.copy(_projVec).normalize();

        // Hide label gracefully when marker rotates behind the globe horizon
        const facingDot = markerDir.dot(camDir);
        if (facingDot < 0.08) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          return;
        }

        _projVec.project(camera);
        const px = (_projVec.x * 0.5 + 0.5) * w;
        const py = (-_projVec.y * 0.5 + 0.5) * h;
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
        el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -135%)`;
      });
    };

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.06);
      const elapsed = clock.getElapsedTime();

      if (targetCamRef.current) {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamRef.current.x, 5.5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamRef.current.y, 5.5, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamRef.current.z, 5.5, delta);
        if (camera.position.distanceTo(targetCamRef.current) < 0.04) {
          targetCamRef.current = null;
        }
      }

      if (!reducedMotion) {
        const cycle = (elapsed * 0.16) % 1;
        if (cycle < 0.45) {
          const t = cycle / 0.45;
          leg1Curve.getPointAt(t, shuttle.position);
          const lookAhead = leg1Curve.getPointAt(Math.min(t + 0.02, 1));
          shuttle.lookAt(lookAhead);
        } else {
          const t = (cycle - 0.45) / 0.55;
          leg2Curve.getPointAt(t, shuttle.position);
          const lookAhead = leg2Curve.getPointAt(Math.min(t + 0.02, 1));
          shuttle.lookAt(lookAhead);
        }

        kyrgyzstanBeacon.tip.rotation.z = elapsed * 1.4;
        pragueBeacon.tip.rotation.z = elapsed * 1.4;
        seoulBeacon.tip.rotation.z = -elapsed * 1.4;
        orbitalFrame.rotation.z = elapsed * 0.14;
      } else {
        leg2Curve.getPointAt(0.5, shuttle.position);
      }

      controls.update();
      renderer.render(scene, camera);
      updateCityLabels();

      if (reducedMotion) return;

      if (isSoftwareGl) {
        afterDraw(renderer, tick, timerRef);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    if (reducedMotion) {
      leg2Curve.getPointAt(0.5, shuttle.position);
      controls.update();
      renderer.render(scene, camera);
      updateCityLabels();
    } else {
      tick();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
      controls.removeEventListener('start', handleControlStart);
      controls.dispose();
      window.removeEventListener('resize', handleResize);
      disposeHierarchy(scene);
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleFocus = (nextFocus: GlobeFocus) => {
    setFocus(nextFocus);
    targetCamRef.current = FOCUS_CAMERA[nextFocus].clone();
  };

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] rounded-2xl bg-[#09101D] border border-[var(--border-subtle)] overflow-hidden shadow-xl">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Live 3D-tracked city markers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {CITY_MARKERS.map((city, idx) => {
          const localized = t.cities[city.id];
          return (
            <button
              key={city.id}
              ref={(el) => {
                labelRefs.current[idx] = el;
              }}
              type="button"
              onClick={() => handleFocus(city.id)}
              className={`absolute top-0 left-0 px-2 py-0.5 rounded-md bg-[#0B1220]/92 border font-mono text-[10px] whitespace-nowrap cursor-pointer transition-opacity ${city.badgeClass}`}
            >
              {localized.label} · {localized.sub}
            </button>
          );
        })}
      </div>

      {/* Top-Left Title */}
      <div className="pointer-events-none absolute top-3.5 left-3.5 bg-[#0B1220]/92 border border-slate-800/90 rounded-xl px-3.5 py-2 z-10">
        <p className="font-mono text-[11px] text-cyan-300 font-medium flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" />
          <span>{t.routeTitle}</span>
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">{t.dragHint}</p>
      </div>

      {/* Bottom Focus Controls */}
      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-[#0B1220]/95 border border-slate-700/80 p-1 rounded-xl shadow-lg max-w-[94vw] overflow-x-auto">
        <button
          type="button"
          onClick={() => handleFocus('overview')}
          className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            focus === 'overview'
              ? 'bg-cyan-500 text-slate-950 font-semibold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          {t.overview}
        </button>
        <button
          type="button"
          onClick={() => handleFocus('kyrgyzstan')}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-mono text-[11px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            focus === 'kyrgyzstan'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-300 hover:text-amber-300'
          }`}
        >
          <MapPin className="w-3 h-3" />
          <span>{t.cities.kyrgyzstan.label}</span>
        </button>
        <button
          type="button"
          onClick={() => handleFocus('prague')}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-mono text-[11px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            focus === 'prague'
              ? 'bg-emerald-400 text-slate-950 font-semibold'
              : 'text-slate-300 hover:text-emerald-300'
          }`}
        >
          <MapPin className="w-3 h-3" />
          <span>{t.cities.prague.label}</span>
        </button>
        <button
          type="button"
          onClick={() => handleFocus('seoul')}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-mono text-[11px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            focus === 'seoul'
              ? 'bg-cyan-400 text-slate-950 font-semibold'
              : 'text-slate-300 hover:text-cyan-300'
          }`}
        >
          <MapPin className="w-3 h-3" />
          <span>{t.cities.seoul.label}</span>
        </button>
      </div>
    </div>
  );
}
