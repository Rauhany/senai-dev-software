-- 1. Criação do Banco de Dados
CREATE DATABASE minha_api_db;
USE minha_api_db;

-- 2. Criação das Tabelas
CREATE TABLE produtos (
    idproduto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email varchar(100),
    cpf varchar(14),
    ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE vendas (
    idvendas INT AUTO_INCREMENT PRIMARY KEY,
    data_venda datetime,
    valor_total decimal(10,2),
    idproduto int,
    idcliente int,
    foreign key(idproduto) references produtos(idproduto),
    foreign key(idcliente) references clientes(id)
);

CREATE TABLE fornecedores (
    id int auto_increment primary key,
    nome varchar(100),
    cnpj varchar(14),
    email varchar(100)
);

create table departamento(
id int auto_increment primary key,
nome varchar(100),
descricao varchar(100),
qtdfuncionario int,
ativo TINYINT(1) NOT NULL DEFAULT 1
);


-- 3. Inserção de Dados Iniciais (Carga)
INSERT INTO produtos (nome, preco, estoque, ativo) 
VALUES 
('Notebook', 3500.00, 10, 1),
('Mouse Gamer', 120.50, 45, 1);

ALTER TABLE fornecedores ADD COLUMN ativo BOOLEAN DEFAULT 1;
