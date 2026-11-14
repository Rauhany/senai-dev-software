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

    public async Task<string> SalvarFoto(int id, IFormFile arquivo)
    {
        var produto = _repo.GetById(id)
            ?? throw new KeyNotFoundException(
                   "Produto não encontrado.");

        // Se já tem foto, apaga a antiga do disco
        if (!string.IsNullOrEmpty(produto.Foto))
            _fotoService.Deletar(produto.Foto);

        var nome = await _fotoService.SalvarAsync(arquivo);
        _repo.AtualizarFoto(id, nome);

        // Retorna a data URL — controller manda direto ao React
        return _fotoService.LerBase64(nome)!;
    }

    public void RemoverFoto(int id)
    {
        var produto = _repo.GetById(id)
            ?? throw new KeyNotFoundException(
                   "Produto não encontrado.");

        if (string.IsNullOrEmpty(produto.Foto)) return;

        _fotoService.Deletar(produto.Foto);
        _repo.AtualizarFoto(id, null);
    }
}
