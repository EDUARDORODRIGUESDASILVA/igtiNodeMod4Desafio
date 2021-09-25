/* eslint-disable require-jsdoc */
import produtoRepository from '../repositories/produto.repository.js';

async function createProduto(produto) {
  return await produtoRepository.createProduto(produto);
}

async function updateProduto(produto) {
  return await produtoRepository.updateProduto(produto);
}
async function getProdutoByCodigo(codigo) {
  return await produtoRepository.getProdutoByCodigo(codigo);
}

async function getAllProducts() {
  return await produtoRepository.listarProdutos();
}

async function deleteProdutoByCodigo(codigo) {
  return await produtoRepository.deleteProduto(codigo);
}

export default {createProduto,
  updateProduto,
  getProdutoByCodigo,
  deleteProdutoByCodigo,
  getAllProducts};
