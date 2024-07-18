const mysql = require('mysql2');

// Configurar a conexão
const connection = mysql.createConnection({
  host: 'localhost', // Endereço do servidor MySQL
  user: 'abner', // Nome de usuário do MySQL
  password: '1234', // Senha do MySQL
  database: 'lucas_db' // Nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

module.exports = connection;
