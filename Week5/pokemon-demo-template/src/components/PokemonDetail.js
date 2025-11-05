import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

function PokemonDetail() {

  const {name} = useParams();
  const [pokemon, setPokemon] = useState(null);
  const {theme} = useContext(ThemeContext);

  function fetchPokemonDetail(){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        console.error("Error fetching Pokemon detail:", error);
      });
  }

  useEffect(() => {
    fetchPokemonDetail();
  }, []);

  if(!pokemon){
    return <CircularProgress />;
  }

  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <Box>
      <img src={imageUrl} alt={name} style={{ maxWidth: '300px', width: '100%', borderRadius: "8px" }}/>
      <Typography variant="h2" gutterBottom>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>

      <Box>
        {pokemon.types.map((typeInfo) => (
          <Chip key={typeInfo.type.name} label={typeInfo.type.name.toUpperCase()} sx={{backgroundColor: "#8ecae6"}}/>
        ))}
      </Box>
    </Box>
  );
}

export default PokemonDetail;