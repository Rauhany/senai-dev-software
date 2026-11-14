using MinhaApi.Models;
using MySqlConnector;

namespace MinhaApi.Repositories;

public class ProdutoRepository : IProdutoRepository
{
    private readonly string _connectionString;
    
    public ProdutoRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    public IEnumerable<Produto> GetAll() 
    {
        var lista = new List<Produto>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT idproduto, nome, preco, estoque, ativo, foto FROM produtos";
        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read()) 
        {
            var fotoBanco = reader["foto"] == DBNull.Value ? null : reader["foto"].ToString();

            lista.Add(new Produto 
            {
                Id = reader.GetInt32("idproduto"),
                Nome = reader.GetString("nome"),
                Preco = reader.GetDecimal("preco"),
                Estoque = reader.GetInt32("estoque"),
                Ativo = reader.GetBoolean("ativo"),
                FotoBase64 = fotoBanco
            });
        }
        return lista;
    }

    public Produto? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT idproduto, nome, preco, estoque, ativo, foto FROM produtos WHERE idproduto = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            var fotoBanco = reader["foto"] == DBNull.Value ? null : reader["foto"].ToString();

            return new Produto 
            {
                Id = reader.GetInt32("idproduto"), 
                Nome = reader.GetString("nome"),
                Preco = reader.GetDecimal("preco"),
                Estoque = reader.GetInt32("estoque"),
                Ativo = reader.GetBoolean("ativo"),
                FotoBase64 = fotoBanco
            };
        }

        return null;
    }

    public void Add(Produto p)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO produtos (nome, preco, estoque, ativo, foto)
                       VALUES (@Nome, @Preco, @Estoque, @Ativo, @Foto);
                       SELECT LAST_INSERT_ID();";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", p.Nome);
        cmd.Parameters.AddWithValue("@Preco", p.Preco);
        cmd.Parameters.AddWithValue("@Estoque", p.Estoque);
        cmd.Parameters.AddWithValue("@Ativo", p.Ativo);
        cmd.Parameters.AddWithValue("@Foto", (object?)p.FotoBase64 ?? DBNull.Value);

        var idGerado = cmd.ExecuteScalar();
        p.Id = Convert.ToInt32(idGerado);
    }

    public void Update(Produto p)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        
        string sql = @"UPDATE produtos 
                       SET nome = @Nome, preco = @Preco, estoque = @Estoque, ativo = @Ativo, foto = @Foto
                       WHERE idproduto = @idproduto";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@idproduto", p.Id);
        cmd.Parameters.AddWithValue("@Nome", p.Nome);
        cmd.Parameters.AddWithValue("@Preco", p.Preco);
        cmd.Parameters.AddWithValue("@Estoque", p.Estoque);
        cmd.Parameters.AddWithValue("@Ativo", p.Ativo);
        cmd.Parameters.AddWithValue("@Foto", (object?)p.FotoBase64 ?? DBNull.Value);
        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        
        string sql = "DELETE FROM produtos WHERE idproduto = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }

    public Produto GetById(object produtoId)
    {
        throw new NotImplementedException();
    }

    public void AtualizarFoto(int id, string? nomeArquivo)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        
        using var cmd = new MySqlCommand(
            "UPDATE produtos SET foto = @Foto WHERE idproduto = @Id", conn);

        cmd.Parameters.AddWithValue("@Foto", (object?)nomeArquivo ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }
}
