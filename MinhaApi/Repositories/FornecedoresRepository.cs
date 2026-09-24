using MinhaApi.Models;
using MySqlConnector;
namespace MinhaApi.Repositories;

public class FornecedoresRepository : IFornecedoresRepository
{
    private readonly string _connectionString;
    public FornecedoresRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    private static List<Fornecedores> _db = new()
    {
        new Fornecedores { Id=1, Nome="Thiago", Email="thiago@email.com", cnpj="12.345.678/0001-90" } 
    };  
    public IEnumerable<Fornecedores> GetAll() {
        var lista = new List<Fornecedores>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT id, nome, email, cnpj FROM fornecedores";
        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read()) {
            lista.Add(new Fornecedores {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome"),
                Email = reader.GetString("email"),
                cnpj = reader.GetString("cnpj")
            });
            };
            return lista;

        }
        
    public Fornecedores? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT id, nome, email, cnpj, ativo FROM fornecedores WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Fornecedores
            {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome"),
                Email = reader.GetString("email"),
                cnpj = reader.GetString("cnpj"),
                Ativo = reader.GetBoolean("ativo")
            };
        }

        return null;
    }
    public void Add(Fornecedores f)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "INSERT INTO fornecedores (nome, email, cnpj) VALUES (@Nome, @Email, @Cnpj)";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", f.Nome);
        cmd.Parameters.AddWithValue("@Email", f.Email);
        cmd.Parameters.AddWithValue("@Cnpj", f.cnpj);
        cmd.ExecuteNonQuery();
    }
    public void Update(Fornecedores f)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "UPDATE fornecedores SET nome = @Nome, email = @Email, cnpj = @Cnpj WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", f.Nome);
        cmd.Parameters.AddWithValue("@Email", f.Email);
        cmd.Parameters.AddWithValue("@Cnpj", f.cnpj);
        cmd.Parameters.AddWithValue("@Id", f.Id);
        cmd.ExecuteNonQuery();
    }
    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = "DELETE FROM fornecedores WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }
}
