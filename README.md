# Delivery App

Um aplicativo de delivery para restaurantes, desenvolvido com Next.js, Prisma e SQLite.

## Funcionalidades

- Sistema de autenticação de usuários
- Gerenciamento de produtos e categorias
- Upload de imagens
- Personalização de tema
- Área administrativa protegida
- Banco de dados SQLite com Prisma

## Tecnologias

- Next.js 14
- TypeScript
- Prisma
- SQLite
- Tailwind CSS
- Framer Motion
- Zustand

## Pré-requisitos

- Node.js 18+
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/deliveryapp.git
cd deliveryapp
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
```bash
npx prisma generate
npx prisma db push
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```
deliveryapp/
├── prisma/              # Configuração do Prisma
├── public/             # Arquivos estáticos
├── src/
│   ├── app/           # Rotas e páginas
│   ├── components/    # Componentes React
│   ├── lib/          # Utilitários
│   ├── services/     # Serviços
│   └── store/        # Estado global
└── package.json
```

## Deploy

O projeto está configurado para deploy na Vercel. Para fazer o deploy:

1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente necessárias
4. Deploy automático será feito a cada push para a branch main

## Licença

MIT
