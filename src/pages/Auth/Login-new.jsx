import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login-new.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
    lembrarMe: false
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpar erro do campo ao digitar
    if (erros[name]) {
      setErros(prev => ({ ...prev, [name]: null }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};
    
    if (!formData.usuario.trim()) {
      novosErros.usuario = "O nome de usuário é obrigatório";
    }
    
    if (!formData.senha) {
      novosErros.senha = "A senha é obrigatória";
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);
    setAlert(null);

    // Simular delay de autenticação (para mostrar loading)
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const usuarioSalvo = localStorage.getItem("usuario_" + formData.usuario);

      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        if (usuario.senha === formData.senha) {
          localStorage.setItem("usuarioLogado", JSON.stringify({
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf,
            telefone: usuario.telefone
          }));
          
          setAlert({
            type: 'success',
            title: 'Login realizado!',
            message: 'Redirecionando para o sistema...'
          });
          
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setErros({ senha: "Senha incorreta" });
          setAlert({
            type: 'error',
            title: 'Erro de autenticação',
            message: 'A senha informada está incorreta.'
          });
        }
      } else {
        setErros({ usuario: "Usuário não encontrado" });
        setAlert({
          type: 'error',
          title: 'Usuário não encontrado',
          message: 'Não existe cadastro com este nome de usuário.'
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Erro',
        message: 'Ocorreu um erro ao tentar fazer login.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Decorações de fundo */}
      <div className="auth-decoration auth-decoration-1" />
      <div className="auth-decoration auth-decoration-2" />
      
      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo" aria-label="Logo SANEM">
              ❤️
            </div>
            <h1 className="auth-title">Bem-vindo de volta!</h1>
            <p className="auth-subtitle">Entre com suas credenciais para acessar o sistema</p>
          </div>

          {/* Alert */}
          {alert && (
            <div className={`auth-alert auth-alert-${alert.type}`} role="alert">
              <span className="auth-alert-icon" aria-hidden="true">
                {alert.type === 'success' ? '✓' : '⚠'}
              </span>
              <div className="auth-alert-content">
                <div className="auth-alert-title">{alert.title}</div>
                <div className="auth-alert-message">{alert.message}</div>
              </div>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {/* Campo Usuário */}
            <div className="form-group">
              <label htmlFor="usuario" className="form-label">
                Nome de usuário <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Digite seu usuário"
                  value={formData.usuario}
                  onChange={handleChange}
                  className={`form-input ${erros.usuario ? 'form-input-error' : ''}`}
                  autoComplete="username"
                  autoFocus
                  disabled={loading}
                />
              </div>
              {erros.usuario && (
                <div className="form-error" role="alert">{erros.usuario}</div>
              )}
            </div>

            {/* Campo Senha */}
            <div className="form-group">
              <label htmlFor="senha" className="form-label">
                Senha <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`form-input ${erros.senha ? 'form-input-error' : ''}`}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  disabled={loading}
                >
                  {mostrarSenha ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  )}
                </button>
              </div>
              {erros.senha && (
                <div className="form-error" role="alert">{erros.senha}</div>
              )}
            </div>

            {/* Lembrar-me e Esqueci senha */}
            <div className="form-links">
              <div className="form-checkbox-wrapper">
                <input
                  type="checkbox"
                  id="lembrarMe"
                  name="lembrarMe"
                  checked={formData.lembrarMe}
                  onChange={handleChange}
                  className="form-checkbox"
                  disabled={loading}
                />
                <label htmlFor="lembrarMe" className="form-checkbox-label">
                  Lembrar-me
                </label>
              </div>
              <a href="#" className="forgot-password">
                Esqueci minha senha
              </a>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span className="auth-divider-text">ou</span>
          </div>

          {/* Footer */}
          <div className="auth-footer">
            Não tem uma conta?{' '}
            <a href="/cadastro" className="auth-footer-link">
              Cadastre-se gratuitamente
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

