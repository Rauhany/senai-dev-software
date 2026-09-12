namespace MinhaApi.Models;

public class Vendas
{
    public int Id { get; set; }

    public DateTime Data_Vendas { get; set; }
        = DateTime.MinValue;
    public decimal valor_total { get; set; }
        = 0;
    public int Idcliente{ get; set; }
        = 0;
     public int Idproduto{ get; set; }
        = 0;
}
