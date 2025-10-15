# 📚 DOCUMENTAÇÃO COMPLETA DO SISTEMA SANEM-BRANCHO

> **Sistema de Gerenciamento de Doações de Roupas**  
> **Versão:** 2.0.0  
> **Última Atualização:** 15/10/2025  
> **Equipe:** BRANCHÓ - Oficina de Computação para a Comunidade (COM1029-2025/2)

---

## 📑 ÍNDICE

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Arquitetura Técnica](#2-arquitetura-técnica)
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Módulos do Sistema](#4-módulos-do-sistema)
5. [Componentes](#5-componentes)
6. [Serviços e Utilitários](#6-serviços-e-utilitários)
7. [Rotas da Aplicação](#7-rotas-da-aplicação)
8. [Autenticação e Segurança](#8-autenticação-e-segurança)
9. [Integração com Backend](#9-integração-com-backend)
10. [Deploy e Hospedagem](#10-deploy-e-hospedagem)
11. [Responsividade](#11-responsividade)
12. [Guia de Desenvolvimento](#12-guia-de-desenvolvimento)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. VISÃO GERAL DO SISTEMA

### 1.1 Objetivo do Projeto
O **SANEM-BRANCHO** é um sistema web desenvolvido para gerenciar doações de roupas da instituição SANEM (Serviço de Assistência ao Necessitado e Marginado). O sistema permite:

- ✅ Controle completo do estoque de peças de roupa
- ✅ Cadastro e gerenciamento de beneficiários
- ✅ Registro de doações recebidas
- ✅ Controle de movimentações (entrada/saída)
- ✅ Geração de relatórios estatísticos
- ✅ Sistema de autenticação para voluntários

### 1.2 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|-----------|
| **React** | 19.1.0 | Framework front-end |
| **Vite** | 6.3.5 | Build tool e dev server |
| **React Router DOM** | 7.6.0 | Gerenciamento de rotas |
| **Axios** | 1.9.0 | Cliente HTTP para API |
| **React Icons** | 5.5.0 | Biblioteca de ícones |
| **ESLint** | 9.25.0 | Linter de código |
| **Netlify** | - | Hospedagem (produção) |
| **PostgreSQL** | - | Banco de dados (backend) |
| **Express** | - | Framework backend |
| **Docker** | - | Containerização |

### 1.3 Instituição Beneficiada
**SANEM** - Instituição que realiza trabalho social de assistência a pessoas em situação de vulnerabilidade através da distribuição de roupas e outros itens de necessidade básica.

---

## 2. ARQUITETURA TÉCNICA

### 2.1 Arquitetura Geral

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│                  Hospedado no Netlify                    │
│  ┌────────────┬────────────┬────────────┬─────────────┐ │
│  │   Pages    │ Components │  Services  │   Utils     │ │
│  └────────────┴────────────┴────────────┴─────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↕ HTTP (Axios)
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (Express)                      │
│                     API RESTful                          │
│  ┌────────────┬────────────┬────────────┬─────────────┐ │
│  │   Routes   │Controllers │  Models    │ Middleware  │ │
│  └────────────┴────────────┴────────────┴─────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↕ SQL
┌─────────────────────────────────────────────────────────┐
│                  BANCO DE DADOS                          │
│              PostgreSQL (Dockerizado)                    │
│  Tabelas: item, beneficiario, voluntario, movimento,    │
│           itemMovimento                                  │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Padrão de Arquitetura
- **Frontend**: SPA (Single Page Application) com React
- **Backend**: API RESTful com Express.js
- **Comunicação**: JSON via HTTP/HTTPS
- **Autenticação**: localStorage (simulação) - Preparado para JWT
- **Estado**: React Hooks (useState, useEffect)

---

## 3. ESTRUTURA DE PASTAS

```
SANEM-BRANCHO/
│
├── public/                          # Arquivos estáticos públicos
│   ├── vite.svg                     # Ícone padrão do Vite
│   └── background-image.png         # Imagem da página inicial
│
├── src/                             # Código fonte da aplicação
│   │
│   ├── components/                  # Componentes reutilizáveis
│   │   ├── Sidebar.jsx              # Menu lateral de navegação
│   │   ├── Estoque_Sidebar.css      # Estilos da Sidebar
│   │   ├── HeaderNav.jsx            # Cabeçalho de navegação (legado)
│   │   ├── HeaderNav.css            # Estilos do header
│   │   └── ProtectedRoute.jsx       # Componente de proteção de rotas
│   │
│   ├── pages/                       # Páginas da aplicação
│   │   │
│   │   ├── Auth/                    # Páginas de autenticação
│   │   │   ├── Login.jsx            # Tela de login
│   │   │   ├── Login.css            # Estilos do login
│   │   │   ├── Cadastro.jsx         # Tela de cadastro
│   │   │   └── Cadastro.css         # Estilos do cadastro
│   │   │
│   │   ├── Home/                    # Página inicial
│   │   │   ├── index.jsx            # Componente Home
│   │   │   └── style.css            # Estilos da Home
│   │   │
│   │   ├── Estoque/                 # Módulo de estoque
│   │   │   ├── Estoque_M.jsx        # Listagem de itens do estoque
│   │   │   ├── style.css            # Estilos da listagem
│   │   │   ├── CriarItem.jsx        # Formulário de criação de item
│   │   │   └── CriarItem.css        # Estilos do formulário
│   │   │
│   │   ├── Doacao/                  # Módulo de doações
│   │   │   ├── Doacoes.jsx          # Listagem de doações
│   │   │   ├── Doacoes.css          # Estilos da listagem
│   │   │   ├── CriarDoacao.jsx      # Formulário de doação
│   │   │   └── CriarDoacao.css      # Estilos do formulário
│   │   │
│   │   ├── Beneficiario/            # Módulo de beneficiários
│   │   │   ├── Beneficiarios.jsx    # Listagem de beneficiários
│   │   │   ├── Beneficiarios.css    # Estilos da listagem
│   │   │   ├── CriarBeneficiario.jsx # Formulário de cadastro
│   │   │   └── CriarBeneficiario.css # Estilos do formulário
│   │   │
│   │   ├── Movimento/               # Módulo de movimentações
│   │   │   ├── Movimentos.jsx       # Listagem de movimentações
│   │   │   ├── Movimentos.css       # Estilos da listagem
│   │   │   ├── CriarMovimento.jsx   # Formulário de movimentação
│   │   │   └── CriarMovimento.css   # Estilos do formulário
│   │   │
│   │   └── Relatorios/              # Módulo de relatórios
│   │       ├── Relatorios.jsx       # Dashboard com estatísticas
│   │       └── Relatorios.css       # Estilos dos relatórios
│   │
│   ├── services/                    # Serviços da aplicação
│   │   └── api.js                   # Configuração do Axios
│   │
│   ├── utils/                       # Utilitários
│   │   └── iconesRoupas.js          # Mapeamento de ícones de roupas
│   │
│   ├── main.jsx                     # Ponto de entrada da aplicação
│   ├── Routes.jsx                   # Configuração de rotas
│   └── index.css                    # Estilos globais
│
├── .env.example                     # Exemplo de variáveis de ambiente
├── .gitignore                       # Arquivos ignorados pelo Git
├── eslint.config.js                 # Configuração do ESLint
├── index.html                       # HTML principal
├── netlify.toml                     # Configuração do Netlify
├── package.json                     # Dependências do projeto
├── package-lock.json                # Lock de dependências
├── vite.config.js                   # Configuração do Vite
│
├── CHANGELOG.md                     # Histórico de mudanças
├── DOCUMENTACAO_SISTEMA.md          # Este arquivo
├── CHECKLIST_FUNCIONALIDADES.md     # Lista de funcionalidades
│
└── [outros arquivos .md]            # Documentações auxiliares
```

---

## 4. MÓDULOS DO SISTEMA

### 4.1 Módulo de Autenticação

#### 4.1.1 Login (`/login`)
**Arquivo:** `src/pages/Auth/Login.jsx`

**Funcionalidades:**
- Formulário de login com usuário e senha
- Validação de campos obrigatórios
- Autenticação via localStorage
- Botão "Mostrar/Ocultar senha"
- Link para recuperação de senha (placeholder)
- Link para página de cadastro
- Feedback visual de erros
- Redirecionamento para Home após login

**Campos do Formulário:**
- `usuario` (texto) - Nome de usuário
- `senha` (password) - Senha do usuário

**Validações:**
- Campos obrigatórios
- Verificação se usuário existe no localStorage
- Verificação de senha correta

**Fluxo:**
```
Usuário preenche formulário
    ↓
Clica em "Entrar"
    ↓
Sistema valida se campos estão preenchidos
    ↓
Busca usuário no localStorage ("usuario_" + nome)
    ↓
Verifica se senha corresponde
    ↓
Se correto: salva "usuarioLogado" e redireciona para "/"
Se incorreto: exibe mensagem de erro
```

#### 4.1.2 Cadastro (`/cadastro`)
**Arquivo:** `src/pages/Auth/Cadastro.jsx`

**Funcionalidades:**
- Formulário de cadastro completo
- Validação de senha (mínimo 6 caracteres)
- Confirmação de senha
- Salvamento no localStorage
- Mensagem de sucesso com redirecionamento automático
- Link para página de login

**Campos do Formulário:**
- `nome` (texto) - Nome completo
- `email` (email) - Endereço de e-mail
- `cpf` (texto) - CPF do voluntário
- `telefone` (tel) - Número de telefone
- `usuario` (texto) - Nome de usuário único
- `senha` (password) - Senha (mínimo 6 caracteres)
- `confirmarSenha` (password) - Confirmação da senha

**Validações:**
- Todos os campos obrigatórios
- Senha mínima de 6 caracteres
- Senhas devem ser idênticas
- Verificação de usuário já existente

**Armazenamento:**
```javascript
localStorage.setItem("usuario_" + formData.usuario, JSON.stringify({
  nome: formData.nome,
  email: formData.email,
  cpf: formData.cpf,
  telefone: formData.telefone,
  senha: formData.senha
}));
```

---

### 4.2 Módulo de Estoque

#### 4.2.1 Listagem de Estoque (`/estoque`)
**Arquivo:** `src/pages/Estoque/Estoque_M.jsx`

**Funcionalidades:**
- Listagem em grid de todos os itens do estoque
- Busca em tempo real (por tipo ou categoria)
- Filtros por modelo (camiseta, bermuda, jaqueta)
- Filtros por categoria (infantil, adulto, unissex)
- Ícones visuais para cada tipo de roupa
- Cores de categoria nas bordas dos cards
- Botão de exclusão de item
- Botão "Registrar peça" (redireciona para criar)
- Loading state durante carregamento

**Endpoint API:**
```javascript
GET /item           // Buscar todos os itens
DELETE /item/:id    // Deletar item específico
```

**Estrutura de Dados do Item:**
```javascript
{
  iditem: number,
  tipo: string,          // Ex: "camiseta", "calça"
  tamanho: string,       // Ex: "M", "G", "42"
  quantidade: number,    // Quantidade em estoque
  categoria: string      // Ex: "infantil", "adulto"
}
```

**Recursos Visuais:**
- Ícone automático baseado no tipo (👕, 👖, 👗, etc.)
- Borda colorida por categoria
- Confirmação antes de excluir

#### 4.2.2 Criar Item (`/criarItem`)
**Arquivo:** `src/pages/Estoque/CriarItem.jsx`

**Funcionalidades:**
- Formulário de cadastro de novo item
- Campos validados
- Redirecionamento após criação

**Campos do Formulário:**
- `tipo` (select) - Tipo da peça
- `tamanho` (texto) - Tamanho da peça
- `quantidade` (number) - Quantidade inicial
- `categoria` (select) - Categoria da peça

**Endpoint API:**
```javascript
POST /item
Body: { tipo, tamanho, quantidade, categoria }
```

---

### 4.3 Módulo de Doações

#### 4.3.1 Listagem de Doações (`/doacao`)
**Arquivo:** `src/pages/Doacao/Doacoes.jsx`

**Funcionalidades:**
- Lista itens de movimentação do tipo "doacao"
- Botão "Adicionar Doação"
- Exclusão de doações
- Loading state

**Endpoint API:**
```javascript
GET /itemMovimento      // Busca todos e filtra tipo "doacao"
DELETE /itemMovimento/:id
```

**Filtro Aplicado:**
```javascript
const doacoes = response.data.filter(
  (item) => item.movimento?.tipo === "doacao"
);
```

#### 4.3.2 Criar Doação (`/criarDoacao`)
**Arquivo:** `src/pages/Doacao/CriarDoacao.jsx`

**Funcionalidades:**
- Formulário de registro de doação
- Seleção de item existente no estoque
- Informações do doador (se necessário)

**Endpoint API:**
```javascript
POST /itemMovimento
```

---

### 4.4 Módulo de Beneficiários

#### 4.4.1 Listagem de Beneficiários (`/beneficiarios`)
**Arquivo:** `src/pages/Beneficiario/Beneficiarios.jsx`

**Funcionalidades:**
- Tabela com todos os beneficiários cadastrados
- Colunas: ID, Nome, CPF, Telefone, Ações
- Botão "Adicionar Beneficiário"
- Exclusão de beneficiário com confirmação
- Loading state
- Mensagem quando não há registros

**Endpoint API:**
```javascript
GET /beneficiario           // Listar todos
DELETE /beneficiario/:id    // Excluir beneficiário
```

**Estrutura de Dados do Beneficiário:**
```javascript
{
  idbeneficiario: number,
  nome: string,
  cpf: string,
  telefone: string
}
```

**Validações:**
- Confirmação antes de excluir
- Feedback de erro em caso de falha

#### 4.4.2 Criar Beneficiário (`/criarBeneficiario`)
**Arquivo:** `src/pages/Beneficiario/CriarBeneficiario.jsx`

**Funcionalidades:**
- Formulário de cadastro de beneficiário
- Validação de CPF
- Campos obrigatórios

**Campos do Formulário:**
- `nome` (texto) - Nome completo
- `cpf` (texto) - CPF do beneficiário
- `telefone` (tel) - Telefone (opcional)

**Endpoint API:**
```javascript
POST /beneficiario
Body: { nome, cpf, telefone }
```

---

### 4.5 Módulo de Movimentações

#### 4.5.1 Listagem de Movimentações (`/movimentos`)
**Arquivo:** `src/pages/Movimento/Movimentos.jsx`

**Funcionalidades:**
- Tabela de todas as movimentações
- Filtro por tipo (todos, entrada, saída, doação, entrega, descarte)
- Badges coloridos por tipo de movimento
- Formatação de data (DD/MM/AAAA)
- Exclusão de movimentação
- Botão "Nova Movimentação"

**Endpoint API:**
```javascript
GET /movimento          // Listar todas
DELETE /movimento/:id   // Excluir movimentação
```

**Estrutura de Dados da Movimentação:**
```javascript
{
  idmovimento: number,
  tipo: string,           // "entrada", "saida", "doacao", etc.
  idvoluntario: number,
  idbeneficiario: number,
  data: Date
}
```

**Classes de Badge:**
```javascript
getTipoClass(tipo) {
  if (tipo === "entrada" || tipo === "doacao") return "tipo-entrada";
  if (tipo === "saida" || tipo === "entrega") return "tipo-saida";
  return "tipo-descarte";
}
```

**Formatação de Data:**
```javascript
new Date(data).toLocaleDateString("pt-BR");
```

#### 4.5.2 Criar Movimentação (`/criarMovimento`)
**Arquivo:** `src/pages/Movimento/CriarMovimento.jsx`

**Funcionalidades:**
- Formulário de registro de movimentação
- Seleção de tipo de movimento
- Seleção de voluntário
- Seleção de beneficiário (opcional)
- Campo de data

**Campos do Formulário:**
- `tipo` (select) - Tipo da movimentação
- `idvoluntario` (number) - ID do voluntário
- `idbeneficiario` (number) - ID do beneficiário (opcional)
- `data` (date) - Data da movimentação

**Endpoint API:**
```javascript
POST /movimento
Body: { tipo, idvoluntario, idbeneficiario, data }
```

**⚠️ IMPORTANTE - Correção Implementada:**
Os campos devem ser enviados em **minúsculas** e convertidos para **número**:
```javascript
// ✅ CORRETO
idvoluntario: parseInt(formData.idvoluntario)

// ❌ ERRADO
idVoluntario: formData.idVoluntario
```

---

### 4.6 Módulo de Relatórios

#### 4.6.1 Dashboard de Relatórios (`/relatorios`)
**Arquivo:** `src/pages/Relatorios/Relatorios.jsx`

**Funcionalidades:**
- 4 Cards de resumo (Itens, Beneficiários, Voluntários, Movimentações)
- Tabela "Estoque por Tipo de Item"
- Tabela "Movimentações por Tipo"
- Carregamento paralelo de dados (Promise.all)
- Agrupamento e contagem automática

**Endpoints API:**
```javascript
GET /item           // Total de itens
GET /beneficiario   // Total de beneficiários
GET /voluntario     // Total de voluntários
GET /movimento      // Total de movimentações
```

**Agrupamento de Itens por Tipo:**
```javascript
const itensPorTipo = itens.data.reduce((acc, item) => {
  const tipo = item.tipo || "Não especificado";
  const existing = acc.find(i => i.tipo === tipo);
  if (existing) {
    existing.quantidade += item.quantidade || 0;
  } else {
    acc.push({ tipo, quantidade: item.quantidade || 0 });
  }
  return acc;
}, []);
```

**Agrupamento de Movimentos por Tipo:**
```javascript
const movimentosPorTipo = movimentos.data.reduce((acc, mov) => {
  const tipo = mov.tipo || "Não especificado";
  acc[tipo] = (acc[tipo] || 0) + 1;
  return acc;
}, {});
```

**Estrutura do Estado:**
```javascript
{
  totalItens: 0,
  totalBeneficiarios: 0,
  totalVoluntarios: 0,
  totalMovimentos: 0,
  itensPorTipo: [{ tipo, quantidade }],
  movimentosPorTipo: [{ tipo, count }]
}
```

---

## 5. COMPONENTES

### 5.1 Sidebar
**Arquivo:** `src/components/Sidebar.jsx`

**Descrição:**
Menu lateral de navegação presente em todas as páginas protegidas.

**Funcionalidades:**
- Navegação entre páginas principais
- Destaque da página ativa
- Botão de logout com confirmação
- Ícones visuais para cada seção
- Design responsivo

**Itens de Navegação:**
```javascript
[
  { to: "/", label: "Início", icon: "🏠" },
  { to: "/estoque", label: "Estoque", icon: "📦" },
  { to: "/doacao", label: "Doação", icon: "❤️" },
  { to: "/beneficiarios", label: "Beneficiários", icon: "👥" },
  { to: "/movimentos", label: "Movimentos", icon: "📋" },
  { to: "/relatorios", label: "Relatórios", icon: "📊" }
]
```

**Lógica de Logout:**
```javascript
const handleLogout = () => {
  if (window.confirm("Deseja realmente sair?")) {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  }
};
```

**Destaque de Página Ativa:**
```javascript
className={`nav-button ${location.pathname === item.to ? "active" : ""}`}
```

### 5.2 ProtectedRoute
**Arquivo:** `src/components/ProtectedRoute.jsx`

**Descrição:**
Componente de proteção de rotas que verifica se o usuário está autenticado.

**Funcionalidades:**
- Verifica presença de "usuarioLogado" no localStorage
- Redireciona para /login se não autenticado
- Renderiza componente filho se autenticado

**Implementação:**
```javascript
const ProtectedRoute = ({ children }) => {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
```

**Uso nas Rotas:**
```javascript
<Route 
  path="/estoque" 
  element={
    <ProtectedRoute>
      <Estoque />
    </ProtectedRoute>
  } 
/>
```

### 5.3 HeaderNav (Legado)
**Arquivo:** `src/components/HeaderNav.jsx`

**Status:** Componente legado, não utilizado atualmente.
**Pode ser removido** ou reutilizado em futuras funcionalidades.

---

## 6. SERVIÇOS E UTILITÁRIOS

### 6.1 API Service
**Arquivo:** `src/services/api.js`

**Descrição:**
Configuração centralizada do cliente HTTP Axios.

**Implementação:**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:13002',
});

export default api;
```

**Variável de Ambiente:**
```env
VITE_API_URL=http://localhost:13002
```

**Uso:**
```javascript
import api from '../../services/api';

// GET
const response = await api.get('/item');

// POST
await api.post('/item', { tipo, tamanho, quantidade });

// DELETE
await api.delete(`/item/${id}`);
```

**Endpoints Disponíveis:**
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/item` | Listar todos os itens |
| POST | `/item` | Criar novo item |
| DELETE | `/item/:id` | Deletar item |
| GET | `/beneficiario` | Listar beneficiários |
| POST | `/beneficiario` | Criar beneficiário |
| DELETE | `/beneficiario/:id` | Deletar beneficiário |
| GET | `/voluntario` | Listar voluntários |
| POST | `/voluntario` | Criar voluntário |
| DELETE | `/voluntario/:id` | Deletar voluntário |
| GET | `/movimento` | Listar movimentações |
| POST | `/movimento` | Criar movimentação |
| DELETE | `/movimento/:id` | Deletar movimentação |
| GET | `/itemMovimento` | Listar itens de movimentação |
| POST | `/itemMovimento` | Criar item de movimentação |
| DELETE | `/itemMovimento/:id` | Deletar item de movimentação |

### 6.2 Ícones de Roupas
**Arquivo:** `src/utils/iconesRoupas.js`

**Descrição:**
Utilitário para mapear tipos de roupas para ícones emoji e cores.

**Funções:**

#### 6.2.1 getIconeRoupa(tipo)
Retorna emoji correspondente ao tipo de roupa.

**Mapeamento:**
| Tipo | Ícone | Palavras-chave |
|------|-------|----------------|
| Camisa/Camiseta | 👕 | camisa, camiseta, blusa |
| Calça | 👖 | calça, jeans, calca |
| Vestido | 👗 | vestido |
| Agasalho | 🧥 | agasalho, jaqueta, casaco, moletom |
| Sapato | 👞 | sapato, tênis, tenis, bota |
| Short/Bermuda | 🩳 | short, bermuda |
| Saia | 👚 | saia |
| Meia | 🧦 | meia, meia-calça |
| Chapéu/Boné | 🎩 | chapéu, chapeu, boné, bone |
| Bolsa | 👜 | bolsa, mochila |
| Óculos | 👓 | óculos, oculos |
| Gravata | 👔 | gravata |
| Luva | 🧤 | luva |
| Cachecol | 🧣 | cachecol |
| Pijama | 🩱 | pijama |
| Roupas de Banho | 🩱 | biquíni, biquini, maiô, maio |
| Roupas de Esporte | 🎽 | esporte, fitness |
| Padrão | 👔 | Outros tipos |

**Exemplo de Uso:**
```javascript
import { getIconeRoupa } from '../../utils/iconesRoupas';

const icone = getIconeRoupa("camiseta");  // Retorna "👕"
```

#### 6.2.2 getCategoriaColor(tipo)
Retorna cor hexadecimal baseada no tipo de roupa.

**Mapeamento de Cores:**
| Tipo | Cor | Hex |
|------|-----|-----|
| Camisa/Camiseta | Verde | #4CAF50 |
| Calça/Jeans | Azul | #2196F3 |
| Vestido | Rosa | #E91E63 |
| Agasalho/Casaco | Laranja | #FF9800 |
| Sapato/Tênis | Marrom | #795548 |
| Padrão | Cinza | #9E9E9E |

**Exemplo de Uso:**
```javascript
import { getCategoriaColor } from '../../utils/iconesRoupas';

const cor = getCategoriaColor("vestido");  // Retorna "#E91E63"

// Aplicado no componente:
<div style={{ borderTopColor: getCategoriaColor(item.tipo) }} />
```

---

## 7. ROTAS DA APLICAÇÃO

**Arquivo:** `src/Routes.jsx`

### 7.1 Configuração de Rotas

```javascript
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas protegidas (requerem autenticação) */}
        <Route path="/" element={<Home />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/criarItem" element={<CriarItem />} />
        <Route path="/doacao" element={<Doacoes />} />
        <Route path="/criarDoacao" element={<CriarDoacao />} />
        <Route path="/beneficiarios" element={<Beneficiarios />} />
        <Route path="/criarBeneficiario" element={<CriarBeneficiario />} />
        <Route path="/movimentos" element={<Movimentos />} />
        <Route path="/criarMovimento" element={<CriarMovimento />} />
        <Route path="/relatorios" element={<Relatorios />} />

        {/* Rota padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
```

### 7.2 Tabela de Rotas

| Rota | Componente | Tipo | Descrição |
|------|------------|------|-----------|
| `/login` | Login | Pública | Tela de autenticação |
| `/cadastro` | Cadastro | Pública | Tela de registro de usuário |
| `/` | Home | Protegida | Página inicial |
| `/estoque` | Estoque | Protegida | Listagem de estoque |
| `/criarItem` | CriarItem | Protegida | Cadastro de item |
| `/doacao` | Doacoes | Protegida | Listagem de doações |
| `/criarDoacao` | CriarDoacao | Protegida | Registro de doação |
| `/beneficiarios` | Beneficiarios | Protegida | Listagem de beneficiários |
| `/criarBeneficiario` | CriarBeneficiario | Protegida | Cadastro de beneficiário |
| `/movimentos` | Movimentos | Protegida | Listagem de movimentações |
| `/criarMovimento` | CriarMovimento | Protegida | Registro de movimentação |
| `/relatorios` | Relatorios | Protegida | Dashboard de estatísticas |
| `*` | Navigate | - | Redireciona para `/` |

---

## 8. AUTENTICAÇÃO E SEGURANÇA

### 8.1 Sistema Atual (localStorage)

**Status:** Implementação de **simulação** para desenvolvimento.

**Funcionamento:**
1. Ao cadastrar, dados são salvos no localStorage:
   ```javascript
   localStorage.setItem("usuario_" + username, JSON.stringify(userData));
   ```

2. Ao fazer login, sistema verifica:
   ```javascript
   const usuarioSalvo = localStorage.getItem("usuario_" + username);
   if (usuarioSalvo && JSON.parse(usuarioSalvo).senha === senha) {
     localStorage.setItem("usuarioLogado", JSON.stringify(userInfo));
   }
   ```

3. Rotas protegidas verificam:
   ```javascript
   const usuarioLogado = localStorage.getItem("usuarioLogado");
   ```

**⚠️ Limitações:**
- Não é seguro para produção
- Senhas armazenadas em texto puro
- Não há validação de sessão no servidor
- Vulnerável a XSS

### 8.2 Migração para JWT (Recomendado)

**Preparação para Implementação:**

O sistema está estruturado para fácil migração para JWT:

```javascript
// Modificação necessária em api.js:
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:13002',
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

**Fluxo JWT Recomendado:**
```
1. Login → POST /auth/login → Backend valida e retorna JWT
2. Frontend salva token: localStorage.setItem('token', jwt)
3. Todas as requisições incluem: Authorization: Bearer <token>
4. Backend valida token em cada requisição
5. Logout → Remove token do localStorage
```

### 8.3 Recomendações de Segurança

1. **Implementar HTTPS** (Netlify já fornece)
2. **Migrar para JWT** o quanto antes
3. **Hash de senhas** no backend (bcrypt)
4. **Validação de entrada** em todos os formulários
5. **Rate limiting** nas rotas de autenticação
6. **Sanitização de dados** antes de enviar para BD
7. **Política de CORS** adequada no backend

---

## 9. INTEGRAÇÃO COM BACKEND

### 9.1 Configuração de Ambiente

**Desenvolvimento Local:**
```env
VITE_API_URL=http://localhost:13002
```

**Produção (Netlify):**
```env
VITE_API_URL=https://seu-backend-em-producao.com
```

### 9.2 Backend Esperado

**Stack:**
- Express.js
- PostgreSQL
- Docker (opcional para desenvolvimento)

**Estrutura do Banco de Dados:**

```sql
-- Tabela de itens
CREATE TABLE item (
  iditem SERIAL PRIMARY KEY,
  tipo VARCHAR(100) NOT NULL,
  tamanho VARCHAR(20) NOT NULL,
  quantidade INTEGER NOT NULL,
  categoria VARCHAR(50)
);

-- Tabela de beneficiários
CREATE TABLE beneficiario (
  idbeneficiario SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  telefone VARCHAR(20)
);

-- Tabela de voluntários
CREATE TABLE voluntario (
  idvoluntario SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  senha VARCHAR(255) NOT NULL
);

-- Tabela de movimentações
CREATE TABLE movimento (
  idmovimento SERIAL PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  idvoluntario INTEGER REFERENCES voluntario(idvoluntario),
  idbeneficiario INTEGER REFERENCES beneficiario(idbeneficiario),
  data TIMESTAMP DEFAULT NOW()
);

-- Tabela de itens por movimentação
CREATE TABLE itemMovimento (
  id SERIAL PRIMARY KEY,
  idmovimento INTEGER REFERENCES movimento(idmovimento),
  iditem INTEGER REFERENCES item(iditem),
  quantidade INTEGER NOT NULL
);
```

### 9.3 Exemplo de Configuração Docker

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: sanem-postgres
    environment:
      POSTGRES_USER: Admin
      POSTGRES_PASSWORD: Admin123
      POSTGRES_DB: SanemDB
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  backend:
    build: .
    container_name: sanem-backend
    ports:
      - "13002:13002"
    environment:
      DATABASE_USER: Admin
      DATABASE_PASSWORD: Admin123
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: SanemDB
    depends_on:
      - postgres

volumes:
  postgres-data:
```

---

## 10. DEPLOY E HOSPEDAGEM

### 10.1 Configuração do Netlify

**Arquivo:** `netlify.toml`

```toml
[build]
  base = "/"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"
```

**Explicação:**
- `build.command`: Comando de build do Vite
- `build.publish`: Pasta onde o Vite gera os arquivos (dist/)
- `redirects`: Redireciona todas as rotas para index.html (SPA)
- `build.environment`: Versão do Node.js
- `headers`: Cabeçalhos de segurança

### 10.2 Processo de Deploy

**Via Git (Recomendado):**
1. Conectar repositório GitHub ao Netlify
2. Configurar variáveis de ambiente no painel
3. Deploy automático a cada push na branch principal

**Manual:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

### 10.3 Variáveis de Ambiente no Netlify

No painel do Netlify:
1. Site settings → Build & deploy → Environment
2. Adicionar:
   - `VITE_API_URL` = URL do backend em produção

### 10.4 Comandos de Build

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

**Desenvolvimento:**
```bash
npm run dev
```

**Build para produção:**
```bash
npm run build
```

**Preview da build:**
```bash
npm run preview
```

---

## 11. RESPONSIVIDADE

### 11.1 Breakpoints Implementados

O sistema utiliza 4 breakpoints para garantir responsividade:

| Breakpoint | Resolução | Dispositivo | Características |
|------------|-----------|-------------|-----------------|
| **Desktop** | > 1024px | Computadores | Layout 50/50, cards grandes |
| **Tablet** | 481px - 1024px | Tablets | Layout em coluna, cards médios |
| **Mobile** | ≤ 480px | Smartphones | Layout compacto, inputs touch-friendly |
| **Extra Small** | ≤ 360px | Smartphones pequenos | Layout ultra compacto |

### 11.2 Exemplo de Media Queries

```css
/* Desktop (padrão) */
.auth-container {
  flex-direction: row;
}

/* Tablet */
@media (max-width: 1024px) {
  .auth-container {
    flex-direction: column;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .auth-container {
    padding: 1rem;
  }
}

/* Extra Small */
@media (max-width: 360px) {
  .auth-container {
    padding: 0.5rem;
  }
}
```

### 11.3 Componentes Responsivos

**Sidebar:**
- Desktop: Sempre visível lateralmente
- Mobile: Pode ser colapsada (futuro)

**Tabelas:**
- Desktop: Layout tradicional
- Mobile: Cards empilhados (data-label)

**Formulários:**
- Desktop: Campos lado a lado
- Mobile: Campos empilhados

---

## 12. GUIA DE DESENVOLVIMENTO

### 12.1 Instalação do Projeto

```bash
# 1. Clonar repositório
git clone https://github.com/brunomouramathias/SANEM-BRANCHO.git
cd SANEM-BRANCHO

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Editar .env com URL do backend
# VITE_API_URL=http://localhost:13002

# 5. Iniciar servidor de desenvolvimento
npm run dev
```

### 12.2 Estrutura de Desenvolvimento

**Criando Nova Página:**
1. Criar pasta em `src/pages/NomeDaPagina/`
2. Criar `NomeDaPagina.jsx` e `NomeDaPagina.css`
3. Adicionar rota em `src/Routes.jsx`
4. Adicionar link na Sidebar (se necessário)

**Criando Novo Componente:**
1. Criar arquivo em `src/components/NomeDoComponente.jsx`
2. Criar CSS correspondente
3. Exportar componente
4. Importar onde necessário

**Adicionando Novo Endpoint:**
1. Usar instância `api` de `src/services/api.js`
2. Exemplo:
   ```javascript
   import api from '../../services/api';
   
   const fetchData = async () => {
     const response = await api.get('/novo-endpoint');
     setData(response.data);
   };
   ```

### 12.3 Padrões de Código

**Nomenclatura:**
- Componentes: PascalCase (`MeuComponente.jsx`)
- Arquivos CSS: kebab-case ou PascalCase (`meu-componente.css`)
- Funções: camelCase (`handleSubmit`, `fetchData`)
- Constantes: UPPER_CASE (`API_URL`)

**Estrutura de Componente:**
```javascript
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import "./MeuComponente.css";

const MeuComponente = () => {
  // Estados
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Hooks
  const navigate = useNavigate();
  
  // Funções
  const fetchDados = async () => {
    try {
      setLoading(true);
      const response = await api.get('/endpoint');
      setDados(response.data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Efeitos
  useEffect(() => {
    fetchDados();
  }, []);
  
  // Render
  return (
    <div className="container">
      <Sidebar />
      <main>
        {loading ? <p>Carregando...</p> : (
          // Conteúdo
        )}
      </main>
    </div>
  );
};

export default MeuComponente;
```

### 12.4 Boas Práticas

✅ **FAZER:**
- Usar async/await para requisições
- Implementar loading states
- Adicionar try/catch em chamadas API
- Validar formulários antes de enviar
- Usar confirmação para ações destrutivas
- Comentar código complexo
- Manter arquivos CSS separados por componente

❌ **NÃO FAZER:**
- Repetir código (DRY - Don't Repeat Yourself)
- Deixar console.log em produção
- Ignorar erros de API
- Criar componentes muito grandes
- Usar estilos inline excessivamente
- Armazenar senhas em texto puro

### 12.5 Git Workflow

```bash
# 1. Criar branch para nova feature
git checkout -b feature/nome-da-feature

# 2. Fazer alterações e commits
git add .
git commit -m "feat: Adiciona funcionalidade X"

# 3. Push para repositório
git push origin feature/nome-da-feature

# 4. Criar Pull Request no GitHub

# 5. Após aprovação, merge para main
```

**Convenção de Commits:**
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação de código
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 13. TROUBLESHOOTING

### 13.1 Problemas Comuns

**❌ Erro: "Não foi possível conectar à API"**
```
Solução:
1. Verificar se backend está rodando
2. Verificar URL em .env (VITE_API_URL)
3. Verificar CORS no backend
```

**❌ Erro: "idVoluntario não é reconhecido"**
```
Solução:
Usar minúsculas: idvoluntario (não idVoluntario)
Converter para número: parseInt(value)
```

**❌ Erro: "Rotas não funcionam após reload"**
```
Solução:
Verificar netlify.toml:
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**❌ Erro: "Variáveis de ambiente não carregam"**
```
Solução:
1. Variáveis devem começar com VITE_
2. Reiniciar servidor após alterar .env
3. Usar import.meta.env.VITE_NOME_DA_VARIAVEL
```

**❌ Build falha no Netlify**
```
Solução:
1. Verificar package.json (scripts de build)
2. Verificar vite.config.js
3. Verificar logs do Netlify
4. Garantir NODE_VERSION = "18" no netlify.toml
```

### 13.2 Logs e Debugging

**Console do Navegador:**
```javascript
console.log("Estado atual:", dados);
console.error("Erro ao buscar:", error);
```

**React DevTools:**
- Instalar extensão React Developer Tools
- Inspecionar componentes e estados

**Network Tab:**
- Verificar requisições à API
- Verificar status codes
- Verificar payloads

---

## 📊 ESTATÍSTICAS DO PROJETO

**Total de Páginas:** 12
- Login, Cadastro, Home
- Estoque, Criar Item
- Doações, Criar Doação
- Beneficiários, Criar Beneficiário
- Movimentos, Criar Movimento
- Relatórios

**Total de Componentes:** 3
- Sidebar
- ProtectedRoute
- HeaderNav (legado)

**Total de Serviços/Utilitários:** 2
- api.js
- iconesRoupas.js

**Linhas de Código:** ~3.500+

---

## 🔮 ROADMAP FUTURO

### Planejado para Próximas Versões

- [ ] **Autenticação JWT** - Migrar localStorage para JWT
- [ ] **Recuperação de senha** - Funcionalidade completa
- [ ] **Upload de imagens** - Fotos das peças
- [ ] **Filtros avançados** - Múltiplos critérios
- [ ] **Modo escuro** - Theme switcher
- [ ] **Exportar relatórios** - PDF/Excel
- [ ] **Notificações** - Toast messages
- [ ] **Paginação** - Para listas grandes
- [ ] **Gráficos** - Charts.js ou Recharts
- [ ] **Histórico de alterações** - Audit log
- [ ] **Sidebar colapsável** - Mobile/Desktop
- [ ] **Perfil de usuário** - Edição de dados
- [ ] **Permissões** - Diferentes níveis de acesso
- [ ] **PWA** - Progressive Web App
- [ ] **Testes** - Jest + React Testing Library

---

## 👥 EQUIPE DE DESENVOLVIMENTO

| Nome | Função |
|------|--------|
| Amabilly Barbosa Russo | Designer UX/UI |
| Fabíola Malman Nunes | Designer UX/UI |
| Gabrieli Machado Bianchin | Scrum Master, QA, Eng. Requisitos |
| Henrique Vicente Iha | Desenvolvedor Front-End |
| Herick Campos Calegari | Desenvolvedor Back-End |
| Vitor Hugo Klein | Desenvolvedor Front-End |

**Instituição:** Universidade Federal de Santa Catarina (UFSC)  
**Disciplina:** COM1029 - Oficina de Computação para a Comunidade  
**Semestre:** 2025/2

---

## 📞 CONTATO E SUPORTE

**Repositório:** [https://github.com/brunomouramathias/SANEM-BRANCHO](https://github.com/brunomouramathias/SANEM-BRANCHO)  
**E-mail:** brunomouramfs@gmail.com  
**Documentação:** Consultar arquivos .md na raiz do projeto

---

## 📄 LICENÇA

Sistema desenvolvido exclusivamente para a instituição SANEM.  
Todos os direitos reservados à equipe BRANCHÓ - 2025.

---

**Documento criado em:** 15/10/2025  
**Última revisão:** 15/10/2025  
**Versão da documentação:** 1.0.0

