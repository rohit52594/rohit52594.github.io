import { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../context/ScrollContext';

/* ─── Section-based colors ─── */
const SECTION_COLORS = [
  { r: 0.49, g: 0.42, b: 1.0 },   // hero — purple
  { r: 0.21, g: 0.84, b: 0.78 },   // about — cyan
  { r: 1.0, g: 0.42, b: 0.62 },    // experience — pink
  { r: 1.0, g: 0.70, b: 0.28 },    // skills — amber
  { r: 0.49, g: 0.42, b: 1.0 },    // projects — purple
  { r: 0.21, g: 0.84, b: 0.78 },   // contact — cyan
];

function lerpColor(a, b, t) {
  return { r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t };
}

function getScrollColor(scroll) {
  const idx = scroll * (SECTION_COLORS.length - 1);
  const i = Math.floor(idx);
  const t = idx - i;
  const a = SECTION_COLORS[Math.min(i, SECTION_COLORS.length - 1)];
  const b = SECTION_COLORS[Math.min(i + 1, SECTION_COLORS.length - 1)];
  return lerpColor(a, b, t);
}

/* ═══════════════════════════════════════════════
   Particle Nebula with constellation lines
   ═══════════════════════════════════════════════ */
function ParticleNebula({ scrollRef, count = 2200 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const { positions, colors, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Distribute particles in clusters + scattered
    for (let i = 0; i < count; i++) {
      const cluster = Math.random() < 0.4;
      if (cluster) {
        // Tight cluster near center
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2 + Math.random() * 6;
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      } else {
        // Wide scatter
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 6 + Math.random() * 18;
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }

      // Initial colors (will be overridden by scroll)
      col[i * 3] = 0.49;
      col[i * 3 + 1] = 0.42;
      col[i * 3 + 2] = 1.0;
    }

    // Build constellation lines — connect nearby particles
    const lineVerts = [];
    const connectionDistance = 3.5;
    const maxLines = 200;
    let lineCount = 0;

    for (let i = 0; i < Math.min(count, 600) && lineCount < maxLines; i++) {
      for (let j = i + 1; j < Math.min(count, 600) && lineCount < maxLines; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance && dist > 1.0) {
          lineVerts.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
          lineCount++;
        }
      }
    }

    return {
      positions: pos,
      colors: col,
      linePositions: new Float32Array(lineVerts),
    };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.012 + scroll * Math.PI * 0.4;
      pointsRef.current.rotation.x = Math.sin(t * 0.06) * 0.12 + scroll * 0.35;
      pointsRef.current.position.y = scroll * 5;

      // Update particle colors based on scroll
      const scrollCol = getScrollColor(scroll);
      const colAttr = pointsRef.current.geometry.attributes.color;
      if (colAttr) {
        for (let i = 0; i < count; i++) {
          const mix = (Math.sin(i * 0.1 + t * 0.3) + 1) * 0.5;
          colAttr.array[i * 3] = scrollCol.r * 0.7 + mix * 0.3;
          colAttr.array[i * 3 + 1] = scrollCol.g * 0.7 + mix * 0.3;
          colAttr.array[i * 3 + 2] = scrollCol.b * 0.7 + mix * 0.3;
        }
        colAttr.needsUpdate = true;
      }
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.012 + scroll * Math.PI * 0.4;
      linesRef.current.rotation.x = Math.sin(t * 0.06) * 0.12 + scroll * 0.35;
      linesRef.current.position.y = scroll * 5;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#7c6aff"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}
    </>
  );
}

/* ─── Nebula Glow Orbs ─── */
function NebulaOrbs({ scrollRef }) {
  const groupRef = useRef();

  const orbs = useMemo(() => [
    { pos: [-3, 2, -8], color: '#7c6aff', scale: 2.5, speed: 0.3 },
    { pos: [4, -1, -10], color: '#36d7c7', scale: 3, speed: 0.2 },
    { pos: [-5, -3, -12], color: '#ff6b9d', scale: 2, speed: 0.4 },
    { pos: [6, 3, -14], color: '#ffb347', scale: 1.8, speed: 0.25 },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    groupRef.current.position.y = scroll * 4;
    groupRef.current.rotation.y = t * 0.02;
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed * 3} rotationIntensity={0.1} floatIntensity={0.5}>
          <mesh position={orb.pos}>
            <sphereGeometry args={[orb.scale, 24, 24]} />
            <meshStandardMaterial
              color={orb.color}
              emissive={orb.color}
              emissiveIntensity={0.08}
              transparent
              opacity={0.04}
              roughness={1}
              depthWrite={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ─── Floating geometric shapes ─── */
function FloatingShapes({ scrollRef }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    groupRef.current.rotation.y = t * 0.04 + scroll * 1.2;
    groupRef.current.position.y = scroll * 6 - 1;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 0, -3]}>
          <torusKnotGeometry args={[1.8, 0.06, 256, 32]} />
          <meshStandardMaterial
            color="#7c6aff" emissive="#7c6aff" emissiveIntensity={0.2}
            roughness={0.3} metalness={0.7} transparent opacity={0.3}
          />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[4, 1.5, -6]} rotation={[0.8, 0.5, 0]}>
          <torusGeometry args={[1.5, 0.012, 64, 128]} />
          <meshStandardMaterial
            color="#36d7c7" emissive="#36d7c7" emissiveIntensity={0.4}
            transparent opacity={0.25}
          />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh position={[-5, -1, -5]} rotation={[1.5, 0.3, 0.7]}>
          <torusGeometry args={[1.1, 0.01, 64, 128]} />
          <meshStandardMaterial
            color="#ff6b9d" emissive="#ff6b9d" emissiveIntensity={0.4}
            transparent opacity={0.2}
          />
        </mesh>
      </Float>
      <Float speed={0.6} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh position={[6, -2, -8]}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#7c6aff" emissive="#7c6aff" emissiveIntensity={0.25}
            wireframe transparent opacity={0.2}
          />
        </mesh>
      </Float>
      <Float speed={1.3} rotationIntensity={0.7} floatIntensity={0.4}>
        <mesh position={[-6, 3, -9]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#36d7c7" emissive="#36d7c7" emissiveIntensity={0.25}
            wireframe transparent opacity={0.18}
          />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[2, -3.5, -7]} rotation={[0.4, 0.6, 0]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#ffb347" emissive="#ffb347" emissiveIntensity={0.2}
            wireframe transparent opacity={0.15}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── Mouse-reactive glow ─── */
function MouseGlow({ mouseRef }) {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    ref.current.position.x += (mx * 4 - ref.current.position.x) * 0.05;
    ref.current.position.y += (my * 3 - ref.current.position.y) * 0.05;
  });

  return (
    <mesh ref={ref} position={[0, 0, 1]}>
      <sphereGeometry args={[1.5, 16, 16]} />
      <meshStandardMaterial
        color="#7c6aff"
        emissive="#7c6aff"
        emissiveIntensity={0.05}
        transparent
        opacity={0.03}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Camera controller ─── */
function CameraRig({ scrollRef, mouseRef }) {
  useFrame((state) => {
    const scroll = scrollRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const targetX = mx * 1.0;
    const targetY = scroll * 4 - 1.5 + my * 0.6;
    const targetZ = 8 - scroll * 3;

    state.camera.position.x += (targetX - state.camera.position.x) * 0.025;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.025;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.025;

    state.camera.lookAt(mx * 0.4, scroll * 2, 0);
  });

  return null;
}

/* ─── Scene ─── */
function Scene({ scrollRef, mouseRef }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 6]} intensity={0.4} color="#b8b0ff" />
      <directionalLight position={[-6, 2, -4]} intensity={0.25} color="#36d7c7" />
      <pointLight position={[0, 0, 5]} intensity={0.12} color="#7c6aff" />

      <fog attach="fog" args={['#050510', 8, 35]} />

      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} />
      <ParticleNebula scrollRef={scrollRef} />
      <NebulaOrbs scrollRef={scrollRef} />
      <FloatingShapes scrollRef={scrollRef} />
      <MouseGlow mouseRef={mouseRef} />
    </>
  );
}

/* ═══════════════════════════════════════════════
   Export — ParticleUniverse
   ═══════════════════════════════════════════════ */
export default function ParticleUniverse() {
  const { scrollRef } = useScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: 'radial-gradient(ellipse at 50% 20%, #0f0f2a 0%, #050510 70%)',
    }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <Scene scrollRef={scrollRef} mouseRef={mouseRef} />
        </Canvas>
      </Suspense>
    </div>
  );
}
