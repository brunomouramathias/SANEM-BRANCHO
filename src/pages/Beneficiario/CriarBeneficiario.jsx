import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import "./CriarBeneficiario.css";

const CriarBeneficiario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.cpf) {
      alert("Nome e CPF são obrigatórios!");
      return;
    }

    try {
      await api.post("/beneficiario", formData);
      alert("Beneficiário cadastrado com sucesso!");
      navigate("/beneficiarios");
    } catch (error) {
      console.error("Erro ao criar beneficiário:", error);
      alert("Erro ao cadastrar beneficiário. Tente novamente.");
    }
  };

  return (
    <div className="estoque-container">
      <Sidebar />
      <main className="estoque-main">
        <h2>Cadastrar Beneficiário</h2>
        <form onSubmit={handleSubmit} className="form-beneficiario">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite o nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF *</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              maxLength="14"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <textarea
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Rua, número, bairro, cidade"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Cadastrar
            </button>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => navigate("/beneficiarios")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CriarBeneficiario;

