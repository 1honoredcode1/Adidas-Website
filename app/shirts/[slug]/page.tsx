"use client";
import { notFound, useParams } from "next/navigation";
import Scene from "@/app/components/Scene";
import { ShirtType } from "@/lib/textures";
import ScrollIndicator from "@/app/components/ScrollIndicator";

const page = () => {
  const params = useParams();
  const shirtType = params.slug as ShirtType;
  if (!shirtType) return notFound();
  return (
    <>
      <Scene shirtType={shirtType} />
      <ScrollIndicator shirtType={shirtType} />
    </>
  );
};

export default page;
