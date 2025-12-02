import { useApp } from '@/context/AppContext';
import { User } from 'lucide-react';

export function Header() {
  const { user } = useApp();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div>
        <h2 className="text-lg font-semibold">Bem-vindo ao Sistema Sanem</h2>
        <p className="text-sm text-muted-foreground">
          Gestão de doações e distribuição de produtos
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium">{user?.nome}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

