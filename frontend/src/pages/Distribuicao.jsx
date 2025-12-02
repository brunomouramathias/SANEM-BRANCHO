import { useState } from 'react'
import { MainLayout } from '@/components/Layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApp } from '@/context/AppContext'
import { Truck, Plus, Trash2, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Distribuicao() {
  const { produtos, beneficiarios, addDistribuicao } = useApp()
  const navigate = useNavigate()
  const [selectedBeneficiario, setSelectedBeneficiario] = useState('')
  const [selectedProdutos, setSelectedProdutos] = useState([])
  const [message, setMessage] = useState(null)

  const addProdutoToList = () => {
    setSelectedProdutos([...selectedProdutos, { id: '', quantidade: 1 }])
  }

  const removeProduto = (index) => {
    setSelectedProdutos(selectedProdutos.filter((_, i) => i !== index))
  }

  const updateProduto = (index, field, value) => {
    const updated = [...selectedProdutos]
    updated[index][field] = value
    setSelectedProdutos(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage(null)

    if (!selectedBeneficiario) {
      setMessage({ type: 'error', text: 'Selecione um beneficiário' })
      return
    }

    if (selectedProdutos.length === 0) {
      setMessage({ type: 'error', text: 'Adicione pelo menos uma roupa' })
      return
    }

    // Validar produtos
    const produtosCompletos = selectedProdutos.map(sp => {
      const produto = produtos.find(p => p.id === parseInt(sp.id))
      if (!produto) {
        setMessage({ type: 'error', text: 'Selecione roupas válidas' })
        return null
      }
      if (parseInt(sp.quantidade) <= 0) {
        setMessage({ type: 'error', text: 'Quantidade deve ser maior que zero' })
        return null
      }
      if (parseInt(sp.quantidade) > produto.estoque) {
        setMessage({ type: 'error', text: `Estoque insuficiente de ${produto.nome}` })
        return null
      }
      return {
        id: produto.id,
        nome: produto.nome,
        quantidade: parseInt(sp.quantidade)
      }
    })

    if (produtosCompletos.some(p => p === null)) {
      return
    }

    const beneficiario = beneficiarios.find(b => b.id === parseInt(selectedBeneficiario))

    const distribuicao = {
      beneficiarioId: beneficiario.id,
      beneficiarioNome: beneficiario.nome,
      produtos: produtosCompletos
    }

    addDistribuicao(distribuicao)
    setMessage({ type: 'success', text: 'Distribuição realizada com sucesso!' })
    
    // Limpar formulário
    setTimeout(() => {
      setSelectedBeneficiario('')
      setSelectedProdutos([])
      setMessage(null)
    }, 2000)
  }

  const getProdutoDisponivel = (produtoId) => {
    const produto = produtos.find(p => p.id === parseInt(produtoId))
    return produto ? produto.estoque : 0
  }

  return (
    <MainLayout title="Distribuição de Produtos">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-medium">Nova Distribuição</h3>
          <p className="text-sm text-muted-foreground">
            Registre uma nova distribuição de roupas para beneficiários
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Truck className="h-5 w-5" />
              Informações da Distribuição de Roupas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Seleção de Beneficiário */}
              <div className="space-y-2">
                <Label htmlFor="beneficiario">Beneficiário</Label>
                <Select
                  id="beneficiario"
                  value={selectedBeneficiario}
                  onChange={(e) => setSelectedBeneficiario(e.target.value)}
                  required
                >
                  <option value="">Selecione um beneficiário</option>
                  {beneficiarios.map((beneficiario) => (
                    <option key={beneficiario.id} value={beneficiario.id}>
                      {beneficiario.nome} - {beneficiario.documento}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Lista de Produtos */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Roupas</Label>
                  <Button type="button" size="sm" onClick={addProdutoToList}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Roupa
                  </Button>
                </div>

                {selectedProdutos.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground text-sm">Nenhuma roupa adicionada</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedProdutos.map((sp, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-3 p-3 border rounded-lg sm:p-0 sm:border-0">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor={`produto-${index}`} className="text-sm">Roupa</Label>
                          <Select
                            id={`produto-${index}`}
                            value={sp.id}
                            onChange={(e) => updateProduto(index, 'id', e.target.value)}
                            required
                          >
                            <option value="">Selecione uma roupa</option>
                            {produtos.map((produto) => (
                              <option key={produto.id} value={produto.id}>
                                {produto.nome} (Disp: {produto.estoque})
                              </option>
                            ))}
                          </Select>
                        </div>

                        <div className="flex gap-2 sm:w-auto">
                          <div className="flex-1 sm:w-32 space-y-2">
                            <Label htmlFor={`quantidade-${index}`} className="text-sm">Qtd.</Label>
                            <Input
                              id={`quantidade-${index}`}
                              type="number"
                              min="1"
                              max={getProdutoDisponivel(sp.id)}
                              value={sp.quantidade}
                              onChange={(e) => updateProduto(index, 'quantidade', e.target.value)}
                              required
                            />
                          </div>

                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeProduto(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mensagem de Feedback */}
              {message && (
                <div
                  className={`p-4 rounded-lg flex items-center gap-2 ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message.type === 'success' && <CheckCircle className="h-5 w-5" />}
                  <span>{message.text}</span>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/historico')}
                  className="w-full sm:w-auto"
                >
                  Ver Histórico
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Distribuição
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
