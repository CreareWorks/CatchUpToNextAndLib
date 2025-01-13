"use client";

import * as BABYLON from "@babylonjs/core";
import { useEffect, useRef } from "react";
import styles from "./page.module.scss";

export function HomeContentClientAction() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new BABYLON.Engine(canvasRef.current, true);

    const scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 4,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(1, 1, 0),
      scene
    );

    light.intensity = 1.5;

    const torus = BABYLON.MeshBuilder.CreateTorus(
      "torus",
      { diameter: 7, thickness: 0.3, tessellation: 64 },
      scene
    );

    const torusMaterial = new BABYLON.PBRMetallicRoughnessMaterial(
      "torusMaterial",
      scene
    );
    torusMaterial.baseColor = new BABYLON.Color3(0.3, 0.6, 10);
    torusMaterial.metallic = 1.0;
    torusMaterial.roughness = 0.2;
    torus.material = torusMaterial;

    const wireframeTorus = BABYLON.MeshBuilder.CreateTorus(
      "wireframeTorus",
      { diameter: 4, thickness: 1, tessellation: 64 },
      scene
    );
    const wireframeMaterial = new BABYLON.StandardMaterial(
      "wireframeMaterial",
      scene
    );
    wireframeMaterial.emissiveColor = new BABYLON.Color3(1, 0.4, 0);
    wireframeMaterial.wireframe = true;
    wireframeTorus.material = wireframeMaterial;

    scene.registerBeforeRender(() => {
      torus.rotation.y += 0.01;
      torus.rotation.x += 0.005;
      wireframeTorus.rotation.y -= 0.01;
      wireframeTorus.rotation.x -= 0.005;
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}