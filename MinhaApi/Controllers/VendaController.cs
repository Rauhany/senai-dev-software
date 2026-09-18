using MinhaApi.Models;
using MinhaApi.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class VendaController : ControllerBase
{
    private readonly IVendaService _service;

    public VendaController(IVendaService service) => _service = service;

    // GET /api/venda
    [HttpGet]
    public IActionResult GetAll()
    {
        var vendas = _service.GetAll();
        return Ok(vendas);
    }

    // GET /api/venda/1
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var venda = _service.GetById(id);
        if (venda == null)
            return NotFound();
        return Ok(venda);
    }

    // POST /api/venda
    [HttpPost]
    public IActionResult Create([FromBody] Vendas venda)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var criado = _service.Add(venda);
        return CreatedAtAction(nameof(GetById), new { id = criado.Id }, criado);
    }
}