using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ShoppingListApi.Models.EfCore;

public partial class List
{
    public int ListId { get; set; }

    public string ListName { get; set; } = null!;

    public byte? IsDeleted { get; set; }
    public bool IsLocked { get; set; } = false;

    public int? UserId { get; set; }

    public virtual ICollection<ListsProduct> ListsProducts { get; } = new List<ListsProduct>();

    [JsonIgnore]
    public virtual User? User { get; set; }
}
