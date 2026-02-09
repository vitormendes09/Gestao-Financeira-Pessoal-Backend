# Financial Management API

Uma API RESTful para gerenciamento financeiro pessoal desenvolvida com NestJS, seguindo princípios de Clean Architecture e Domain-Driven Design.

## Tecnologias

    NestJS - Framework Node.js progressivo

    MongoDB - Banco de dados NoSQL

    Mongoose - ODM para MongoDB

    NEXT - FRONTEND

    JWT - Autenticação por tokens

    Docker - Containerização

    TypeScript - Tipagem estática

    Class Validator - Validação de DTOs

## Decisões Técnicas Principais

    Separação de Interfaces: Cada camada define suas próprias interfaces, permitindo fácil substituição de implementações.

    Repositórios Especializados: Cada operação de persistência tem seu próprio repositório, seguindo o princípio de Single Responsibility.

    DTOs com Validação: Uso de class-validator para validação automática das requisições.

    Autenticação JWT: Sistema stateless com tokens de acesso para segurança.

    Containerização: Docker Compose para ambiente de desenvolvimento consistente.   


## Pré-requisitos
- Docker instalado
- Node.js 18+ instalado
- npm ou yarn

#### Clone o repositório
git clone https://github.com/vitormendes09/Gestao-Financeira-Pessoal.git


## Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto:

MONGODB_URI=mongodb://localhost:27017/financial_management
JWT_SECRET=sua_chave_secreta_jwt_aqui_32_caracteres
NODE_ENV=development
PORT=3000

## Execusão (Linux/Mac)

### Dar permissão de execução ao script

chmod +x start-app.sh

### Iniciar toda a aplicação
./start-app.sh

### Para parar a aplicação
./stop-app.sh

## Execusão (Windows)

### Iniciar toda a aplicação
start-app.bat

### Para parar a aplicação
stop-app.bat

## Endpoints da API

Autenticação

    POST /auth/signup - Registrar novo usuário

    POST /auth/login - Login e obtenção de token

Transações (Requer autenticação)

    POST /transactions - Criar nova transação

    GET /transactions - Listar transações do usuário

    GET /transactions/:id - Obter transação específica

    PUT /transactions/:id - Atualizar transação

    DELETE /transactions/:id - Deletar transação

    GET /transactions/balance - Obter saldo mensal

Tipos de Transação

    income - Receita

    expense - Despesa

    fixed-expense - Despesa fixa (com recorrência mensal)



