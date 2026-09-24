using MinhaApi.Models;

namespace MinhaApi.Repositories;
public interface IFornecedoresRepository
{
    IEnumerable<Fornecedores> GetAll();
    Fornecedores? GetById(int id);
    void Add(Fornecedores fornecedor);
    void Update(Fornecedores fornecedor);
    void Delete(int id);
}   