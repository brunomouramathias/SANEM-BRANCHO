import { MainLayout } from '@/components/Layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useApp } from '@/context/AppContext'
import { History, Package } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

export function Historico() {
  const { distribuicoes } = useApp()

  // Ordenar distribuições por data (mais recente primeiro)
  const sortedDistribuicoes = [...distribuicoes].sort((a, b) => 
    new Date(b.data) - new Date(a.data)
  )

  return (
    <MainLayout title="Histórico de Distribuições">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-medium">Histórico Completo</h3>
          <p className="text-sm text-muted-foreground">
            Visualize todas as distribuições realizadas
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Registro de Distribuições
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sortedDistribuicoes.length === 0 ? (
              <div className="text-center py-12">
                <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma distribuição registrada</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedDistribuicoes.map((distribuicao) => (
                  <Card key={distribuicao.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-base sm:text-lg">{distribuicao.beneficiarioNome}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDateTime(distribuicao.data)}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-muted-foreground">Responsável</p>
                          <p className="font-medium text-sm sm:text-base">{distribuicao.responsavel}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <p className="text-sm font-medium mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Roupas Distribuídas
                        </p>
                        {/* Desktop - Tabela */}
                        <div className="hidden sm:block">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Roupa</TableHead>
                                <TableHead className="text-right">Quantidade</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {distribuicao.produtos.map((produto, idx) => (
                                <TableRow key={idx}>
                                  <TableCell className="font-medium">{produto.nome}</TableCell>
                                  <TableCell className="text-right">{produto.quantidade} un.</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        {/* Mobile - Lista */}
                        <div className="sm:hidden space-y-2">
                          {distribuicao.produtos.map((produto, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm py-2 border-b last:border-0">
                              <span className="font-medium">{produto.nome}</span>
                              <span className="text-muted-foreground">{produto.quantidade} un.</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
