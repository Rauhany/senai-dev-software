using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
using Microsoft.Net.Http.Headers;
public class DepartamentoService(IDepartamentoRepository repo) : IDepartamentoService
{
    private readonly IDepartamentoRepository _repo = repo;

    public IEnumerable<Departamento> GetAll() => _repo.GetAll();

    public Departamento? GetById(int id) => _repo.GetById(id);

    public Departamento Add(Departamento departamento)
    {
        if(departamento.Nome == null)
            throw new ArgumentException("Nome inválido!");
        return departamento;
    }

    public Departamento? Update(int id, Departamento departamento)
    {
        if (_repo.GetById(id) == null) return null;
        departamento.Id = id;
        _repo.Update(departamento);
        return departamento;
    }

    public bool Delete(int id, Departamento departamento)
    {
        if (_repo.GetById(id) == null) return false;
        departamento.Ativo = false;
        if (departamento != null){
            _repo.Update(departamento);
            return true;
        }
        return false;
    }

    public bool Delete(int id)
 {
    var departamento = _repo.GetById(id);
    if (departamento != null)
    {
        _repo.Delete(id);
        return true;
    }
    return false;
}
}