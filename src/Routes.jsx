import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas de autenticação
import Login from "./pages/Auth/Login";
import Cadastro from "./pages/Auth/Cadastro";

// Páginas principais
import Home from "./pages/Home/index";
import Estoque from "./pages/Estoque/Estoque_M";
import CriarItem from "./pages/Estoque/CriarItem";

// Importações para doações
import Doacoes from "./pages/Doacao/Doacoes";
import CriarDoacao from "./pages/Doacao/CriarDoacao";

// Importações para beneficiários
import Beneficiarios from "./pages/Beneficiario/Beneficiarios";
import CriarBeneficiario from "./pages/Beneficiario/CriarBeneficiario";

// Importações para movimentos
import Movimentos from "./pages/Movimento/Movimentos";
import CriarMovimento from "./pages/Movimento/CriarMovimento";

// Importação para relatórios
import Relatorios from "./pages/Relatorios/Relatorios";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rotas de autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Rotas de estoque */}
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/criarItem" element={<CriarItem />} />

        {/* Rotas de doações */}
        <Route path="/doacao" element={<Doacoes />} />
        <Route path="/criarDoacao" element={<CriarDoacao />} />

        {/* Rotas de beneficiários */}
        <Route path="/beneficiarios" element={<Beneficiarios />} />
        <Route path="/criarBeneficiario" element={<CriarBeneficiario />} />

        {/* Rotas de movimentos */}
        <Route path="/movimentos" element={<Movimentos />} />
        <Route path="/criarMovimento" element={<CriarMovimento />} />

        {/* Rota de relatórios */}
        <Route path="/relatorios" element={<Relatorios />} />

        {/* Redireciona qualquer rota desconhecida para home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
