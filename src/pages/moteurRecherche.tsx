import React, { useState } from 'react';

const FakeSearchEngine: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler une recherche avec des résultats fictifs
    const fakeResults = [
      `Résultat pour "${query}" - 1`,
      `Résultat pour "${query}" - 2`,
      `Résultat pour "${query}" - 3`,
      `Résultat pour "${query}" - 4`,
      `Résultat pour "${query}" - 5`,
    ];
    setResults(fakeResults);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-100" style={{ backgroundImage: "url('/backgrounds/5473889.jpg')",width:'100%', backgroundSize: "cover", backgroundPosition: "center", }}>
      <h1 className="text-white text-4xl font-bold mb-4">Moteur de recherche fictif</h1>
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tapez votre recherche..."
          className="p-2 rounded-l-lg border border-purple-500"
        />
        <button type="submit" className="bg-purple-500 text-white p-2 rounded-r-lg hover:bg-purple-600 transition duration-300">
          Rechercher
        </button>
      </form>
      <div className="flex flex-col items-center">
        {results.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-black text-xl font-bold mb-2">Résultats de recherche :</h2>
            <ul className="list-disc pl-5">
              {results.map((result, index) => (
                <li key={index} className="text-black">{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeSearchEngine;
