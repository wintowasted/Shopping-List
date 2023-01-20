namespace ShoppingListApi.Models
{
    public class DataResult
    {
        public DataResult(bool result, string message)
        {
            Result = result;
            Message = message;  
        }

        public bool Result { get; set; }
        public string Message { get; set; }
    }
}
