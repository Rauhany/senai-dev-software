-- 1. Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS minha_api_db;
USE minha_api_db;

-- 2. Criação da Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    idproduto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS cliente (
    idcliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email varchar(100),
    cpf varchar(14),
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

-- 3. Inserção de Dados Iniciais (Carga)
INSERT INTO produtos (nome, preco, estoque, ativo) 
VALUES 
('Notebook', 3500.00, 10, 1),
('Mouse Gamer', 120.50, 45, 1);

-- ----------- Criação da Tabela de Vendas -----------

CREATE TABLE IF NOT EXISTS vendas (

   idvendas INT AUTO_INCREMENT PRIMARY KEY,
    data_venda datetime,
    valor_total decimal(10,2),
    idproduto int,
    idcliente int,
    foreign key(idproduto)references produtos(idproduto),
	foreign key(idcliente)references cliente(idcliente)

);