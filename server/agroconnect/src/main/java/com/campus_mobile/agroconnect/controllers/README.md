# AgroConnect API - Conectando Produtores e Consumidores Locais

Bem-vindo à documentação da API do AgroConnect. Este sistema conecta agricultores locais a compradores em busca de produtos frescos e orgânicos. Aqui você encontrará informações detalhadas sobre como usar os endpoints da API, bem como exemplos práticos e dicas de uso.

## Sumário
- [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [1. Usuarios](#1-usuarios)
    - [1.1 Registro de Usuário](#11-registro-de-usuário)
    - [1.2 Login de Usuário](#12-login-de-usuário)
    - [1.3 Listar Todos os Usuários](#13-listar-todos-os-usuários)
    - [1.4 Obter Detalhes de um Usuário](#14-obter-detalhes-de-um-usuário)
    - [1.5 Obter Perfil do Usuário](#15-obter-perfil-do-usuário)
    - [1.6 Deletar um Usuário](#16-deletar-um-usuário)
    - [1.7 Deletar o Usuário Autenticado](#17-deletar-o-usuário-autenticado)
    - [1.8 Atualizar um Usuário](#18-atualizar-um-usuário)
    - [1.9 Atualizar o Usuário Autenticado](#19-atualizar-o-usuário-autenticado)
    - [1.10 Atualizar um Usuário Parcialmente](#110-atualizar-um-usuário-parcialmente)
    - [1.11 Atualizar o Usuário Autenticado Parcialmente](#111-atualizar-o-usuário-autenticado-parcialmente)
    - [1.12 Pegar Avaliações de Usuario pelo ID](#112-pegar-avaliações-de-usuario-pelo-id)
    - [1.13 Avaliar um Usuário](#113-avaliar-um-usuário)
  - [2. Oportunidades](#2-oportunidades)
    - [2.1 Busca oportunidade pelo id](#21-busca-oportunidade-pelo-id)
    - [2.2 Busca todos as oportunidades](#22-busca-todos-as-oportunidades)
    - [2.3 Registro de Oportunidade](#23-registro-de-oportunidade)
    - [2.4 Deletar uma Oportunidade](#24-deletar-uma-oportunidade)
    - [2.5 Atualizar uma Oportunidade](#25-atualizar-uma-oportunidade)
    - [2.6 Buscar candidaturas em Oportunidade](#26-buscar-candidaturas-em-oportunidade)
    - [2.7 Candidatar-se a uma Oportunidade](#27-candidatar-se-a-uma-oportunidade)
  - [3. Produtos](#3-produtos)
    - [3.1 Listar Todos os Produtos](#31-listar-todos-os-produtos)
    - [3.2 Obter Produto por ID](#32-obter-produto-por-id)
    - [3.3 Criar Produto](#33-criar-produto)
    - [3.4 Adicionar Categorias a um Produto](#34-adicionar-categorias-a-um-produto)
    - [3.5 Listar Avaliações de um Produto](#35-listar-avaliações-de-um-produto)
    - [3.6 Criar Avaliação para um Produto](#36-criar-avaliação-para-um-produto)
  
- [Autenticação e Permissões](#autenticação-e-permissões)
- [Contato e Contribuição](#contato-e-contribuição)

---

## Base URL

A API está disponível localmente em:
```
http://localhost:8080/api
```

Endpoints autenticados exigem um token JWT no cabeçalho de autorização.

---

## Endpoints

### 1. Usuarios

#### 1.1 Registro de Usuário
**Endpoint:** `/auth/register`  
**Método:** `POST`  
**Descrição:** Registra um novo usuário na plataforma, aceitando dados de cadastro com a possibilidade de upload de uma imagem (opcional). O envio deve ser feito em `multipart/form-data` para permitir o envio de arquivos.

**Parâmetros de Entrada:**

| Nome              | Tipo    | Obrigatório | Descrição                          |
|-------------------|---------|-------------|----------------------------------|
| `name`            | String  | Sim         | Nome completo do usuário           |
| `email`           | String  | Sim         | Endereço de e-mail único           |
| `password`        | String  | Sim         | Senha segura                     |
| `phone`           | String  | Não         | Telefone para contato             |
| `cpf`             | String  | Não         | CPF do usuário                   |
| `cnpj`            | String  | Não         | CNPJ (caso seja produtor)         |
| `productionType`  | String  | Não         | Tipo de produção (se produtor)    |
| `description`     | String  | Não         | Descrição do produtor            |

**Tipo de Envio:** `multipart/form-data`

**Corpo da Requisição:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "image": "file (opcional)",
    "phone": "string (opcional)",
    "cpf": "string (opcional)",
    "cnpj": "string (opcional)",
    "productionType": "string (se o usuário for PRODUCER)",
    "description": "string (se o usuário for PRODUCER)"
}
````

**Exemplo de Resposta (201):**
```json
{
  "message": "User registered successfully"
}
```

**Códigos de Resposta:**
- `201 Created`: Usuário criado com sucesso.
- `400 Bad Request`: Dados de entrada inválidos.

---

---

#### 1.2 Login de Usuário
**Endpoint:**
```
POST /api/auth/login
```  
**Método:** `POST`  
**Descrição:** Autentica um usuário e retorna um token JWT.

**Parâmetros de Entrada:**

| Nome       | Tipo    | Obrigatório | Descrição             |
|------------|---------|-------------|---------------------|
| `email`    | String  | Sim         | E-mail cadastrado   |
| `password` | String  | Sim         | Senha do usuário    |

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "luiz@example.com",
    "password": "senha123"
}'
```

**Resposta de Sucesso:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Códigos de Resposta:**
- `200 OK`: Login bem-sucedido.
- `401 Unauthorized`: Credenciais inválidas.

---

---

#### 1.3 Listar Todos os Usuários
**Endpoint:** 
```
GET /api/users
```  

**Método:** `GET`  
**Descrição:** Retorna uma lista de todos os usuários cadastrados.  
**Autenticação:** Requer token JWT no cabeçalho.

**Cabeçalhos Necessários:**

| Nome             | Tipo   | Obrigatório | Descrição                   |
|------------------|--------|-------------|---------------------------|
| `Authorization`  | String | Sim         | Token JWT no formato `Bearer <token>` |

**Exemplo de Resposta (200):**
```json
[
    {
        "id": "UUID",
        "name": "string",
        "email": "string",
        "image": "string",
        "phone": "string",
        "cpf": "string",
        "cnpj": "string",
        "role": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
]
```

**Códigos de Resposta:**
- `200 OK`: Lista retornada com sucesso.
- `401 Unauthorized`: Token inválido ou ausente.

---

---

#### 1.4 Obter Detalhes de um Usuário
**Endpoint:** `/users/{id}`  
**Método:** `GET`  
**Descrição:** Retorna os detalhes de um usuário específico pelo ID.  
**Autenticação:** Requer token JWT no cabeçalho.

**Cabeçalho da Requisição:**
Authorization: Bearer <token>

**Exemplo de Resposta (200):**
```json
{
    "status": "success",
    "message": "User found",
    "data": {
        "id": "UUID",
        "name": "string",
        "email": "string",
        "phone": "string",
        "cpf": "string",
        "cnpj": "string",
        "role": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
}
```

**Códigos de Resposta:**
- `200 OK`: Usuário encontrado.
- `404 Not Found`: Usuário não encontrado.

---

---

#### 1.5 Obter Perfil do Usuário
**Endpoint:** `/users/profile`  
**Método:** `GET`  
**Descrição:** Retorna os detalhes do usuário autenticado.  
**Autenticação:** Requer token JWT no cabeçalho.

**Cabeçalho da Requisição:**
Authorization: Bearer <token>

**Exemplo de Resposta (200):**
```json
{
    "status": "success",
    "message": "User found",
    "data": {
        "id": "UUID",
        "name": "string",
        "email": "string",
        "phone": "string",
        "cpf": "string",
        "cnpj": "string",
        "role": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
}
```

---

#### 1.6 Deletar um Usuário
**Endpoint:** `/users/{id}`  
**Método:** `DELETE`  
**Descrição:** Deleta um usuário específico pelo ID.  
**Autenticação:** Requer token JWT no cabeçalho.

**Cabeçalho da Requisição:**
Authorization: Bearer <token>

**Exemplo de Resposta (200):**
```json
{
    "status": "success",
    "message": "User found",
    "data": {
        "id": "UUID",
        "name": "string",
        "email": "string",
        "phone": "string",
        "cpf": "string",
        "cnpj": "string",
        "role": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
}
```

---

#### 1.7 Deletar o Usuário Autenticado
**Endpoint:** `/users/`  
**Método:** `DELETE`  
**Descrição:** Deleta o usuário autenticado.  
**Autenticação:** Requer token JWT no cabeçalho.

**Cabeçalho da Requisição:**
Authorization: Bearer <token>

**Exemplo de Resposta (200):**
```json
{
    "status": "success",
    "message": "User found",
    "data": {
        "id": "UUID",
        "name": "string",
        "email": "string",
        "phone": "string",
        "cpf": "string",
        "cnpj": "string",
        "role": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
}
```

---

#### 1.8 Atualizar um Usuário
**Endpoint:** `/users/{id}`  
**Método:** `PUT`  
**Descrição:** Atualiza os dados de um usuário específico pelo ID.  
**Autenticação:** Requer token JWT no cabeçalho.

**Tipo de Envio:** `multipart/form-data`

**Corpo da Requisição:**
```json
{
    "name": "string (opcional)",
    "email": "string (opcional)",
    "password": "string (opcional)",
    "image": "file (opcional)",
    "phone": "string (opcional)",
    "cpf": "string (opcional)",
    "cnpj": "string (opcional)",
    "productionType": "string (se o usuário for PRODUCER)",
    "description": "string (se o usuário for PRODUCER)"
}
```

**Exemplo de Resposta (200):**
```json
{
    "id": "UUID",
    "name": "string",
    "email": "string",
    "phone": "string",
    "cpf": "string",
    "cnpj": "string",
    "role": "string",
    "productionType": "string",
    "description": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

---

#### 1.9 Atualizar o Usuário Autenticado
**Endpoint:** `/users/`  
**Método:** `PUT`  
**Descrição:** Atualiza os dados do usuário autenticado.
**Autenticação:** Requer token JWT no cabeçalho.

**Tipo de Envio:** `multipart/form-data`

**Corpo da Requisição:**
```json
{
    "name": "string (opcional)",
    "email": "string (opcional)",
    "password": "string (opcional)",
    "image": "file (opcional)",
    "phone": "string (opcional)",
    "cpf": "string (opcional)",
    "cnpj": "string (opcional)",
    "productionType": "string (se o usuário for PRODUCER)",
    "description": "string (se o usuário for PRODUCER)"
}
```

**Exemplo de Resposta (200):**
```json
{
    "id": "UUID",
    "name": "string",
    "email": "string",
    "phone": "string",
    "cpf": "string",
    "cnpj": "string",
    "role": "string",
    "productionType": "string",
    "description": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

---

#### 1.10 Atualizar um Usuário Parcialmente
**Endpoint:** `/users/{id}`  
**Método:** `PATCH`  
**Descrição:** Atualiza parcialmente os dados de um usuário específico pelo ID.
**Autenticação:** Requer token JWT no cabeçalho.

**Tipo de Envio:** `multipart/form-data`

**Corpo da Requisição:**
```json
{
    "name": "string (opcional)",
    "email": "string (opcional)",
    "password": "string (opcional)",
    "image": "file (opcional)",
    "phone": "string (opcional)",
    "cpf": "string (opcional)",
    "cnpj": "string (opcional)",
    "productionType": "string (se o usuário for PRODUCER)",
    "description": "string (se o usuário for PRODUCER)"
}
```

**Exemplo de Resposta (200):**
```json
{
    "id": "UUID",
    "name": "string",
    "email": "string",
    "phone": "string",
    "cpf": "string",
    "cnpj": "string",
    "role": "string",
    "productionType": "string",
    "description": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

---

#### 1.11 Atualizar o Usuário Autenticado Parcialmente
**Endpoint:** `/users/`  
**Método:** `PATCH`  
**Descrição:** Atualiza parcialmente os dados do usuário autenticado.
**Autenticação:** Requer token JWT no cabeçalho.

**Tipo de Envio:** `multipart/form-data`

**Corpo da Requisição:**
```json
{
    "name": "string (opcional)",
    "email": "string (opcional)",
    "password": "string (opcional)",
    "image": "file (opcional)",
    "phone": "string (opcional)",
    "cpf": "string (opcional)",
    "cnpj": "string (opcional)",
    "productionType": "string (se o usuário for PRODUCER)",
    "description": "string (se o usuário for PRODUCER)"
}
```

**Exemplo de Resposta (200):**
```json
{
    "id": "UUID",
    "name": "string",
    "email": "string",
    "phone": "string",
    "cpf": "string",
    "cnpj": "string",
    "role": "string",
    "productionType": "string",
    "description": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

---

#### 1.12 Pegar Avaliações de Usuario pelo ID
**Endpoint:**
```
GET /api/users/{userId}/reviews
```

**Descrição:** Recupera uma lista de avaliações de um usuário específico.

**Códigos de Resposta:**
- `200 OK`: Retorna uma lista de avaliações

**Requisição:**
```bash
curl -X GET http://localhost:8080/api/users/{userId}/reviews \
-H "Authorization: Bearer <your-token>"
```

#### 1.13 Avaliar um Usuário
**Endpoint:**
```
POST /api/users/{userId}/reviews
```

**Descrição:** Permite que usuários autenticados criem uma avaliação para outro usuário.

**Parâmetros de Entrada:**

| Field     | Type    | Required | Description                     |
|-----------|---------|---------|---------------------------------|
| `rating`  | Integer | Sim     | A pontuação de classificação (por exemplo, 1-5).  |
| `comment` | String  | Sim     | O comentário da revisão.            |

**Códigos de Resposta:**
- `201 Created`: Avaliação criada com sucesso.

**Requisição:**
```bash
curl -X POST http://localhost:8080/api/users/{userId}/reviews \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"rating": 5, "comment": "Great service!"}'
```

---

---

### 2. Oportunidades

#### 2.1 Busca oportunidade pelo id
**Endpoint:** `/opportunities/{id}`  
**Método:** `GET`
**Descrição:** Retorna uma oportunidade específica com base no ID fornecido.

**Exemplo de Resposta (200):**
```json
{
    "status": "success",
    "message": "Opportunity found",
    "data": {
        "id": "UUID da Oportunidade",
        "title": "Título da Oportunidade",
        "description": "Descrição da Oportunidade",
        "producer": {
            "id": "ID do Produtor",
            "name": "Nome do Produtor",
        }
    }
}
```

---

#### 2.2 Busca todos as oportunidades
**Endpoint:** `/opportunities/`  
**Método:** `GET`  
**Descrição:** Retorna todas as oportunidades registradas no sistema.

**Exemplo de Resposta (200):**
```json
{
    "status": "success",
    "message": "Opportunity found",
    "data": {
        "id": "UUID da Oportunidade",
        "title": "Título da Oportunidade",
        "description": "Descrição da Oportunidade",
        "producer": {
            "id": "ID do Produtor",
            "name": "Nome do Produtor",
        }
    }
}
```

---

#### 2.3 Registro de Oportunidade
**Endpoint:** `/opportunities/`  
**Método:** `POST`  
**Descrição:** Cria uma nova oportunidade. Apenas usuários com a função produtor podem criar oportunidades.
**Autorização:** Somente usuários com a role ROLE_PRODUCER (produtor).
**Tipo de Envio:** `raw/json`

**Corpo da Requisição:**
```json
{
  "title": "Titulo da oportunidade",
  "description": "Descrição do trabalho",
  "type": "Tipo de Trabalho",
  "startDate": "2025-01-20T08:00:00 (Tempo Futuro ou Presente)",
  "endDate": "2025-01-25T18:00:00 (Tempo Futuro)",
  "value": 500.00
}
````

**Exemplo de Resposta (201):**
```json

```

---

#### 2.4 Deletar uma Oportunidade
**Endpoint:** `/opportunities/{id}`  
**Método:** `DELETE`  
**Descrição:** Deleta uma oportunidade existente. Apenas o produtor que criou a oportunidade pode deletá-la.
**Autorização:** Somente usuários com a role ROLE_PRODUCER (produtor).
**Tipo de Envio:** `raw/json`

**Exemplo de Resposta (201):**
```json
{
    "status": "success",
    "message": "Opportunity deleted successfully",
    "data": {
        "id": "UUID da Oportunidade",
        "title": "Título da Oportunidade",
        "description": "Descrição da Oportunidade",
        "producer": {
            "id": "ID do Produtor",
            "name": "Nome do Produtor"
        }
    // Outros atributos da oportunidade
    }
}

```

---

#### 2.5 Atualizar uma Oportunidade
**Endpoint:** `/opportunities/{id}`  
**Método:** `PATCH`  
**Descrição:** Atualiza uma oportunidade existente. Apenas o produtor que criou a oportunidade pode atualizá-la.
**Autorização:** Somente usuários com a role ROLE_PRODUCER (produtor).
**Tipo de Envio:** `raw/json`

**Corpo da Requisição:**
```json
{
  "title": "Titulo da oportunidade (OPCIONAL)",
  "description": "Descrição do trabalho (OPCIONAL)",
  "type": "Tipo de Trabalho (OPCIONAL)",
  "startDate": "2025-01-20T08:00:00 (Tempo Futuro ou Presente) (OPCIONAL)",
  "endDate": "2025-01-25T18:00:00 (Tempo Futuro) (OPCIONAL)",
  "value": 500.00 (OPCIONAL),
}
````

**Exemplo de Resposta (201):**
```json
{
    "status": "success",
    "message": "Opportunity deleted successfully",
    "data": {
        "id": "UUID da Oportunidade",
        "title": "Título da Oportunidade",
        "description": "Descrição da Oportunidade",
        "producer": {
            "id": "ID do Produtor",
            "name": "Nome do Produtor"
        }
    // Outros atributos da oportunidade
    }
}

```

---

#### 2.6 Buscar candidaturas em Oportunidade
**Endpoint:**
```
GET /api/users/opportunities/{opportunityId}/applications
```

**Descrição:** Retorna uma lista de candidaturas para uma oportunidade específica.

**Resposta:**
- `200 OK`: Retorna uma lista de candidaturas.

**Requisição:**
```bash
curl -X GET http://localhost:8080/api/users/opportunities/{opportunityId}/applications \
-H "Authorization: Bearer <seu-token>"
```

#### 2.7 Candidatar-se a uma Oportunidade
**Endpoint:**
```
POST /api/users/opportunities/{opportunityId}/applications
```

**Descrição:** Permite que um usuário autenticado se candidate a uma oportunidade.

**Resposta:**
- `201 Created`: Candidatura criada com sucesso.

**Exemplo:**
```bash
curl -X POST http://localhost:8080/api/users/opportunities/{opportunityId}/applications \
-H "Authorization: Bearer <seu-token>"
```

---

---

### 3. Produtos

#### 3.1 Listar Todos os Produtos

**Endpoint:**
```
GET /api/products/
```

**Descrição:** Retorna uma lista de todos os produtos disponíveis.

**Códigos de Resposta:**
- `200 OK`: Produtos retornados com sucesso.

#### 3.2 Obter Produto por ID

**Endpoint:**
```
GET /api/products/{id}
```

**Descrição:** Retorna os detalhes de um produto específico pelo ID.

**Códigos de Resposta:**
- `200 OK`: Produto encontrado.
- `404 Not Found`: Produto não encontrado.

#### 3.3 Criar Produto

**Endpoint:**
```
POST /api/products/
```

**Descrição:** Permite que produtores criem um novo produto. Requer autenticação e o papel de produtor.

**Códigos de Resposta:**
- `201 Created`: Produto criado com sucesso.
- `400 Bad Request`: Dados inválidos.

#### 3.4 Adicionar Categorias a um Produto

**Endpoint:**
```
POST /api/products/{productId}/categories
```

**Descrição:** Adiciona categorias a um produto existente. Requer autenticação e o papel de produtor.

**Códigos de Resposta:**
- `200 OK`: Categorias adicionadas com sucesso.
- `400 Bad Request`: Dados inválidos.

#### 3.5 Listar Avaliações de um Produto

**Endpoint:**
```
GET /api/products/{productId}/reviews
```

**Descrição:** Retorna todas as avaliações associadas a um produto específico.

**Códigos de Resposta:**
- `200 OK`: Avaliações retornadas com sucesso.

#### 3.6 Criar Avaliação para um Produto

**Endpoint:**
```
POST /api/products/{productId}/reviews
```

**Descrição:** Permite que usuários criem avaliações para um produto. Requer autenticação.

**Códigos de Resposta:**
- `201 Created`: Avaliação criada com sucesso.
- `400 Bad Request`: Dados inválidos.

---

---

## Autenticação e Permissões:
- **Admin:** Gerencia usuários e eventos.
- **Producer:** Registra produções e gerencia produtos.
- **Customer:** Consome conteúdo e interage com produtos.

---

## Contato e Contribuição

Em caso de dúvidas, entre em contato:
[luiz-nascimento.ln@academico.ifpb.edu.br](mailto:luiz.fernando@example.com)

Pull requests são bem-vindos. Para alterações maiores, abra uma issue para discutir o que você gostaria de alterar.
