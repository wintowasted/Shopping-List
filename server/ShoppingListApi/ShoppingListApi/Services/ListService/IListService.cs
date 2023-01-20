

using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.GenericService;

namespace ShoppingListApi.Services.ListService
{
    public interface IListService : IGenericService<List>
    {
        public Task<List> GetListByIdWithProductsAsync(int id);
    }
}
