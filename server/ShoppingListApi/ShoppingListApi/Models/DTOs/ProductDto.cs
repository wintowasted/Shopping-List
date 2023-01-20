namespace ShoppingListApi.Models.DTOs
{
    public class ProductDto
    {
       
        public string ProductName { get; set; } = null!;

        public string CategoryName { get; set; }

        public IFormFile? ProductImage { get; set; }


    }
}
