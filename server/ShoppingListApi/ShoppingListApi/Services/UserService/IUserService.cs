using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.GenericService;

namespace ShoppingListApi.Services.UserService
{
    public interface IUserService : IGenericService<User>
    {
        public int GetUserId();
       
    }
}
