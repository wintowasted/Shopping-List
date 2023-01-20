using FluentValidation;
using ShoppingListApi.Models.DTOs;

namespace ShoppingListApi.Validators
{
    public class ProductDtoValidator : AbstractValidator<ProductDto>
    {
        public ProductDtoValidator()
        {
            RuleFor(p => p.ProductName).NotNull().NotEmpty()
                .WithMessage("Product name can not be empty")
                .MaximumLength(15)
                .WithMessage("Product name needs to be less than 15 charachters")
                .Matches("^[A-z]+$")
                .WithMessage("Product name must only contains letter");

            RuleFor(p => p.CategoryName).NotNull().NotEmpty()
                .WithMessage("Category name can not be empty")
                .Matches("^[A-z]+$")
                .WithMessage("Category name must only contains letter");

            RuleFor(p => p.ProductImage).NotNull()
                .WithMessage("Product image can not be empty");
        }
    }
}
