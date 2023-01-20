using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ShoppingListApi.Models.EfCore;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public int CategoryId { get; set; }

    public byte[]? ProductImage { get; set; }


    public virtual Category Category { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<ListsProduct> ListsProducts { get; } = new List<ListsProduct>();
}
