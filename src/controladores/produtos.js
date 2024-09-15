const knex = require('../conexao/pdv')

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {  
        if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser preenchidos.' });
        }
        
        await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
        });
        
        return res.status(201).json({mensagem: 'Produto cadastrado'})
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

const editarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id} = req.body
    const { id } = req.params

    try {        
        const produtoEditado = await knex('produtos').where({id}).update({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        })

        res.status(201).json({mensagem: 'Produto editado'})
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

const listarProduto = async (req, res) => {
    const {categoria_id} = req.body
    
    try {
        if(!categoria_id) {
            const listaDeProdutos = await knex('produtos').returning('*')
            res.json(listaDeProdutos)
        }

        const listaDeProdutos = await knex('produtos').where({id: categoria_id}).first()

        res.json(listaDeProdutos)        
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

const detalharProduto = async (req, res) => {
    const {id} = req.params

    try {
        const produtoEscolhido = await knex('produtos').where({id}).first()

        if (!produtoEscolhido) {
            res.status(404).json({mensagem: 'Produto não foi encontrado'})
        }           

        res.json(produtoEscolhido)         
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

const excluirProduto = async (req, res) => {
    const {id} = req.params

    try {
        const produtoEscolhido = await knex('produtos').where({id}).first()

        if (!produtoEscolhido) {
            res.status(404).json({mensagem: 'Produto não foi encontrado'})
        }           

        await knex('produtos').where({ id }).del()

        res.json({mensagem: 'Produto deletado'})         
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProduto,
    detalharProduto,
    excluirProduto
}