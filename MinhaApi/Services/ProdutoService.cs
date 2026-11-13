using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
public class ProdutoService : IProdutoService
{

    private readonly IProdutoRepository _repo;
    private readonly IFotoService _fotoService;

    public ProdutoService(IProdutoRepository repo, IFotoService fotoService)
    {
        _repo = repo;
        _fotoService = fotoService;
    }
     
    public IEnumerable<Produto> GetAll() => _repo.GetAll();
public Produto? GetById(int id)
    {
        throw new NotImplementedException();
    }

    public Produto Add(Produto produto)
    {
        throw new NotImplementedException();
    }

    public Produto? Update(int id, Produto produto)
    {
        throw new NotImplementedException();
    }

    public bool Delete(int id)
    {
        throw new NotImplementedException();
    }

    public Task<string> SalvarFoto(int id, IFormFile arquivo)
    {
        throw new NotImplementedException();
    }

    public void RemoverFoto(int id)
    {
        throw new NotImplementedException();
    }
}