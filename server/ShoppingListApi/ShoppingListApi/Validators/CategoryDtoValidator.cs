using FluentValidation;
using ShoppingListApi.Models.DTOs;

namespace ShoppingListApi.Validators
{
    public class CategoryDtoValidator : AbstractValidator<CategoryDto>
    {
        public CategoryDtoValidator()
        {
            RuleFor(c => c.CategoryName).NotNull().NotEmpty()
                .WithMessage("Category name can not be empty")
                .Matches("^[A-z]+$")
                .WithMessage("Category name must only contains letter");
        }
    }
}
