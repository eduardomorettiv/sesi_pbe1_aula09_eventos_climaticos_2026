const express = require('express')
const con = require('../db')

const cadastrar=(req, res)=>{
    const {cidade, tipoEvento, temperaturaMaxima}=req.body
    const query='insert into usuario (nome, email, senha) values (?, ?, password(?))';
    con.query(query, [nome, email, senha], (err, results)=>{
        if(err) {
            console.error(err)
            res.status(500).json({error: 'erro ao cadastrar usuario' })
        } else {
            res.status(201).json({message: 'usuário cadastrado com sucesso', results})
        }
    })
}

const listar=(req,res)=>{
    const query = 'SELECT * FROM evento;'
    con.query(query, (err, results)=>{
        if(err){
            console.error(err)
            res.status(500).json({error: 'erro ao buscar usuários'})
        } else{
            res.json(results)
        }
    })
}

module.exports = {
    listar,
    cadastrar
}