namespace MinhaApi.Models;

public class Fornecedores
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string cnpj { get; set; } = string.Empty;
    public bool Ativo { get; internal set; }
}