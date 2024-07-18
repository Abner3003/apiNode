const express = require('express');
const app = express();
const port = process.env.APPLICATION_PORT || 3001;
const db = require('./database');
const setupSwagger = require('./swagger');

// Middleware para analisar JSON no corpo da requisição
app.use(express.json());

// Configurar o Swagger
setupSwagger(app);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nome
 *         - sobrenome
 *         - idade
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         sobrenome:
 *           type: string
 *           description: Sobrenome do usuário
 *         idade:
 *           type: integer
 *           description: Idade do usuário
 *       example:
 *         nome: João
 *         sobrenome: Silva
 *         idade: 30
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erro ao fazer consulta:', err);
      res.status(500).send('Erro ao consultar o banco de dados');
      return;
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Insere um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário inserido com sucesso
 *       400:
 *         description: Falha na requisição
 *       500:
 *         description: Erro no servidor
 */
app.post('/users', (req, res) => {
  console.log(req.body);

  const { nome, sobrenome, idade } = req.body;

  if (!nome || !sobrenome || !idade) {
    return res.status(400).send('Todos os campos são obrigatórios: nome, sobrenome, idade');
  }

  const query = 'INSERT INTO users (nome, sobrenome, idade) VALUES (?, ?, ?)';
  db.query(query, [nome, sobrenome, idade], (err, results) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      return res.status(500).send('Erro ao inserir usuário no banco de dados');
    }
    res.status(201).send('Usuário inserido com sucesso');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando 🚀 at port ${port}`);
});
