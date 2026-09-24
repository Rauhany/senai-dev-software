using MinhaApi.Models;
using MinhaApi.Services; 
using Microsoft.AspNetCore.Mvc;

namespace MinhaApi.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class FornecedoresController : ControllerBase
    {
        private readonly IFornecedoresService _service;

        public FornecedoresController(IFornecedoresService service) => _service = service;      
        [HttpGet]
        public IActionResult GetAll()
        {
            var fornecedores = _service.GetAll();
            return Ok(fornecedores );
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var fornecedor = _service.GetById(id);
            if (fornecedor == null)
                return NotFound();
            return Ok(fornecedor);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Fornecedores fornecedor) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _service.Add(fornecedor); 
            return CreatedAtAction(nameof(GetById), new { id = fornecedor.Id }, fornecedor);
        }
    
     [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Fornecedores fornecedor)
        {
            var atualizado = _service.Update(id, fornecedor);

            if (atualizado == null)
                return NotFound();

            return Ok(atualizado);
        }

    // DELETE /api/produto/1
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        bool deletado = _service.Delete(id);

        if (!deletado)
            return NotFound();

        return NoContent();
    }
}
}
          