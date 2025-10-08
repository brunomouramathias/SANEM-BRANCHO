# 📝 CHANGELOG - Projeto SANEM BRANCHó

Todas as mudanças importantes do projeto serão documentadas aqui.

---

## [08/10/2025] - Sistema de Autenticação + Ícones + Correções

### ✅ Adicionado

#### 🔐 Sistema de Login e Cadastro
- **Tela de Login** (`/login`)
  - Design conforme mockup fornecido
  - Validação de campos
  - Autenticação via localStorage (simulação)
  - Link para cadastro
  - Link "Esqueci minha senha"
  
- **Tela de Cadastro** (`/cadastro`)
  - Formulário completo (Nome, Email, CPF, Telefone, Senha)
  - Validação de senha (mínimo 6 caracteres)
  - Confirmação de senha
  - Feedback visual de sucesso
  - Redirecionamento automático após cadastro

#### 🔒 Proteção de Rotas
- Componente `ProtectedRoute` criado
- Todas as rotas principais agora requerem autenticação
- Redirecionamento automático para `/login` se não autenticado

#### 🚪 Sistema de Logout
- Botão de logout adicionado na Sidebar
- Confirmação antes de sair
- Limpeza de dados do localStorage

#### 🎨 Ícones de Roupas
- Arquivo utilitário `iconesRoupas.js` criado
- Mapeamento automático de 20+ tipos de roupas para emojis:
  - 👕 Camisas e Camisetas
  - 👖 Calças e Jeans
  - 👗 Vestidos
  - 🧥 Agasalhos e Casacos
  - 👞 Sapatos e Tênis
  - 🩳 Shorts e Bermudas
  - E mais...
- Cores por categoria nas bordas dos cards
- Visual mais intuitivo e moderno

### 🐛 Corrigido

#### Erro de Movimentação
- **Problema**: Ao cadastrar movimentação, estava dando erro
- **Causa**: Campos enviados com letra maiúscula (`idVoluntario`) em vez de minúscula (`idvoluntario`)
- **Solução**: 
  - Campos corrigidos para minúsculas
  - Adicionado `parseInt()` para garantir tipo numérico
  - Movimentações agora funcionam corretamente

### 📦 Dependências
- `react-icons` instalado (suporte futuro para ícones)

---

## [08/10/2025] - Versão Inicial

### ✅ Adicionado
- Página de Beneficiários (listar e criar)
- Página de Movimentos (listar e criar)
- Página de Relatórios com dashboard
- Responsividade mobile completa
- Configuração para deploy no Netlify
- Documentação completa

---

## 📊 Estatísticas do Projeto

**Páginas totais:** 14
- Home
- Login ✨ NOVO
- Cadastro ✨ NOVO
- Estoque
- Criar Item
- Doações
- Criar Doação
- Beneficiários
- Criar Beneficiário
- Movimentos
- Criar Movimento
- Relatórios

**Componentes:** 3
- Sidebar (com logout) ✨ ATUALIZADO
- HeaderNav
- ProtectedRoute ✨ NOVO

**Utilitários:** 2
- api.js
- iconesRoupas.js ✨ NOVO

---

## 🔄 Próximas Atualizações Planejadas

- [ ] Integração com backend real (JWT)
- [ ] Recuperação de senha funcional
- [ ] Upload de imagens das peças
- [ ] Filtros avançados com ícones
- [ ] Modo escuro
- [ ] Exportar relatórios em PDF

---

## 📝 Notas de Desenvolvimento

### Autenticação
- Atualmente usa localStorage (simulação)
- Pronto para integração com backend JWT
- Tokens podem ser facilmente implementados

### Ícones
- Sistema extensível (fácil adicionar novos tipos)
- Cores personalizáveis por categoria
- Performance otimizada

---

**Última atualização:** 08/10/2025 11:30  
**Versão:** 2.0.0  
**Desenvolvedor:** Bruno Moura (brunomouramfs@gmail.com)

