# Agroconnect - Server

Este repositório contém o código da API do Agroconnect.

## Requisitos

Antes de rodar o servidor, certifique-se de ter os seguintes requisitos instalados:

- [Java 17+](https://adoptopenjdk.net/)
- [Maven](https://maven.apache.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Instalação

Clone este repositório em sua máquina local:

```bash
https://github.com/luizfernandoin/AgroConnect.git
cd server
```

## Configuração
Para configurar a aplicação spring do agroconnect, você deve:

#### **1.** Não deletar o arquivo `.env-example`
O arquivo `.env-example` contém exemplos de todas as variáveis de ambiente necessárias para rodar o servidor. **Não exclua este arquivo.**

#### **2.** Criar o Arquivo `.env`
```bash
// Vá para o diretório resources
cd .\agroconnect\src\main\resources\

// Copie o arquivo `.env-example` para um novo arquivo chamado `.env`.
cp .env-example .env
```

#### **3.** Baixe todas as dependências e bibliotecas necessárias para o projeto funcionar.
Utilize o Maven para gerenciar as dependências do projeto:
```bash
mvm install 
```