# 🚀 Guia de Deploy no Netlify - BRANCHó

## 📋 Pré-requisitos

1. Conta no [Netlify](https://www.netlify.com/) (gratuita)
2. Repositório do front-end no GitHub
3. Backend rodando em algum servidor (Heroku, Render, Railway, etc.)

---

## 🎯 Método 1: Deploy via Git (Recomendado)

### Passo 1: Preparar o Repositório

1. Certifique-se de que todas as alterações estão commitadas no GitHub
2. Verifique se o arquivo `netlify.toml` está na raiz do projeto frontend

### Passo 2: Conectar ao Netlify

1. Acesse [app.netlify.com](https://app.netlify.com/)
2. Clique em **"Add new site"** > **"Import an existing project"**
3. Escolha **GitHub** como provedor
4. Autorize o Netlify a acessar seus repositórios
5. Selecione o repositório **BRANCH--WEB**

### Passo 3: Configurar Build

O Netlify vai detectar automaticamente as configurações do `netlify.toml`, mas confirme:

- **Base directory**: deixe em branco ou `frontend` (se o repo tiver front e back)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

### Passo 4: Variáveis de Ambiente

1. No painel do Netlify, vá em **Site settings** > **Environment variables**
2. Adicione a variável:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://seu-backend-em-producao.com` (URL do seu backend)

### Passo 5: Deploy

1. Clique em **Deploy site**
2. Aguarde o build finalizar (1-3 minutos)
3. Acesse a URL fornecida pelo Netlify!

---

## 🎯 Método 2: Deploy Manual (Drag & Drop)

### Passo 1: Build Local

```bash
cd C:\projeto-sanem\frontend
npm run build
```

### Passo 2: Deploy no Netlify

1. Acesse [app.netlify.com](https://app.netlify.com/)
2. Arraste a pasta **`dist`** para a área de deploy
3. Aguarde o upload
4. Site está no ar!

⚠️ **Nota**: Com deploy manual, você precisa fazer upload toda vez que fizer alterações.

---

## 🔧 Configurações Importantes

### Atualizar URL do Backend

Antes de fazer deploy, você DEVE atualizar a URL da API:

1. Edite o arquivo `src/services/api.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  // Produção
  baseURL: import.meta.env.VITE_API_URL || 'https://seu-backend.herokuapp.com',
  
  // OU para desenvolvimento, mantenha:
  // baseURL: 'http://localhost:13002',
});

export default api;
```

2. Ou crie um arquivo `.env.production`:

```
VITE_API_URL=https://seu-backend-em-producao.com
```

### Domínio Customizado (Opcional)

1. No Netlify, vá em **Domain settings**
2. Clique em **Add custom domain**
3. Siga as instruções para configurar DNS

---

## 🐛 Problemas Comuns

### ❌ Erro 404 ao navegar

**Solução**: Verifique se o arquivo `public/_redirects` existe com o conteúdo:
```
/*    /index.html   200
```

### ❌ API não conecta

**Solução**: 
1. Verifique se a variável `VITE_API_URL` está configurada
2. Certifique-se de que o backend tem CORS habilitado
3. Backend deve aceitar requisições da URL do Netlify

### ❌ Build falha

**Solução**:
1. Verifique se `package.json` tem todos os scripts necessários
2. Teste o build localmente: `npm run build`
3. Verifique logs no Netlify para ver o erro específico

---

## 📊 Pós-Deploy

### Verificar Funcionamento

1. ✅ Homepage carrega
2. ✅ Navegação entre páginas funciona
3. ✅ API retorna dados (verificar no console do navegador)
4. ✅ Todas as páginas são acessíveis:
   - `/estoque`
   - `/doacao`
   - `/beneficiarios`
   - `/movimentos`
   - `/relatorios`

### URLs de Exemplo

Após o deploy, seu site estará disponível em:
```
https://seu-site.netlify.app
```

Você pode personalizar o subdomínio em **Site settings** > **Site details** > **Change site name**

---

## 🔄 Atualizações

Com deploy via Git:
- Basta fazer `git push` no GitHub
- Netlify faz deploy automático!

Com deploy manual:
- Rode `npm run build`
- Arraste a pasta `dist` novamente

---

## 📝 Checklist Final

- [ ] Arquivo `netlify.toml` na raiz do frontend
- [ ] Arquivo `public/_redirects` configurado
- [ ] URL do backend configurada (`VITE_API_URL`)
- [ ] Backend com CORS habilitado
- [ ] Build testado localmente
- [ ] Repositório no GitHub atualizado
- [ ] Variáveis de ambiente configuradas no Netlify
- [ ] Site testado após deploy

---

## 💡 Dicas

1. **Cache**: O Netlify faz cache. Se algo não atualizar, limpe o cache em **Deploys** > **Trigger deploy** > **Clear cache and deploy**

2. **Logs**: Sempre verifique os logs de build em caso de erro

3. **Preview**: Netlify cria URLs de preview para cada branch/PR

4. **SSL**: HTTPS é automático e gratuito! 🎉

---

**Última atualização:** 08/10/2025
**Status:** ✅ Pronto para deploy!

