const camposObrigatoriosUsuario = (req, res, next) => {
    const {nome, email, senha} = req.body
    
    try {
        if (!nome || !email || !senha) {
            return res.status(400).json('Todos os campos são obrigatorios')
        }

        next()

    } catch (error) {
        res.status(500).json('Erro interno do servidor')
    }
}

module.exports = camposObrigatoriosUsuario