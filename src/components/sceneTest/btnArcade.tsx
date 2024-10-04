import { useEffect } from 'react';
import * as THREE from 'three';

const ArcadeButton = ({ 
  diameter = 30, 
  height = 20, 
  bezel = 5, 
  buttonHeight = 10, 
  fillet = 2, 
  color = "#3AA6B9", 
  bezelColor = "#FFFFFF",
  positionX = 0, 
  positionY = 0, 
  positionZ = 0,
  scene // On passe la scène comme prop ici
}) => {

  useEffect(() => {
    // Si la scène n'est pas fournie, on ne fait rien
    if (!scene) {
      console.error("Aucune scène fournie !");
      return;
    }

    const mainColor = new THREE.Color(color); // Couleur principale
    const edgeColor = new THREE.Color(bezelColor); // Couleur de la bordure

    // Créer un groupe pour déplacer tout le bouton en une seule fois
    const buttonGroup = new THREE.Group();

    // 1. Corps principal (cylindre de base)
    const bodyGeometry = new THREE.CylinderGeometry(diameter / 2, diameter / 2, height, 200);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: mainColor });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    buttonGroup.add(body);

    // 2. Bouton interne (évidement)
    const innerButtonGeometry = new THREE.CylinderGeometry(diameter / 2 - bezel, diameter / 2 - bezel, height - fillet, 200);
    const innerButtonMaterial = new THREE.MeshBasicMaterial({ color: mainColor });
    const innerButton = new THREE.Mesh(innerButtonGeometry, innerButtonMaterial);
    innerButton.position.set(0, 0, fillet / 2); // Translation pour simuler l'évidement
    buttonGroup.add(innerButton);

    // 3. Bord arrondi sur le dessus (utiliser des rayons différents)
    const roundedEdgeGeometry = new THREE.CylinderGeometry(diameter / 2 - bezel, diameter / 2 - bezel - fillet, fillet, 200);
    const roundedEdgeMaterial = new THREE.MeshBasicMaterial({ color: mainColor });
    const roundedEdge = new THREE.Mesh(roundedEdgeGeometry, roundedEdgeMaterial);
    roundedEdge.position.set(0, 0, height - buttonHeight + fillet / 2); // Ajustement de la position pour le biseau
    buttonGroup.add(roundedEdge);

    // 4. Bordure extérieure
    const outerBezelGeometry = new THREE.CylinderGeometry(diameter / 2 + bezel, diameter / 2, fillet, 200);
    const outerBezelMaterial = new THREE.MeshBasicMaterial({ color: edgeColor, opacity: 0.6, transparent: true });
    const outerBezel = new THREE.Mesh(outerBezelGeometry, outerBezelMaterial);
    outerBezel.position.set(0, 0, 0); // Position de la bordure
    buttonGroup.add(outerBezel);

    // Positionner tout le bouton avec positionX, positionY et positionZ
    buttonGroup.position.set(positionX, positionY, positionZ);

    // Ajouter le groupe de boutons à la scène existante
    scene.add(buttonGroup);

    // Clean-up : retirer le bouton de la scène lorsque le composant est démonté
    return () => {
      //scene.remove(buttonGroup);
    };
  }, [diameter, height, bezel, buttonHeight, fillet, color, bezelColor, positionX, positionY, positionZ, scene]);

  return null;
};

export default ArcadeButton;
