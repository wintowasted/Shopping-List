
//using ShoppingListApi.Models.EfCore;
//using System.Security.Claims;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Cryptography;
//using System.Text;

//namespace ShoppingListApi.Services.AuthService
//{
//    public class AuthenticationService : IAuthenticationService
//    {
  
//        private readonly IConfiguration _configuration;

//        public AuthenticationService( IConfiguration configuration)
//        {
//            _configuration = configuration;
//        }
        
     

//        public string CreateToken(User user)
//        {

//            List<Claim> claims = new()
//            {
//                new Claim( ClaimTypes.NameIdentifier, user.UserId.ToString()),
//                new Claim(ClaimTypes.Name, user.UserName),
//                new Claim(ClaimTypes.Email, user.Email),
//                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
//                new Claim(ClaimTypes.Role, user.UserRole)
//            };

//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value));

//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

//            var token = new JwtSecurityToken(
//                claims: claims,
//                expires: DateTime.Now.AddDays(1),
//                signingCredentials: creds
//                );

//            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

//            return jwt;
//        }

//        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
//        {
//            using var hmac = new HMACSHA512();
//            passwordSalt = hmac.Key;
//            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
//        }

//        public bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
//        {
//            using var hmac = new HMACSHA512(passwordSalt);
//            var hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

//            return hashedPassword.SequenceEqual(passwordHash);
//        }

        

        
       
//    }
//}
