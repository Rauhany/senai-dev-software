using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
using Microsoft.Net.Http.Headers;

namespace MinhaApi.Services
{
public class VendaService : IVendaService
{
    private readonly IVendaRepository _repo;
    private readonly IClienteRepository _clienteRepo;
    private readonly IProdutoRepository _produtoRepo;
    public VendaService(IVendaRepository repo, IClienteRepository clienteRepo, IProdutoRepository produtoRepo)
        {
            _repo = repo;
            _clienteRepo = clienteRepo;
            _produtoRepo = produtoRepo;
        }
    public IEnumerable<Venda> GetAll() => _repo.GetAll();

    public Venda? GetById(int id) => _repo.GetById(id);

    private int Quantidade(Venda venda) => venda.Quantidade;

    public Venda Add(Venda venda)
    {
        if (Quantidade(venda) <= 0)
        {
            throw new ArgumentException("Quantidade inválida!");
        }
        var cliente = _clienteRepo.GetById(venda.ClienteId);

        var produto = _produtoRepo.GetById(venda.ProdutoId);

        if(cliente == null)
            {
            throw new ArgumentException("Cliente não encontrado!");
            }

        if(produto == null)
            {
            throw new ArgumentException("Produto não encontrado!");
            }

        if(produto.Estoque >= Quantidade(venda))
        {
            produto.Estoque -= Quantidade(venda);
            _produtoRepo.Update(produto);
        }
        else
        {
            throw new ArgumentException("Estoque insuficiente!");
        }

        venda.ValorTotal = produto.Preco * Quantidade(venda);

        venda.DataVenda = DateTime.Now;

        _repo.Add(venda);
        
        return venda;
    }
}
}