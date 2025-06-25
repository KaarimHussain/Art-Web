using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ArtWebsite.DTO;
using ArtWebsite.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ArtWebsite.Components
{
    public class AuthComponent
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;

        public AuthComponent(IConfiguration config, AppDbContext context)
        {
            _context = context;
            _config = config;
        }

        // Validate Admin Credentials
        public bool ValidateAdmin(string email, string password)
        {
            return email == "admin@gmail.com" && password == "123456789";
        }

        // Validate User Credentials
        public async Task<bool> ValidateUser(LoginDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user != null && ValidatePassword(request.Password, user.Password))
            {
                return true;
            }
            return false;
        }

        // If Exist
        public async Task<bool> IfExist(LoginDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user != null)
            {
                return true;
            }
            return false;
        }

        // Encrypt Password
        public string EncryptPassword(string password)
        {
            var hashPassword = BCrypt.Net.BCrypt.HashPassword(password);
            return hashPassword;
        }

        // Validate Password
        public bool ValidatePassword(string password, string hashPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashPassword);
        }

        // Generate Token
        public string GenerateToken(string email, string role, string name)
        {
            var claims = new[]
            {
                new Claim("name", name),
                new Claim("role", role),
                new Claim("email", email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
