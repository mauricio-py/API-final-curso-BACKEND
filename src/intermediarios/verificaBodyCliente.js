const camposObrigatoriosCliente = (req, res, next) => {
    const {nome, email, cpf} = req.body

    if (!nome || !email || !cpf) {
        res.status(403).json({mensagem: 'Todos os campos são obrigatorios'})
    }

    next()
}

module.exports = camposObrigatoriosCliente