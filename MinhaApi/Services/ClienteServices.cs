using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
using Microsoft.Net.Http.Headers;
public class ClienteService(IClienteRepository repo) : IClienteService
{
    private readonly IClienteRepository _repo = repo;

    public IEnumerable<Cliente> GetAll() => _repo.GetAll();

    public Cliente? GetById(int id) => _repo.GetById(id);

    public Cliente Add(Cliente cliente)
    {
        if(cliente.Nome == null)
            throw new ArgumentException("Nome inválido!");
        if(cliente.Email == null)
            throw new ArgumentException("Email inválido!");
        _repo.Add(cliente);
        return cliente;
    }

    public Cliente? Update(int id, Cliente cliente)
    {
        if (_repo.GetById(id) == null) return null;
        cliente.Id = id;
        _repo.Update(cliente);
        return cliente;
    }

    public bool Delete(int id, Cliente cliente)
    {
        if (_repo.GetById(id) == null) return false;
        cliente.Ativo = false;
        if (cliente != null){
            _repo.Update(cliente);
            return true;
        }
        return false;
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
}