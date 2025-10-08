import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import "./Movimentos.css";

const Movimentos = () => {
  const [movimentos, setMovimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const navigate = useNavigate();

  const fetchMovimentos = async () => {
    try {
      setLoading(true);
      const response = await api.get("/movimento");
      setMovimentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar movimentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovimentos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este movimento?")) return;

    try {
      await api.delete(`/movimento/${id}`);
      await fetchMovimentos();
    } catch (error) {
      console.error("Erro ao deletar movimento:", error);
      alert("Não foi possível excluir o movimento.");
    }
  };

  const movimentosFiltrados = movimentos.filter(movimento => {
    if (filtroTipo === "todos") return true;
    return movimento.tipo?.toLowerCase() === filtroTipo;
  });

  const formatarData = (data) => {
    if (!data) return "N/A";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const getTipoClass = (tipo) => {
    const tipoLower = tipo?.toLowerCase();
    if (tipoLower === "entrada" || tipoLower === "doacao") return "tipo-entrada";
    if (tipoLower === "saida" || tipoLower === "entrega") return "tipo-saida";
    return "tipo-descarte";
  };

  return (
    <div className="estoque-container">
      <Sidebar />
      <main className="estoque-main">
        <div className="header-movimentos">
          <h2>Movimentações</h2>
          <button
            className="adicionar-btn"
            onClick={() => navigate("/criarMovimento")}
          >
            + Nova Movimentação
          </button>
        </div>

        <div className="filtros">
          <label htmlFor="filtro">Filtrar por tipo:</label>
          <select 
            id="filtro"
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
            <option value="doacao">Doação</option>
            <option value="entrega">Entrega</option>
            <option value="descarte">Descarte</option>
          </select>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : movimentosFiltrados.length === 0 ? (
          <p>Nenhuma movimentação encontrada.</p>
        ) : (
          <div className="tabela-wrapper">
            <table className="tabela-movimentos">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Voluntário</th>
                  <th>Beneficiário</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {movimentosFiltrados.map((movimento) => (
                  <tr key={movimento.idmovimento}>
                    <td data-label="ID">{movimento.idmovimento}</td>
                    <td data-label="Tipo">
                      <span className={`badge ${getTipoClass(movimento.tipo)}`}>
                        {movimento.tipo}
                      </span>
                    </td>
                    <td data-label="Voluntário">
                      {movimento.idvoluntario || "N/A"}
                    </td>
                    <td data-label="Beneficiário">
                      {movimento.idbeneficiario || "N/A"}
                    </td>
                    <td data-label="Data">
                      {formatarData(movimento.data)}
                    </td>
                    <td data-label="Ações">
                      <button 
                        className="btn-excluir"
                        onClick={() => handleDelete(movimento.idmovimento)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Movimentos;

