"use client";
import { Canvas } from "@react-three/fiber";
import Rig from "./Rig";
import { View } from "@react-three/drei";
import { useEffect, useState } from "react";

const ViewCanvas = () => {
  const [eventSource, seteventSource] = useState<HTMLElement | null>(null);
  useEffect(() => {
    seteventSource(document.body);
  }, []);

  return (
    <Canvas
      style={{ position: "fixed", inset: 0, overflow: "hidden" }}
      camera={{ position: [0, 0.7, 3], fov: 30 }}
      eventSource={eventSource ?? undefined}
      eventPrefix="client"
      gl={{ stencil: true }}
    >
      <View.Port />

      <Rig />
    </Canvas>
  );
};

export default ViewCanvas;
