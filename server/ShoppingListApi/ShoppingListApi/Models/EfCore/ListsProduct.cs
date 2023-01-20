using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ShoppingListApi.Models.EfCore;

public partial class ListsProduct
{
    [JsonIgnore]
    public int ListId { get; set; }

    public int ProductId { get; set; }

    public int? Quantity { get; set; }
    public bool IsSelected { get; set; }
    public bool IsChecked { get; set; } = false;

    public string? Description { get; set; }

    [JsonIgnore]
    public virtual List List { get; set; } = null!;
    [JsonIgnore]
    public virtual Product Product { get; set; } = null!;
}
