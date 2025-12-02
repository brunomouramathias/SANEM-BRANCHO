import { useState } from 'react'
import { MainLayout } from '@/components/Layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApp } from '@/context/AppContext'
import { Plus, Edit, Trash2, Users } from 'lucide-react'

export function Beneficiarios() {
  const { beneficiarios, addBeneficiario, updateBeneficiario, deleteBeneficiario } = useApp()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBeneficiario, setEditingBeneficiario] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    documento: '',
    endereco: '',
    telefone: '',
    observacoes: ''
  })

  const handleOpenDialog = (beneficiario = null) => {
    if (beneficiario) {
      setEditingBeneficiario(beneficiario)
      setFormData({
        nome: beneficiario.nome,
        documento: beneficiario.documento,
        endereco: beneficiario.endereco,
        telefone: beneficiario.telefone,
        observacoes: beneficiario.observacoes
      })
    } else {
      setEditingBeneficiario(null)
      setFormData({
        nome: '',
        documento: '',
        endereco: '',
        telefone: '',
        observacoes: ''
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingBeneficiario) {
      updateBeneficiario(editingBeneficiario.id, formData)
    } else {
      addBeneficiario(formData)
    }

    setIsDialogOpen(false)
    setFormData({ nome: '', documento: '', endereco: '', telefone: '', observacoes: '' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este beneficiário?')) {
      deleteBeneficiario(id)
    }
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    return value
  }

  return (
    <MainLayout title="Beneficiários">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-medium">Gerenciar Beneficiários</h3>
            <p className="text-sm text-muted-foreground">
              Cadastre e gerencie os beneficiários do programa
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            <span>Adicionar</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Users className="h-5 w-5" />
              Lista de Beneficiários
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Versão Desktop - Tabela */}
            <div className="hidden lg:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Observações</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beneficiarios.map((beneficiario) => (
                    <TableRow key={beneficiario.id}>
                      <TableCell className="font-medium">{beneficiario.nome}</TableCell>
                      <TableCell>{beneficiario.documento}</TableCell>
                      <TableCell className="max-w-xs truncate">{beneficiario.endereco}</TableCell>
                      <TableCell>{beneficiario.telefone}</TableCell>
                      <TableCell className="max-w-xs truncate">{beneficiario.observacoes}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(beneficiario)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(beneficiario.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Versão Mobile/Tablet - Cards */}
            <div className="lg:hidden space-y-3">
              {beneficiarios.map((beneficiario) => (
                <div key={beneficiario.id} className="border rounded-lg p-4 space-y-3">
                  <div>
                    <h4 className="font-medium">{beneficiario.nome}</h4>
                    <p className="text-sm text-muted-foreground">{beneficiario.documento}</p>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Endereço:</span> {beneficiario.endereco}</p>
                    <p><span className="font-medium">Telefone:</span> {beneficiario.telefone}</p>
                    {beneficiario.observacoes && (
                      <p className="text-muted-foreground line-clamp-2">
                        <span className="font-medium text-foreground">Obs:</span> {beneficiario.observacoes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(beneficiario)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(beneficiario.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dialog de Cadastro/Edição */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent onClose={() => setIsDialogOpen(false)}>
            <DialogHeader>
              <DialogTitle>
                {editingBeneficiario ? 'Editar Beneficiário' : 'Adicionar Beneficiário'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documento">CPF</Label>
                <Input
                  id="documento"
                  value={formData.documento}
                  onChange={(e) => setFormData({ ...formData, documento: formatCPF(e.target.value) })}
                  placeholder="000.000.000-00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  rows={3}
                  placeholder="Informações adicionais..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingBeneficiario ? 'Salvar Alterações' : 'Adicionar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
