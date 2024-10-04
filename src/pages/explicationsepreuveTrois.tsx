import React from 'react';
import { useRouter } from "next/router";

const TrueOrFalsePage: React.FC = () => {
    const router = useRouter();

  const statements = [
    {
      text: "Il y a de l'eau sur Mars.",
      icon: 'icons/planet.png', // Icon for Mars
    },
    {
      text: "Les hommes ne sont pas allés sur la Lune.",
      icon: 'icons/rocket.png', // Icon for Rocket
    },
    {
      text: "La Terre est plate et l'exploration spatiale est un mensonge.",
      icon: 'icons/moon.png', // Icon for Moon
    },
    {
      text: "L'ISS n'est pas visible depuis la Terre.",
      icon: 'icons/computer.png', // Icon for Computer
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: "url('/backgrounds/5473889.jpg')",
        width: '100%',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-white text-4xl font-bold mb-4">Vrai ou faux ?</h1>
      <div className="grid grid-cols-2 gap-4">
        {statements.map((statement, index) => (
          <div key={index} className="bg-purple-600 text-white p-6 rounded-lg flex flex-col items-center justify-center">
            <div className="mb-2">
              <img src={statement.icon} alt="icon" className="w-12 h-12"/>
            </div>
            <p className="text-center">{statement.text}</p>
          </div>
        ))}
      </div>
      <p className="text-white text-lg mt-4 text-center">
        Tu pourras revenir à tout moment à ces cartes dans ta barre d’astronaute. Clique sur l'icône correspondante à la carte et tu pourras remplir avec tes découvertes pour nous dire si c'est vrai ou faux.
      </p>
      <button  onClick={() => router.push("/moteurRecherche")} className="bg-purple-500 text-white p-3 rounded mt-4 hover:bg-purple-600 transition duration-300">
        C'est parti ?
      </button>
    </div>
  );
};

export default TrueOrFalsePage;
