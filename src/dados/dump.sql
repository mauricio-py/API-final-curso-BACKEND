drop database pdv;

create database pdv;

create table usuarios (
	id serial primary key,
  nome text not null,
  email text unique not null,
  senha text not null
);

create table categorias(
	id serial primary key,
  descricao text not null
);

insert into categorias (descricao) values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id)
);

create table clientes (
	id serial primary key,
  nome text not null,
  email text unique not null,
  cpf text unique not null,
  cep text,
  rua text,
  numero integer,
  bairro text,
  cidade text,
  estado text
);

create table pedidos (
  id serial primary key, 
  cliente_id integer not null references clientes(id),
  observacao text,
  valor_total decimal(10, 2) not null
);

create table pedido_produtos (
  id serial primary key, 
  pedido_id integer not null references pedidos(id),
  produto_id integer not null references produtos(id),
  quantidade_produto integer not null,
  valor_produto decimal(10, 2) not null
 );

alter table produtos 
add	produto_imagem text;   

