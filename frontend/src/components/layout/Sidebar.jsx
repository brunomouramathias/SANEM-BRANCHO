import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  UserCog,
  TruckIcon,
  History,
  FileText,
  LogOut
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/produtos', label: 'Produtos', icon: Package },
  { path: '/beneficiarios', label: 'Beneficiários', icon: Users },
  { path: '/operadores', label: 'Operadores', icon: UserCog },
  { path: '/distribuicao', label: 'Distribuição', icon: TruckIcon },
  { path: '/historico', label: 'Histórico', icon: History },
  { path: '/relatorios', label: 'Relatórios', icon: FileText },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useApp();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-primary">Sistema Sanem</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>
    </div>
  );
}

