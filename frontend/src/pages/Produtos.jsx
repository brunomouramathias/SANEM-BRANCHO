import { useState } from 'react'
import { MainLayout } from '@/components/Layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApp } from '@/context/AppContext'
import { Plus, Edit, Trash2, Package } from 'lucide-react'

export function Produtos() {
  const { produtos, addProduto, updateProduto, deleteProduto } = useApp()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduto, setEditingProduto] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    categoria: 'Masculino',
    estoque: '',
    descricao: ''
  })

  const categorias = ['Masculino', 'Feminino', 'Infantil', 'Calçados', 'Acessórios']

  const handleOpenDialog = (produto = null) => {
    if (produto) {
      setEditingProduto(produto)
      setFormData({
        nome: produto.nome,
        categoria: produto.categoria,
        estoque: produto.estoque.toString(),
        descricao: produto.descricao
      })
    } else {
      setEditingProduto(null)
      setFormData({
        nome: '',
        categoria: 'Masculino',
        estoque: '',
        descricao: ''
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const produtoData = {
      nome: formData.nome,
      categoria: formData.categoria,
      estoque: parseInt(formData.estoque),
      descricao: formData.descricao
    }

    if (editingProduto) {
      updateProduto(editingProduto.id, produtoData)
    } else {
      addProduto(produtoData)
    }

    setIsDialogOpen(false)
    setFormData({ nome: '', categoria: 'Masculino', estoque: '', descricao: '' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduto(id)
    }
  }

  return (
    <MainLayout title="Produtos">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-medium">Gerenciar Roupas</h3>
            <p className="text-sm text-muted-foreground">
              Adicione e gerencie as roupas disponíveis para distribuição
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            <span className="sm:inline">Adicionar Roupa</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Package className="h-5 w-5" />
              Lista de Roupas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Versão Desktop - Tabela */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtos.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell className="font-medium">{produto.nome}</TableCell>
                      <TableCell>{produto.categoria}</TableCell>
                      <TableCell>
                        <span className={produto.estoque < 50 ? 'text-red-600 font-semibold' : ''}>
                          {produto.estoque} un.
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{produto.descricao}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(produto)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(produto.id)}
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

            {/* Versão Mobile - Cards */}
            <div className="md:hidden space-y-3">
              {produtos.map((produto) => (
                <div key={produto.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{produto.nome}</h4>
                      <p className="text-sm text-muted-foreground">{produto.categoria}</p>
                    </div>
                    <span className={`text-sm font-semibold ${produto.estoque < 50 ? 'text-red-600' : ''}`}>
                      {produto.estoque} un.
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{produto.descricao}</p>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(produto)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(produto.id)}
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
                {editingProduto ? 'Editar Roupa' : 'Adicionar Roupa'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Roupa</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                >
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estoque">Quantidade em Estoque</Label>
                <Input
                  id="estoque"
                  type="number"
                  min="0"
                  value={formData.estoque}
                  onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={3}
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
                  {editingProduto ? 'Salvar Alterações' : 'Adicionar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
