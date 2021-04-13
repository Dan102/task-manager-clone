using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using task_manager_api.Data;
using task_manager_api.Dtos;
using task_manager_api.Models;
using task_manager_api.Services.Interfaces;
using System.Text.Encodings;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace task_manager_api.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IConfiguration configuration;
        private readonly IUserRepository userRepository;
        private readonly int saltLength = 16;
        private readonly int keyIterationNum = 100000;
        private readonly int passwordHashLength = 20;
        private readonly int jwtTokenExpireDays = 7;

        public AuthenticationService(IConfiguration configuration, IUserRepository userRepository)
        {
            this.configuration = configuration;
            this.userRepository = userRepository;
        }

        public bool Register(string username, string password)
        {
            if (userRepository.GetUsers().Where(x => x.Username == username).Count() > 0)
            {
                return false;
            }

            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[saltLength]);
            var hashedPassword = getHashedPassword(password, Convert.ToBase64String(salt));
            return userRepository.CreateUser(username, hashedPassword, Convert.ToBase64String(salt));
        }

        public UserLoggedDto Authenticate(string username, string password)
        {
            var user = userRepository.GetUsers().SingleOrDefault(x => x.Username.Equals(username));
            if (user == null) { return null; }

            var hashedPassword = getHashedPassword(password, user.Salt);
            if (user.HashedPassword != hashedPassword) { return null; }

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new UserLoggedDto
            {
                Username = user.Username,
                Fullname = user.Fullname,
                Token = token,
            };
        }

        private string getHashedPassword(string password, string salt)
        {
            byte[] saltBytes = Encoding.ASCII.GetBytes(salt);
            var pbkdf2 = new Rfc2898DeriveBytes(Encoding.ASCII.GetBytes(password), saltBytes, keyIterationNum);
            byte[] hash = pbkdf2.GetBytes(passwordHashLength);
            byte[] hashedPaswordBytes = new byte[passwordHashLength + saltBytes.Length];
            Array.Copy(saltBytes, 0, hashedPaswordBytes, 0, saltBytes.Length);
            Array.Copy(hash, 0, hashedPaswordBytes, saltBytes.Length, passwordHashLength);
            return Convert.ToBase64String(hashedPaswordBytes);
        }


        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration["Auth:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(jwtTokenExpireDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
