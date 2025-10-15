import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: "",
    senha: ""
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.usuario || !formData.senha) {
      alert("Preencha todos os campos!");
      return;
    }

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
        navigate("/");
      } else {
        alert("Senha incorreta!");
      }
    } else {
      alert("Usuário não encontrado!");
    }
  };

  return (
    <div className="auth-container">
      {/* Lado esquerdo - Imagem */}
      <div className="auth-image-left">
        <h1 className="auth-brand">SANEM</h1>
      </div>

      {/* Lado direito - Formulário */}
      <div className="auth-form-right">
        <div className="auth-form-wrapper">
          <h1 className="auth-welcome">Bem-vindo ao nosso Brechó!</h1>
          
          <div className="auth-form-box">
            <h2 className="auth-form-title">Faça seu login</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="auth-input-group">
                <div className="auth-input-wrapper">
                  <svg className="auth-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <input
                    type="text"
                    name="usuario"
                    placeholder="Nome do usuário"
                    value={formData.usuario}
                    onChange={handleChange}
                    className="auth-input"
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <div className="auth-input-wrapper">
                  <svg className="auth-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    name="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                    className="auth-input auth-input-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-toggle-password"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
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
                <a href="#" className="auth-forgot-link">Esqueci minha senha</a>
              </div>

              <button type="submit" className="auth-btn-primary">
                Entrar
                <svg className="auth-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </button>

              <p className="auth-footer-text">
                Não tem conta? <a href="/cadastro" className="auth-link">Cadastre-se</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
