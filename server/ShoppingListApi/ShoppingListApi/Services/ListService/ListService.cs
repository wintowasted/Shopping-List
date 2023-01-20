using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.GenericService;

namespace ShoppingListApi.Services.ListService
{
    public class ListService : GenericService<List>, IListService 
    {
        private readonly ShoppingListContext _context;

        public ListService(ShoppingListContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List> GetListByIdWithProductsAsync(int id)
        {
            return await _context.Lists.Include(list => list.ListsProducts)
                .ThenInclude(lp => lp.Product)
                .FirstOrDefaultAsync(l => l.ListId == id);
        }
    }
}
