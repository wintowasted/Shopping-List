using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ShoppingListApi.Models.EfCore;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public byte[] PasswordHash { get; set; } = null!;

    public byte[] PasswordSalt { get; set; } = null!;

    public string UserRole { get; set; } = null!;

    [JsonIgnore]
    public string? AccessToken { get; set; }

    public string RefreshToken { get; set; } = string.Empty;
    public DateTime TokenCreated { get; set; }
    public DateTime TokenExpires { get; set; }

    public virtual ICollection<List> Lists { get; } = new List<List>();
}
