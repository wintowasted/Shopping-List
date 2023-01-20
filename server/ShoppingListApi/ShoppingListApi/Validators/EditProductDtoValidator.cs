using FluentValidation;
using ShoppingListApi.Models.DTOs;

namespace ShoppingListApi.Validators
{
    public class EditProductDtoValidator : AbstractValidator<EditProductDto>
    {
        public EditProductDtoValidator()
        {
            RuleFor(p => p.Quantity)
                .InclusiveBetween(1, 100)
                .WithMessage("Quantity needs to be between 1-100");

            RuleFor(p => p.Description)
                .MaximumLength(15)
                .WithMessage("Description needs to be less than 15 charachters");
        }
    }
}
