import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postPokemon, getTypes, getPokemons } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./PokemonCreate.css";

// function validate (input) {
//   let errors =[]
//   if(!name) {
//     errors.name= 'Se requiere nombre'
//   }else if (!input.hp){
//     errors.hp= 'Se requiere hp'
//   }
// }

export default function PokemonCreate() {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const [input, setInput] = useState({
    name: "",
    image: "",
    hp:"",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      [e.target.image]: e.target.value,
      [e.target.hp]: e.target.value,
      [e.target.attack]: e.target.value,
      [e.target.defense]: e.target.value,
      [e.target.speed]: e.target.value,
      [e.target.height]: e.target.value,
      [e.target.weight]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types:
        input.types.length < 2
          ? input.types.includes(e.target.value)
            ? input.types
            : [...input.types, e.target.value]
          : input.types,
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // formulario para controlar
    // control de nombre
    if (input.name.trim() === "") {
      return alert("Debe ingresar un nombre");
    } else if (
      pokemons.find(
        (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
      )
    ) {
      return alert(`El nombre ${input.name} ya existe.`);
      // control salud hp
    } else if (
      input.hp.trim() === "" || 
      input.hp < 1 || 
      input.hp > 100) {
      return alert("El Puntaje de Vida debe ser entre 1 o 100.");
      // control de ataque
    } else if (
      input.attack.trim() === "" ||
      input.attack < 1 ||
      input.attack > 100
    ) {
      return alert("Coloca un Puntaje de Ataque entre 1 a 100.");

      // control de defensa
    } else if (
      input.defense.trim() === "" ||
      input.defense < 1 ||
      input.defense > 100
    ) {
      return alert("Coloca un Puntaje de Defensa entre 1 a 100.");
      // control de velocidad
    } else if (
      input.speed.trim() === "" ||
      input.speed < 1 ||
      input.speed > 100
    ) {
      return alert("Coloca un Puntaje de Velocidad entre 1 a 100.");
      // control de altura
    } else if (
      input.height.trim() === "" ||
      input.height < 0.1 ||
      input.height > 20
    ) {
      return alert("Coloca un Puntaje de Altura(metros) entre  0.1 a 20.");
      // control de peso
    } else if (
      input.weight.trim() === "" ||
      input.weight < 0.1 ||
      input.weight > 1000
    ) {
      return alert(
        "Coloca un Puntaje de Peso(en kilogramos) entre 0.1 a 1000."
      );
      //control de tipos de pokemon que se selecionara
    } else if (input.types.length === 0) {
      return alert("Seleccion 1 o más tipos");
    } else {
      dispatch(postPokemon(input));
      alert("Pokemon Created !! 😄");
      setInput({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
      });
      document.getElementById("formulario").reset();
    }
  }

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className="fondoCreated">
      <div>
        <h1>Create your Pokemon</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} id="formulario">
        <div className="formCreate">
          <div>
            <label htmlFor="validationDefault01">Name</label>
            <input
              type="text"
              value={input.name}
              name="name"
              placeholder="Pokemon name"
              id="validationDefault01"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type="text"
              value={input.image}
              name="image"
              placeholder="URL"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>HP</label>
            <input
              type="number"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Attack</label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Defense</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Speed</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Height</label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Weight</label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <div>
              <label htmlFor="">Types (max 2)</label>

              <select
                onChange={(e) => handleSelect(e)}
                className=" form-select-sm m"
               
              >
                {types.map((t) => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </select>
              {/* <ul>
              {input.types.map((el) => el + ", ")}
            </ul> */}
            </div>
            {input.types.map((el) => (
              <div key={el} className="selectType">
                <p>{el}</p>
                <div>


                <button
                  onClick={() => handleDelete(el)}
                  type="button"
                  className="btn btn-danger"
                >
                  x
                </button>
                </div>
              </div>
            ))}

            <button type="submit" className="btn btn-warning">
              Create Pokemon
            </button>
          </div>
        </div>
      </form>

      <Link to={"/home"}>
        <button type="button" className="btn btn-danger">
          Back
        </button>
      </Link>
    </div>
  );
}
