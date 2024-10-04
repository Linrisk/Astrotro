import { useState, useEffect } from "react";
import styled from "styled-components";
import { CirclePicker } from "react-color";

const TeamPatch = () => {
  const [teamName, setTeamName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [icon, setIcon] = useState("rocket");
  const [shape, setShape] = useState("circle");
  const [bgImage, setBgImage] = useState("/backgrounds/5471985.jpg"); // Image de fond par défaut
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 }); // Position initiale du texte

  // État du chronomètre (20 minutes)
  const [seconds, setSeconds] = useState(1200);

  // Effet pour démarrer le chronomètre
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 1, 0)); // Décrémente chaque seconde et s'assure que ça ne descend pas en dessous de zéro
    }, 1000); // Incrémente les secondes toutes les 1000 ms (1 seconde)

    return () => clearInterval(interval); // Nettoyage de l'intervalle à la destruction du composant
  }, []);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent) => {
      const newX = textPosition.x + (moveEvent.clientX - startX);
      const newY = textPosition.y + (moveEvent.clientY - startY);
      setTextPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Fonction pour formater le temps en mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-100 h-100"> 
      <div className="wrapper-div-all p-4 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10">
          <h2 className="text-2xl font-bold mb-4">
            Module 0 : Choix des patches et des équipes
          </h2>
          <div className="text-consigne mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            molestie a nibh a maximus. In imperdiet facilisis ultrices. Mauris
            neque mauris, efficitur nec venenatis sit amet, fringilla in lacus.
            In ultricies, mauris vel luctus porta, orci dui venenatis nisl, eget
            maximus ante justo nec sapien. Duis faucibus lobortis erat, et
            placerat augue maximus id.
          </div>
          <input
            type="text"
            placeholder="Saisir du nom de l'équipe ici"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
        </div>
        <div className="col-span-2 col-chrono">
          {/* Chronomètre */}
          <div className="flex items-center justify-center h-full border-1 chronometre">
            <span className="text-lg font-semibold">{formatTime(seconds)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          {/* Icônes */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Choisir une icône :</h3>
            <div className="flex space-x-4 mt-2">
              {[
                "astronaut",
                "computer",
                "mars",
                "moon",
                "planet",
                "plant",
                "rocket",
                "station",
              ].map((iconName) => (
                <img
                  key={iconName}
                  src={`/icons/${iconName}.png`}
                  alt={iconName}
                  className="cursor-pointer w-12 h-12"
                  onClick={() => setIcon(iconName)}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Choisir une forme :</h3>
            <div className="flex space-x-4 mt-2">
              {["circle", "square", "triangle"].map((shapeName) => (
                <div
                  key={shapeName}
                  className={`w-12 h-12 bg-gray-300 cursor-pointer flex items-center justify-center ${
                    shapeName === "circle"
                      ? "rounded-full"
                      : shapeName === "square"
                      ? ""
                      : "transform rotate-45"
                  }`}
                  onClick={() => setShape(shapeName)}
                >
                  <span className="text-center">
                    {shapeName === "circle"
                      ? "●"
                      : shapeName === "square"
                      ? "■"
                      : "▲"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">
              Choisir couleur de texte :
            </h3>

            <CirclePicker
              color={backgroundColor}
              onChange={(color) => setBackgroundColor(color.hex)} // Correction ici
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-10">
              <div className="mt-4">
                <h3 className="text-xl font-semibold">
                  Choisir une image de fond :
                </h3>
                <div className="flex space-x-2 mt-2">
                  {[
                    "/backgrounds/5471985.jpg",
                    "/backgrounds/5473889.jpg",
                    "/backgrounds/6484434.jpg",
                  ].map((bg) => (
                    <div key={bg} className="relative">
                      <img
                        src={bg}
                        alt="Image de fond"
                        className="w-20 h-20 cursor-pointer"
                        onClick={() => setBgImage(bg)}
                        style={{
                          border: bgImage === bg ? "2px solid blue" : "none",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-1">
              {/*btn*/}
              <button
                className="mt-4 bg-green-500 text-white p-2 rounded"
                onClick={() =>
                  alert(
                    `Nom de l'équipe: ${teamName}, Icône: ${icon}, Couleur: ${backgroundColor}, Forme: ${shape}, Image de fond: ${bgImage}`
                  )
                }
              >
                Valider
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          {/* Apercu */}
          <div className="mt-6 flex items-center justify-center">
            <div
              className={`w-80 h-80 flex items-center justify-center border-2 border-gray-300 mt-2 ${
                shape === "circle"
                  ? "rounded-full"
                  : shape === "square"
                  ? ""
                  : "transform rotate-45"
              }`}
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <p
                className="text-black font-bold"
                style={{
                  color: backgroundColor,
                  position: "absolute",
                  left: textPosition.x,
                  top: textPosition.y,
                }}
                onMouseDown={handleMouseDown}
              >
                {teamName}
              </p>
              <img
                src={`/icons/${icon}.png`}
                alt="Icône"
                className="w-16 h-16"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TeamPatch;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
