# Gerenciador de Usuários - Desafio IBBI

## Do que se trata?

Este projeto é uma solução fullstack (baseada em HTML, CSS e Javascript/Typescript) para um desafio técnico que consiste em uma plataforma de cadastro de usuários. A aplicação foi desenvolvida com:

- **Frontend**: React.js (Vite) com Axios para consumo da API
- **Backend**: Node.js com Express
- **Banco de Dados**: SQLite com Prisma ORM

## 🔎 Como Acessar o Projeto
O projeto pode ser tanto utilizdo localmente (requer configurações adicionais) quato publicamente, uma vez que a aplicação está hospedada em:
- **Frontend**: Hospedado na Vercel.com (plano gratuito) como um SPA;
- **Backend**: Api e Banco (Sqlite - in-memory) de dados hospedados na Render.com (plano gratuito);

## Funcionalidades

- 📋 Listagem de usuários cadastrados
- ➕ Cadastro de novos usuários
- ✏️ Edição de usuários existentes
- 🗑️ Exclusão de usuários
- 🔒 Validação de campos no formulário
- 🔄 Persistência de dados em banco SQLite

## Tecnologias Utilizadas

### Frontend
- React.js
- Axios (para comunicação com a API)
- Shadcn (para esqueleto de componentes Javascript)
- CSS (Tailwindcss)

### Backend
- Node.js
- Express
- Prisma ORM
- SQLite (banco de dados embutido)

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 22)
- npm ou yarn (versão 10)
- Git (opcional)

### Passo a Passo

1. **Clone o repositório** (ou baixe os arquivos):
   ```bash
   git clone https://github.com/YUT4R0/IBBI_desafio_tecnico
   cd IBBI_desafio_tecnico
   ```

2. **Instale as dependências do backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Execute as migrações do Prisma**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Inicie o servidor backend**:
   ```bash
   npm run dev
   ```

5. **Em outro terminal, instale as dependências do frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

6. **Inicie o aplicativo frontend**:
   ```bash
   npm run dev
   ```

7. **Acesse a aplicação**:
   Abra seu navegador e visite `http://localhost:5173` (ou então pela URL que aparecer no terminal rodando o frontend)

## Estrutura do Banco de Dados

O banco de dados SQLite possui uma tabela `User` com a seguinte estrutura:

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  status   String
}
```
(Obs: o domínio/limite de cada dado ja é validado no frontend usando Zod e Typescript)

## Endpoints da API

- `GET /users` - Lista todos os usuários
- `POST /users` - Cria um novo usuário
- `PUT /users/:id` - Atualiza um usuário existente
- `DELETE /users/:id` - Exclui logicamente um usuário

## Interface do Usuário

A aplicação possui apenas uma tela:

**Usuários cadstrados na plataforma**:
   - Exibe nome, e-mail e status dos usuários
   - Botões para editar e excluir
   - Botão "Novo Usuário" para adicionar usuários

A tela que ficaria responsável tanto para criação quanto para edição de usuários foi otimizada para ser apenas modal responsivo:

**Formulário de Cadastro/Edição**:
   - Campos para nome (150 caracteres), e-mail (20 caracteres), senha (8 caracteres) e status (Ativo/Excluído)
   - Validações em tempo real
   - Botão para salvar ou cancelar

## Validações Implementadas

- Todos os campos obrigatórios
- Limite de caracteres para cada campo
- Formato de e-mail válido

## Validando a aplicação na prática

Para testar a aplicação, você pode:

1. Criar novos usuários através do formulário
2. Editar informações existentes
3. Excluir usuários
4. Verificar a persistência dos dados após recarregar a página

## 🙌 Agradecimentos

Agradeço pela oportunidade de demonstrar minhas habilidades técnicas através deste desafio. 😁
