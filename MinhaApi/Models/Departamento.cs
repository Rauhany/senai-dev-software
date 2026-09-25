namespace MinhaApi.Models;

public class Departamento
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string descricao { get; set; } = string.Empty;
    public int qtdfuncionario {get; set;}
    public bool Ativo { get; internal set; }
}