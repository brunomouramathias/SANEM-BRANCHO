import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

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
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas protegidas */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/estoque" element={
          <ProtectedRoute>
            <Estoque />
          </ProtectedRoute>
        } />
        
        <Route path="/criarItem" element={
          <ProtectedRoute>
            <CriarItem />
          </ProtectedRoute>
        } />

        {/* Rotas de doações */}
        <Route path="/doacao" element={
          <ProtectedRoute>
            <Doacoes />
          </ProtectedRoute>
        } />
        
        <Route path="/criarDoacao" element={
          <ProtectedRoute>
            <CriarDoacao />
          </ProtectedRoute>
        } />

        {/* Rotas de beneficiários */}
        <Route path="/beneficiarios" element={
          <ProtectedRoute>
            <Beneficiarios />
          </ProtectedRoute>
        } />
        
        <Route path="/criarBeneficiario" element={
          <ProtectedRoute>
            <CriarBeneficiario />
          </ProtectedRoute>
        } />

        {/* Rotas de movimentos */}
        <Route path="/movimentos" element={
          <ProtectedRoute>
            <Movimentos />
          </ProtectedRoute>
        } />
        
        <Route path="/criarMovimento" element={
          <ProtectedRoute>
            <CriarMovimento />
          </ProtectedRoute>
        } />

        {/* Rota de relatórios */}
        <Route path="/relatorios" element={
          <ProtectedRoute>
            <Relatorios />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
