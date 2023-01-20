using ShoppingListApi.Models.EfCore;

namespace ShoppingListApi.Models.DTOs
{
    public class ProductResponseDto
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public int CategoryId { get; set; }

        public Category Category{ get; set; }

        public byte[]? ProductImage { get; set; }
    }
}
