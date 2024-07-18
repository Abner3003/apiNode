CREATE DATABASE IF NOT EXISTS lucas_db;

USE lucas_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  sobrenome VARCHAR(255) NOT NULL,
  idade INT NOT NULL
);

-- Criar usuário 'abner' e conceder acesso como root
CREATE USER 'abner'@'%' IDENTIFIED BY 'senha_desejada';

GRANT ALL PRIVILEGES ON *.* TO 'abner'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;