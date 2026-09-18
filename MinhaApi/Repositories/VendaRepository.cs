using MinhaApi.Models;
using MySqlConnector;

namespace MinhaApi.Repositories;

public class VendaRepository : IVendaRepository
{
    private readonly string _connectionString;

    public VendaRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    public IEnumerable<Vendas> GetAll() {
        var lista = new List<Vendas>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        // Nomes das colunas ajustados para bater com o seu MySQL
        string sql = "SELECT idvendas, idcliente, data_venda, quantidade, valor_total, idproduto FROM vendas";
        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read()) {
            lista.Add(new Vendas {
                Id = reader.GetInt32("idvendas"),
                Data_Vendas = reader.GetDateTime("data_venda"),
                Quantidade = reader.GetInt32("quantidade"),
                valor_total = reader.GetDecimal("valor_total"), // Corrigido para bater com a model
                Idproduto = reader.GetInt32("idproduto"),       // Corrigido para bater com a model
                Idcliente = reader.GetInt32("idcliente")        // Corrigido para bater com a model
            });
        }
        return lista;
    }

    public Vendas? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        // Nomes das colunas ajustados para bater com o seu MySQL
        string sql = "SELECT idvendas, idcliente, data_venda, quantidade, valor_total, idproduto FROM vendas WHERE idvendas = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Vendas
            {
                Id = reader.GetInt32("idvendas"),
                Data_Vendas = reader.GetDateTime("data_venda"),
                Quantidade = reader.GetInt32("quantidade"),
                valor_total = reader.GetDecimal("valor_total"), // Corrigido para bater com a model
                Idproduto = reader.GetInt32("idproduto"),       // Corrigido para bater com a model
                Idcliente = reader.GetInt32("idcliente")        // Corrigido para bater com a model
            };
        }

        return null;
    }

    public void Add(Vendas venda) // O parâmetro chama-se 'venda'
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "INSERT INTO vendas (data_venda, quantidade, valor_total, idproduto, idcliente) VALUES (@DataVenda, @Quantidade, @ValorTotal, @ProdutoId, @ClienteId)";
        using var cmd = new MySqlCommand(sql, conn);
        
        // CORRIGIDO: Usando a variável 'venda' e as propriedades exatas da sua model
        cmd.Parameters.AddWithValue("@DataVenda", venda.Data_Vendas);
        cmd.Parameters.AddWithValue("@Quantidade", venda.Quantidade);
        cmd.Parameters.AddWithValue("@ValorTotal", venda.valor_total);
        cmd.Parameters.AddWithValue("@ProdutoId", venda.Idproduto);
        cmd.Parameters.AddWithValue("@ClienteId", venda.Idcliente);

        cmd.ExecuteNonQuery();
    }
}