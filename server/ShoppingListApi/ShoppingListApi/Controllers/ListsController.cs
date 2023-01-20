using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingListApi.Exceptions;
using ShoppingListApi.Models.DTOs;
using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.ListService;
using ShoppingListApi.Services.ProductService;
using ShoppingListApi.Services.UserService;

namespace ShoppingListApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IListService _listService;
        private readonly IProductService _productService;

        public ListsController(IUserService userService, IListService listService, IProductService productService)
        {
            _userService = userService;
            _listService = listService;
            _productService = productService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetLists()
        {
            var lists = await _listService.GetAllAsync();
            return Ok(lists);
        }

        [HttpPost]
        public async Task<IActionResult> AddList(AddListDto listRequest)
        {
            var requestUserId = _userService.GetUserId();

            List newList = new()
            {
                ListName = listRequest.ListName,
                UserId = requestUserId
            };

            await _listService.AddAsync(newList);
            return Ok(newList);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteList(int id)
        {

            var requestUserId = _userService.GetUserId();

            var exist_list = await _listService.FirstOrDefaultAsync(l => l.ListId == id, l => l.ListsProducts);

            if (exist_list == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "List can not be found!"
                    }
                });
            }

            var user = await _userService.GetByIdAsync(requestUserId);

            if (!user.Lists.Contains(exist_list))
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "You can only delete your own lists!"
                    }
                });
            }

            await _listService.DeleteAsync(exist_list);

            return Ok(exist_list);


        }

        [HttpGet("{userId:int}")]
        public async Task<IActionResult> GetLists(int userId)
        {
            var requestUserId = _userService.GetUserId();

            if (requestUserId != userId)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "You are not authorized to see this data."
                    }
                });
            }

            //var user = await _userService.GetByIdAsync(requestUserId);
            //if (user == null)
            //{
            //    return BadRequest(new AuthResult()
            //    {
            //        Result = false,
            //        Errors = new List<string>()
            //        {
            //            "You are not authorized. Please login first!"
            //        }
            //    });
            //}

            var lists = await _listService.GetAllAsync(l => l.UserId == userId, include: l => l.Include(l => l.ListsProducts));
           
            return Ok(lists);
        }


        [HttpGet("{listId:int}/products")]
        public async Task<ActionResult<List<Product>>> GetProductsOfList(int listId)
        {
            var requestUserId = _userService.GetUserId();

            var exist_list = await _listService.FirstOrDefaultAsync(l => l.ListId == listId,
                include: l => l.Include(l => l.ListsProducts).ThenInclude(lp => lp.Product));

            if (exist_list == null)
            {
                return NotFound(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "List can not be found!"
                    }
                });
            }

            if (exist_list.UserId != requestUserId)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "You can list your own products!"
                    }
                });
            }

            var productsOfList = exist_list.ListsProducts.Select(lp => new ListProductsDto()
            {
                CategoryId = lp.Product.CategoryId,
                IsSelected = lp.IsSelected,
                ProductId = lp.ProductId,
                Quantity = lp.Quantity,
                ProductName = lp.Product.ProductName,
                ProductImage = lp.Product.ProductImage,
                Description = lp.Description,
                IsChecked = lp.IsChecked
            });

            return Ok(productsOfList);

        }


        [HttpPost("{listId:int}/products/{productId:int}")]
        public async Task<IActionResult> AddProductToList(int listId, int productId)
        {

            var exist_product = await _productService.GetByIdAsync(productId);

            if (exist_product == null)
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

            var exist_list = await _listService.FirstOrDefaultAsync(l => l.ListId == listId, l => l.ListsProducts);

            if (exist_list == null)
            {
                return NotFound(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "List can not be found!"
                    }
                });
            }

            var checkProduct = exist_list.ListsProducts.FirstOrDefault(lp => lp.ProductId == productId);

            if(checkProduct != null)
            {
                checkProduct.Quantity += 1;
                await _listService.SaveChangesAsync();
                return Ok(checkProduct);
            }
            else
            {
                var lp = new ListsProduct()
                {
                    ListId = listId,
                    IsSelected = true,
                    Product = exist_product,
                    Quantity = 1

                };
                exist_list.ListsProducts.Add(lp);
                await _listService.SaveChangesAsync();
                return Ok(lp);
            }
        }


        [HttpDelete("{listId:int}/products/{productId:int}")]
        public async Task<IActionResult> DeleteProductFromList(int listId, int productId)
        {

            var exist_product = await _productService.GetByIdAsync(productId);

            if (exist_product == null)
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

            var exist_list = await _listService.FirstOrDefaultAsync(l => l.ListId == listId, l => l.ListsProducts);

            if (exist_list == null)
            {
                return NotFound(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "List can not be found!"
                    }
                });
            }

            var checkProduct = exist_list.ListsProducts.FirstOrDefault(lp => lp.ProductId == productId);
            if(checkProduct == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "Product does not exist in list!"
                    }
                });
            }

            exist_list.ListsProducts.Remove(checkProduct);
            await _listService.SaveChangesAsync();
            return Ok(checkProduct);
        }

        [HttpPatch("{listId:int}/products/{productId:int}")]
        public async Task<IActionResult> EditProductInList(EditProductDto editRequest, int listId, int productId)
        {
            var exist_list = await _listService.FirstOrDefaultAsync(l => l.ListId == listId, l => l.ListsProducts);

            if(exist_list == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "List is not found!"
                    }
                });
            }

            var exist_product = await _productService.GetByIdAsync(productId);

            if (exist_product == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "Product is not found!"
                    }
                });
            }

            var updateProduct = exist_list.ListsProducts.FirstOrDefault(lp => lp.ProductId == productId);

            if (updateProduct == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "This product is not in the list!"
                    }
                });
            }


            updateProduct.Quantity = editRequest.Quantity;
            updateProduct.Description = editRequest.Description;

            await _listService.SaveChangesAsync();

            return Ok(updateProduct);    

        }

        [HttpPatch("{listId:int}/products/{productId:int}/select")]
        public async Task<IActionResult> SelectProduct(int listId, int productId)
        {
            var exist_list = await _listService.FirstOrDefaultAsync(l => l.ListId == listId, l => l.ListsProducts);

            if (exist_list == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "List is not found!"
                    }
                });
            }

            var exist_product = await _productService.GetByIdAsync(productId);

            if (exist_product == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "Product is not found!"
                    }
                });
            }

            var updateProduct = exist_list.ListsProducts.FirstOrDefault(lp => lp.ProductId == productId);

            if (updateProduct == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "This product is not in the list!"
                    }
                });
            }

            updateProduct.IsChecked = !updateProduct.IsChecked;

            await _listService.UpdateAsync(exist_list);

            return Ok(updateProduct);

        }

        [HttpPatch("{listId:int}/lock")]
        public async Task<IActionResult> LockList(int listId)
        {
            var exist_list = await _listService.GetByIdAsync(listId);

            if(exist_list == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "List can not be found!"
                    }
                });
            }
            
            exist_list.IsLocked = true;
            await _listService.UpdateAsync(exist_list);
            return Ok(exist_list);

        }

        [HttpPatch("{listId:int}/unlock")]
        public async Task<IActionResult> UnlockList(int listId)
        {
            var exist_list = await _listService.FirstOrDefaultAsync(l => l.ListId == listId, l => l.ListsProducts);

            if (exist_list == null)
            {
                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Errors = new List<string>()
                    {
                        "List can not be found!"
                    }
                });
            }

            exist_list.IsLocked = false;
            
            foreach(var product in exist_list.ListsProducts.ToList())
            {
                if(product.IsChecked)
                    exist_list.ListsProducts.Remove(product);
            }

            await _listService.UpdateAsync(exist_list);
            return Ok(exist_list);

        }

    }
}
