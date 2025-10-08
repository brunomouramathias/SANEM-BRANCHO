import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import "./CriarMovimento.css";

const CriarMovimento = () => {
  const navigate = useNavigate();
  const [voluntarios, setVoluntarios] = useState([]);
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [formData, setFormData] = useState({
    tipo: "",
    idvoluntario: "",
    idbeneficiario: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [volResponse, benResponse] = await Promise.all([
          api.get("/voluntario"),
          api.get("/beneficiario")
        ]);
        setVoluntarios(volResponse.data);
        setBeneficiarios(benResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tipo) {
      alert("Tipo de movimento é obrigatório!");
      return;
    }

    try {
      const dataToSend = {
        tipo: formData.tipo,
        idvoluntario: formData.idvoluntario ? parseInt(formData.idvoluntario) : null,
        idbeneficiario: formData.idbeneficiario ? parseInt(formData.idbeneficiario) : null
      };

      await api.post("/movimento", dataToSend);
      alert("Movimentação cadastrada com sucesso!");
      navigate("/movimentos");
    } catch (error) {
      console.error("Erro ao criar movimento:", error);
      alert("Erro ao cadastrar movimentação. Tente novamente.");
    }
  };

  return (
    <div className="estoque-container">
      <Sidebar />
      <main className="estoque-main">
        <h2>Nova Movimentação</h2>
        <form onSubmit={handleSubmit} className="form-movimento">
          <div className="form-group">
            <label htmlFor="tipo">Tipo de Movimento *</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
              <option value="doacao">Doação</option>
              <option value="entrega">Entrega</option>
              <option value="descarte">Descarte</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idvoluntario">Voluntário</label>
            <select
              id="idvoluntario"
              name="idvoluntario"
              value={formData.idvoluntario}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              {voluntarios.map(vol => (
                <option key={vol.idvoluntario} value={vol.idvoluntario}>
                  {vol.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idbeneficiario">Beneficiário</label>
            <select
              id="idbeneficiario"
              name="idbeneficiario"
              value={formData.idbeneficiario}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              {beneficiarios.map(ben => (
                <option key={ben.idbeneficiario} value={ben.idbeneficiario}>
                  {ben.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Cadastrar
            </button>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => navigate("/movimentos")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CriarMovimento;

