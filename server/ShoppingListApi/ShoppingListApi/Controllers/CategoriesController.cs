using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingListApi.Models.DTOs;
using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.CategoryService;

namespace ShoppingListApi.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var categories = await _categoryService.GetAllAsync();
            if (categories == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "Something went wrong!"
                    }
                });
            }
            
            return Ok(categories);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> AddCategory(CategoryDto categoryRequest)
        {
           
            var exist_category = await _categoryService.FirstOrDefaultAsync(c => c.CategoryName == categoryRequest.CategoryName);
            if (exist_category != null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "This category already exists!"
                    }
                });
            }

            Category newCategory = new()
            {
                CategoryName = categoryRequest.CategoryName
            };

            await _categoryService.AddAsync(newCategory);
            return Ok(newCategory);
        }

        [HttpDelete("{categoryId:int}")]
        public async Task<ActionResult<List<Category>>> DeleteCategory(int categoryId)
        {
        
            var exist_category = await _categoryService.GetByIdAsync(categoryId);

            if (exist_category == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "Category can not be found!"
                    }
                });
            }

            await _categoryService.DeleteAsync(exist_category);
            return Ok(exist_category);
        }

        [HttpPatch("{categoryId:int}")]
        public async Task<ActionResult<List<Category>>> UpdateCategory(int categoryId, CategoryDto categoryRequest)
        {
            var exist_category = await _categoryService.GetByIdAsync(categoryId);

            if (exist_category == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "Category can not be found!"
                    }
                });
            }
           
            exist_category.CategoryName = categoryRequest.CategoryName;

            var result = await _categoryService.UpdateAsync(exist_category);
            if (!result.Result)
            {
                return BadRequest(result.Message);
            }
            return Ok(exist_category);
        }

    }
}
