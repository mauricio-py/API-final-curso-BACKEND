const knex = require('../conexao/pdv')

const verificaEmailExiste = async(req, res, next) => {
    const {email} = req.body

    try {        
        const usuario = await knex.from('usuarios').where('email', email).first()

        if (!usuario) {
            return next()  
        } 
        
        return res.status(400).json({mensagem:'O email já foi cadastrado'})  
        
    } catch(error) {
        res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
}

module.exports = verificaEmailExiste