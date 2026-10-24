using MinhaApi.Models;
using MinhaApi.Services; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace MinhaApi.Controllers 


{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class VendaController : ControllerBase
    {
        private readonly IVendaService _service;

        public VendaController(IVendaService service) => _service = service;

        [HttpGet]
        public IActionResult GetAll()
        {
            var vendas = _service.GetAll();
            return Ok(vendas);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var venda = _service.GetById(id);
            if (venda == null)
                return NotFound();
            return Ok(venda);
        }

        [HttpPost]
public IActionResult Create([FromBody] Venda venda) 
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    try 
    {
        var criado = _service.Add(venda); 
        return CreatedAtAction(nameof(GetById), new { id = criado.Id }, criado);
    }
    catch (ArgumentException ex)
    {
        return BadRequest(new { mensagem = ex.Message });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { mensagem = "Erro interno no servidor.", detalhe = ex.Message });
    }
}
    }

    
}