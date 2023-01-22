using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.GenericService;

namespace ShoppingListApi.Services.UserService
{
    public interface IUserService : IGenericService<User>
    {
        public int GetUserId();
        public string CreateToken(User user);
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        public bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt);

        public RefreshToken GenerateRefreshToken();
        public Task SetRefreshToken(RefreshToken refreshToken, User user);
        public string GetRefreshToken();

    }
}
