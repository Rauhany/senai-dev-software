using MinhaApi.Models;
namespace MinhaApi.Services;
public interface IFornecedoresService
{
    IEnumerable<Fornecedores> GetAll();
    Fornecedores? GetById(int id);
    Fornecedores  Add(Fornecedores fornecedor);
    Fornecedores? Update(int id, Fornecedores fornecedor);
    bool     Delete(int id, Fornecedores fornecedor);
    bool Delete(int id);
}