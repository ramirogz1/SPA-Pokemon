const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    // case "FILTER_BY_STATUS":
    //   const allPokemons = state.allPokemons;
    //   const statusFiltered =
    //     action.payload === "All"
    //       ? allPokemons
    //       : allPokemons.filter((el) => el.status === action.payload);
    //   return {
    //     ...state,
    //     pokemons: statusFiltered,
    //   };

    case "FILTER_CREATED":
      const allPokemons2 = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemons2.filter((el) => el.createdInDb)
          : allPokemons2.filter((el) => !el.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr,
      };

    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "ORDER_BY_ATTACK":
      const sortedArrAttack =
        action.payload === "low"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : action.payload === "high"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            })
          : state.pokemons;
      return {
        ...state,
        pokemons: sortedArrAttack,
      };

    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      
      const typesFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((p) => p.types?.includes(action.payload));
          
      return {
        ...state,
        pokemons: typesFiltered,
      };
     

    default:
      return state;
  }
}

export default rootReducer;
