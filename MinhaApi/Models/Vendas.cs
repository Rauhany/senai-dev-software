
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MinhaApi.Models;

[Table("vendas")]
public class Venda
{
    [Key]
    [Column("idvendas")]
    public int Id { get; set; }

    [Column("data_venda")]
    public DateTime DataVenda { get; set; }

    [Column("valor_total")]
    public decimal ValorTotal { get; set; }

    [Column("quantidade")]
    public int Quantidade { get; set; }

    [Column("idproduto")]
    public int ProdutoId { get; set; }

    [Column("idcliente")]
    public int ClienteId { get; set; }

    [NotMapped]
    public string NomeProduto { get; set; } = string.Empty;

    [NotMapped]
    public string NomeCliente { get; set; } = string.Empty;

    [NotMapped]
    public string EmailCliente { get; set; } = string.Empty;
}
