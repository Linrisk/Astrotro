import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CirclePicker } from "react-color";

const TeamPatch: React.FC = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFFFFF");
  const [icon, setIcon] = useState<string>("rocket");
  const [shape, setShape] = useState<string>("circle");
  const [bgImage, setBgImage] = useState<string>("/backgrounds/5471985.jpg");
  const [textPosition, setTextPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [seconds, setSeconds] = useState<number>(1200);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 1, 0)); // Décrémente chaque seconde
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
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

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="wrapper-div-all p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10">
          <h2 className="text-2xl font-bold mb-4">Module 0 : Choix des patches et des équipes</h2>
          <div className="text-consigne mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie a nibh a maximus. In imperdiet facilisis ultrices. Mauris neque mauris, efficitur nec venenatis sit amet, fringilla in lacus. In ultricies, mauris vel luctus porta, orci dui venenatis nisl, eget maximus ante justo nec sapien. Duis faucibus lobortis erat, et placerat augue maximus id.
          </div>
          <input
            type="text"
            placeholder="Saisir du nom de l'équipe ici"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
        </div>
        <div className="col-span-2">
          {/* Chronomètre */}
          <div className="flex items-center justify-center h-full border-1">
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
              {["astronaut", "computer", "mars", "moon", "planet", "plant", "rocket", "station"].map((iconName) => (
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
                    {shapeName === "circle" ? "●" : shapeName === "square" ? "■" : "▲"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Choisir couleur de texte :</h3>
            <CirclePicker
              color={backgroundColor}
              onChange={(color) => setBackgroundColor(color.hex)}
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-10">
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Choisir une image de fond :</h3>
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
              {/* Bouton de validation */}
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
          {/* Aperçu */}
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
  );
};

export default TeamPatch;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
