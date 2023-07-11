import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
//import { match } from 'assert'
import "./Detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myPokemon = useSelector((state) => state.detail);
  return (
    <div className="containerDetail">
      {myPokemon ? (
        <div className="generalDetail">
          <div className="namePokemon">
            <h1>{myPokemon.name}</h1>
          </div>

          <div className="detailImage">
            <img src={myPokemon.image} />
          </div>
          <div className="detailPokemon">
           <h4>Health Points ❤:  {myPokemon.hp} </h4>
            <h4>Attack 💥: {myPokemon.attack}</h4>
            <h4>Defense 🛡: {myPokemon.defense}</h4>
            <h4>Speed 🏃‍♂️: {myPokemon.speed}</h4>
            <h4>Height ⏫: {myPokemon.height}</h4>
            <h4>Weight ⚖: {myPokemon.weight}</h4>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button type="button" className="btn btn-danger btn-lg p-2 mb-4">
          ⬅ Back
        </button>
      </Link>
    </div>
  );
}
