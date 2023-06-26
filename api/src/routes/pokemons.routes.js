const { Router } = require("express");
const getAllPokemon = require("../controllers/pokemonControllers");
const { Pokemon, Type } = require("../db");
//const { route } = require(".")

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    let pokemonesTotal = await getAllPokemon();

    if (name) {
      let pokemonName = pokemonesTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLocaleLowerCase())
      );
      pokemonName.length
        ? res.status(200).send(pokemonName)
        : res.status(404).send("No existe este Pokemon");
    } else {
      res.status(200).send(pokemonesTotal);
    }
  } catch (error) {
    console.log(error);
  }
});

//router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      createdInDb,
    } = req.body;

    const pokemonCreated = await Pokemon.create({
      name,
      image:
        image ||
        "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      
      createdInDb,
    });

    const typeDb = await Type.findAll({
      where: { name: types },
    });

    pokemonCreated.addType(typeDb);
    res.status(200).send("Pokemon Creado con exito");
  } catch (error) {
    console.log("error al crear pokemon", error);
  }
});

module.exports = router;
