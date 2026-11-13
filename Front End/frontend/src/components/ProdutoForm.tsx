import { useState, useEffect, type SubmitEvent } from 'react';
import { produtoService } from '../services/produtoService';
import FotoUpload from './Produtos/FotoUpload';
import { useParams } from 'react-router-dom';
import './produto.css';

interface Props {
  onProdutoCriado?: () => void;
}

function ProdutoForm({ onProdutoCriado }: Props) {
  const { id } = useParams();
  const modoEdicao = !!id;

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState(0);
  const [fotoBase64Atual, setFotoBase64Atual] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  async function carregarProduto() {
    if (!id) return;
    try {
      // Usa listar() para encontrar o produto pelo ID sem erro de tipagem
      const lista = await produtoService.listar();
      const produto = lista.find((p) => p.id === Number(id));

      if (!produto) {
        setErro('Produto não encontrado.');
        return;
      }

      setNome(produto.nome);
      setPreco(String(produto.preco).replace('.', ','));
      setEstoque(produto.estoque ?? 0);
      setFotoBase64Atual(produto.fotoBase64 ?? null);
    } catch {
      setErro('Erro ao carregar dados do produto.');
    }
  }

  useEffect(() => {
    if (modoEdicao) {
      carregarProduto();
    }
  }, [id]);

const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    const precoNumerico = Number(preco.replace(',', '.'));

    if (
      !nome.trim() ||
      preco.trim() === '' ||
      !Number.isFinite(precoNumerico) ||
      precoNumerico < 0
    ) {
      setErro('Informe um nome e um preço válido.');
      return;
    }

    try {
      setLoading(true);

      if (modoEdicao) {
        // Certifique-se de que o método atualizar existe em produtoService.ts
        await produtoService.atualizar(Number(id), {
          nome: nome.trim(),
          preco: precoNumerico,
          estoque,
        });
        setSucesso('Dados atualizados com sucesso!');
      } else {
        await produtoService.criar({
          nome: nome.trim(),
          preco: precoNumerico,
          estoque: 0,
          ativo: false,
        });

        setNome('');
        setPreco('');
        if (onProdutoCriado) onProdutoCriado();
      }
    } catch {
      setErro(
        modoEdicao
          ? 'Erro ao salvar dados. Tente novamente.'
          : 'Erro ao cadastrar. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card produto-form">
      <div className="card-header">
        <span className="form-overline">CATÁLOGO GAMER</span>
        <h2>{modoEdicao ? 'Editar produto' : 'Cadastrar produto'}</h2>
        <p>
          {modoEdicao
            ? 'Atualize as informações e a foto do produto.'
            : 'Adicione um novo produto à sua loja.'}
        </p>
      </div>

      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}

      {sucesso && (
        <p className="mensagem-sucesso" role="status">
          {sucesso}
        </p>
      )}

      <form className="form-layout" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nome">Nome do produto</label>
          <input
            id="nome"
            type="text"
            placeholder="Ex.: Mouse gamer RGB"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              if (erro) setErro(null);
            }}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="preco">Preço (R$)</label>
          <input
            id="preco"
            type="text"
            inputMode="decimal"
            placeholder="Ex.: 120,50"
            value={preco}
            onChange={(e) => {
              setPreco(e.target.value);
              if (erro) setErro(null);
            }}
            disabled={loading}
            required
          />
          <span className="input-help">Informe o preço em reais.</span>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading
            ? 'Salvando...'
            : modoEdicao
            ? 'Salvar dados'
            : '+ Cadastrar produto'}
        </button>
      </form>

      {/* Fora do <form> para o envio da foto não disparar o submit do formulário */}
      {modoEdicao && (
        <div style={{ marginTop: '20px' }}>
          <FotoUpload
            produtoId={Number(id)}
            fotoBase64Atual={fotoBase64Atual}
            onAtualizar={carregarProduto}
          />
        </div>
      )}
    </section>
  );
}

export default ProdutoForm;