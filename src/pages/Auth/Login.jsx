import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: "",
    senha: ""
  });
  const [erro, setErro] = useState("");
  const [erros, setErros] = useState({});
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [lembrarMe, setLembrarMe] = useState(false);

  const validarCampo = (name, value) => {
    switch (name) {
      case "usuario":
        if (!value.trim()) {
          return "Nome de usuário é obrigatório";
        }
        if (value.length < 3) {
          return "Nome de usuário deve ter pelo menos 3 caracteres";
        }
        return "";
      case "senha":
        if (!value) {
          return "Senha é obrigatória";
        }
        if (value.length < 6) {
          return "Senha deve ter pelo menos 6 caracteres";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo ao digitar
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    if (erro) {
      setErro("");
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const erroValidacao = validarCampo(name, value);
    if (erroValidacao) {
      setErros(prev => ({
        ...prev,
        [name]: erroValidacao
      }));
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setErros({});

    // Validar todos os campos
    const novosErros = {};
    Object.keys(formData).forEach(campo => {
      const erroValidacao = validarCampo(campo, formData[campo]);
      if (erroValidacao) {
        novosErros[campo] = erroValidacao;
      }
    });

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setCarregando(true);

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Simular login - em produção, verificar com backend
      const usuarioSalvo = localStorage.getItem("usuario_" + formData.usuario);

      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        if (usuario.senha === formData.senha) {
          // Login bem-sucedido
          const dadosUsuario = {
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf,
            telefone: usuario.telefone
          };
          
          if (lembrarMe) {
            localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));
          } else {
            sessionStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));
          }
          
          navigate("/");
        } else {
          setErro("Credenciais inválidas. Verifique seus dados e tente novamente.");
        }
      } else {
        setErro("Credenciais inválidas. Verifique seus dados e tente novamente.");
      }
    } catch (error) {
      setErro("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Seção da imagem - Desktop */}
        <div className="login-image-section" aria-hidden="true">
          <div className="login-image-overlay">
            <h1 className="login-brand">SANEM</h1>
          </div>
        </div>

        {/* Seção do formulário */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <header className="login-header">
              <h1 className="login-title">Bem-vindo ao nosso Brechó!</h1>
              <p className="login-subtitle">Entre com suas credenciais para continuar</p>
            </header>

            <div className="login-card">
              <form onSubmit={handleSubmit} noValidate>
                {/* Mensagem de erro geral */}
                {erro && (
                  <div 
                    className="alert alert-error" 
                    role="alert"
                    aria-live="assertive"
                  >
                    <svg className="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{erro}</span>
                  </div>
                )}

                {/* Campo de usuário */}
                <div className="form-group">
                  <label htmlFor="usuario" className="form-label">
                    Nome de usuário
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <input
                      type="text"
                      id="usuario"
                      name="usuario"
                      className={`form-input ${erros.usuario ? 'form-input-error' : ''}`}
                      placeholder="Digite seu nome de usuário"
                      value={formData.usuario}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="username"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      disabled={carregando}
                      required
                      aria-required="true"
                      aria-invalid={erros.usuario ? "true" : "false"}
                      aria-describedby={erros.usuario ? "usuario-error" : undefined}
                    />
                  </div>
                  {erros.usuario && (
                    <p className="form-error" id="usuario-error" role="alert">
                      {erros.usuario}
                    </p>
                  )}
                </div>

                {/* Campo de senha */}
                <div className="form-group">
                  <label htmlFor="senha" className="form-label">
                    Senha
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <input
                      type={mostrarSenha ? "text" : "password"}
                      id="senha"
                      name="senha"
                      className={`form-input form-input-with-toggle ${erros.senha ? 'form-input-error' : ''}`}
                      placeholder="Digite sua senha"
                      value={formData.senha}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      disabled={carregando}
                      required
                      aria-required="true"
                      aria-invalid={erros.senha ? "true" : "false"}
                      aria-describedby={erros.senha ? "senha-error" : undefined}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={toggleMostrarSenha}
                      disabled={carregando}
                      aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                      tabIndex="0"
                    >
                      {mostrarSenha ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {erros.senha && (
                    <p className="form-error" id="senha-error" role="alert">
                      {erros.senha}
                    </p>
                  )}
                </div>

                {/* Lembrar-me e Esqueci a senha */}
                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={lembrarMe}
                      onChange={(e) => setLembrarMe(e.target.checked)}
                      disabled={carregando}
                    />
                    <span className="checkbox-text">Lembrar-me</span>
                  </label>
                  <a href="/recuperar-senha" className="link-forgot">
                    Esqueci minha senha
                  </a>
                </div>

                {/* Botão de submit */}
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={carregando}
                  aria-busy={carregando}
                >
                  {carregando ? (
                    <>
                      <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Entrando...</span>
                    </>
                  ) : (
                    <>
                      <span>Entrar</span>
                      <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Link para cadastro */}
                <p className="form-footer">
                  Não tem conta?{" "}
                  <a href="/cadastro" className="link-signup">
                    Cadastre-se
                  </a>
                </p>
              </form>
            </div>

            {/* Logo mobile - aparece apenas em mobile */}
            <div className="login-brand-mobile" aria-hidden="true">
              <span className="brand-text">SANEM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
