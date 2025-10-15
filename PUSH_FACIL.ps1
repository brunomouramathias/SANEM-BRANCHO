# Script PowerShell para fazer push no GitHub - SUPER SIMPLES

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  PUSH AUTOMATICO PARA GITHUB" -ForegroundColor Cyan  
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Passo 1: Abrir GitHub para gerar token
Write-Host "PASSO 1: Gerando token..." -ForegroundColor Yellow
Write-Host "Abrindo GitHub no navegador..."
Write-Host ""

Start-Process "https://github.com/settings/tokens/new"
Start-Sleep -Seconds 3

# Mostrar instruções
Write-Host "====================================" -ForegroundColor Green
Write-Host "  INSTRUCOES NO NAVEGADOR:" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Note: Digite 'SANEM-Push'" -ForegroundColor White
Write-Host "2. Expiration: 90 days" -ForegroundColor White  
Write-Host "3. Marque: repo (todas as opcoes)" -ForegroundColor White
Write-Host "4. Clique: Generate token" -ForegroundColor White
Write-Host "5. COPIE o token (comeca com ghp_)" -ForegroundColor White
Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Passo 2: Pedir o token
Write-Host "PASSO 2: Cole o token aqui" -ForegroundColor Yellow
Write-Host ""
$token = Read-Host "Cole o token e pressione Enter"

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host ""
    Write-Host "Erro: Token vazio!" -ForegroundColor Red
    pause
    exit
}

# Passo 3: Fazer push
Write-Host ""
Write-Host "PASSO 3: Fazendo push..." -ForegroundColor Yellow
Write-Host ""

$url = "https://$token@github.com/brunomouramathias/SANEM-BRANCHO.git"

git push $url main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "  PUSH BEM-SUCEDIDO!" -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Commits enviados ao GitHub!" -ForegroundColor White
    Write-Host "Netlify vai fazer deploy em 2-3 minutos" -ForegroundColor White
    Write-Host ""
    Write-Host "Teste depois em:" -ForegroundColor White
    Write-Host "https://sistema-sanem.netlify.app/login" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Erro no push!" -ForegroundColor Red
    Write-Host "Verifique o token e tente novamente." -ForegroundColor Red
    Write-Host ""
}

Write-Host "====================================="
Write-Host ""
pause
