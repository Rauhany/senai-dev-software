using MinhaApi.Repositories;
using MinhaApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProdutoRepository, ProdutoRepository>();

builder.Services.AddScoped<IProdutoService, ProdutoService>();

builder.Services.AddScoped<IClienteRepository, ClienteRepository>();

builder.Services.AddScoped<IClienteService, ClienteService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();