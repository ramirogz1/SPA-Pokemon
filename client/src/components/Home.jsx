import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterCreated ,orderByName } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./Home.css";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const [orden,setOrden] = useState('')
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonesPerPage, setCurrentPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonesPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonesPerPage;
  const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  function handleFilterCreated (e) {
    dispatch(filterCreated(e.target.value))

    
  }

  function handleSort(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }
  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getPokemons());
  // }

  // function handleFilterStatus(e) {
  //   dispatch(filterPokemonsByStatus(e.target.value));
  // }

  return (
    <div className="fondoHome">
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/home">POKEMON-SPA</a>
    <button className="navbar-toggler mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon mb-1"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <select className="form-select" aria-label="Default select example"  defaultValue="Types">
  <option>Types</option>
  <option value="All">All</option>
  
</select>
        </li>
        <li>
          <select className="form-select" aria-label="Default select example" defaultValue="Order" onChange={(e)=>handleSort(e)}>
            <option>Orden</option>
            <option value='asc'>A-Z</option>
            <option value='des'>Z-A</option>

          </select>
        </li>
        <li>
          <select className="form-select" aria-label="Default select example" defaultValue="Origin" onChange={e=>handleFilterCreated(e)}>
      <option>Orgin</option>
      <option value='All'>All</option>
      <option value='api'>API</option>
      <option value='created'>Created</option>

          </select>
        </li>
        <li>
          <select className="form-select" aria-label="Default select example" defaultValue="Attack">
          <option>Attack</option>
          <option>High</option>
          <option>Low</option>
          </select>
        </li>
        
      </ul>
      <Link to={"/pokemons"}>
                  <button type="button" className="btn btn-dark buttonCrear me-2 ">
                    Create Pokemon
                  </button>
                </Link>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
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
              <Card
                key={el.id}
                name={el.name}
                image={el.image}
                types={el.types}
                attack={el.attack}
              />
            );
          })}
      </div>
      <Paginado
        pokemonesPerPage={pokemonesPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
      />
      <footer>
        Ramiro 
      </footer>
    </div>
  );
}
