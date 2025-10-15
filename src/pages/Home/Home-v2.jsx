import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar-v2";
import api from "../../services/api";
import "./Home-v2.css";

function Home() {
  const [stats, setStats] = useState({
    totalItens: 0,
    totalBeneficiarios: 0,
    totalDoacoes: 0,
    totalMovimentos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [itens, beneficiarios, movimentos] = await Promise.all([
          api.get("/item"),
          api.get("/beneficiario"),
          api.get("/movimento")
        ]);

        const doacoes = movimentos.data.filter(m => 
          m.tipo?.toLowerCase() === "doacao" || 
          m.tipo?.toLowerCase() === "entrada"
        );

        setStats({
          totalItens: itens.data.reduce((sum, item) => sum + (item.quantidade || 0), 0),
          totalBeneficiarios: beneficiarios.data.length,
          totalDoacoes: doacoes.length,
          totalMovimentos: movimentos.data.length
        });
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      to: "/criarDoacao",
      icon: "🤝",
      title: "Registrar Doação",
      description: "Adicione uma nova doação ao sistema"
    },
    {
      to: "/criarItem",
      icon: "👔",
      title: "Cadastrar Peça",
      description: "Adicione um novo item ao estoque"
    },
    {
      to: "/criarBeneficiario",
      icon: "👥",
      title: "Novo Beneficiário",
      description: "Cadastre um novo beneficiário"
    },
    {
      to: "/criarMovimento",
      icon: "📊",
      title: "Nova Movimentação",
      description: "Registre entrada ou saída"
    }
  ];

  return (
    <div className="home-wrapper">
      <Sidebar />
      <div className="home-container">
        {/* Hero Section */}
        <section className="home-hero">
          <div className="hero-content">
            <h1 className="hero-title">Bem-vindo ao SANEM!</h1>
            <p className="hero-subtitle">Transformando vidas através da solidariedade</p>
            
            {!loading && (
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-value">{stats.totalItens}</span>
                  <span className="hero-stat-label">Peças em estoque</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">{stats.totalDoacoes}</span>
                  <span className="hero-stat-label">Doações recebidas</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">{stats.totalBeneficiarios}</span>
                  <span className="hero-stat-label">Beneficiários</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Dashboard Content */}
        <div className="home-content">
          {/* Estatísticas Detalhadas */}
          <section>
            <div className="section-header">
              <h2 className="section-title">Estatísticas</h2>
              <p className="section-subtitle">Visão geral do sistema</p>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <div className="stats-grid">
                <div className="stat-card primary">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">👔</div>
                  </div>
                  <div className="stat-card-value">{stats.totalItens}</div>
                  <div className="stat-card-label">Peças em Estoque</div>
                  <div className="stat-card-trend trend-positive">
                    ↑ Atualizado agora
                  </div>
                </div>

                <div className="stat-card success">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">🤝</div>
                  </div>
                  <div className="stat-card-value">{stats.totalDoacoes}</div>
                  <div className="stat-card-label">Doações Recebidas</div>
                  <div className="stat-card-trend trend-positive">
                    ↑ Este mês
                  </div>
                </div>

                <div className="stat-card warning">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">👥</div>
                  </div>
                  <div className="stat-card-value">{stats.totalBeneficiarios}</div>
                  <div className="stat-card-label">Beneficiários Cadastrados</div>
                  <div className="stat-card-trend trend-positive">
                    ↑ Total
                  </div>
                </div>

                <div className="stat-card info">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">📊</div>
                  </div>
                  <div className="stat-card-value">{stats.totalMovimentos}</div>
                  <div className="stat-card-label">Movimentações Totais</div>
                  <div className="stat-card-trend trend-positive">
                    ↑ Todas
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Ações Rápidas */}
          <section>
            <div className="section-header">
              <h2 className="section-title">Ações Rápidas</h2>
              <p className="section-subtitle">Acesso rápido às principais funcionalidades</p>
            </div>

            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.to}
                  className="action-card"
                >
                  <div className="action-card-icon">{action.icon}</div>
                  <h3 className="action-card-title">{action.title}</h3>
                  <p className="action-card-description">{action.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Atividades Recentes */}
          <section className="activity-section">
            <div className="section-header">
              <h2 className="section-title">Atividades Recentes</h2>
              <p className="section-subtitle">Últimas movimentações do sistema</p>
            </div>

            <ul className="activity-list">
              <li className="activity-item">
                <div className="activity-icon">🤝</div>
                <div className="activity-content">
                  <div className="activity-title">Nova doação registrada</div>
                  <div className="activity-description">
                    10 peças de roupa adicionadas ao estoque
                  </div>
                </div>
                <div className="activity-time">Hoje, 14:30</div>
              </li>
              <li className="activity-item">
                <div className="activity-icon">👥</div>
                <div className="activity-content">
                  <div className="activity-title">Beneficiário cadastrado</div>
                  <div className="activity-description">
                    Novo beneficiário adicionado ao sistema
                  </div>
                </div>
                <div className="activity-time">Hoje, 13:15</div>
              </li>
              <li className="activity-item">
                <div className="activity-icon">📦</div>
                <div className="activity-content">
                  <div className="activity-title">Entrega realizada</div>
                  <div className="activity-description">
                    5 peças entregues a beneficiários
                  </div>
                </div>
                <div className="activity-time">Ontem, 16:45</div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;

