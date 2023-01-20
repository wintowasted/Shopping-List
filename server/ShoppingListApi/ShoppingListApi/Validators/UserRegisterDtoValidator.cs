using FluentValidation;
using ShoppingListApi.Models.DTOs;

namespace ShoppingListApi.Validators
{
    public class UserRegisterDtoValidator : AbstractValidator<UserRegisterDto>
    {
        public UserRegisterDtoValidator()
        {
            RuleFor(u => u.UserName).NotNull()
                .WithMessage("Username can not be empty")
                .MinimumLength(8)
                .WithMessage("Username needs to be greater than 8 characters")
                .MaximumLength(20)
                .WithMessage("Username needs to be less than 20 characters")
                .Matches("^[A-z][A-z0-9-_]")
                .WithMessage("Username needs to be start with letter");


            RuleFor(u => u.Email).NotNull()
                .WithMessage("Email can not be empty")
                .EmailAddress()
                .WithMessage("Email address is not valid");

            RuleFor(u => u.Password).NotNull()
                .WithMessage("Password can not be empty")
                .Length(8, 24)
                .WithMessage("Password needs to be between 8 and 24 characters")
                .Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_\\.]).")
                .WithMessage("Password must include uppercase and lowercase letters, a number and a special character");

        }
    }
}
