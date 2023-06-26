//const { router } = require('../app')
const {Type} = require('../db')
const {Router} =require('express')

const router = Router()

router.get('/', async(req,res)=> {
    try {
        const pokemonType = await Type.findAll();
        res.status(200).send(pokemonType)
        
    } catch (error) {
        console.log('error en pokemonType',error)
    }
})

module.exports= router