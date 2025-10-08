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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");

    if (!formData.usuario || !formData.senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    // Simular login - em produção, verificar com backend
    const usuarioSalvo = localStorage.getItem("usuario_" + formData.usuario);
    
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      if (usuario.senha === formData.senha) {
        // Login bem-sucedido
        localStorage.setItem("usuarioLogado", JSON.stringify({
          nome: usuario.nome,
          email: usuario.email,
          cpf: usuario.cpf,
          telefone: usuario.telefone
        }));
        navigate("/");
      } else {
        setErro("Senha incorreta!");
      }
    } else {
      setErro("Usuário não encontrado!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="logo-sanem">SANEM</h1>
      </div>
      
      <div className="login-right">
        <div className="login-card">
          <h1>Bem-vindo ao nosso Brechó!</h1>
          <h2>Faça seu login</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="usuario">
                <i className="icon">👤</i>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Nome do usuário"
                  value={formData.usuario}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="input-group">
              <label htmlFor="senha">
                <i className="icon">🔒</i>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
              </label>
              <a href="#" className="esqueci-senha">Esqueci minha senha</a>
            </div>

            {erro && <p className="erro-mensagem">{erro}</p>}

            <button type="submit" className="btn-entrar">
              Entrar →
            </button>
          </form>

          <p className="cadastro-link">
            Não tem conta? <a href="/cadastro">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

