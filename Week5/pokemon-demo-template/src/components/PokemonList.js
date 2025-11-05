import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import PokemonCard from "./PokemonCard";
function PokemonList() {

  const [pokemons, setPokemons] = useState([]);

  function fetchPokemons() {
    // Fetch the list of Pokemons from the PokeAPI
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=800")
      .then(response => {
        setPokemons(response.data.results);
      })
      .catch(error => {
        console.error("Error fetching Pokemons:", error);
      });
  }

  useEffect(() => {
    fetchPokemons();
  }, []);


  return (
    <Grid container justifyContect="center"> 
      {pokemons.map((pokemon, index) =>
        <PokemonCard key={pokemon.name} pokemon={pokemon} index={index + 1} />
      )}
    </Grid>
  );
}

export default PokemonList;