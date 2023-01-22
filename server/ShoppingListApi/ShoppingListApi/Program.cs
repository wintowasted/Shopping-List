global using Microsoft.EntityFrameworkCore;
global using ShoppingListApi.Models;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ShoppingListApi.Extensions;
using ShoppingListApi.Validators;
using System.Text;

var AllowedOrigins = "_allowReactApp";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.LoadDataDependencies(builder.Configuration);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adding fluent validation
//builder.Services.AddFluentValidation(v => v.RegisterValidatorsFromAssemblyContaining<UserRegisterDtoValidator>());
builder.Services.AddFluentValidationAutoValidation()
    .AddValidatorsFromAssemblyContaining<UserRegisterDtoValidator>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;


})
    .AddJwtBearer(jwt =>
    {
        var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtConfig:Secret").Value);

        jwt.SaveToken = true;
        jwt.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false, 
            ValidateAudience = false,
            RequireExpirationTime = false,
            ValidateLifetime = true
        };
    });


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowedOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                                                    .AllowAnyHeader()
                                                    .AllowAnyMethod()
                                                    .AllowCredentials();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(AllowedOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Adding global exception handling middleware
app.AddGlobalErrorHandler();

app.Run();
