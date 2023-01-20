using System;
using System.Collections.Generic;

namespace ShoppingListApi.Models.EfCore;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public byte[] PasswordHash { get; set; } = null!;

    public byte[] PasswordSalt { get; set; } = null!;

    public string UserRole { get; set; } = null!;

    public string? AccessToken { get; set; }

    public virtual ICollection<List> Lists { get; } = new List<List>();
}
