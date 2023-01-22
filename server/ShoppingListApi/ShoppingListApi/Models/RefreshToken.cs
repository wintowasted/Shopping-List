namespace ShoppingListApi.Models
{
    public class RefreshToken
    {
        public string Token { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime Expires { get; set; }
    }
}
