using FluentValidation;
using ShoppingListApi.Models.DTOs;

namespace ShoppingListApi.Validators
{
    public class AddListDtoValidator : AbstractValidator<AddListDto>
    {
        public AddListDtoValidator()
        {
            RuleFor(l => l.ListName).NotNull().NotEmpty()
                .WithMessage("List name can not be empty")
                .MaximumLength(50)
                .WithMessage("List name needs to be less than 50 charachters");
        }
    }
}
