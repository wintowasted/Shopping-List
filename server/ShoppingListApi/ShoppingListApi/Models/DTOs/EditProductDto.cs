namespace ShoppingListApi.Models.DTOs
{
    public class EditProductDto
    {
        public int Quantity { get; set; } = 1;
        public string? Description { get; set; }
    }
}
