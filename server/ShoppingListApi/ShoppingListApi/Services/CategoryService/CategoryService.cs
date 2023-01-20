using ShoppingListApi.Models.DTOs;
using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.GenericService;

namespace ShoppingListApi.Services.CategoryService
{
    public class CategoryService : GenericService<Category>, ICategoryService
    {
        public CategoryService(ShoppingListContext context) : base(context)
        {
        }
    }
}
