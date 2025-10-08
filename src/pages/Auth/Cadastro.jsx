import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    confirmarSenha: ""
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

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

    // Validações
    if (!formData.nome || !formData.email || !formData.cpf || !formData.telefone || !formData.senha || !formData.confirmarSenha) {
      setErro("Preencha todos os campos!");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    if (formData.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    // Salvar usuário no localStorage (simulação)
    const usuario = {
      nome: formData.nome,
      email: formData.email,
      cpf: formData.cpf,
      telefone: formData.telefone,
      senha: formData.senha
    };

    localStorage.setItem("usuario_" + formData.nome, JSON.stringify(usuario));
    
    setSucesso(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-left">
        <div className="cadastro-card">
          <h1>Faça seu cadastro</h1>

          {sucesso ? (
            <div className="sucesso-mensagem">
              ✅ Cadastro realizado com sucesso! Redirecionando...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="nome">
                  <i className="icon">👤</i>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Nome do usuário"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="input-group">
                <label htmlFor="email">
                  <i className="icon">📧</i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="input-group">
                <label htmlFor="cpf">
                  <i className="icon">📄</i>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={handleChange}
                    maxLength="14"
                  />
                </label>
              </div>

              <div className="input-group">
                <label htmlFor="telefone">
                  <i className="icon">📞</i>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
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
              </div>

              <div className="input-group">
                <label htmlFor="confirmarSenha">
                  <i className="icon">🔒</i>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Confirme senha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                  />
                </label>
              </div>

              {erro && <p className="erro-mensagem">{erro}</p>}

              <button type="submit" className="btn-cadastrar">
                Cadastrar →
              </button>
            </form>
          )}

          <p className="login-link">
            Já tem conta? <a href="/login">Faça login</a>
          </p>
        </div>
      </div>
      
      <div className="cadastro-right">
        <h1 className="logo-sanem">SANEM</h1>
      </div>
    </div>
  );
};

export default Cadastro;

