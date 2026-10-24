
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
    quantidade int,
    idproduto int,
    idcliente int,
    foreign key(idproduto) references produtos(idproduto),
    foreign key(idcliente) references clientes(id)
);

-- 3. Inserção de Dados Iniciais (Carga)
INSERT INTO produtos (nome, preco, estoque, ativo) 
VALUES 
('Notebook', 3500.00, 10, 1),
('Mouse Gamer', 120.50, 45, 1);

ALTER TABLE vendas ADD COLUMN quantidade INT NOT NULL DEFAULT 1;

CREATE TABLE IF NOT EXISTS usuarios (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    ativo      TINYINT(1)   NOT NULL DEFAULT 1
);

INSERT INTO usuarios (nome, email, senha_hash)
VALUES (
    'Admin SENAI',
    'admin@senai.com',
    '$2a$11$K7joxD84wCREMsA/R5BHJOXCAbZJmYw2YEnDjpkDyeqwQY1xMTDlW'
);
SELECT id, nome, email, senha_hash, ativo
FROM usuarios;

UPDATE usuarios
SET senha_hash = '$2a$11$kn7wLkp0PM9o/JaaFdluz.ocr22lY3sD2DWBG1R1/D400VCRNdNVu'
WHERE email = 'admin@senai.com';


