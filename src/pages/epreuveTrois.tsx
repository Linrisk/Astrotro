import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Module3Page: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(1200); // 20 minutes
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: "url('/backgrounds/5473889.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width:'100%'
      }}
    >
      <h1 className="text-white text-4xl font-bold mb-2">Module 3</h1>
      <div className="flex items-center justify-center bg-black bg-opacity-50 p-2 rounded">
        <span className="text-white text-3xl font-bold">{formatTime(seconds)}</span>
      </div>
      <h2 className="text-white text-xl font-semibold mt-4">Esprit Critique</h2>
      <button  onClick={() => router.push("/explicationsepreuveTrois")}
      className="bg-purple-500 text-white p-3 rounded mt-2 hover:bg-purple-600 transition duration-300">
        C'est tipar ?
      </button>
      <p className="text-white text-lg mt-4">Explications etc.</p>
    </div>
  );
};

export default Module3Page;
