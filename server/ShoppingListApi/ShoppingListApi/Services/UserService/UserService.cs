using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.GenericService;
using System.Security.Claims;

namespace ShoppingListApi.Services.UserService
{
    public class UserService : GenericService<User>, IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(ShoppingListContext context, IHttpContextAccessor httpContextAccessor) : base(context)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetUserId()
        {

            var userId = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                userId = _httpContextAccessor.HttpContext.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            }

            int.TryParse(userId, out int userIdInt);
            return userIdInt;
        }
    }
}
