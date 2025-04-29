# 🧠 Big Chat Brasil (BCB)

Projeto fullstack do desafio técnico da Big Chat Brasil (BCB). Esta plataforma permite a comunicação entre empresas e clientes via chat, com suporte a mensagens com diferentes prioridades e sistema de pagamento por mensagem.

---

## 🧩 Tecnologias Utilizadas

- **Frontend:** React
- **Backend:** NestJS
- **Banco de Dados:** PostgreSQL
- **Mensageria:** RabbitMQ
- **Containerização:** Docker e Docker Compose

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

- Docker
- Docker Compose

### 2. Clone o repositório

```bash
git clone https://github.com/seu-usuario/big-chat-brasil.git
cd big-chat-brasil
```

### 3. Execute com Docker Compose
```bash
docker-compose up -d
```

O Docker Compose irá subir os seguintes serviços:

PostgreSQL (porta 5432)

Backend (porta 3001)

Frontend (porta 3000)

### 4. Swagger da da API
http://localhost:3001/api/

### 5. Frontend
http://localhost:3000

### 📱 Funcionalidades Implementadas

CRUD de clientes, conversas e mensagens

Autenticação JWT

Envio de mensagens (com suporte a prioridade)

Interface para login e envio de mensagens

Integração front-back com feedback de envio

Docker Compose para execução completa

### 🧠 Decisões Técnicas

Persistência de dados com PostgreSQL via TypeORM.

UI com suporte a mobile e desktop.

### 📌 Melhorias Futuras
Gerenciar filas de mensagens com o RabbitMQ

Implementar Menu administrativo para controle de saldo

Adicionar cache (Redis) para melhorar performance

Implementar login completo

Monitoramento com logs estruturados

Controle de enums no Message Module

Controle de status e saldo via socket

### 📄 Como Testar

Acesse o frontend: http://localhost:3000

Faça login com um CPF/CNPJ (será criado um usuário automaticamente)

Envie mensagens com prioridade "normal" ou "urgente"

### 📦 Estrutura de Pastas

```bash
big-chat-brasil/
├── backend/     # Backend NestJS
├── frontend/    # Frontend React
├── docker-compose.yml
└── README.md
```

### 📚 Biblitecas

```bash
Frontend:
sonnar - toast
mui - UI design
axios - integração API
router-dom - controle de acesso

Backend:
swagger - documentação rotas
jest - testes unitários
typeORM - conexão postgres
jwt - autenticação
class-validator - validação de DTO
```
