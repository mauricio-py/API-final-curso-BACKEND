const express = require('express')
const rotas = express()

const listarCategorias = require('./controladores/categorias')

const login = require('./intermediarios/login')
const verificaToken = require('./intermediarios/verificaToken')
const camposObrigatoriosUsuario = require('./intermediarios/verificaBodyUsuario')
const verificaEmailExiste = require('./intermediarios/verificaEmailExiste')
const verificaCategoria = require('./intermediarios/verificaCategoria')
const camposObrigatoriosProduto = require('./intermediarios/verificaBodyProduto')
const camposObrigatoriosCliente = require('./intermediarios/verificaBodyCliente')
const verificaEmailExisteCliente = require('./intermediarios/verificaEmailExistenteCliente')
const verificaCpf = require('./intermediarios/verificaCpf')

const {
    cadastrarUsuarios, 
    listarPerfil, 
    editarPerfil
} = require('./controladores/usuarios')

const {
    cadastrarProduto,
    editarProduto,
    listarProduto,
    detalharProduto,
    excluirProduto
} = require('./controladores/produtos')

const {
    cadastrarCliente,
    editarCliente,
    listarCliente,
    detalharCliente
} = require('./controladores/clientes')

const {
    cadastrarPedido,
    listarPedido
} = require('./controladores/pedidos')

rotas.get('/categoria', listarCategorias)
rotas.post('/usuario', camposObrigatoriosUsuario, verificaEmailExiste, cadastrarUsuarios)
rotas.post('/login', login)

rotas.use(verificaToken)
rotas.get('/usuario', listarPerfil)
rotas.put('/usuario', camposObrigatoriosUsuario, verificaEmailExiste, editarPerfil)

rotas.post('/produto', camposObrigatoriosProduto, verificaCategoria, cadastrarProduto)
rotas.put('/produto/:id', camposObrigatoriosProduto, verificaCategoria, editarProduto)
rotas.get('/produto', listarProduto)
rotas.get('/produto/:id', detalharProduto)
rotas.delete('/produto/:id', excluirProduto)

rotas.post('/cliente', camposObrigatoriosCliente, verificaEmailExisteCliente, verificaCpf, cadastrarCliente)
rotas.put('/cliente/:id', camposObrigatoriosCliente, verificaEmailExisteCliente, verificaCpf, editarCliente)
rotas.get('/cliente', listarCliente)
rotas.get('/cliente/:id', detalharCliente)

rotas.post('/pedido', cadastrarPedido)

module.exports = rotas