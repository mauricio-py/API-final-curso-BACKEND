const knex = require('../conexao/pdv')
const transportador = require('../email')

const cadastrarPedido = async (req, res) => {
    const {cliente_id, observacao, pedido_produtos} = req.body

    try {
        if (!cliente_id || !observacao || pedido_produtos.length === 0) {
            return res.status(404).json({mensagem: 'Todos os campos são obrigatorios'})
        }        
        
        const usuario = await knex('clientes').where({ id: cliente_id }).first();

        if (!usuario) {
            return res.status(404).json({mensagem: 'Cliente não foi encontrado'})
        }

        const [pedido_id] = await knex('pedidos').insert({
            cliente_id,
            observacao,
        }).returning('id');

        for (const produtoPedido of pedido_produtos) {
            const { produto_id, quantidade_produto } = produtoPedido;
      
            const produtoExistente = await knex('produtos').where({ id: produto_id }).first();
      
            if (!produtoExistente) {
              return res.status(404).json({ error: `Produto com id ${produto_id} não encontrado.` });
            }

            if (quantidade_produto > produtoExistente.quantidade_estoque) {
              return res.status(400).json({ error: `Quantidade em estoque insuficiente para o produto ${produto_id}.` });
            }

            await knex('produtos').where({ id: produto_id }).decrement('quantidade_estoque', quantidade_produto);

            await knex('pedido_produtos').insert({
              pedido_id,
              produto_id,
              quantidade_produto,
              valor_produto: produtoExistente.valor,
            });
        }

        transportador.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${usuario.nome} <${usuario.email}>`,
            subject: 'Pedido cadastrado com sucesso.',
            text: 'Pedido cadastrado com sucesso.',
        })
      
        res.json({ success: true, message: 'Pedido cadastrado com sucesso.' });
    } catch(error) {
        return res.status(500).json({mensagem:"erro interno do sevidor"})
    }
}

module.exports = {
    cadastrarPedido,
}