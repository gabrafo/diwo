# Diwo Backend Challenge - Lugares para Conhecer 🌍

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

API REST para gerenciamento de locais que deseja conhecer ao redor do mundo, desenvolvida como solução para o desafio técnico da Diwo.

## Tecnologias Utilizadas 🖥️

- **NestJS** - Framework backend
- **TypeScript** - Linguagem principal
- **PostgreSQL** - Banco de dados relacional
- **TypeORM** - ORM para acesso ao banco
- **Docker** - Containerização da aplicação
- **Jest** - Testes automatizados
- **Swagger** - Documentação de API

## Requisitos Implementados ✅

### Obrigatórios 📝
- CRUD completo de locais
- Validação de unicidade (país + local)
- Ordenação crescente por meta
- Banco de dados PostgreSQL
- Dockerização completa
- Documentação de execução

### Bônus ⭐
- Implementação com NestJS
- Uso de TypeScript
- Integração com TypeORM
- Container Docker otimizado
- Suíte de testes automatizados
- Documentação Swagger

## Como Executar 🛠️

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 20.x (opcional para execução local)

### Com Docker (Recomendado)
```bash
# 1. Clone o repositório
git clone https://github.com/gabrafo/diwo.git

# 2. Acesse o diretório
cd diwo

# 3. Inicie os containers
docker-compose up --build

# A API estará disponível em: http://localhost:3000
```

### Localmente 💻
```bash
# 1. Instale as dependências
npm install

# 2. Configure o .env (copie .env.example)
cp .env.example .env

# 3. Inicie o servidor
npm run start:dev
```

### Testando a Aplicação 🔍
```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:cov

# Executar testes em modo watch
npm run test:watch
```

## Documentação da API 📚

- Acesse a documentação interativa via Swagger:
```bash
http://localhost:3000/api/docs
```

## ⚙️ Variáveis de Ambiente

| Variável          | Descrição               | Valor Padrão    |
|:------------------|:-----------------------:|----------------:|
| DATABASE_PORT     | Porta do banco          | 5432            |
| DATABASE_USER     | Usuário do banco        | diwo            |
| DATABASE_PASSWORD | Senha do banco          | secret          |
| DATABASE_NAME     | Nome do banco           | places          |
| PORT              | Porta da aplicação      | 3000            |

## Modelo de Dados 🎲

```typescript
class Place {
  id: number;
  country: string;        // País do local
  location: string;       // Nome do local
  goal: Date;             // Meta de visita (YYYY-MM)
  flagUrl: string;        // URL da bandeira
  createdAt: Date;        // Data de criação
  updatedAt: Date;        // Data de atualização
}
```

## Estrutura Docker 🐳

- Serviços:
`app`: Aplicação NestJS (Porta 3000)
`postgres`: Banco de dados PostgreSQL (Porta 5432)

- Volumes:
`postgres_data`: Armazenamento persistente do banco

## Licença 🗒️

Este projeto foi desenvolvido como parte do processo seletivo da Diwo e não possui licença aberta.

- Desenvolvido com ❤️ por **Gabrafo** (candidato à vaga de Desenvolvedor Backend na Diwo).
