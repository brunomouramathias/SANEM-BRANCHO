import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import { getIconeRoupa, getCategoriaColor } from "../../utils/iconesRoupas";
import "./style.css";

const Estoque = () => {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modelo, setModelo] = useState("");
  const [categoria, setCategoria] = useState("");

  const navigate = useNavigate();

  const fetchItens = async () => {
    try {
      setLoading(true);
      const response = await api.get("/item");
      setItens(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItens();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este item?")) return;

    try {
      await api.delete(`/item/${id}`);
      await fetchItens(); // 🔁 atualiza a lista após a exclusão
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      alert("Não foi possível excluir o item.");
    }
  };

  const itensFiltrados = itens.filter((item) => {
    const termo = search.toLowerCase();
    const tipoMatch = item.tipo.toLowerCase().includes(termo);
    const categoriaMatch = item.categoria?.toLowerCase().includes(termo);
    const modeloFiltro = modelo ? item.tipo === modelo : true;
    const categoriaFiltro = categoria ? item.categoria === categoria : true;

    return (tipoMatch || categoriaMatch) && modeloFiltro && categoriaFiltro;
  });

  return (
    <div className="estoque-container">
      <Sidebar />
      <main className="estoque-main">
        <div className="estoque-header">
          <div className="estoque-actions">
            <input
              type="text"
              placeholder="🔍 Pesquise aqui"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="select-filtro"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            >
              <option value="">Modelo</option>
              <option value="camiseta">Camiseta</option>
              <option value="bermuda">Bermuda</option>
              <option value="jaqueta">Jaqueta</option>
            </select>

            <select
              className="select-filtro"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Categoria</option>
              <option value="infantil">Infantil</option>
              <option value="adulto">Adulto</option>
              <option value="unissex">Unissex</option>
            </select>

            <button
              className="btn-registrar"
              onClick={() => navigate("/criarItem")}
            >
              + Registrar peça
            </button>
          </div>
        </div>

        {loading ? (
          <p>Carregando estoque...</p>
        ) : (
          <div className="grid">
            {itensFiltrados.map((item) => (
              <div 
                key={item.iditem} 
                className="item-card"
                style={{ borderTopColor: getCategoriaColor(item.tipo), borderTopWidth: '4px', borderTopStyle: 'solid' }}
              >
                <button
                  className="btn-excluir"
                  onClick={() => {
                    console.log("Item:", item);
                    handleDelete(item.iditem);
                  }}
                >
                  ❌
                </button>
                <div className="item-icon" style={{ fontSize: '60px', margin: '10px 0' }}>
                  {getIconeRoupa(item.tipo)}
                </div>
                <h3>{item.tipo}</h3>
                <p>
                  <strong>Tam:</strong> {item.tamanho}
                </p>
                <p>
                  <strong>Quantidade:</strong> {item.quantidade}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Estoque;
