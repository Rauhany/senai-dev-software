
using MinhaApi.Models;
using MySqlConnector;

namespace MinhaApi.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly string _cs;

    public DashboardRepository(IConfiguration config)
        => _cs = config.GetConnectionString("DefaultConnection")!;

    // 1. Obter resumo do Dashboard
    public DashboardResumo ObterResumo(DateTime inicio)
    {
        using var conn = new MySqlConnection(_cs);
        conn.Open();

        using var cmd = new MySqlCommand(@"
            SELECT
                (SELECT COUNT(*) FROM vendas
                 WHERE data_venda >= @Inicio) AS total_vendas,

                (SELECT COALESCE(SUM(valor_total), 0) FROM vendas
                 WHERE data_venda >= @Inicio) AS faturamento,

                (SELECT COUNT(*) FROM clientes
                 WHERE ativo = 1) AS total_clientes
        ", conn);

        cmd.Parameters.AddWithValue("@Inicio", inicio);

        using var r = cmd.ExecuteReader();
        r.Read();

        return new DashboardResumo
        {
            TotalVendas = Convert.ToInt32(r["total_vendas"]),
            Faturamento = Convert.ToDecimal(r["faturamento"]),
            TotalClientes = Convert.ToInt32(r["total_clientes"])
        };
    }

    // 2. Obter vendas por dia
    public List<VendasPorDia> ObterVendasPorDia(DateTime inicio)
    {
        var lista = new List<VendasPorDia>();

        using var conn = new MySqlConnection(_cs);
        conn.Open();

        using var cmd = new MySqlCommand(@"
            SELECT
                DATE(data_venda) AS dia,
                COUNT(*) AS qtd,
                SUM(valor_total) AS total
            FROM vendas
            WHERE data_venda >= @Inicio
            GROUP BY DATE(data_venda)
            ORDER BY dia
        ", conn);

        cmd.Parameters.AddWithValue("@Inicio", inicio);

        using var r = cmd.ExecuteReader();

        while (r.Read())
        {
            lista.Add(new VendasPorDia
            {
                Data = Convert.ToDateTime(r["dia"]),
                Quantidade = Convert.ToInt32(r["qtd"]),
                Total = Convert.ToDecimal(r["total"])
            });
        }

        return lista;
    }

    // 3. Obter produtos mais vendidos
    public List<TopProduto> ObterTopProdutos(DateTime inicio, int limite)
    {
        var lista = new List<TopProduto>();

        using var conn = new MySqlConnection(_cs);
        conn.Open();

        using var cmd = new MySqlCommand(@"
            SELECT
                p.idproduto AS id,
                p.nome,
                SUM(v.quantidade) AS qtd,
                SUM(v.valor_total) AS total
            FROM vendas v
            JOIN produtos p ON p.idproduto = v.idproduto
            WHERE v.data_venda >= @Inicio
            GROUP BY p.idproduto, p.nome
            ORDER BY qtd DESC
            LIMIT @Limite
        ", conn);

        cmd.Parameters.AddWithValue("@Inicio", inicio);
        cmd.Parameters.AddWithValue("@Limite", limite);

        using var r = cmd.ExecuteReader();

        while (r.Read())
        {
            lista.Add(new TopProduto
            {
                ProdutoId = Convert.ToInt32(r["id"]),
                Nome = r["nome"].ToString()!,
                QuantidadeVendida = Convert.ToInt32(r["qtd"]),
                Faturamento = Convert.ToDecimal(r["total"])
            });
        }

        return lista;
    }

    // 4. Obter produtos com estoque baixo
    public List<ProdutoEstoqueBaixo> ObterEstoqueBaixo(int minimo)
    {
        var lista = new List<ProdutoEstoqueBaixo>();

        using var conn = new MySqlConnection(_cs);
        conn.Open();

        using var cmd = new MySqlCommand(@"
            SELECT
                idproduto,
                nome,
                estoque
            FROM produtos
            WHERE ativo = 1 AND estoque <= @Minimo
            ORDER BY estoque
        ", conn);

        cmd.Parameters.AddWithValue("@Minimo", minimo);

        using var r = cmd.ExecuteReader();

        while (r.Read())
        {
            lista.Add(new ProdutoEstoqueBaixo
            {
                Id = Convert.ToInt32(r["idproduto"]),
                Nome = r["nome"].ToString()!,
                Estoque = Convert.ToInt32(r["estoque"])
            });
        }

        return lista;
    }

    // 5. Obter últimas vendas
    public List<UltimaVenda> ObterUltimasVendas(int limite)
    {
        var lista = new List<UltimaVenda>();

        using var conn = new MySqlConnection(_cs);
        conn.Open();

        using var cmd = new MySqlCommand(@"
            SELECT
                v.idvendas,
                c.nome AS cliente,
                p.nome AS produto,
                v.quantidade,
                v.valor_total,
                v.data_venda
            FROM vendas v
            JOIN clientes c ON c.id = v.idcliente
            JOIN produtos p ON p.idproduto = v.idproduto
            ORDER BY v.data_venda DESC
            LIMIT @Limite
        ", conn);

        cmd.Parameters.AddWithValue("@Limite", limite);

        using var r = cmd.ExecuteReader();

        while (r.Read())
        {
            lista.Add(new UltimaVenda
            {
                Id = Convert.ToInt32(r["idvendas"]),
                Cliente = r["cliente"].ToString()!,
                Produto = r["produto"].ToString()!,
                Quantidade = Convert.ToInt32(r["quantidade"]),
                ValorTotal = Convert.ToDecimal(r["valor_total"]),
                DataVenda = Convert.ToDateTime(r["data_venda"])
            });
        }

        return lista;
    }
}
