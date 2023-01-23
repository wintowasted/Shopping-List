using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingListApi.Models.DTOs;
using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.UserService;

namespace ShoppingListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegisterDto request)
        {
            _userService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var exist_email = await _userService.FirstOrDefaultAsync(u => u.Email == request.Email);
            var exist_userName = await _userService.FirstOrDefaultAsync(u => u.UserName == request.UserName);

            if (exist_email != null)
            {
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "This email address is already registered!"
                    },
                    Result = false
                });
            }
            if (exist_userName != null)
            {
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "This username is already taken!"
                    },
                    Result = false
                });
            }

            User user = new()
            {
                UserName = request.UserName,
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                UserRole = "User",
            };

            await _userService.AddAsync(user);
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto request)
        {
          
            var exist_user = await _userService.FirstOrDefaultAsync(u => u.UserName == request.UserName);
            if (exist_user == null)
            {
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "This user is not registered. Please sign up first!"
                    },
                    Result = false
                });

            }
            if (!(_userService.VerifyPassword(request.Password, exist_user.PasswordHash, exist_user.PasswordSalt)))
            {
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "Wrong password!"
                    },
                    Result = false
                });
            }

            string token = _userService.CreateToken(exist_user);
            var refreshToken = _userService.GenerateRefreshToken();
            await _userService.SetRefreshToken(refreshToken, exist_user);

            return Ok(new AuthResult()
            {
                UserId = exist_user.UserId,
                Result = true,
                Token = token,
                Role = exist_user.UserRole
            });

        }

        [HttpGet("refresh")]
        public async Task<IActionResult> RefreshToken()
        {

            var refreshToken = _userService.GetRefreshToken();
    
            if (refreshToken == null)
            {
                return Unauthorized("Please login first.");
            }

            var user = await _userService.FirstOrDefaultAsync(u => u.RefreshToken.Equals(refreshToken));

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token...");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token is expired.");
            }

            string newAccessToken = _userService.CreateToken(user);
            var newRefreshToken = _userService.GenerateRefreshToken();
            await _userService.SetRefreshToken(newRefreshToken, user);

            return Ok(new AuthResult()
            {
                UserId = user.UserId,
                Result = true,
                Token = newAccessToken,
                Role = user.UserRole
            });

        }
    }


}
