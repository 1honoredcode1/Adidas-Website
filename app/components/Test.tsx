"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Test = () => {
  return (
    <Canvas>
      <Environment preset="studio" />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
};

export default Test;
