const knex = require('../conexao/pdv')

const verificaCpf = async (req, res, next) => {
    const {cpf} = req.body

    try {
        const cpfCliente = await knex('clientes').where({cpf}).first()

        if(!cpfCliente) {
            return next()
        }

        return res.status(400).json('O cpf já foi cadastrado')
        
    } catch(error) {
        res.staus(500).json({mensagem: 'Erro interno do servidor'})
    }
}

module.exports = verificaCpf