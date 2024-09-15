const knex = require('../conexao/pdv')

const verificaCategoria = async (req, res, next) => {
    const { categoria_id } = req.body

    try {
        const categoriaCadastrada = await knex('categorias').where('id', categoria_id).first()
        
        if (!categoriaCadastrada) {
            return res.status(400).json('A categoria não foi encontrado')
        }
        
        return next()
    } catch(error) {
        res.status(500).json({mensagem: 'Erro interno do servidor'})
    }
}

module.exports = verificaCategoria