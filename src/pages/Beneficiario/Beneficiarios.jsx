import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import "./Beneficiarios.css";

const Beneficiarios = () => {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBeneficiarios = async () => {
    try {
      setLoading(true);
      const response = await api.get("/beneficiario");
      setBeneficiarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar beneficiários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeneficiarios();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este beneficiário?")) return;

    try {
      await api.delete(`/beneficiario/${id}`);
      await fetchBeneficiarios();
    } catch (error) {
      console.error("Erro ao deletar beneficiário:", error);
      alert("Não foi possível excluir o beneficiário.");
    }
  };

  return (
    <div className="estoque-container">
      <Sidebar />
      <main className="estoque-main">
        <h2>Beneficiários</h2>
        <button
          className="adicionar-btn"
          onClick={() => navigate("/criarBeneficiario")}
        >
          + Adicionar Beneficiário
        </button>

        {loading ? (
          <p>Carregando...</p>
        ) : beneficiarios.length === 0 ? (
          <p>Nenhum beneficiário encontrado.</p>
        ) : (
          <table className="tabela-beneficiarios">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {beneficiarios.map((beneficiario) => (
                <tr key={beneficiario.idbeneficiario}>
                  <td>{beneficiario.idbeneficiario}</td>
                  <td>{beneficiario.nome}</td>
                  <td>{beneficiario.cpf}</td>
                  <td>{beneficiario.telefone || "N/A"}</td>
                  <td>
                    <button 
                      className="btn-excluir"
                      onClick={() => handleDelete(beneficiario.idbeneficiario)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Beneficiarios;

