# FinançasPessoais

App web de gestão financeira pessoal — registre receitas e despesas, visualize seu saldo e acompanhe gastos por categoria.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui (base-ui)
- **Supabase** — Auth, PostgreSQL e Row Level Security
- **Recharts** — gráfico de despesas por categoria
- **next-themes** — tema claro/escuro

## Funcionalidades

- Cadastro e login com confirmação de e-mail (Supabase Auth)
- Registro de transações: receitas e despesas com data, valor, categoria e descrição
- Dashboard com cards de resumo (receitas, despesas, saldo) e gráfico de pizza
- Filtros por mês, tipo e categoria
- Edição e exclusão de transações
- Tema claro/escuro com persistência
- Dados isolados por usuário via Row Level Security

---

## Rodando localmente

### 1. Clone o repositório

```bash
git clone https://github.com/arlenelima5109/app_financas.git
cd app_financas
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais do Supabase:

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

> As chaves estão em: **Supabase Dashboard → Project Settings → API**

### 4. Configure o banco de dados

No **SQL Editor** do seu projeto Supabase, execute o conteúdo do arquivo `supabase-schema.sql`:

```sql
-- cria a tabela transactions com Row Level Security
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Deploy na Vercel

### 1. Importe o repositório

Acesse [vercel.com/new](https://vercel.com/new), conecte sua conta GitHub e selecione o repositório `app_financas`.

### 2. Configure as variáveis de ambiente

Na etapa de configuração do projeto na Vercel, adicione as seguintes variáveis em **Environment Variables**:

| Variável | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do seu projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon/pública do Supabase |

> **Nunca** commite o arquivo `.env.local` — ele está protegido pelo `.gitignore`.

### 3. Deploy

Clique em **Deploy**. A Vercel detecta automaticamente o Next.js e configura o build.

A cada `git push` para a branch `main`, um novo deploy é feito automaticamente.

### 4. Configure a URL de redirecionamento no Supabase

Após o deploy, adicione a URL de produção da Vercel nas configurações de Auth do Supabase:

**Supabase Dashboard → Authentication → URL Configuration**

- **Site URL**: `https://seu-app.vercel.app`
- **Redirect URLs**: `https://seu-app.vercel.app/**`

---

## Estrutura do projeto

```
src/
├── app/
│   ├── (auth)/           # Páginas de login, registro e confirmação
│   ├── (dashboard)/      # Dashboard principal
│   ├── auth/             # Server Actions de autenticação
│   └── transactions/     # Server Actions de transações
├── components/
│   ├── dashboard/        # Cards, gráfico, filtros
│   ├── layout/           # Navbar
│   ├── transactions/     # Formulário e lista
│   └── ui/               # Componentes shadcn/ui
├── lib/supabase/         # Clientes Supabase (browser, server, proxy)
└── types/                # Tipos TypeScript e categorias
supabase-schema.sql       # Schema do banco + políticas RLS
```
