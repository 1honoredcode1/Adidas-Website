"use client";
import { Canvas } from "@react-three/fiber";
import Rig from "./Rig";
import { View } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import { patchThreeLoadingManager } from "@/lib/patchThreeLoadingManager";
import AssetsPreload from "./AssetsPreload";

patchThreeLoadingManager();

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
      <AssetsPreload />
      <Suspense fallback={<LoadingSkeleton />}>
        <View.Port />
      </Suspense>

      <Rig />
    </Canvas>
  );
};

export default ViewCanvas;
