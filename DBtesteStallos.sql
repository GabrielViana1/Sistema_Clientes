-- Tabela clientes
CREATE TABLE clientes (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(100),
    CPF VARCHAR(14),
    CNPJ VARCHAR(18),
    Tipo NVARCHAR(20)
);

-- Tabela enderecos
CREATE TABLE enderecos (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Cliente_ID INT UNIQUE, -- Restrição para garantir apenas um endereço por cliente
    FOREIGN KEY (Cliente_ID) REFERENCES clientes(ID),
    Rua NVARCHAR(100),
    Numero INT,
    CEP VARCHAR(9),
    Bairro NVARCHAR(50),
    Cidade NVARCHAR(50),
    Tipo NVARCHAR(20),
    Estado NVARCHAR(2)
);

-- Tabela contatos
CREATE TABLE contatos (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Cliente_ID INT,
    FOREIGN KEY (Cliente_ID) REFERENCES clientes(ID),
    DDD VARCHAR(3),
    Numero VARCHAR(9),
    Tipo NVARCHAR(20)
);
