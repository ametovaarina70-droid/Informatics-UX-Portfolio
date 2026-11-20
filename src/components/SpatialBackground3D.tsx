import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { NavRoute } from '../data/portfolioData';
import { TimePhase } from '../utils/timeTheme';
import {
  afterDraw,
  detectSoftwareWebGL,
  disposeHierarchy,
  prefersReducedMotion,
} from '../utils/webglUtils';

interface SpatialBackground3DProps {
  activeRoute: NavRoute;
  timePhase: TimePhase;
}

const ROUTE_OFFSETS: Record<NavRoute, { x: number; y: number; z: number }> = {
  index: { x: 0, y: 0, z: 18 },
  education: { x: 2.8, y: 1.1, z: 16.5 },
  projects: { x: -2.6, y: 0.6, z: 15.8 },
  contact: { x: 1.4, y: -1.2, z: 17.2 },
};

const PHASE_PALETTE: Record<
  TimePhase,
  {
    fogHex: number;
    skyHex: number;
    rimHex: number;
    ring1Hex: number;
    ring2Hex: number;
    nodeOpacity: number;
    nodePalette: number[];
  }
> = {
  day: {
    fogHex: 0xf5f8fd,
    skyHex: 0x0284c7,
    rimHex: 0x10b981,
    ring1Hex: 0x0284c7,
    ring2Hex: 0x059669,
    nodeOpacity: 0.25,
    nodePalette: [0x06b6d4, 0x0284c7, 0x10b981, 0x6366f1],
  },
  night: {
    fogHex: 0x080c14,
    skyHex: 0x7bd0ff,
    rimHex: 0x10b981,
    ring1Hex: 0x06b6d4,
    ring2Hex: 0x38bdf8,
    nodeOpacity: 0.65,
    nodePalette: [0x06b6d4, 0x0284c7, 0x10b981, 0x6366f1],
  },
};

const _dummy = new THREE.Object3D();
const _tempColor = new THREE.Color();
const _targetFogColor = new THREE.Color();
const _targetSkyColor = new THREE.Color();
const _targetRimColor = new THREE.Color();
const _targetRing1Color = new THREE.Color();
const _targetRing2Color = new THREE.Color();

export function SpatialBackground3D({ activeRoute, timePhase }: SpatialBackground3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<NavRoute>(activeRoute);
  const phaseRef = useRef<TimePhase>(timePhase);
  routeRef.current = activeRoute;
  phaseRef.current = timePhase;

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

    const initPalette = PHASE_PALETTE[phaseRef.current];

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(
      container.clientWidth || window.innerWidth,
      container.clientHeight || window.innerHeight
    );
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(initPalette.fogHex, 0.032);
    scene.fog = fog;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 80);
    camera.position.set(0, 0, 18);

    const hemiLight = new THREE.HemisphereLight(initPalette.skyHex, 0x060e20, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xb8eaff, 1.4);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(initPalette.rimHex, 0.9);
    rimLight.position.set(-10, -6, -8);
    scene.add(rimLight);

    const NODE_COUNT = 110;
    const nodeGeo = new THREE.OctahedronGeometry(0.14, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.78,
      transparent: true,
      opacity: initPalette.nodeOpacity,
    });
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);

    const palette = initPalette.nodePalette;
    const nodeData: {
      x: number;
      y: number;
      z: number;
      scale: number;
      speed: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const spreadX = (Math.random() - 0.5) * 34;
      const spreadY = (Math.random() - 0.5) * 20;
      const spreadZ = (Math.random() - 0.5) * 18 - 3;
      const scale = 0.75 + Math.random() * 0.65;
      nodeData.push({
        x: spreadX,
        y: spreadY,
        z: spreadZ,
        scale,
        speed: 0.35 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      });

      _dummy.position.set(spreadX, spreadY, spreadZ);
      _dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      _dummy.scale.setScalar(scale);
      _dummy.updateMatrix();
      instancedNodes.setMatrixAt(i, _dummy.matrix);

      _tempColor.setHex(palette[i % palette.length]);
      instancedNodes.setColorAt(i, _tempColor);
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    if (instancedNodes.instanceColor) instancedNodes.instanceColor.needsUpdate = true;
    instancedNodes.computeBoundingSphere();
    instancedNodes.frustumCulled = false;
    scene.add(instancedNodes);

    const ringGroup = new THREE.Group();
    const ringGeo1 = new THREE.TorusGeometry(9.5, 0.018, 12, 96);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: initPalette.ring1Hex,
      transparent: true,
      opacity: 0.14,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.set(Math.PI * 0.38, Math.PI * 0.14, 0);

    const ringGeo2 = new THREE.TorusGeometry(13.2, 0.014, 10, 110);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: initPalette.ring2Hex,
      transparent: true,
      opacity: 0.11,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.set(-Math.PI * 0.28, Math.PI * 0.24, 0.3);

    ringGroup.position.set(0, 0, -6);
    ringGroup.add(ring1, ring2);
    scene.add(ringGroup);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      pointer.y = -(e.clientY / Math.max(window.innerHeight, 1)) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let contextLost = false;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
    };
    const handleContextRestored = () => {
      contextLost = false;
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    const clock = new THREE.Clock();
    const rafRef = { current: 0 };
    const timerRef = { current: 0 };
    let disposed = false;

    let lastAppliedPhase: TimePhase = phaseRef.current;

    const tick = () => {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.08);
      const elapsed = clock.getElapsedTime();

      if (!contextLost) {
        const currentPhase = phaseRef.current;
        const pal = PHASE_PALETTE[currentPhase];
        _targetFogColor.setHex(pal.fogHex);
        _targetSkyColor.setHex(pal.skyHex);
        _targetRimColor.setHex(pal.rimHex);
        _targetRing1Color.setHex(pal.ring1Hex);
        _targetRing2Color.setHex(pal.ring2Hex);

        fog.color.lerp(_targetFogColor, 1 - Math.exp(-4 * delta));
        hemiLight.color.lerp(_targetSkyColor, 1 - Math.exp(-4 * delta));
        rimLight.color.lerp(_targetRimColor, 1 - Math.exp(-4 * delta));
        ringMat1.color.lerp(_targetRing1Color, 1 - Math.exp(-4 * delta));
        ringMat2.color.lerp(_targetRing2Color, 1 - Math.exp(-4 * delta));
        nodeMat.opacity = THREE.MathUtils.damp(nodeMat.opacity, pal.nodeOpacity, 4, delta);

        if (currentPhase !== lastAppliedPhase) {
          lastAppliedPhase = currentPhase;
          for (let i = 0; i < NODE_COUNT; i++) {
            _tempColor.setHex(pal.nodePalette[i % pal.nodePalette.length]);
            instancedNodes.setColorAt(i, _tempColor);
          }
          if (instancedNodes.instanceColor) instancedNodes.instanceColor.needsUpdate = true;
        }

        const target = ROUTE_OFFSETS[routeRef.current];
        const targetX = target.x + pointer.x * 1.1;
        const targetY = target.y + pointer.y * 0.7;

        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.2, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.2, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, target.z, 3.2, delta);
        camera.lookAt(0, 0, -2);

        if (!reducedMotion) {
          ring1.rotation.z = elapsed * 0.04;
          ring2.rotation.z = -elapsed * 0.025;
          ringGroup.rotation.y = Math.sin(elapsed * 0.08) * 0.12;

          for (let i = 0; i < NODE_COUNT; i++) {
            const n = nodeData[i];
            const bob = Math.sin(elapsed * n.speed + n.phase) * 0.35;
            _dummy.position.set(n.x, n.y + bob, n.z);
            _dummy.rotation.set(
              elapsed * 0.35 * n.speed + n.phase,
              elapsed * 0.45 * n.speed,
              0
            );
            _dummy.scale.setScalar(n.scale);
            _dummy.updateMatrix();
            instancedNodes.setMatrixAt(i, _dummy.matrix);
          }
          instancedNodes.instanceMatrix.needsUpdate = true;
        }

        renderer.render(scene, camera);
      }

      if (reducedMotion) return;

      if (isSoftwareGl) {
        afterDraw(renderer, tick, timerRef);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

      disposeHierarchy(scene);
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-85"
    />
  );
}
