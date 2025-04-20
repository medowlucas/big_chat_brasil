# 🧠 Big Chat Brasil (BCB)

Projeto fullstack do desafio técnico da Big Chat Brasil (BCB). Esta plataforma permite a comunicação entre empresas e clientes via chat, com suporte a mensagens com diferentes prioridades e sistema de pagamento por mensagem.

---

## 🧩 Tecnologias Utilizadas

- **Frontend:** React (ou Next.js)
- **Backend:** NestJS com TypeScript
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
CRUD de clientes

Autenticação simples

Envio de mensagens (com suporte a prioridade)

Interface para login e envio de mensagens

Integração front-back com feedback de envio

Docker Compose para execução completa

### 🧠 Decisões Técnicas
Uso do RabbitMQ para simular filas de mensagens com prioridade.

Separação clara entre frontend e backend.

Autenticação simplificada para foco no fluxo de mensagens.

Simulação de envio de mensagens com logging e delay artificial.

Persistência de dados com PostgreSQL via TypeORM/Prisma (ajustável).

UI básica mas funcional com suporte a mobile e desktop.

### 📌 Possíveis Melhorias Futuras
Implementar dashboard administrativo

Melhorar autenticação (JWT, OAuth)

Adicionar cache (Redis) para melhorar performance

Persistir filas de mensagens em disco

Adicionar testes automatizados (Jest + Supertest)

Monitoramento com logs estruturados

### 📄 Como Testar Manualmente
Acesse o frontend: http://localhost:3000

Faça login com um CPF/CNPJ válido

Envie mensagens com prioridade "normal" ou "urgente"

Visualize o histórico de mensagens e status

### 📦 Estrutura de Pastas
```bash
big-chat-brasil/
├── backend/     # Backend NestJS
├── frontend/    # Frontend React/Next
├── docker-compose.yml
└── README.md
```
