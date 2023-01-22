using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.CategoryService;
using ShoppingListApi.Services.ListService;
using ShoppingListApi.Services.ProductService;
using ShoppingListApi.Services.UserService;

namespace ShoppingListApi.Extensions
{
    public static class LoadDataDependenciesExtension
    {
        public static IServiceCollection LoadDataDependencies(this IServiceCollection services, IConfiguration configuration)
        {   
            services.AddDbContext<ShoppingListContext>(opt => opt.UseSqlServer( configuration.GetConnectionString("Default")));

            // Add HttpContextAccessor Service
            services.AddHttpContextAccessor();
            // Add User Service
            services.AddScoped<IUserService, UserService>();
            //// Add Authentication Service
            //services.AddScoped<IAuthenticationService, AuthenticationService>();
            // Add List Service
            services.AddScoped<IListService, ListService>();
            // Add Category Service
            services.AddScoped<ICategoryService, CategoryService>();
            // Add Product Service
            services.AddScoped<IProductService, ProductService>();


            return services;
        }
    }
}
