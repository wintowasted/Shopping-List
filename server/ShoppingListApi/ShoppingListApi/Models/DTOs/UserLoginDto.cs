﻿using System.ComponentModel.DataAnnotations;

namespace ShoppingListApi.Models.DTOs
{
    public class UserLoginDto
    {
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}
