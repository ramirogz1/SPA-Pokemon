import axios from 'axios'

export function getPokemons() {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type:'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function filterPokemonsByStatus(payload){
    return {
        type:'FILTER_BY_STATUS',
        payload

    }
    
}

export function filterCreated (payload) {
return {
    type:'FILTER_CREATED',
    payload
}
}

export function orderByName(payload) {
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}