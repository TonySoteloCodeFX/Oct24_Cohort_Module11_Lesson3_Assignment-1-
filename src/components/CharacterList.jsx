import React, { useEffect, useState } from "react";
import axios from "axios";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 100; //----------------------------------------- Number of Pokémon per page

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        
        const initialResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0");
        const totalPokemon = initialResponse.data.count;

        
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}`);
        const results = response.data.results;

        
        const characterData = await Promise.all(
          results.map(async (character) => {
            const characterDetails = await axios.get(character.url);
            return {
              id: characterDetails.data.id,
              name: characterDetails.data.name,
              image: characterDetails.data.sprites.front_default,
            };
          })
        );

        setCharacters(characterData);
      } catch (err) {
        console.error("Error while fetching:", err);
        setError("Failed to fetch Pokémon. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCharacters = characters.slice(startIndex, endIndex);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {displayedCharacters.map((character) => (
          <div
            key={character.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <img src={character.image} alt={character.name} style={{ width: "100px", height: "100px" }} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            cursor: currentPage === 0 ? "not-allowed" : "pointer",
          }}
        >
          ◀ Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => (endIndex < characters.length ? prev + 1 : prev))}
          disabled={endIndex >= characters.length}
          style={{
            padding: "8px 16px",
            cursor: endIndex >= characters.length ? "not-allowed" : "pointer",
          }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
