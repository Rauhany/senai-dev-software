import { useState, useEffect, type FormEvent } from 'react';
import { vendaService } from '../services/vendaService';
import { clienteService,  } from '../services/clienteService';
import { produtoService,  } from '../services/produtoService';
import type { Cliente } from '../types/Cliente';
import type { Produto } from '../types/Produto';

interface VendaFormProps {
  onVendaRealizada: () => void;
}

export function VendaForm({ onVendaRealizada }: VendaFormProps) {
  const [clienteId, setClienteId] = useState<string>('');
  const [produtoId, setProdutoId] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number | ''>('');

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [carregando, setCarregando] = useState<boolean>(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
  const [listaClientes, listaProdutos] = await Promise.all([
  clienteService.listar(),
  produtoService.listar()
]);
        setClientes(listaClientes);
        setProdutos(listaProdutos);
      } catch (error) {
        setMensagemErro('Erro ao carregar a lista de clientes e produtos.');
      }
    };

    carregarDados();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMensagemErro(null);
    setMensagemSucesso(null);

    if (!clienteId || !produtoId || !quantidade) {
      setMensagemErro('Por favor, preencha todos os campos.');
      return;
    }

    setCarregando(true);

    try {
      const resposta = await vendaService.realizarVenda({
        clienteId,
        produtoId,
        quantidade: Number(quantidade)
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagemSucesso(`Venda registrada com sucesso! Valor total: R$ ${dados.valorTotal}`);
        setClienteId('');
        setProdutoId('');
        setQuantidade('');
        onVendaRealizada(); 
      } else {
        setMensagemErro(dados.mensagem || 'Ocorreu um erro ao registrar a venda.');
      }
    } catch (error) {
      setMensagemErro('Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="venda-form">
      <h3>Registrar Nova Venda</h3>

      {mensagemErro && <div style={{ color: 'red', marginBottom: '10px' }}>{mensagemErro}</div>}
      {mensagemSucesso && <div style={{ color: 'green', marginBottom: '10px' }}>{mensagemSucesso}</div>}

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="clienteId">Cliente:</label>
        <select 
          id="clienteId" 
          value={clienteId} 
          onChange={(e) => setClienteId(e.target.value)}
          disabled={carregando}
        >
          <option value="">Selecione um cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="produtoId">Produto:</label>
        <select 
          id="produtoId" 
          value={produtoId} 
          onChange={(e) => setProdutoId(e.target.value)}
          disabled={carregando}
        >
          <option value="">Selecione um produto</option>
          {produtos.map(produto => (
            <option key={produto.id} value={produto.id}>
              {produto.nome}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="quantidade">Quantidade:</label>
        <input 
          type="number" 
          id="quantidade" 
          min="1"
          value={quantidade} 
          onChange={(e) => setQuantidade(e.target.value ? Number(e.target.value) : '')}
          disabled={carregando}
        />
      </div>

      <button type="submit" disabled={carregando}>
        {carregando ? 'Processando...' : 'Confirmar Venda'}
      </button>
    </form>
  );
}

