const knex = require('../conexao/pdv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const senhaJwt = require('../senha/senhaJwt')

const login = async (req, res) => {
    const {email, senha} = req.body;
    
    try {
        const usuario = await knex.from('usuarios').where('email',email).first()
        
        if (!usuario) {
            return res.status(404).json({mensagem: 'Email ou senha está incorreto'})
        } 

        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            return res.status(400).json({mensagem: 'Email ou senha está incorreto'})
        }

        const token = jwt.sign({id: usuario.id}, senhaJwt, {expiresIn: '8h'})

        const {senha: _, ...usuarioLogado} = usuario
        
        return res.json({usuario: usuarioLogado, token})
    } catch(error) {
        res.status(500).json('Erro interno do servidor')
    }
}

module.exports = login