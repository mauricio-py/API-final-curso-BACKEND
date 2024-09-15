const jwt = require('jsonwebtoken')
const senhaJwt = require('../senha/senhaJwt')
const knex = require('../conexao/pdv')

const verificaToken = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({mensagem: 'Não autorizado'})
    }

    const token = authorization.split(' ')[1]
    
    try {
        const { id } = jwt.verify(token, senhaJwt)
        
        const usuario = await knex('usuarios').where('id', id).first()
        
        if (!usuario) {
            return res.status(401).json({mensagem: 'Não autorizado'})
        }
        
        req.usuario = usuario

        return next()
    } catch(error) {
        res.status(401).json({mensagem: 'Não autorizado'})
    }
}

module.exports = verificaToken