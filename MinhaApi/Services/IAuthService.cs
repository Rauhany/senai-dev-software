
using MinhaApi.Models;

namespace MinhaApi.Services
{
    public interface IAuthService
    {
        string? Login(LoginRequest request);
    }
}

public interface IAuthService
{
    LoginResponse Login(LoginRequest request);
}