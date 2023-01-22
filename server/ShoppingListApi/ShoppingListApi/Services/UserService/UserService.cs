using ShoppingListApi.Models.EfCore;
using ShoppingListApi.Services.GenericService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ShoppingListApi.Services.UserService
{
    public class UserService : GenericService<User>, IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;

        public UserService(ShoppingListContext context, IHttpContextAccessor httpContextAccessor, IConfiguration configuration) : base(context)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
        }

        public int GetUserId()
        {

            var userId = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                userId = _httpContextAccessor.HttpContext.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            }

            int.TryParse(userId, out int userIdInt);
            return userIdInt;
        }

        public string CreateToken(User user)
        {

            List<Claim> claims = new()
            {
                new Claim( ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(ClaimTypes.Role, user.UserRole)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            return hashedPassword.SequenceEqual(passwordHash);
        }

        public RefreshToken GenerateRefreshToken()
        {

            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                CreatedAt = DateTime.Now
            };

            return refreshToken;
        }

        public async Task SetRefreshToken(RefreshToken refreshToken, User user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = refreshToken.Expires
            };
            if (_httpContextAccessor.HttpContext != null)
            {
                _httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
            }
            user.RefreshToken = refreshToken.Token;
            user.TokenCreated = refreshToken.CreatedAt;
            user.TokenExpires = refreshToken.Expires;
            await UpdateAsync(user);
        }

        public string GetRefreshToken()
        {
            var refreshToken = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                refreshToken = _httpContextAccessor.HttpContext.Request.Cookies["refreshToken"];
            }
            return refreshToken;
        }
    }
}
