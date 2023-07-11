import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import './App.css'
import PokemonCreate from './components/PokemonCreate'
import Detail from './components/Detail'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/pokemon" element={<PokemonCreate/>}/>
        <Route exact path="/home/:id" element= {<Detail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
