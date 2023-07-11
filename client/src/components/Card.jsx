import React from "react";
import "./Card.css";

export default function Card({ name, image, types, attack}) {
  return (
    <div className="card">
      <img className="card-img-top" src={image} alt="img not found" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Type: {types+''}</p>
        <h6 className="card-title">Attack: {attack}</h6>
      </div>
    </div>

  );
}
