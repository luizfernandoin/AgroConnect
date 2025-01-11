# API AgroConnect - Documentação do Servidor

Este documento fornece uma visão geral dos endpoints disponíveis no servidor do AgroConnect. Ele foi criado para ajudar a equipe de frontend a entender as rotas disponíveis, os métodos HTTP necessários e os formatos de entrada/saída.

---

## Base URL

http://localhost:8080/api

---

## Endpoints

### 1. Registro de Usuário
**Endpoint:** `/users/register`  
**Método:** `POST`  
**Descrição:** Registra um novo usuário na plataforma.

**Corpo da Requisição:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "image": "file (opcional)",
    "phone": "string",
    "cpf": "string",
    "cnpj": "string",
    "role": "string (ADMIN, PRODUCER ou CUSTOMER)"
}
````

**Exemplo de Resposta (201):**
```json
{
  "message": "Usuário registrado com sucesso"
}
```

---

### 2. Login de Usuário
**Endpoint:** `/auth/login`  
**Método:** `POST`  
**Descrição:** Autentica um usuário e retorna um token JWT.

**Corpo da Requisição:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Exemplo de Resposta (200):**
```json
{
    "token": "string"
}
```

---

### 3. Listar Todos os Usuários
**Endpoint:** `/users`  
**Método:** `GET`  
**Descrição:** Retorna uma lista de todos os usuários cadastrados.  
**Autenticação:** Requer token JWT no cabeçalho.

**Cabeçalho da Requisição:**
Authorization: Bearer <token>

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
```

---

### 5. Atualizar Usuário
**Endpoint:** `/users/{id}`  
**Método:** `PUT`  
**Descrição:** Atualiza os dados de um usuário específico pelo ID.  
**Autenticação:** Requer token JWT no cabeçalho.

**Cabeçalho da Requisição:**
Authorization: Bearer <token>

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
    "role": "string (opcional)"
}
```

**Exemplo de Resposta (200):**
```json
{
  "message": "Usuário atualizado com sucesso"
}
```
