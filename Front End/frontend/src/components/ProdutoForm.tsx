import { useState } from 'react';
import type { Produto } from '../types/Produto';
import ModalFoto from '../components/Produtos/ModalFoto';
import './produto.css';

interface Props {
  produtos: Produto[];
  loading: boolean;
  onExcluir?: (produto: Produto) => void;
}

function ProdutoList({ produtos, loading, onExcluir }: Props) {
  const [produtoModal, setProdutoModal] = useState<Produto | null>(null);

  const listaProdutos = Array.isArray(produtos) ? produtos : [];

  return (
    <div className="card-box">
      <h2 className="card-title">Produtos Cadastrados</h2>

      {loading ? (
        <p className="text-muted">Carregando produtos...</p>
      ) : listaProdutos.length === 0 ? (
        <p className="text-muted">Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="list-container">
          {listaProdutos.map((p) => {
            const semEstoque = p.estoque === 0;
            const estoqueBaixo = p.estoque < 5 && !semEstoque;

            return (
              <div key={p.id} className="item-row">
                {/* Coluna 1: Foto + Nome agrupados lado a lado */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                <div
                  onClick={() => p.fotoBase64 && setProdutoModal(p)}
                  title={p.fotoBase64 ? 'Clique para ampliar' : undefined}
                  style={{
                    cursor: p.fotoBase64 ? 'pointer' : 'default',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    width: '52px',
                    height: '52px',
                    flexShrink: 0,
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {p.fotoBase64 ? (
                    <>
                      <img
                        src={p.fotoBase64}
                        alt={p.nome}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 2,
                          right: 2,
                          background: 'rgba(0,0,0,0.65)',
                          color: '#ffffff',
                          borderRadius: '4px',
                          width: 18,
                          height: 18,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 9
                        }}
                      >
                        🔍
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'var(--bg-surface-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)'
                      }}
                    >
                      <span style={{ fontSize: 16 }}>📷</span>
                      <span style={{ fontSize: 8, marginTop: 1 }}>sem foto</span>
                    </div>
                  )}
                </div>

                <span className="font-medium text-gray-900" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.nome}
                </span>
              </div>

              {/* Coluna 2: Estoque */}
                <div>
                  <span
                    className={`produto-estoque ${
                      semEstoque ? 'zerado' : estoqueBaixo ? 'baixo' : ''
                    }`}
                  >
                    {semEstoque ? 'Sem estoque' : `Estoque: ${p.estoque}`}
                  </span>
                </div>

              {/* Coluna 3: Preço */}
                <span className="font-semibold text-right"
                 style={{ color: 'var(--text-primary)'}} 
                >
                  {Number(p.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>

              {/* Coluna 4: Ações */}
                <div className="item-actions">
                  {onExcluir && (
                    <button
                      type="button"
                      className="btn-excluir"
                      onClick={() => onExcluir(p)}
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {produtoModal && (
        <ModalFoto
          produto={produtoModal}
          onClose={() => setProdutoModal(null)}
        />
      )}
    </div>
  );
}

export default ProdutoList;