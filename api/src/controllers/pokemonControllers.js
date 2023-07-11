 const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getApiInfo = async () => {
  try {
    const arrPokemon = [];
    const pokemonApi = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=40"
    );
    const pokemonUrl = pokemonApi.data.results.map((p) => p.url);

    await Promise.all(pokemonUrl.map((u) => axios.get(u)))
      .then((value) => {
        value.map((p) =>
          arrPokemon.push({
            id: p.data.id,
            name: p.data.name,
            image: p.data.sprites.other["official-artwork"].front_default,
            hp: p.data.stats[0].base_stat,
            attack: p.data.stats[1].base_stat,
            defense: p.data.stats[2].base_stat,
            speed: p.data.stats[5].base_stat,
            height: p.data.height,
            weight: p.data.weight,
            types: p.data.types.map((t) => t.type.name),
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    return arrPokemon;
  } catch (error) {
    console.log("Error en getApiInfo: ", error);
  }
};

const getDbInfo = async () => {
  try {
    const infoDb = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const mapInfoDb = infoDb.map((p) => {
      return {
        id: p.id,
        name: p.name,
        image: p.image,
        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        speed: p.speed,
        height: p.height,
        weight: p.weight,
        types: p.types.map((t) => t.name),
        createdInDb: p.createdInDb,
      };
    });
    return mapInfoDb;
  } catch (error) {
    console.log("Error en getDbInfo: ", error);
  }
};

const getAllPokemon = async() => {
    let apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}

module.exports = getAllPokemon

// // const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20")
// // const apiInfo = await apiUrl.data.results.map(el => {
// //     return{
// //         name: el.name

// //     }
// // })
