const express = require('express')
const con = require('../db')

const cadastrar=(req, res)=>{
    const {usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto}=req.body
    const query='insert into evento (usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto) values (?, ?, ?, ?, ?, ?)'
    con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto], (err, results)=>{
        if(err) {
            console.error(err)
            res.status(500).json({error: 'erro ao cadastrar evento' })
        } else {
            res.status(201).json({message: 'evento cadastrado com sucesso', results})
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

const alterar=(req, res)=>{
    const {usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto}=req.body
    try{
        const sql='UPDATE evento SET usuarioId=?, cidade=?, tipoEvento=?, temperaturaMaxima=?, data=?, nivelImpacto=? WHERE id=?;'
        const id = Number(req.params.id)
        con.query(sql, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, id], (err, results)=>{
            if(err){
                console.error(err)
                res.status(500).json({error:'erro ao alterar evento'})
            }else if(results.affectedRows === 0) {
                res.status(404).json({error: 'evento não encontrado'})
            }else{
                const novoEvento={...req.body, id}
                res.status(200).json({ message: 'evento alterado com sucesso', evento: novoEvento})
            }
        })

    }
    catch (error) {
        console.error(error)
        res.status(400).json({error: 'erro ao alterar evento'})
    }
}

const excluir=(req,res)=>{
    const {id}= req.params

    const query='DELETE FROM evento WHERE id = ?;'
    con.query(query, [id], (err, results)=>{
        if(err){
            console.error(err)
            res.status(500).json({error:'erro ao excluir evento'})
        }else if(results.affectedRows === 0) {
            res.status(404).json({error: 'evento não encontrado'})
        }else{
            res.json({message: 'evento excluido com sucesso'})
        }
    })
}

const resumo=(req, res)=>{
    const sql = 'SELECT AVG(temperatura) FROM evento;'
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
    cadastrar,
    alterar,
    excluir,
    resumo
}