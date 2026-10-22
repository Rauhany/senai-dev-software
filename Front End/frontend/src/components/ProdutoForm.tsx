
import { useState } from 'react';
import type { FormEvent } from 'react';
import { produtoService } from '../services/produtoService';

interface Props {
  onProdutoCriado: () => void;
}

function ProdutoForm({ onProdutoCriado }: Props) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro(null);

    const precoNumerico = Number(preco.replace(',', '.'));

    if (!nome.trim() || preco.trim() === '' ||
        !Number.isFinite(precoNumerico) || precoNumerico < 0) {
      setErro('Informe um nome e um preço válido.');
      return;
    }

    try {
      setLoading(true);

      await produtoService.criar({
        nome: nome.trim(),
        preco: precoNumerico,
      });

      setNome('');
      setPreco('');
      onProdutoCriado();
    } catch {
      setErro('Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card produto-form">
      <div className="card-header">
        <span className="form-overline">CATÁLOGO GAMER</span>
        <h2>Cadastrar produto</h2>
        <p>Adicione um novo produto à sua loja.</p>
      </div>

      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
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
          <span className="input-help">
            Informe o preço em reais.
          </span>
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : '+ Cadastrar produto'}
        </button>
      </form>
    </section>
  );
}

export default ProdutoForm;
