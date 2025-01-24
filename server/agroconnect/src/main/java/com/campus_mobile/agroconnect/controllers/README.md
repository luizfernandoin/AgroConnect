# API AgroConnect - Documentação do Servidor

Este documento fornece uma visão geral dos endpoints disponíveis no servidor do AgroConnect. Ele foi criado para ajudar a equipe de frontend a entender as rotas disponíveis, os métodos HTTP necessários e os formatos de entrada/saída.

---

## Base URL

http://localhost:8080/api

---

## Endpoints

### 1. Registro de Usuário
**Endpoint:** `/auth/register`  
**Método:** `POST`  
**Descrição:** Registra um novo usuário na plataforma, aceitando dados de cadastro com a possibilidade de upload de uma imagem (opcional). O envio deve ser feito em `multipart/form-data` para permitir o envio de arquivos.

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

---

### 2. Login de Usuário
**Endpoint:** `/auth/login`  
**Método:** `POST`  
**Descrição:** Autentica um usuário e retorna um token JWT.

**Tipo de Envio:** `application/json`

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
**Endpoint:** `/users/`  
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
