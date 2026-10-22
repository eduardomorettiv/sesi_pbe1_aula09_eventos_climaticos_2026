const express = require('express')
const con = require('../db');

const cadastrar=(req, res)=>{
    const {nome, email, senha}=req.body
    const query='insert into usuario (nome, email, senha) values (?, ?, password(?))';
    con.query(query, [nome, email, senha], (err, results)=>{
        if(err) {
            console.error(err)
            res.status(500).json({error: 'erro ao cadastrar usuario' })
        } else {
            console.log(results)
            res.status(201).json({message: 'usuário cadastrado com sucesso', results})
        }
    })
}

const listar=(req,res)=>{
    const query = 'SELECT * FROM usuario;'
    con.query(query, (err, results)=>{
        if(err){
            console.error(err)
            res.status(500).json({error: 'erro ao buscar usuários'})
        } else{
            return res.status(200).json(results)
        }
    })
}

const alterar=(req, res)=>{
    const {nome, email, senha}=req.body
    try{
        const sql='UPDATE usuario SET nome=?, email=?, senha=password(?) WHERE id=?;'
        con.query(sql, [nome, email, senha, Number(req.params.id)], (err, results)=>{
            if(err){
                console.error(err)
                res.status(500).json({error:'erro ao alterar o usuario'})
            }else{
                const novoUsuario=req.body
                novoUsuario.id=results.insertId
                res.status(202).json({ message: 'usuario alterado com sucesso', user: novoUsuario})
            }
        })

    }
    catch (error) {
        console.error(error)
        res.status(400).json({error: 'erro ao alterar usuario', details: 'informe {nome, email, senha}'})
    }
}

const excluir = (req, res) => {
    const { id } = req.params

    const query = 'DELETE FROM usuario WHERE id = ?;'
    con.query(query, [id], (err, results) => {
        if(err){
            console.error(err)
            res.status(500).json({ error: 'erro ao excluir o usuario' })
        } else if(results.affectedRows === 0) {
            res.status(404).json({error: 'esse id de usuario não existe'})
        } else{
            res.json({message: 'usuario excluido com sucesso'})
        }
    })
}

module.exports = {
    listar,
    cadastrar,
    alterar,
    excluir
}