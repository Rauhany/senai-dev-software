using MinhaApi.Models;
namespace MinhaApi.Services;
public interface IClienteService
{
    IEnumerable<Cliente> GetAll();
    Cliente? GetById(int id);
    Cliente  Add(Cliente cliente);
    Cliente? Update(int id, Cliente cliente);
    bool     Delete(int id, Cliente cliente);
    bool Delete(int id);
}