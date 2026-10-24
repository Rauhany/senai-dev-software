
import type { Cliente } from '../types/Cliente'

interface Props {
  clientes: Cliente[]
  loading: boolean
}

function ClienteList({ clientes, loading }: Props) {
  if (loading) {
    return (
      <section className="clientes-lista">
        <h2>Clientes cadastrados</h2>
        <p className="clientes-lista-mensagem">Carregando clientes...</p>
      </section>
    )
  }

  if (clientes.length === 0) {
    return (
      <section className="clientes-lista">
        <h2>Clientes cadastrados</h2>
        <div className="clientes-lista-vazia">
          <span aria-hidden="true">♙</span>
          <p>Nenhum cliente cadastrado ainda.</p>
          <small>Use o formulário acima para adicionar o primeiro cliente.</small>
        </div>
      </section>
    )
  }

  return (
    <section className="clientes-lista">
      <header className="clientes-lista-header">
        <div>
          <span className="form-overline">SUA BASE DE CLIENTES</span>
          <h2>Clientes cadastrados</h2>
          <p>Consulte os dados dos seus clientes.</p>
        </div>

        <span className="clientes-contador">
          {clientes.length} {clientes.length === 1 ? 'cliente' : 'clientes'}
        </span>
      </header>

      <ol className="clientes-lista-itens">
        {clientes.map((cliente, index) => (
          <li className="cliente-item" key={cliente.id}>
            <span className="cliente-numero">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="cliente-item-dados">
              <strong className="cliente-item-nome">
                {cliente.nome}
              </strong>

              <span className="cliente-item-email">
                <span aria-hidden="true">✉</span>
                {cliente.email || 'E-mail não informado'}
              </span>

              <span className="cliente-item-cpf">
                CPF: {cliente.cpf || 'Não informado'}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default ClienteList
