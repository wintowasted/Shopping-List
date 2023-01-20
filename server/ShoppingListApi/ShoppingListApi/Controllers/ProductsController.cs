using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingListApi.Models.DTOs;
using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.CategoryService;
using ShoppingListApi.Services.ProductService;

namespace ShoppingListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;

        public ProductsController(IProductService productService, ICategoryService categoryService)
        {
            _productService = productService;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetAllAsync(p => p.Category);

            if (products == null)
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

            //var response = products.Select(p => new ProductResponseDto()
            //{
            //    ProductId = p.ProductId,
            //    CategoryId = p.CategoryId,
            //    CategoryName = p.Category.CategoryName,
            //    ProductName = p.ProductName,
            //    ProductImage = p.ProductImage
            //});
            return Ok(products);

        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm]ProductDto productRequest )
        {

            var exist_product = await _productService.FirstOrDefaultAsync(p => p.ProductName == productRequest.ProductName);

            if (exist_product != null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "This product already exists!"
                    }
                });
            }

            var requestCategory = await _categoryService.FirstOrDefaultAsync(c => c.CategoryName == productRequest.CategoryName);
            if (requestCategory == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "This category does not exist. Please add it first!"
                    }
                });
            }

            Product newProduct = new()
            {
                ProductName = productRequest.ProductName,
                CategoryId = requestCategory.CategoryId,
                ProductImage = await _productService.ConvertImageToByteArrayAsync(productRequest.ProductImage)
            };

            await _productService.AddAsync(newProduct);
            return Ok(newProduct);
        }


        [HttpDelete("{productId:int}")]
        public async Task<ActionResult<List<Product>>> DeleteProduct(int productId)
        {
            var product = await _productService.GetByIdAsync(productId);
            if (product == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "Product can not be found!"
                    }
                });
            }

            await _productService.DeleteAsync(product);
            return Ok(product);

        }

        [HttpPatch("{productId:int}")]
        public async Task<ActionResult<List<Product>>> UpdateProduct(int productId, [FromForm]ProductDto productRequest)
        {
            var product = await _productService.GetByIdAsync(productId);
            if (product == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "Product can not be found!"
                    }
                });
            }

            var requestCategory = await _categoryService.FirstOrDefaultAsync(c => c.CategoryName == productRequest.CategoryName);
            if (requestCategory == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "This category does not exist. Please add it first!"
                    }
                });
            }

            product.ProductName = productRequest.ProductName;
            product.CategoryId = requestCategory.CategoryId;
            product.ProductImage = await _productService.ConvertImageToByteArrayAsync(productRequest.ProductImage);


            await _productService.UpdateAsync(product);
            return Ok(product);

        }


    }
}
