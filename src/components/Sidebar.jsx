import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Estoque_Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Início", icon: "🏠" },
    { to: "/estoque", label: "Estoque", icon: "📦" },
    { to: "/doacao", label: "Doação", icon: "❤️" },
    { to: "/beneficiarios", label: "Beneficiários", icon: "👥" },
    { to: "/movimentos", label: "Movimentos", icon: "📋" },
    { to: "/relatorios", label: "Relatórios", icon: "📊" },
  ];

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      localStorage.removeItem("usuarioLogado");
      navigate("/login");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">SANEM</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`nav-button ${
              location.pathname === item.to ? "active" : ""
            }`}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </Link>
        ))}
        
        <button onClick={handleLogout} className="nav-button logout-button">
          <span className="icon">🚪</span>
          <span className="label">Sair</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
