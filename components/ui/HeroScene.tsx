"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function WireSketch() {
  const knotRef = useRef<Mesh>(null);
  const icoRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.4;
      knotRef.current.rotation.y += delta * 0.35;
    }

    if (icoRef.current) {
      icoRef.current.rotation.x -= delta * 0.28;
      icoRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={knotRef} position={[0.1, 0.2, 0]}>
        <torusKnotGeometry args={[1, 0.28, 180, 30]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>

      <mesh ref={icoRef} position={[-1.6, -1.2, -0.6]} scale={0.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#000000" wireframe />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="brutal-border brutal-shadow h-[360px] w-full overflow-hidden bg-white md:h-[520px]">
      <Canvas camera={{ position: [0, 0, 4.6], fov: 52 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.8} />
        <directionalLight intensity={0.65} position={[2, 2, 4]} />
        <WireSketch />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.65} />
      </Canvas>
    </div>
  );
}
