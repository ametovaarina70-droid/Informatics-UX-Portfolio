import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { NavRoute, ProjectItem, PROJECTS } from '../data/portfolioData';
import { SiteTranslation } from '../data/translations';
import {
  afterDraw,
  detectSoftwareWebGL,
  disposeHierarchy,
  playSynthChime,
  prefersReducedMotion,
} from '../utils/webglUtils';

interface KineticSculpture3DProps {
  onNavigate: (route: NavRoute) => void;
  onSelectProject?: (project: ProjectItem) => void;
  t: SiteTranslation;
}

const PROJECT_COLORS = [0x06b6d4, 0x818cf8, 0x10b981, 0x38bdf8];
const PROJECT_FREQS = [523.25, 587.33, 659.25, 783.99];

const _dummy = new THREE.Object3D();
const _projVec = new THREE.Vector3();
const _targetPos = new THREE.Vector3(0, 1.5, 7.2);
const _targetLook = new THREE.Vector3(0, 0.1, 0);

function createFloorGridTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#09101d';
    ctx.fillRect(0, 0, 512, 512);

    const cx = 256;
    const cy = 256;

    const grad = ctx.createRadialGradient(cx, cy, 18, cx, cy, 240);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.20)');
    grad.addColorStop(0.55, 'rgba(16, 185, 129, 0.06)');
    grad.addColorStop(1, 'rgba(8, 12, 20, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    [110, 185, 225].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 124);
    grad.addColorStop(0, 'rgba(2, 6, 14, 0.78)');
    grad.addColorStop(0.55, 'rgba(6, 182, 212, 0.12)');
    grad.addColorStop(1, 'rgba(2, 6, 14, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function KineticSculpture3D({
  onNavigate,
  onSelectProject,
  t,
}: KineticSculpture3DProps) {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const labelButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [orbitPaused, setOrbitPaused] = useState<boolean>(false);
  const [controlsCollapsed, setControlsCollapsed] = useState<boolean>(true);
  const [contextLost, setContextLost] = useState<boolean>(false);

  const selectedIndexRef = useRef<number>(0);
  const orbitPausedRef = useRef<boolean>(false);
  const spinBoostRef = useRef<number>(0);
  const springBounceRef = useRef<{ pos: number; vel: number }>({ pos: 0, vel: 0 });
  const resetCameraFlagRef = useRef<boolean>(false);
  const onSelectIndexRef = useRef<(idx: number) => void>(() => {});

  selectedIndexRef.current = selectedIndex;
  orbitPausedRef.current = orbitPaused;
  onSelectIndexRef.current = (idx: number) => {
    setSelectedIndex(idx);
    playSynthChime(PROJECT_FREQS[idx % PROJECT_FREQS.length], 0.14);
  };

  useEffect(() => {
    const container = canvasMountRef.current;
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
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const initialW = container.clientWidth || 720;
    const initialH = container.clientHeight || 440;
    renderer.setSize(initialW, initialH);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09101d, 0.024);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(42, initialW / initialH, 0.1, 60);
    camera.position.copy(_targetPos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = 0.45;
    controls.maxPolarAngle = Math.PI * 0.54;
    controls.target.copy(_targetLook);

    const handleControlStart = () => {
      resetCameraFlagRef.current = false;
    };
    controls.addEventListener('start', handleControlStart);

    // 3-Point Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x09101d, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1e0, 2.1);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 22;
    keyLight.shadow.camera.left = -4.5;
    keyLight.shadow.camera.right = 4.5;
    keyLight.shadow.camera.top = 4.5;
    keyLight.shadow.camera.bottom = -4.5;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.4);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    // Grounded Orbital Stage Floor
    const stageGroup = new THREE.Group();
    stageGroup.position.set(0, -1.65, 0);

    const shadowTex = createContactShadowTexture();
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5.8, 5.8),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.72,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.06;
    stageGroup.add(shadowPlane);

    const dialTex = createFloorGridTexture(renderer.capabilities.getMaxAnisotropy());
    const floorPlate = new THREE.Mesh(
      new THREE.CircleGeometry(2.55, 48),
      new THREE.MeshStandardMaterial({
        map: dialTex,
        roughness: 0.55,
        metalness: 0.35,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      })
    );
    floorPlate.rotation.x = -Math.PI / 2;
    floorPlate.receiveShadow = true;
    stageGroup.add(floorPlate);
    scene.add(stageGroup);

    // Central Portfolio Hub ("Informatics & UX Core")
    const hubGroup = new THREE.Group();
    hubGroup.position.set(0, 0.2, 0);
    scene.add(hubGroup);

    const coreCrystal = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.62, 0),
      new THREE.MeshPhysicalMaterial({
        color: 0x7bd0ff,
        metalness: 0.15,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        iridescence: 0.85,
        transmission: isSoftwareGl ? 0 : 0.72,
        transparent: true,
        opacity: isSoftwareGl ? 0.55 : 1,
        ior: 1.5,
        thickness: 1.0,
        depthWrite: false,
      })
    );
    coreCrystal.renderOrder = 3;

    const coreInner = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.32, 0),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.9,
        metalness: 0.7,
        roughness: 0.2,
      })
    );

    const orbitTrack = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.016, 12, 96),
      new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.25,
      })
    );
    orbitTrack.rotation.x = Math.PI / 2;

    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.02, 0.032, 16, 64),
      new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.92,
        roughness: 0.18,
      })
    );
    innerRing.rotation.set(0.5, 0.2, 0);

    hubGroup.add(coreInner, coreCrystal, orbitTrack, innerRing);

    // 4 Orbiting Project Nodes (Matching Arina's 4 actual projects)
    const projectNodes: {
      group: THREE.Group;
      bodyMat: THREE.MeshStandardMaterial;
      haloMat: THREE.MeshStandardMaterial;
      hitProxy: THREE.Mesh;
      baseAngle: number;
      currentScale: number;
    }[] = [];

    const hitGeo = new THREE.SphereGeometry(0.55, 12, 12);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    PROJECTS.forEach((project, idx) => {
      const nodeGroup = new THREE.Group();
      const colorHex = PROJECT_COLORS[idx % PROJECT_COLORS.length];
      const angle = (idx / PROJECTS.length) * Math.PI * 2;

      const bodyGeo =
        project.category === 'data'
          ? new THREE.OctahedronGeometry(0.27, 0)
          : project.category === 'ux'
            ? new THREE.DodecahedronGeometry(0.25, 0)
            : new THREE.BoxGeometry(0.34, 0.34, 0.34);

      const bodyMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.3,
        metalness: 0.75,
        roughness: 0.22,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;

      const haloMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.92,
        roughness: 0.16,
      });
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.022, 12, 36), haloMat);
      halo.rotation.x = Math.PI * 0.38;

      const hitProxy = new THREE.Mesh(hitGeo, hitMat);
      hitProxy.layers.set(1);
      hitProxy.userData.projectIndex = idx;

      nodeGroup.add(body, halo, hitProxy);
      nodeGroup.position.set(Math.cos(angle) * 2.25, 0.1, Math.sin(angle) * 2.25);
      hubGroup.add(nodeGroup);

      projectNodes.push({
        group: nodeGroup,
        bodyMat,
        haloMat,
        hitProxy,
        baseAngle: angle,
        currentScale: 1,
      });
    });

    // Subtle Instanced Background Micro-Nodes
    const SPARK_COUNT = 28;
    const sparkGeo = new THREE.TetrahedronGeometry(0.038, 0);
    const sparkMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.5,
    });
    const sparks = new THREE.InstancedMesh(sparkGeo, sparkMat, SPARK_COUNT);
    const sparkParams: { radius: number; speed: number; y: number; phase: number }[] = [];

    for (let i = 0; i < SPARK_COUNT; i++) {
      const r = 1.4 + Math.random() * 1.4;
      const phase = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.1;
      sparkParams.push({ radius: r, speed: 0.2 + Math.random() * 0.25, y, phase });
      _dummy.position.set(Math.cos(phase) * r, y, Math.sin(phase) * r);
      _dummy.updateMatrix();
      sparks.setMatrixAt(i, _dummy.matrix);
    }
    sparks.instanceMatrix.needsUpdate = true;
    sparks.computeBoundingSphere();
    sparks.frustumCulled = false;
    hubGroup.add(sparks);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Raycasting on Layer 1
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointerNdc = new THREE.Vector2();
    const hitProxies = projectNodes.map((n) => n.hitProxy);
    let hoveredIndex = -1;
    let lastRaycastTime = 0;
    let pointerDownPos = { x: 0, y: 0 };

    const updateNdc = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / Math.max(rect.height, 1)) * 2 + 1;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRaycastTime < 45) return;
      lastRaycastTime = now;

      updateNdc(e.clientX, e.clientY);
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(hitProxies, false);
      if (hits.length > 0) {
        hoveredIndex = hits[0].object.userData.projectIndex as number;
        renderer.domElement.style.cursor = 'pointer';
      } else {
        hoveredIndex = -1;
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist > 6) return;

      updateNdc(e.clientX, e.clientY);
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(hitProxies, false);
      if (hits.length > 0) {
        const idx = hits[0].object.userData.projectIndex as number;
        springBounceRef.current.vel += 6.5;
        onSelectIndexRef.current(idx);
      }
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);

    const handleResize = () => {
      const w = container.clientWidth || 720;
      const h = container.clientHeight || 440;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const handleLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const handleRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleRestored);

    const clock = new THREE.Clock();
    const rafRef = { current: 0 };
    const timerRef = { current: 0 };
    let orbitAngleAccum = 0;
    let disposed = false;

    const updateScreenLabels = () => {
      const w = container.clientWidth || 720;
      const h = container.clientHeight || 440;
      projectNodes.forEach((node, idx) => {
        const el = labelButtonRefs.current[idx];
        if (!el) return;
        node.group.getWorldPosition(_projVec);
        _projVec.project(camera);
        if (_projVec.z > 1) {
          el.style.opacity = '0';
          return;
        }
        const px = (_projVec.x * 0.5 + 0.5) * w;
        const py = (-_projVec.y * 0.5 + 0.5) * h;
        el.style.opacity = '1';
        el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -145%)`;
      });
    };

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.06);
      const elapsed = clock.getElapsedTime();

      // Second-order spring bounce
      const spring = springBounceRef.current;
      const accel = -140 * spring.pos - 11 * spring.vel;
      spring.vel += accel * delta;
      spring.pos += spring.vel * delta;

      spinBoostRef.current = THREE.MathUtils.damp(spinBoostRef.current, 0, 2.4, delta);

      if (!orbitPausedRef.current && !reducedMotion) {
        orbitAngleAccum += delta * (0.26 + spinBoostRef.current * 0.65);
      }

      if (resetCameraFlagRef.current) {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetPos.x, 5.5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetPos.y, 5.5, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetPos.z, 5.5, delta);
        controls.target.x = THREE.MathUtils.damp(controls.target.x, _targetLook.x, 5.5, delta);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, _targetLook.y, 5.5, delta);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, _targetLook.z, 5.5, delta);
        if (camera.position.distanceTo(_targetPos) < 0.04) {
          resetCameraFlagRef.current = false;
        }
      }

      if (!reducedMotion) {
        hubGroup.position.y = 0.2 + Math.sin(elapsed * 1.4) * 0.06 + spring.pos * 0.14;
        coreCrystal.rotation.y += delta * (0.4 + spinBoostRef.current);
        coreInner.rotation.y -= delta * 0.6;
        innerRing.rotation.z += delta * 0.35;

        projectNodes.forEach((node, idx) => {
          const isSelected = selectedIndexRef.current === idx;
          const isHovered = hoveredIndex === idx;
          const angle = node.baseAngle + orbitAngleAccum;
          const bob = Math.sin(elapsed * 1.6 + idx * 1.4) * 0.12;
          node.group.position.set(Math.cos(angle) * 2.25, bob, Math.sin(angle) * 2.25);
          node.group.rotation.y = -angle + elapsed * 0.7;

          const targetScale = isSelected ? 1.38 : isHovered ? 1.22 : 1.0;
          node.currentScale = THREE.MathUtils.damp(node.currentScale, targetScale, 10, delta);
          node.group.scale.setScalar(node.currentScale);
          node.bodyMat.emissiveIntensity = isSelected ? 0.85 : isHovered ? 0.55 : 0.25;
        });

        for (let i = 0; i < SPARK_COUNT; i++) {
          const p = sparkParams[i];
          const a = p.phase + elapsed * p.speed;
          _dummy.position.set(Math.cos(a) * p.radius, p.y, Math.sin(a) * p.radius);
          _dummy.rotation.set(elapsed + p.phase, elapsed * 0.6, 0);
          _dummy.updateMatrix();
          sparks.setMatrixAt(i, _dummy.matrix);
        }
        sparks.instanceMatrix.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);
      updateScreenLabels();

      if (reducedMotion) return;

      if (isSoftwareGl) {
        afterDraw(renderer, tick, timerRef);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    if (reducedMotion) {
      controls.update();
      renderer.render(scene, camera);
      updateScreenLabels();
    } else {
      tick();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
      controls.removeEventListener('start', handleControlStart);
      controls.dispose();
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleRestored);

      disposeHierarchy(scene);
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeProject = PROJECTS[selectedIndex] ?? PROJECTS[0];
  const activeCopy = t.projects.items[activeProject.id];

  const handleSelectFromUI = (idx: number) => {
    springBounceRef.current.vel += 6.0;
    onSelectIndexRef.current(idx);
  };

  const handleSpinPulse = () => {
    spinBoostRef.current = Math.min(spinBoostRef.current + 3.2, 6.5);
    springBounceRef.current.vel += 7.0;
    playSynthChime(659.25, 0.14);
  };

  return (
    <section
      aria-label={t.explorer3d.ariaLabel}
      className="relative w-full h-[460px] sm:h-[500px] rounded-2xl bg-[#09101D] border border-[var(--border-subtle)] overflow-hidden shadow-2xl"
    >
      {/* Isolated WebGL mount container */}
      <div ref={canvasMountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Live 3D-tracked floating project labels (Zero React re-renders per frame) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {PROJECTS.map((project, idx) => {
          const isSelected = selectedIndex === idx;
          const localizedTitle = t.projects.items[project.id]?.title ?? project.title;
          return (
            <button
              key={project.id}
              ref={(el) => {
                labelButtonRefs.current[idx] = el;
              }}
              type="button"
              onClick={() => handleSelectFromUI(idx)}
              className={`pointer-events-auto absolute top-0 left-0 px-2.5 py-1 rounded-md font-mono text-[11px] transition-colors whitespace-nowrap cursor-pointer border ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 font-semibold shadow-lg'
                  : 'bg-[#0B1220]/90 text-slate-200 border-slate-700/90 hover:border-cyan-400/60 hover:text-cyan-300'
              }`}
            >
              {localizedTitle}
            </button>
          );
        })}
      </div>

      {contextLost && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#09101D] text-slate-300 font-mono text-xs p-6 text-center z-20">
          {t.explorer3d.contextLost}
        </div>
      )}

      {/* Top-Left Clear Purpose & Selected Project Preview Card */}
      <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-start justify-between gap-4 z-20">
        <div className="pointer-events-auto max-w-sm bg-[#0B1220]/94 border border-slate-700/80 rounded-xl p-4 shadow-xl space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-cyan-300">
              {activeCopy?.categoryLabel ?? activeProject.categoryLabel}
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              {activeProject.stack.slice(0, 2).join(' · ')}
            </span>
          </div>

          <h3 className="font-display font-bold text-base sm:text-lg text-slate-100 leading-snug">
            {activeCopy?.title ?? activeProject.title}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
            {activeCopy?.description ?? activeProject.description}
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            {onSelectProject && (
              <button
                type="button"
                onClick={() => onSelectProject(activeProject)}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-cyan-300 hover:text-cyan-200 cursor-pointer"
              >
                <span>{t.explorer3d.openCaseStudy}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeProject.primaryAction.href && (
              <a
                href={activeProject.primaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-300 hover:text-white"
              >
                <span>{activeCopy?.primaryLabel ?? activeProject.primaryAction.label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Collapsible Project Selector & Orbit Controls (Hidden by default) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center max-w-[94vw]">
        <button
          type="button"
          onClick={() => setControlsCollapsed((prev) => !prev)}
          aria-expanded={!controlsCollapsed}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1220]/95 border border-slate-700/80 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-lg ${
            controlsCollapsed ? 'rounded-xl' : 'rounded-t-xl border-b-0'
          }`}
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-cyan-300" />
              <span>{t.explorer3d.showControls}</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-300" />
              <span>{t.explorer3d.hideControls}</span>
            </>
          )}
        </button>

        {!controlsCollapsed && (
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0B1220]/95 border border-slate-700/80 shadow-xl">
            {PROJECTS.map((project, idx) => {
              const isSelected = selectedIndex === idx;
              const localizedTitle = t.projects.items[project.id]?.title ?? project.title;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleSelectFromUI(idx)}
                  className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-[#132038]'
                  }`}
                >
                  {localizedTitle}
                </button>
              );
            })}

            <span aria-hidden="true" className="hidden sm:inline text-slate-700 px-0.5">
              |
            </span>

            <button
              type="button"
              onClick={() => setOrbitPaused((prev) => !prev)}
              aria-label={orbitPaused ? t.explorer3d.play : t.explorer3d.pause}
              title={orbitPaused ? t.explorer3d.play : t.explorer3d.pause}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#132038] hover:bg-[#1a2b4a] border border-slate-700 text-slate-200 font-mono text-[11px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {orbitPaused ? (
                <Play className="w-3 h-3 text-cyan-300" />
              ) : (
                <Pause className="w-3 h-3 text-cyan-300" />
              )}
              <span>{orbitPaused ? t.explorer3d.play : t.explorer3d.pause}</span>
            </button>

            <button
              type="button"
              onClick={handleSpinPulse}
              title={t.explorer3d.spin}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#132038] hover:bg-[#1a2b4a] border border-cyan-500/35 text-cyan-300 font-mono text-[11px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>{t.explorer3d.spin}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                resetCameraFlagRef.current = true;
              }}
              aria-label={t.explorer3d.resetCamera}
              title={t.explorer3d.resetCamera}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#132038] hover:bg-[#1a2b4a] border border-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-cyan-300 hover:text-cyan-200 font-mono text-[11px] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t.explorer3d.allProjects}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
