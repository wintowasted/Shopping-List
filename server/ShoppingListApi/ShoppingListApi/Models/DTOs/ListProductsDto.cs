namespace ShoppingListApi.Models.DTOs
{
    public class ListProductsDto
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public int? Quantity { get; set; } = 0;

        public int CategoryId { get; set; }

        public string? Description { get; set; }

        public bool IsSelected { get; set; }
        public bool IsChecked { get; set; }

        public byte[]? ProductImage { get; set; }
    }
}
