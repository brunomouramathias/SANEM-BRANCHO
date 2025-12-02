-- =============================================
-- SANEM - Sistema de Gestao de Doacoes
-- Script de criacao do banco de dados MySQL
-- =============================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS sanem_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE sanem_db;

-- =============================================
-- Tabela: Tipo
-- Armazena os tipos de itens (roupas, calcados, etc.)
-- =============================================
CREATE TABLE IF NOT EXISTS Tipo (
    TP_IDTipo INT AUTO_INCREMENT PRIMARY KEY,
    TP_Descricao VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- =============================================
-- Tabela: Beneficiario
-- Cadastro de beneficiarios que recebem doacoes
-- =============================================
CREATE TABLE IF NOT EXISTS Beneficiario (
    idBeneficiario INT AUTO_INCREMENT PRIMARY KEY,
    Bn_Nome VARCHAR(150) NOT NULL,
    Bn_documento VARCHAR(11),
    Bn_Telefone VARCHAR(14)
) ENGINE=InnoDB;

-- =============================================
-- Tabela: Operaor (Operador)
-- Usuarios do sistema (voluntarios/administradores)
-- =============================================
CREATE TABLE IF NOT EXISTS Operaor (
    ID_Operador INT AUTO_INCREMENT PRIMARY KEY,
    Op_Nome VARCHAR(145) NOT NULL,
    Op_Documento VARCHAR(14),
    Op_Email VARCHAR(100) NOT NULL UNIQUE,
    Op_Senha VARCHAR(255) NOT NULL,
    Op_Tipo INT DEFAULT 1
) ENGINE=InnoDB;

-- =============================================
-- Tabela: Login_Logout
-- Registro de sessoes dos operadores
-- =============================================
CREATE TABLE IF NOT EXISTS Login_Logout (
    LG_IdLogin INT AUTO_INCREMENT PRIMARY KEY,
    LG_Operador INT NOT NULL,
    LG_Data DATETIME NOT NULL,
    LG_Modo INT NOT NULL COMMENT '1 = Login, 0 = Logout',
    FOREIGN KEY (LG_Operador) REFERENCES Operaor(ID_Operador) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- Tabela: Estoque
-- Controle de estoque de itens disponiveis
-- =============================================
CREATE TABLE IF NOT EXISTS Estoque (
    ES_Estoque INT AUTO_INCREMENT PRIMARY KEY,
    ES_Quantidade VARCHAR(45) NOT NULL DEFAULT '0',
    Tipo_TP_IDTipo INT NOT NULL,
    FOREIGN KEY (Tipo_TP_IDTipo) REFERENCES Tipo(TP_IDTipo) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =============================================
-- Tabela: Doacao_Recebida
-- Registro de doacoes recebidas pela instituicao
-- =============================================
CREATE TABLE IF NOT EXISTS Doacao_Recebida (
    DR_IDDoacao INT AUTO_INCREMENT PRIMARY KEY,
    DR_Operador INT NOT NULL,
    DR_Quantidade INT NOT NULL,
    DR_Data DATETIME NOT NULL,
    DR_Tipo INT NOT NULL,
    FOREIGN KEY (DR_Operador) REFERENCES Operaor(ID_Operador) ON DELETE RESTRICT,
    FOREIGN KEY (DR_Tipo) REFERENCES Tipo(TP_IDTipo) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =============================================
-- Tabela: Doacao_Recebida_Estoque
-- Relacionamento entre doacoes recebidas e estoque
-- =============================================
CREATE TABLE IF NOT EXISTS Doacao_Recebida_Estoque (
    DRE_IDDoacao INT NOT NULL,
    DRE_Estoque INT NOT NULL,
    PRIMARY KEY (DRE_IDDoacao, DRE_Estoque),
    FOREIGN KEY (DRE_IDDoacao) REFERENCES Doacao_Recebida(DR_IDDoacao) ON DELETE CASCADE,
    FOREIGN KEY (DRE_Estoque) REFERENCES Estoque(ES_Estoque) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- Tabela: Doacao_Enviada
-- Registro de doacoes enviadas aos beneficiarios
-- =============================================
CREATE TABLE IF NOT EXISTS Doacao_Enviada (
    Doacao_Enviada INT AUTO_INCREMENT PRIMARY KEY,
    DE_Quantidade VARCHAR(45) NOT NULL,
    DE_Data DATETIME NOT NULL,
    DE_idBeneficiario INT NOT NULL,
    DE_Operador INT NOT NULL,
    DE_Tipo INT NOT NULL,
    FOREIGN KEY (DE_idBeneficiario) REFERENCES Beneficiario(idBeneficiario) ON DELETE RESTRICT,
    FOREIGN KEY (DE_Operador) REFERENCES Operaor(ID_Operador) ON DELETE RESTRICT,
    FOREIGN KEY (DE_Tipo) REFERENCES Tipo(TP_IDTipo) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =============================================
-- Tabela: Doacao_Enviada_Estoque
-- Relacionamento entre doacoes enviadas e estoque
-- =============================================
CREATE TABLE IF NOT EXISTS Doacao_Enviada_Estoque (
    DES_Enviada INT NOT NULL,
    Estoque_ES_Estoque INT NOT NULL,
    PRIMARY KEY (DES_Enviada, Estoque_ES_Estoque),
    FOREIGN KEY (DES_Enviada) REFERENCES Doacao_Enviada(Doacao_Enviada) ON DELETE CASCADE,
    FOREIGN KEY (Estoque_ES_Estoque) REFERENCES Estoque(ES_Estoque) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- Dados iniciais (SEM ACENTOS para evitar problemas)
-- =============================================

-- Inserir tipos de itens
INSERT INTO Tipo (TP_Descricao) VALUES
('Camiseta Masculina'),
('Calca Masculina'),
('Camiseta Feminina'),
('Calca Feminina'),
('Roupa Infantil'),
('Calcados'),
('Agasalhos'),
('Acessorios');

-- Inserir operador administrador padrao
-- Senha: admin123 (hash bcrypt)
INSERT INTO Operaor (Op_Nome, Op_Documento, Op_Email, Op_Senha, Op_Tipo) VALUES
('Administrador', '00000000000', 'admin@sanem.org', '$2a$10$Sp889zj8wxgd3wJjSClARemdajdFMl7SgfVWu4Ct3/pGVhDObTN.6', 1);

-- Inserir alguns beneficiarios de exemplo
INSERT INTO Beneficiario (Bn_Nome, Bn_documento, Bn_Telefone) VALUES
('Maria Silva Santos', '12345678900', '11987654321'),
('Joao Pedro Oliveira', '98765432100', '11912345678'),
('Ana Paula Costa', '45678912300', '11998765432'),
('Carlos Alberto Souza', '32165498700', '11976543210');

-- Inserir itens no estoque
INSERT INTO Estoque (ES_Quantidade, Tipo_TP_IDTipo) VALUES
('150', 1),
('80', 2),
('120', 3),
('90', 4),
('200', 5),
('45', 6),
('55', 7),
('300', 8);

-- =============================================
-- Indices para otimizacao
-- =============================================
CREATE INDEX idx_beneficiario_nome ON Beneficiario(Bn_Nome);
CREATE INDEX idx_operador_email ON Operaor(Op_Email);
CREATE INDEX idx_doacao_enviada_data ON Doacao_Enviada(DE_Data);
CREATE INDEX idx_doacao_recebida_data ON Doacao_Recebida(DR_Data);
CREATE INDEX idx_login_logout_data ON Login_Logout(LG_Data);
