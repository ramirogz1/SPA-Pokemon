const { Router } = require("express");
const  getAllPokemon  = require("../controllers/pokemonControllers");
const { Pokemon, Type } = require("../db");
//const { route } = require(".")

const router = Router();

router.get("/", async (req, res) => {
 
  const { name } = req.query;
  try {
    let pokemonesTotal = await getAllPokemon();

    if (name) {
      let pokemonName = await pokemonesTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLocaleLowerCase())
      );
      pokemonName.length ? res.status(200).send(pokemonName): res.status(404).send('No existe este Pokemon')
    }else {
        res.status(200).send(pokemonesTotal)
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = router


