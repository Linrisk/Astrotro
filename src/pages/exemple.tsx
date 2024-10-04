import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ArcadeButton from "../components/sceneTest/btnArcade";

export default function Home() {
  const [colorbasePad, setColorbasePad] = useState("#f5f5f5"); // Couleur initiale

  const mountRef = useRef(null);
  const sceneRef = useRef(null); // Référence à la scène

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene; // Assigner la scène à la référence
    // socle base pad
    const basePadGeometry = new THREE.BoxGeometry(25, 1, 15);

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorbasePad),
    });
    const basePadCube = new THREE.Mesh(basePadGeometry, material);
    basePadCube.position.set(0, 0, 0);
    scene.add(basePadCube);
    //ecran dessus bleu

    const baseEcranGeometry = new THREE.BoxGeometry(10, 0.3, 10);
    const materialEcran = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#87A2FF"),
    });
    const baseEcranCube = new THREE.Mesh(baseEcranGeometry, materialEcran);
    baseEcranCube.position.set(6.5, 1, -1);
    scene.add(baseEcranCube);

    //bouttons

    const buttonGroupEcran = new THREE.Group();

    //cylindre arrière

    const cylinderArriereGeometry = new THREE.CylinderGeometry(
      0.5,
      0.5,
      25,
      32
    ); // Diamètre supérieur, diamètre inférieur, hauteur, segments
    const cylinderArriereMaterial = new THREE.MeshBasicMaterial({
      color: 0x3aa6b9,
    }); // Couleur du cylindre
    const cylinderArriere = new THREE.Mesh(
      cylinderArriereGeometry,
      cylinderArriereMaterial
    );
    cylinderArriere.rotation.z = Math.PI / 2;
    cylinderArriere.rotation.x = Math.PI / 2;
    cylinderArriere.position.set(0, 0, -7.5);
    scene.add(cylinderArriere);

    //ecran haut :

    const ecranHautGeometry = new THREE.BoxGeometry(22, 0.2, 10);
    const ecranHautMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#A028DB"),
    });
    const ecranHautCube = new THREE.Mesh(ecranHautGeometry, ecranHautMaterial);
    ecranHautCube.position.set(0, 5, -7.5);
    //  ecranHautCube.rotation.z = Math.PI/2 ;
    ecranHautCube.rotation.x = Math.PI / 2;
    scene.add(ecranHautCube);

    //boutton plus

    const buttonPlusGeomettry = new THREE.BoxGeometry(1.25, 0.2, 1.5);
    const buttonPlusMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#6E8AF7"),
    });
    const buttonPlusCube = new THREE.Mesh(
      buttonPlusGeomettry,
      buttonPlusMaterial
    );
    buttonPlusCube.position.set(2, 1, 6);
    //scene.add(buttonPlusCube);

    buttonGroupEcran.add(buttonPlusCube);
    //boutton moins
    
    const buttonMinuGeomettry = new THREE.BoxGeometry(1.25, 0.2, 1.5);
    const buttonMinusMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#7E84F7"),
    });
    const buttonMinusCube = new THREE.Mesh(
      buttonMinuGeomettry,
      buttonMinusMaterial
    );
    buttonMinusCube.position.set(4, 1, 6);
    //scene.add(buttonMinusCube);

    buttonGroupEcran.add(buttonMinusCube);
    //ecran choix slide


    const ecranChoixSlideGeometry = new THREE.BoxGeometry(6,0.2,1.5);
    const ecranChoixSlideMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#F0EBE3"),
    });
    const ecranChoixSlideCube = new THREE.Mesh(
      ecranChoixSlideGeometry,
      ecranChoixSlideMaterial
    );
    ecranChoixSlideCube.position.set(8.5, 1, 6);
   // scene.add(ecranChoixSlideCube);

    buttonGroupEcran.add(ecranChoixSlideCube);
    buttonGroupEcran.position.set(0, 0, 0);
    scene.add(buttonGroupEcran);
    //controls 

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Ajoute un effet de ralentissement
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2; // Limite l'angle de rotation vertical

    const animate = function () {
      requestAnimationFrame(animate);

      basePadCube.rotation.x += 0;
      basePadCube.rotation.y += 0;

      controls.update(); // Met à jour les contrôles à chaque frame
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef}>
      {sceneRef.current && (
        <ArcadeButton
          diameter={30}
          height={20}
          bezel={5}
          buttonHeight={10}
          fillet={2}
          color="#3AA6B9"
          bezelColor="#FFFFFF"
          positionX={0}
          positionY={10} // On peut ajuster la position ici
          positionZ={0}
          scene={sceneRef.current} // Passe la scène existante
        />
      )}
    </div>
  );
}
