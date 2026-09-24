using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
using Microsoft.Net.Http.Headers;
public class FornecedoresService(IFornecedoresRepository repo) : IFornecedoresService
{
    private readonly IFornecedoresRepository _repo = repo;

    public IEnumerable<Fornecedores> GetAll() => _repo.GetAll();
    public Fornecedores? GetById(int id) => _repo.GetById(id);

    public Fornecedores Add(Fornecedores fornecedor)
    {
        if(fornecedor.Nome == null)
            throw new ArgumentException("Nome inválido!");
        if(fornecedor.Email == null)
            throw new ArgumentException("Email inválido!");
        _repo.Add(fornecedor);
        return fornecedor;
    }

    public Fornecedores? Update(int id, Fornecedores fornecedor)
    {
        if (_repo.GetById(id) == null) return null;
        fornecedor.Id = id;
        _repo.Update(fornecedor);
        return fornecedor;
    }

    public bool Delete(int id, Fornecedores fornecedor)
    {
        if (_repo.GetById(id) == null) return false;
        fornecedor.Ativo = false;
        if (fornecedor != null){
            _repo.Update(fornecedor);
            return true;
        }
        return false;
    }

    public bool Delete(int id)
 {
    var fornecedor = _repo.GetById(id);
    if (fornecedor != null)
    {
        _repo.Delete(id);
        return true;
    }
    return false;
}
}