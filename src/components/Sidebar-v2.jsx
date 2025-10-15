import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar-v2.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Início", icon: "🏠", section: "Principal" },
    { to: "/estoque", label: "Estoque", icon: "👔", section: "Gestão" },
    { to: "/doacao", label: "Doações", icon: "🤝", section: "Gestão" },
    { to: "/beneficiarios", label: "Beneficiários", icon: "👥", section: "Gestão" },
    { to: "/movimentos", label: "Movimentações", icon: "📊", section: "Gestão" },
    { to: "/relatorios", label: "Relatórios", icon: "📈", section: "Análise" },
  ];

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair do sistema?")) {
      localStorage.removeItem("usuarioLogado");
      navigate("/login");
    }
  };

  // Agrupar itens por seção
  const sections = {};
  navItems.forEach(item => {
    if (!sections[item.section]) {
      sections[item.section] = [];
    }
    sections[item.section].push(item);
  });

  return (
    <aside className="sidebar" role="navigation" aria-label="Menu principal">
      {/* Header da Sidebar */}
      <div className="sidebar-header">
        <div className="sidebar-logo" aria-hidden="true">
          👕
        </div>
        <div className="sidebar-brand">
          <h1 className="sidebar-brand-name">SANEM</h1>
          <p className="sidebar-brand-tagline">Brechó Solidário</p>
        </div>
      </div>

      {/* Navegação */}
      <nav className="sidebar-nav">
        {Object.entries(sections).map(([sectionName, items]) => (
          <div key={sectionName}>
            <div className="nav-section-title">{sectionName}</div>
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-button ${
                  location.pathname === item.to ? "active" : ""
                }`}
                aria-current={location.pathname === item.to ? "page" : undefined}
              >
                <span className="icon" aria-hidden="true">{item.icon}</span>
                <span className="label">{item.label}</span>
                <span className="tooltip">{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
        
        {/* Botão de Logout */}
        <button 
          onClick={handleLogout} 
          className="nav-button logout-button"
          aria-label="Sair do sistema"
        >
          <span className="icon" aria-hidden="true">🚪</span>
          <span className="label">Sair</span>
          <span className="tooltip">Sair</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

