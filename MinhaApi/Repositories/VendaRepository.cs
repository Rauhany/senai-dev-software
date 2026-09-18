using MinhaApi.Models;
using MinhaApi.Services;
using MySqlConnector;

namespace MinhaApi.Repositories;

public class VendaRepository : IVendaRepository
{
    private readonly string _connectionString;

    public VendaRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    public IEnumerable<Venda> GetAll() 
    {
        var lista = new List<Venda>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT idvendas, idcliente, data_venda, quantidade, valor_total, idproduto FROM vendas";
        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read()) 
        {
            lista.Add(new Venda {
                Id = reader.GetInt32("idvendas"),
                DataVenda = reader.GetDateTime("data_venda"),
                Quantidade = reader.GetInt32("quantidade"),
                ValorTotal = reader.GetDecimal("valor_total"), 
                ProdutoId = reader.GetInt32("idproduto"),       
                ClienteId = reader.GetInt32("idcliente")        
            });
        }
        return lista;
    }

    public Venda? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT idvendas, idcliente, data_venda, quantidade, valor_total, idproduto FROM vendas WHERE idvendas = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Venda
            {
                Id = reader.GetInt32("idvendas"),
                DataVenda = reader.GetDateTime("data_venda"),
                Quantidade = reader.GetInt32("quantidade"),
                ValorTotal = reader.GetDecimal("valor_total"), 
                ProdutoId = reader.GetInt32("idproduto"),       
                ClienteId = reader.GetInt32("idcliente")        
            };
        }

        return null;
    }

    public Venda Add(Venda venda) 
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "INSERT INTO vendas (data_venda, quantidade, valor_total, idproduto, idcliente) VALUES (@DataVenda, @Quantidade, @ValorTotal, @ProdutoId, @ClienteId)";
        using var cmd = new MySqlCommand(sql, conn);
        
        cmd.Parameters.AddWithValue("@DataVenda", venda.DataVenda);
        cmd.Parameters.AddWithValue("@Quantidade", venda.Quantidade);
        cmd.Parameters.AddWithValue("@ValorTotal", venda.ValorTotal);
        cmd.Parameters.AddWithValue("@ProdutoId", venda.ProdutoId);
        cmd.Parameters.AddWithValue("@ClienteId", venda.ClienteId);

        cmd.ExecuteNonQuery();
        return venda;
    }
}