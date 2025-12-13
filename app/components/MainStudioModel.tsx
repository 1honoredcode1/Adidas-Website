import { createMaterials } from "@/lib/material";
import { studioTextures } from "@/lib/textures";
import { useMainStudioTextures } from "@/lib/useTextures";
import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useRef, useState } from "react";
import * as THREE from "three";

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};

export function MainStudioModel() {
  const { nodes } = useGLTF(
    "/models/main/MainStudio.glb"
  ) as unknown as GLTFResult;

  const textures = useMainStudioTextures();
  const mats = createMaterials(textures) as Record<
    keyof typeof studioTextures.main,
    THREE.MeshBasicMaterial
  >;

  const shirts = [
    {
      geometry: nodes.Shirt_White.geometry,
      position: [0.65, 0.7, -0.45] as [number, number, number],
      rotation: [0, Math.PI / 9, 0] as [number, number, number],
      material: mats.whiteShirt,
      hoverdMat: mats.whiteStudio,
      slug: "white",
    },
    {
      geometry: nodes.Shirt_Sport.geometry,
      position: [0, 0.7, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      material: mats.sportShirt,
      hoverdMat: mats.redStudio,
      slug: "red",
    },
    {
      geometry: nodes.Shirt_Gray.geometry,
      position: [-0.65, 0.7, -0.45] as [number, number, number],
      rotation: [0, -Math.PI / 9, 0] as [number, number, number],
      material: mats.grayShirt,
      hoverdMat: mats.grayStudio,
      slug: "gray",
    },
  ];

  const [envMaterial, setenvMaterial] = useState<THREE.MeshBasicMaterial>(
    mats.defaultStudio
  );

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const tlRefs = useRef<GSAPTimeline[]>([]);

  useGSAP(() => {
    if (!meshRefs.current) return;
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      tlRefs.current[i] = gsap
        .timeline({ paused: true })
        .to(mesh.rotation, { y: 0, duration: 1, ease: "power1.inOut" })
        .to(
          mesh.scale,
          {
            x: 1.05,
            y: 1.05,
            z: 1.05,
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        );
    });
  });

  function enterHandler(index: number, material: THREE.MeshBasicMaterial) {
    document.body.style.cursor = "pointer";
    setenvMaterial(material);
    tlRefs.current[index].play();
  }
  function leaveHandler(index: number) {
    document.body.style.cursor = "auto";
    tlRefs.current[index].reverse();
  }
  return (
    <group dispose={null}>
      <mesh geometry={nodes.Environment.geometry} material={envMaterial} />
      {shirts.map((shirt, i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (!m) return;
            meshRefs.current[i] = m;
          }}
          geometry={shirt.geometry}
          material={shirt.material}
          position={shirt.position}
          rotation={shirt.rotation}
          onPointerEnter={() => enterHandler(i, shirt.hoverdMat)}
          onPointerLeave={() => leaveHandler(i)}
        />
      ))}

      <mesh
        geometry={nodes.Hitbox.geometry}
        scale={[2.52, 1, 1]}
        visible={false}
        onPointerLeave={() => setenvMaterial(mats.defaultStudio)}
      />
    </group>
  );
}

useGLTF.preload("/models/main/MainStudio.glb");
