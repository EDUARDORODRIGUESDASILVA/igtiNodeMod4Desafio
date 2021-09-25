const supertest = require('supertest');
const Sequelize= require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

let db = new Sequelize(process.env.DB_CONNECTION_STRING,
    {dialect: 'postgres'});

const Produto = db.define(
    'produtos',
    {
      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    },
    {underscored: true},
);
const request = supertest('http://localhost:3000');

beforeAll( async ()=> {
  await Produto.sync({force: true});
});

describe('/produto POST ', () =>{
  test('POST - Novo Produto', async () => {
    const payloadRequest1 = {codigo: 'carro x',
      descricao: 'carro de exemplo',
      preco: 72000.25};
    const res = await request.post('/produto')
        .send(payloadRequest1);
    expect(res.body.codigo).toBe(payloadRequest1.codigo);
    expect(res.body.descricao).toBe(payloadRequest1.descricao);
    expect(res.body.preco).toBe(payloadRequest1.preco);
    expect(res.status).toBe(201);
  });

  test('POST - Produto existente', async () => {
    const payloadRequest1 = {codigo: 'carro x',
      descricao: 'atualizar',
      preco: 14000.25};
    const res = await request.post('/produto')
        .send(payloadRequest1);
    expect(res.status).toBe(200);
  });

  test('POST - Produto sem codigo', async () => {
    const payloadRequest1 = {descricao: 'atualizar',
      preco: 14000.25};
    const res = await request.post('/produto')
        .send(payloadRequest1);
    expect(res.status).toBe(400);
  });

  test('POST - Produto sem descricao', async () => {
    const payloadRequest1 = {codigo: 'carro z',
      preco: 14000.25};
    const res = await request.post('/produto')
        .send(payloadRequest1);
    expect(res.status).toBe(400);
  });

  test('POST - Produto sem preço', async () => {
    const payloadRequest1 = {codigo: 'carro z',
      descricao: 'atualizar'};
    const res = await request.post('/produto')
        .send(payloadRequest1);
    expect(res.status).toBe(400);
  });

  test('POST - Preço inválido', async () => {
    const payloadRequest1 = {codigo: 'carro z',
      descricao: 'atualizar',
      preco: 'a14000.25'};
    const res = await request.post('/produto')
        .send(payloadRequest1);
    expect(res.status).toBe(400);
  });
});

describe('/produto PUT ', () =>{
  test('POST - Novo Produto', async () => {
    const payloadRequest1 = {codigo: 'carro y',
      descricao: 'carro de exemplo PUT',
      preco: 72000.25};
    const res = await request.put('/produto')
        .send(payloadRequest1);
    expect(res.status).toBe(405);
  });

  test('PUT - Produto existente', async () => {
    const payloadRequest1 = {codigo: 'carro x',
      descricao: 'atualizar put',
      preco: 7000.25};
    const res = await request.put('/produto')
        .send(payloadRequest1);
    expect(res.body.codigo).toBe(payloadRequest1.codigo);
    expect(res.body.descricao).toBe(payloadRequest1.descricao);
    expect(res.body.preco).toBe(payloadRequest1.preco);
    expect(res.status).toBe(200);
  });

  test('PUT - Produto sem codigo', async () => {
    const payloadRequest1 = {descricao: 'atualizar',
      preco: 14000.25};
    const res = await request.put('/produto')
        .send(payloadRequest1);
    expect(res.body.erros).toBeDefined();
    expect(res.status).toBe(400);
  });

  test('PUT - Produto sem descricao', async () => {
    const payloadRequest1 = {codigo: 'carro y',
      preco: 14000.25};
    const res = await request.put('/produto')
        .send(payloadRequest1);
    expect(res.body.erros).toBeDefined();
    expect(res.status).toBe(400);
  });

  test('PUT - Produto sem preço', async () => {
    const payloadRequest1 = {codigo: 'carro z',
      descricao: 'atualizar'};
    const res = await request.put('/produto')
        .send(payloadRequest1);
    expect(res.body.erros).toBeDefined();
    expect(res.status).toBe(400);
  });

  test('PUT - Preço inválido', async () => {
    const payloadRequest1 = {codigo: 'carro z',
      descricao: 'atualizar',
      preco: 'a14000.25'};
    const res = await request.post('/produto')
        .send(payloadRequest1);
    expect(res.body.erros).toBeDefined();
    expect(res.status).toBe(400);
  });
});

describe('/produto DELETE', () =>{
  test('DELETE - Produto existente', async () => {
    const payloadRequest1 = {codigo: 'carro x'};
    const res = await request.delete('/produto')
        .send(payloadRequest1);
    expect(res.status).toBe(200);
  });

  test('DELETE - Produto não existente', async () => {
    const payloadRequest1 = {codigo: 'carro x'};
    const res = await request.delete('/produto')
        .send(payloadRequest1);
    expect(res.status).toBe(405);
  });
});

describe('/produto GET', () => {
  test('GET - Listar produtos', async () => {
    const res = await request.get('/produto');
    expect(res.status).toBe(200);
  });
});

afterAll( () => {
  db.close();
  db = null;
});

