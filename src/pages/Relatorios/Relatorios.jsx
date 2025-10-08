import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import "./Relatorios.css";

const Relatorios = () => {
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({
    totalItens: 0,
    totalBeneficiarios: 0,
    totalVoluntarios: 0,
    totalMovimentos: 0,
    itensPorTipo: [],
    movimentosPorTipo: []
  });

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        const [itens, beneficiarios, voluntarios, movimentos] = await Promise.all([
          api.get("/item"),
          api.get("/beneficiario"),
          api.get("/voluntario"),
          api.get("/movimento")
        ]);

        // Agrupar itens por tipo
        const itensPorTipo = itens.data.reduce((acc, item) => {
          const tipo = item.tipo || "Não especificado";
          const existing = acc.find(i => i.tipo === tipo);
          if (existing) {
            existing.quantidade += item.quantidade || 0;
          } else {
            acc.push({ tipo, quantidade: item.quantidade || 0 });
          }
          return acc;
        }, []);

        // Agrupar movimentos por tipo
        const movimentosPorTipo = movimentos.data.reduce((acc, mov) => {
          const tipo = mov.tipo || "Não especificado";
          acc[tipo] = (acc[tipo] || 0) + 1;
          return acc;
        }, {});

        setDados({
          totalItens: itens.data.length,
          totalBeneficiarios: beneficiarios.data.length,
          totalVoluntarios: voluntarios.data.length,
          totalMovimentos: movimentos.data.length,
          itensPorTipo,
          movimentosPorTipo: Object.entries(movimentosPorTipo).map(([tipo, count]) => ({
            tipo,
            count
          }))
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  return (
    <div className="estoque-container">
      <Sidebar />
      <main className="estoque-main">
        <h2>Relatórios e Estatísticas</h2>
        
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="relatorios-content">
            {/* Cards de resumo */}
            <div className="cards-resumo">
              <div className="card">
                <h3>Total de Itens</h3>
                <p className="numero">{dados.totalItens}</p>
              </div>
              <div className="card">
                <h3>Beneficiários</h3>
                <p className="numero">{dados.totalBeneficiarios}</p>
              </div>
              <div className="card">
                <h3>Voluntários</h3>
                <p className="numero">{dados.totalVoluntarios}</p>
              </div>
              <div className="card">
                <h3>Movimentações</h3>
                <p className="numero">{dados.totalMovimentos}</p>
              </div>
            </div>

            {/* Itens por tipo */}
            <div className="secao-relatorio">
              <h3>Estoque por Tipo de Item</h3>
              <div className="tabela-relatorio">
                <table>
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.itensPorTipo.length === 0 ? (
                      <tr>
                        <td colSpan="2">Nenhum item cadastrado</td>
                      </tr>
                    ) : (
                      dados.itensPorTipo.map((item, index) => (
                        <tr key={index}>
                          <td>{item.tipo}</td>
                          <td>{item.quantidade}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Movimentos por tipo */}
            <div className="secao-relatorio">
              <h3>Movimentações por Tipo</h3>
              <div className="tabela-relatorio">
                <table>
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.movimentosPorTipo.length === 0 ? (
                      <tr>
                        <td colSpan="2">Nenhuma movimentação cadastrada</td>
                      </tr>
                    ) : (
                      dados.movimentosPorTipo.map((mov, index) => (
                        <tr key={index}>
                          <td className="capitalize">{mov.tipo}</td>
                          <td>{mov.count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Relatorios;

