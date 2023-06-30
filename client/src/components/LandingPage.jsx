import React from "react";
import { Link } from "react-router-dom";
import { CgPokemon } from "react-icons/cg";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>
        Pokemon-SPA <CgPokemon />
      </h1>
      <Link to="/home">
      <button type="button" className="btn btn-danger btn-lg">Ingresar</button>
      </Link>
    </div>
  );
}
