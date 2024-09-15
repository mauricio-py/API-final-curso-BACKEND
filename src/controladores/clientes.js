const knex = require('../conexao/pdv')

const cadastrarCliente = async (req, res) => {
    const {nome, email, cpf} = req.body    

    try {
        await knex('clientes').insert({
            nome,
            email,
            cpf
        });
        
        return res.status(201).json({mensagem: 'Cliente cadastrado'})        
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

const editarCliente = async (req, res) => {
    const {nome, email, cpf} = req.body 
    const {id} = req.params   

    try {
        const buscaCliente = await knex('clientes').where({id}).first()

        if (!buscaCliente) {
            return res.status(404).json('Cliente não está cadastrado')
        }

        await knex('clientes').where({id}).update({
            nome,
            email,
            cpf
        });
        
        return res.status(201).json({mensagem: 'Cliente Editado'})        
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

const listarCliente = async (req, res) => {    
    try {
        const listaClientes = await knex('clientes').returning('*')

        return res.json(listaClientes)
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

const detalharCliente = async (req, res) => { 
    const {id} = req.params

    try {
        const buscaCliente = await knex('clientes').where({id}).first()

        if (!buscaCliente) {
            return res.status(404).json('Cliente não está cadastrado')
        }

        return res.json(buscaCliente)
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

module.exports = {
    cadastrarCliente,
    editarCliente,
    listarCliente,
    detalharCliente
}