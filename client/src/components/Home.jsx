import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterCreated,
  orderByName,
  orderByAttack,
  filterPokemonByType,
  getTypes,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./Home.css";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import pikachu from "../assets/pikachu.gif";

export default function Home() {
  const dispatch = useDispatch();
  const [orden, setOrden] = useState("");
  const allTypes = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonesPerPage, setCurrentPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonesPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonesPerPage;
  const currentPokemon = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const [loading, setLoading] = useState(true);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons())
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(getTypes());
  }, [dispatch]);

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleSort2(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleFilterType(e) {
    dispatch(filterPokemonByType(e.target.value));
    setCurrentPage(1);
  }

  if (loading) {
    return (
      <div className="loading">
        <img
          className="imgLoading"
          src={pikachu}
          alt="no hay imagen"
          width="200px"
          height="200px"
        />
        {/* <p>Loading...</p> */}
      </div>
    );
  }

  return (
    <div className="fondoHome">
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            POKEMON-SPA
          </a>
          <button
            className="navbar-toggler mb-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon mb-1"></span>
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item ">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  defaultValue="Types"
                  onChange={(e) => handleFilterType(e)}
                >
                  <option disabled>Types</option>
                  <option value="All">All</option>
                  {allTypes.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue="Order"
                  onChange={(e) => handleSort(e)}
                >
                  <option disabled>Order</option>
                  <option value="asc">A-Z</option>
                  <option value="des">Z-A</option>
                </select>
              </li>
              <li>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue="Origin"
                  onChange={(e) => handleFilterCreated(e)}
                >
                  <option disabled>Origin</option>
                  <option value="All">All</option>
                  <option value="api">API</option>
                  <option value="created">Created</option>
                </select>
              </li>
              <li>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue="Attack"
                  onChange={(e) => handleSort2(e)}
                >
                  <option disabled>Attack</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </li>
            </ul>
            <Link to={"/pokemon"}>
              <button type="button" className="btn btn-dark buttonCrear me-2 ">
                Create Pokemon
              </button>
            </Link>
            <SearchBar />
          </div>
        </div>
      </nav>

      <Paginado
        pokemonesPerPage={pokemonesPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
      />

      <div className="fondoCard">
        {allPokemons &&
          currentPokemon?.map((el) => {
            return (
              <div key={el.id}>
                <Link to={"/home/" + el.id} key={el.id} className="link2">
                  <Card
                    key={el.id}
                    name={el.name}
                    image={el.image}
                    types={el.types}
                    attack={el.attack}
                  />
                </Link>
              </div>
            );
          })}
      </div>
      <Paginado
        pokemonesPerPage={pokemonesPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
      />
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">
          <p>© 2023 Pokemons-SPA. Todos los derechos reservados.</p>
          <p>Contacto:</p>
          <p>Correo electrónico: ramirogz101@gmail.com</p>
          <p>Teléfono: (+54)93855761208</p>
          <p> Linkedin: <a href="https://www.linkedin.com/in/ramirogonzalez94/" target="_blank">ramirogonzalez94</a></p>
        </div>
        <div>
          
        </div>
      </footer>
    </div>
  );
}
