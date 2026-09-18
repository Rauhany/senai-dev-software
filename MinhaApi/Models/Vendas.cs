namespace MinhaApi.Models;

public class Venda
{
    public int Id { get; set; }
    public DateTime DataVenda { get; set; } = DateTime.MinValue;
    public decimal ValorTotal { get; set; } = 0;
    public int ClienteId { get; set; } = 0;
    public int ProdutoId { get; set; } = 0;
    public int Quantidade { get; set; } = 0;
}