/* eslint-disable require-jsdoc */
import Produto from '../models/produto.model.js';

async function createProduto(produto) {
  try {
    return await Produto.create(produto);
  } catch (err) {
    throw err;
  }
}

async function getProdutoByCodigo(codigo) {
  try {
    return await Produto.findByPk(codigo);
  } catch (err) {
    throw err;
  }
}

async function deleteProduto(codigo) {
  try {
    return await Produto.destroy({
      where: {
        codigo,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function updateProduto(produto) {
  try {
    const p = await Produto.findByPk(produto.codigo);
    p.descricao = produto.descricao;
    p.preco = produto.preco;
    await p.save();
    // p.update();
    return p;
  } catch (err) {
    throw err;
  }
}

async function listarProdutos() {
  try {
    return await Produto.findAll();
  } catch (error) {
    throw error;
  }
}

export default {createProduto,
  updateProduto,
  getProdutoByCodigo,
  deleteProduto,
  listarProdutos};
