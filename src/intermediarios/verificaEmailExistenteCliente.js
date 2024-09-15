const knex = require('../conexao/pdv')

const verificaEmailExisteCliente = async(req, res, next) => {
    const {email} = req.body

    try {        
        const cliente = await knex.from('clientes').where('email', email).first()

        if (!cliente) {
            return next()  
        } 
        
        return res.status(400).json({mensagem:'O email já foi cadastrado'})  
        
    } catch(error) {
        res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
}

module.exports = verificaEmailExisteCliente