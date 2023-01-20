using ShoppingListApi.Models.DTOs;
using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.GenericService;

namespace ShoppingListApi.Services.ProductService
{
    public interface IProductService : IGenericService<Product>
    {
  
        public Task<byte[]> ConvertImageToByteArrayAsync(IFormFile image);
    }
}
