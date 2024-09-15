const camposObrigatoriosProduto = (req, res, next) => {
    const { descricao, quantidade_estoque, valor, categoria_id} = req.body

    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
        return res.status(400).json({mensagem: 'Todos os campos são obrigatorios'})
    }

    return next()
}

module.exports = camposObrigatoriosProduto