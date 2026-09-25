using MinhaApi.Models;
using MySqlConnector;
namespace MinhaApi.Repositories;

public class DepartamentoRepository : IDepartamentoRepository
{
    private readonly string _connectionString;
    public DepartamentoRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    private static List<Departamento> _db = new()
    {
        new Departamento { Id=1, Nome="ADM", descricao="Departamento de administração" } 
    };  
    public IEnumerable<Departamento> GetAll() {
        var lista = new List<Departamento>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT id, nome, descricao, ativo FROM departamento";
        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read()) {
            lista.Add(new Departamento {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome"),
                descricao = reader.GetString("descricao"),
                Ativo = reader.GetBoolean("ativo")

            });
            };
            return lista;

        }
        
     public Departamento? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT id, nome, descricao, ativo FROM departamento WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Departamento 
            {
                Id = reader.GetInt32("id"), 
                Nome = reader.GetString("nome"),
                descricao = reader.GetString("descricao"),
                Ativo = reader.GetBoolean("ativo")
            };
        }

        return null;
    }

    public void Add(Departamento departamento)
    {
         {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "INSERT INTO departamento (nome, descricao, ativo) VALUES (@Nome, @descricao, @ativo)";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", departamento.Nome);
        cmd.Parameters.AddWithValue("@descricao", departamento.descricao);
        cmd.Parameters.AddWithValue("@ativo", departamento.Ativo);
        cmd.ExecuteNonQuery();
    }
    }

    public void Update(Departamento departamento)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        
        string sql = @"UPDATE departamento 
                       SET nome = @Nome, descricao = @descricao, ativo = @Ativo
                       WHERE id = @Id";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", departamento.Id);
        cmd.Parameters.AddWithValue("@Nome", departamento.Nome);
        cmd.Parameters.AddWithValue("@descricao", departamento.descricao);
        cmd.Parameters.AddWithValue("@Ativo", departamento.Ativo);
        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        
        string sql = "DELETE FROM departamento WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }
}

