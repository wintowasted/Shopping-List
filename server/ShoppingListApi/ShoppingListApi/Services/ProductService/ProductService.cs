using ShoppingListApi.Models.DTOs;
using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.GenericService;

namespace ShoppingListApi.Services.ProductService
{
    public class ProductService : GenericService<Product>, IProductService
    {
        private readonly ShoppingListContext _context;

        public ProductService(ShoppingListContext context) : base(context)
        {
            _context = context;
        }

        public async Task<byte[]> ConvertImageToByteArrayAsync(IFormFile image)
        {
            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }

       
    }
}
