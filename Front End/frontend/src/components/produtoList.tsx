import type { produto } from '../../types/Produto';
import './produto.css';

interface Props {
  produtos: produto[];
  loading: boolean;
}

function ProdutoList({ produtos, loading }: Props) {
  const listaProdutos = Array.isArray(produtos) ? produtos : [];

  return (
    <div className="produto-container">
      {/* 1. O título fica AQUI DENTRO da caixa branca */}
      <h2 className="secao-titulo">Produtos Cadastrados</h2>

      {/* 2. Conteúdo exibido dentro da caixa */}
      {loading ? (
        <p className="produto-vazio">Carregando...</p>
      ) : listaProdutos.length === 0 ? (
        <p className="produto-vazio">Nenhum produto cadastrado ainda.</p>
      ) : (
        <ul className="produto-lista">
          {listaProdutos.map((p) => (
            <li key={p.id} className="produto-item">
              <span className="produto-nome">{p.nome}</span>
              <span className="produto-preco">
                R$ {p.preco?.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProdutoList;