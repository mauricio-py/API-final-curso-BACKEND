const knex = require('../conexao/pdv')

const listarCategorias = async (req, res) => {
    try {
        const lista = await knex('categorias')
    
        res.status(200).json(lista)
    }  catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

module.exports = listarCategorias