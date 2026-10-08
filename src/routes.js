const express = require("express")
const router = express.Router()

const Usuario= require('./controllers/usuario')
const evento= require('./controllers/evento')

const rotaInicial = (req, res) => {
    res.json("Back-end eventos climaticos respondendo")
}

router.get('/',rotaInicial)
router.get('/usuarios', Usuario.listar)
router.post('/usuarios', Usuario.cadastrar)
router.get('/eventos', evento.listar)
router.post('/eventos', evento.cadastrar)

module.exports = router