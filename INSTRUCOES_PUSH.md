# 🔐 INSTRUÇÕES PARA PUSH NO GITHUB

## ⚠️ Erro Identificado

Ao tentar fazer `git push origin main`, foi retornado o seguinte erro:

```
remote: Permission to brunomouramathias/SANEM-BRANCHO.git denied to brunomourafbgb.
fatal: unable to access 'https://github.com/brunomouramathias/SANEM-BRANCHO.git/': The requested URL returned error: 403
```

---

## 🎯 O Problema

O Git está tentando usar as credenciais do usuário `brunomourafbgb`, mas o repositório pertence a `brunomouramathias`. Você precisa autenticar com a conta correta.

---

## ✅ Soluções

### **Solução 1: Autenticar com GitHub CLI (Recomendado)**

1. Instale o GitHub CLI se ainda não tiver:
   ```bash
   winget install GitHub.cli
   ```

2. Faça login com a conta correta:
   ```bash
   gh auth login
   ```
   - Escolha: **GitHub.com**
   - Escolha: **HTTPS**
   - Autentique via navegador ou token

3. Tente o push novamente:
   ```bash
   git push origin main
   ```

---

### **Solução 2: Usar Token de Acesso Pessoal (PAT)**

1. **Gerar Token no GitHub:**
   - Acesse: https://github.com/settings/tokens
   - Clique em "Generate new token (classic)"
   - Selecione os escopos: `repo`, `workflow`
   - Copie o token gerado

2. **Configurar Credenciais no Windows:**
   ```bash
   git config --global credential.helper manager-core
   ```

3. **Fazer Push (será solicitado usuário e senha):**
   ```bash
   git push origin main
   ```
   - **Username:** brunomouramathias (ou brunomouramfs@gmail.com)
   - **Password:** Cole o token gerado (não a senha do GitHub)

---

### **Solução 3: SSH (Mais Seguro)**

1. **Gerar Chave SSH:**
   ```bash
   ssh-keygen -t ed25519 -C "brunomouramfs@gmail.com"
   ```
   - Pressione Enter para aceitar o local padrão
   - Defina uma senha (opcional)

2. **Adicionar Chave ao SSH Agent:**
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. **Adicionar Chave ao GitHub:**
   - Copie a chave pública:
     ```bash
     cat ~/.ssh/id_ed25519.pub
     ```
   - Acesse: https://github.com/settings/keys
   - Clique em "New SSH key"
   - Cole a chave e salve

4. **Mudar URL do Repositório para SSH:**
   ```bash
   git remote set-url origin git@github.com:brunomouramathias/SANEM-BRANCHO.git
   ```

5. **Fazer Push:**
   ```bash
   git push origin main
   ```

---

## 🔍 Verificar Configurações Atuais

```bash
# Ver URL do repositório remoto
git remote -v

# Ver usuário configurado localmente
git config user.email
git config user.name

# Ver credenciais salvas
git config --list | grep credential
```

---

## ✅ Status Atual do Projeto

### Commit Realizado com Sucesso ✅
```
Commit: 2f0e5ae
Mensagem: fix: Corrige layout distorcido da tela de login no desktop
Email: brunomouramfs@gmail.com
Nome: Bruno Moura
```

### Arquivos Modificados:
- ✅ `CHANGELOG.md`
- ✅ `src/pages/Auth/Login.css`
- ✅ `src/pages/Auth/Login.jsx`
- ✅ `CORRECAO_LAYOUT_LOGIN.md` (novo arquivo)

### Próximo Passo:
**Após autenticar corretamente, execute:**
```bash
git push origin main
```

---

## 📞 Suporte

Se precisar de ajuda adicional, você pode:

1. **Verificar permissões no repositório:**
   - Acesse: https://github.com/brunomouramathias/SANEM-BRANCHO
   - Settings → Collaborators
   - Verifique se sua conta tem permissão de escrita

2. **Contatar o dono do repositório:**
   - Se você não for o dono, peça acesso ao administrador

3. **Fork o repositório:**
   - Se não tiver acesso, faça um fork e trabalhe no seu próprio repositório

---

## 🎉 Correções Implementadas (Prontas para Push)

✅ Layout de login corrigido  
✅ Split-screen 50/50 no desktop  
✅ Título "Bem-vindo ao nosso Brechó!" visível  
✅ Responsividade mantida  
✅ Documentação completa  
✅ CHANGELOG atualizado  
✅ Commit realizado localmente  
⏳ **Push para GitHub (aguardando autenticação)**

---

**Data:** 15/10/2025  
**Desenvolvedor:** Bruno Moura (brunomouramfs@gmail.com)  
**Status:** Commit local realizado, aguardando push

