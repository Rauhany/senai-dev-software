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
     
    public IEnumerable<Produto> GetAll() => _repo.GetAll()
    {
        var produtos = _repo.ObterTodos();

        foreach (var p in produtos)
            p.FotoBase64 = _fotoService.LerBase64(p.Foto);

        return produtos;
    }


    public Produto? GetById(int id) => _repo.GetById(id)

     {
        var produto = _repo.ObterPorId(id);
        if (produto is null) return null;

        produto.FotoBase64 = _fotoService.LerBase64(produto.Foto);
        return produto;
    }

    public Produto Add(Produto produto)
    {
        if (produto.Preco < 0)
            throw new ArgumentException("Preço inválido!");
        _repo.Add(produto);
        return produto;
    }

    public Produto? Update(int id, Produto p)
    {
        if (_repo.GetById(id) == null) return null;
        p.Id = id;
        _repo.Update(p);
        return p;
    }

public bool Delete(int id)
{
    var produto = _repo.GetById(id);
    if (produto != null)
    {
        _repo.Delete(id);
        return true;
    }
    return false;
}

 public async Task<string> SalvarFoto(int id, IFormFile arquivo)
    {
        var produto = _repo.ObterPorId(id)
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
        var produto = _repo.ObterPorId(id)
            ?? throw new KeyNotFoundException(
                   "Produto não encontrado.");

        if (string.IsNullOrEmpty(produto.Foto)) return;

        _fotoService.Deletar(produto.Foto);
        _repo.AtualizarFoto(id, null);
    }

}