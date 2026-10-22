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
router.put('/usuarios/:id', Usuario.alterar)
router.delete('/usuarios/:id', Usuario.excluir)

router.get('/eventos', evento.listar)
router.post('/eventos', evento.cadastrar)
router.put('/eventos/:id', evento.alterar)
router.delete('/eventos/:id', evento.excluir)

module.exports = router