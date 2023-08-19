import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    const json = await axios.get("/pokemons");
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

// export function filterPokemonsByStatus(payload) {
//   return {
//     type: "FILTER_BY_STATUS",
//     payload,
//   };
// }

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/pokemons?name=" + name);
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      console.log("error en el getNamePokemons", error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    var info = await axios("/types");
   
    return dispatch({ type: "GET_TYPES", payload: info.data });
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "/pokemons",
      payload
    );
    return response;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get("/pokemons/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      })
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterPokemonByType(payload) {
  
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}
