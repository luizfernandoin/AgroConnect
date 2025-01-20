# AgroConnect API - Conectando Produtores e Consumidores Locais

Bem-vindo à documentação da API do AgroConnect. Este sistema conecta agricultores locais a compradores em busca de produtos frescos e orgânicos. Aqui você encontrará informações detalhadas sobre como usar os endpoints da API, bem como exemplos práticos e dicas de uso.

## Sumário
- [Base URL](#base-url)
- [Endpoints](#endpoints)
    - [1. Registro de Usuário](#1-registro-de-usuário)
    - [2. Login de Usuário](#2-login-de-usuário)
    - [3. Listar Todos os Usuários](#3-listar-todos-os-usuários)
    - [4. Detalhes de um Usuário](#4-detalhes-de-um-usuário)
- [Configuração Local](#configuração-local)
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

### 1. Registro de Usuário
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

### 2. Login de Usuário
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

### 3. Listar Todos os Usuários
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

### 4. Obter Detalhes de um Usuário
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

### 5. Obter Perfil do Usuário
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

### 6. Deletar um Usuário
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

### 7. Deletar o Usuário Autenticado
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

### 8. Atualizar um Usuário
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

### 9. Atualizar o Usuário Autenticado
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

### 10. Atualizar um Usuário Parcialmente
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

### 11. Atualizar o Usuário Autenticado Parcialmente
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

### 12. Busca oportunidade pelo id
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

### 13. Busca todos as oportunidades
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

### 14. Registro de Oportunidade
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

### 15. Deletar uma Oportunidade
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

### 16. Atualizar uma Oportunidade
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

---




Níveis de acesso:
- **Admin:** Gerencia usuários e eventos.
- **Producer:** Registra produções e gerencia produtos.
- **Buyer:** Consome conteúdo e interage com produtos.

---

## Contato e Contribuição

Em caso de dúvidas, entre em contato:
[luiz-nascimento.ln@academico.ifpb.edu.br](mailto:luiz.fernando@example.com)

Pull requests são bem-vindos. Para alterações maiores, abra uma issue para discutir o que você gostaria de alterar.

