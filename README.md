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

RabbitMQ + dashboard (portas 5672, 15672)

Backend (porta 3001)

Frontend (porta 3000)

### 📱 Funcionalidades Implementadas

CRUD de clientes, conversas e mensagens

Autenticação JWT simples

Envio de mensagens (com suporte a prioridade)

Interface para login e envio de mensagens

Integração front-back com feedback de envio

Docker Compose para execução completa

### 🧠 Decisões Técnicas
Uso do RabbitMQ para filas de mensagens com prioridade.

Autenticação simplificada.

Persistência de dados com PostgreSQL via TypeORM.

UI com suporte a mobile e desktop.

### 📌 Melhorias Futuras
Gerenciar filas de mensagens com o RabbitMQ

Implementar Menu administrativo para controle de saldo

Implmentar Guard na autenticação JWT

Adicionar cache (Redis) para melhorar performance

Adicionar testes automatizados (Jest)

Monitoramento com logs estruturados

Controle de saldo e enums no Message Module

### 📄 Como Testar Manualmente

Acesse o frontend: http://localhost:3000

Faça login com um CPF/CNPJ

Envie mensagens com prioridade "normal" ou "urgente"

Visualize o histórico de mensagens e status

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
ampqlib - integração filas
swagger - documentação rotas
jest - testes unitários
typeORM - conexão postgres
jwt - autenticação
class-validator - validação de DTO
```
