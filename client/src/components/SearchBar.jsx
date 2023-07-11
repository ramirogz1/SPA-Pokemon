import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNamePokemons } from '../actions'

export default function SearchBar() {
 const dispatch = useDispatch()
const [name,setName] = useState("")

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNamePokemons(name))
}

return(
    <div>
        <form className="d-flex" role="search">
        <input  className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
       
      
        onChange={(e)=> handleInputChange(e)}
        
        />
        <button className="btn btn-outline-success" type="submit" onClick={(e)=>handleSubmit(e)} >Search</button>
        </form>
    </div>
)


 
}

