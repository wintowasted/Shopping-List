using ShoppingListApi.Models.DTOs;
using ShoppingListApi.Models.EfCore;

namespace ShoppingListApi.Services.AuthService
{
    public interface IAuthenticationService
    {
        public string CreateToken(User user);
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        public bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt);

 
    }
}
