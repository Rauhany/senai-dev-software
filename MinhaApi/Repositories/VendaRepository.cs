
using MinhaApi.Models;
using MySqlConnector;

namespace MinhaApi.Repositories;

public class VendaRepository : IVendaRepository
{
    private readonly string _connectionString;

    public VendaRepository(IConfiguration config)
        => _connectionString =
            config.GetConnectionString("DefaultConnection")!;

    public IEnumerable<Venda> GetAll()
    {
        var lista = new List<Venda>();

        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        const string sql = @"
            SELECT
                v.idvendas,
                v.idcliente,
                v.data_venda,
                v.quantidade,
                v.valor_total,
                v.idproduto,
                c.nome AS nome_cliente,
                c.email AS email_cliente,
                p.nome AS nome_produto
            FROM vendas v
            LEFT JOIN clientes c ON c.id = v.idcliente
            LEFT JOIN produtos p ON p.idproduto = v.idproduto
            ORDER BY v.idvendas DESC;";

        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(MapearVenda(reader));
        }

        return lista;
    }

    public Venda? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        const string sql = @"
            SELECT
                v.idvendas,
                v.idcliente,
                v.data_venda,
                v.quantidade,
                v.valor_total,
                v.idproduto,
                c.nome AS nome_cliente,
                c.email AS email_cliente,
                p.nome AS nome_produto
            FROM vendas v
            LEFT JOIN clientes c ON c.id = v.idcliente
            LEFT JOIN produtos p ON p.idproduto = v.idproduto
            WHERE v.idvendas = @Id;";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (!reader.Read())
            return null;

        return MapearVenda(reader);
    }

    private static Venda MapearVenda(MySqlDataReader reader)
    {
        return new Venda
        {
            Id = reader.GetInt32("idvendas"),

            DataVenda = reader.IsDBNull(
                reader.GetOrdinal("data_venda"))
                ? DateTime.MinValue
                : reader.GetDateTime("data_venda"),

            Quantidade = reader.GetInt32("quantidade"),

            ValorTotal = reader.IsDBNull(
                reader.GetOrdinal("valor_total"))
                ? 0m
                : reader.GetDecimal("valor_total"),

            ProdutoId = reader.GetInt32("idproduto"),
            ClienteId = reader.GetInt32("idcliente"),

            NomeCliente = reader.IsDBNull(
                reader.GetOrdinal("nome_cliente"))
                ? ""
                : reader.GetString("nome_cliente"),

            EmailCliente = reader.IsDBNull(
                reader.GetOrdinal("email_cliente"))
                ? ""
                : reader.GetString("email_cliente"),

            NomeProduto = reader.IsDBNull(
                reader.GetOrdinal("nome_produto"))
                ? ""
                : reader.GetString("nome_produto")
        };
    }

    public Venda Add(Venda venda)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        const string sql = @"
            INSERT INTO vendas
                (data_venda, quantidade, valor_total,
                 idproduto, idcliente)
            VALUES
                (@DataVenda, @Quantidade, @ValorTotal,
                 @ProdutoId, @ClienteId);
            SELECT LAST_INSERT_ID();";

        using var cmd = new MySqlCommand(sql, conn);

        cmd.Parameters.AddWithValue("@DataVenda", venda.DataVenda);
        cmd.Parameters.AddWithValue("@Quantidade", venda.Quantidade);
        cmd.Parameters.AddWithValue("@ValorTotal", venda.ValorTotal);
        cmd.Parameters.AddWithValue("@ProdutoId", venda.ProdutoId);
        cmd.Parameters.AddWithValue("@ClienteId", venda.ClienteId);

        venda.Id = Convert.ToInt32(cmd.ExecuteScalar());

        return venda;
    }
}
