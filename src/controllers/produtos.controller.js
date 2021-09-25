/* eslint-disable require-jsdoc */
import produtoService from '../services/produto.service.js';
import {check, validationResult} from 'express-validator';

/* POST: realiza o cadastro de um novo produto e retorna o HTTP 201.
Caso já exista um  produto  com  o  mesmo  código,  os  dados  de
descrição  e  preço  deverão  ser atualizados  e  retornar  HTTP  200.
Caso  o payload  da  requisição  seja inválido,  um HTTP 400 deverá
ser retornado, juntamente com uma mensagem informando o(s)
erro(s) observado(s).  */

async function createOrUpdateProduct(req, res, next) {
  try {
    await check('codigo', 'Nome deve ser informado').notEmpty().run(req);
    await check('descricao',
        'descricao deve ser informada').notEmpty().run(req);
    await check('preco', 'preco deve ser informado').notEmpty().run(req);
    await check('preco', 'preco deve ser um número').isFloat().run(req);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.status(400).json({erros: result.array()});
      return;
    }

    const l = await produtoService.getProdutoByCodigo(req.body.codigo);

    if (!l) {
      const c = await produtoService.createProduto(req.body);
      res.status(201).json(c);
      return;
    } else {
      const c = await produtoService.updateProduto(req.body);
      res.status(200).json(c);
      return;
    }
  } catch (error) {
    global.logger.error({statusCode: 400, message: error});
    res.status(400).json({erro: 'Erro ao processar a requisição'});
    return;
  }
}
/* GET:  retorna  uma  lista  com  todos  os  registros
   de  produtos  encontrados  em  uma resposta com status HTTP 200.
*/
async function listProducts(req, res, next) {
  try {
    const c = await produtoService.getAllProducts();
    res.status(200).json(c);
    return;
  } catch (error) {
    global.logger.error({statusCode: 400, message: error});
    res.status(400).json({erro: 'Erro ao processar a requisição'});
    return;
  }
}
/* ATENÇÃO: não é necessário realizar a leitura para
um único registro.
 ...Apesar de não ser necessário...
*/
async function listProductByCodigo(req, res, next) {
  try {
    const codigo = req.params.codigo;
    if (!codigo) {
      res.status(400).json({erros: 'codigo não informado'});
      return;
    }
    const c = await produtoService.getProdutoByCodigo(codigo);

    res.status(200).json(c);
    return;
  } catch (error) {
    global.logger.error({statusCode: 400, message: error});
    res.status(400).json({erro: 'Erro ao processar a requisição'});
    return;
  }
}

/* PUT: os dados de descrição e preço deverão ser atualizados
 e retornar HTTP 200.Caso  o  payload  da  requisição  seja  inválido,
 um  HTTP  400  deverá  ser  retornado,juntamente  com  uma  mensagem
 informando  o(s)  erro(s)  observado(s).  Caso  não seja  encontrado
 um  produto  com  o  mesmo  código,  um  HTTP  405  deverá  ser retornado,
 juntamente com uma mensagem informando o(s) erro(s) observado(s). */

async function updateProduct(req, res, next) {
  try {
    await check('codigo', 'Nome deve ser informado').notEmpty().run(req);
    await check('descricao',
        'descricao deve ser informada').notEmpty().run(req);
    await check('preco', 'preco deve ser informado').notEmpty().run(req);
    await check('preco', 'preco deve ser um número').isFloat().run(req);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.status(400).json({erros: result.array()});
      return;
      // text and/or done have errors.
      // Errors in the token as validated in the
      // previous route are not accounted here.
    }
    const l = await produtoService.getProdutoByCodigo(req.body.codigo);
    if (!l) {
      res.status(405).json({erros: 'Produto não localizado'});
      return;
    } else {
      const c = await produtoService.updateProduto(req.body);
      res.status(200).json(c);
      return;
    }
  } catch (error) {
    global.logger.error({statusCode: 400, message: error});
    res.status(400).json({erro: 'Erro ao processar a requisição'});
    return;
  }
}
/*
DELETE: deverá ser excluído o registro do produto informado,
retornando os seus dados  em  uma  resposta  com  status  HTTP  200.
Caso  não  seja  encontrado  um produto com o mesmo código,
um HTTP 405 deverá ser retornado juntamente com
uma mensagem informando o(s) erro(s) observado(s).
*/

async function deleteProductByCodigo(req, res, next) {
  await check('codigo', 'Nome deve ser informado').notEmpty().run(req);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({erros: result.array()});
    return;
  }
  const l = await produtoService.getProdutoByCodigo(req.body.codigo);
  if (!l) {
    res.status(405).json({erros: 'Produto não localizado'});
    res.end();
    return;
  } else {
    const c = await produtoService.deleteProdutoByCodigo(req.body.codigo);
    res.status(200).json(c);
    res.end();
  }
}

export default {
  createOrUpdateProduct,
  listProducts,
  updateProduct,
  deleteProductByCodigo,
  listProductByCodigo};
