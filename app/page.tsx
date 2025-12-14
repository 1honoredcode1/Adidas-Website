"use client";
import { useState } from "react";
import { View } from "@react-three/drei";
import { MainStudioModel } from "./components/MainStudioModel";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMoile = useMediaQuery({ maxWidth: 400 });
  const [currentIndex, setcurrentIndex] = useState(1);
  const handlePrev = () => {
    if (currentIndex > 0) setcurrentIndex((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentIndex < 2) setcurrentIndex((prev) => prev + 1);
  };
  return (
    <>
      <View className="w-full h-dvh">
        <MainStudioModel
          currentIndex={currentIndex}
          scale={isMoile ? 0.8 : 1}
        />
      </View>
      <p className="absolute z-10 top-11/12 place-self-center text-white/80 md:text-xs text-[10px] font-medium tracking-wider">
        SELECT A PRODUCT TO BEGIN
      </p>
      <div
        className="absolute z-20 top-10/12 left-1/12 bg-white mask-[url(/icons/left.svg)] 
      size-12 mask-no-repeat border hover-animation md:hidden block"
        onClick={handlePrev}
      />
      <div
        className="absolute z-20 top-10/12 right-1/12 bg-white mask-[url(/icons/right.svg)] 
      size-12 mask-no-repeat border hover-animation md:hidden block"
        onClick={handleNext}
      />
    </>
  );
}
