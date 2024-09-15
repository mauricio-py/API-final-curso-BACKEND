const knex = require('../conexao/pdv')
const bcrypt = require('bcrypt')

const cadastrarUsuarios = async (req, res) => {
    const { nome, email, senha } = req.body
        
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const novoUsuario = {
            email: email,
            nome: nome,
            senha: senhaCriptografada
        }

        const usuarioCadatrado = await knex('usuarios').insert(novoUsuario).returning('*')

        res.status(201).json(usuarioCadatrado)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

const listarPerfil = async (req, res) => {
    return res.json(req.usuario);

}

const editarPerfil = async (req, res) => {
    const { nome, email, senha } = req.body
    const { id } = req.usuario

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        
        const usuarioLogado = {
            email: email,
            nome: nome,
            senha: senhaCriptografada
        }

        const usuarioEditado = await knex('usuarios').update(usuarioLogado).where('id', id).returning('*')

        res.status(201).json(usuarioEditado)
    } catch (error) {
        res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
}

module.exports = {
    cadastrarUsuarios,
    listarPerfil,
    editarPerfil
}