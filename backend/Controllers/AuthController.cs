using ArtWebsite.Components;
using ArtWebsite.DTO;
using ArtWebsite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly AppDbContext _context;
    private readonly AuthComponent _authComponent;

    public AuthController(IConfiguration config, AppDbContext context, AuthComponent authComponent)
    {
        _config = config;
        _context = context;
        _authComponent = authComponent;
    }

    // Default Route
    [HttpGet]
    public IActionResult Check()
    {
        return Ok("This is Auth Controller");
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupDto request)
    {
        var existingUser = new LoginDto { Email = request.Email, Password = request.Password };

        var user = await _authComponent.IfExist(existingUser);
        if (user)
        {
            return BadRequest(
                new { success = false, message = "User already exists with this email." }
            );
        }

        try
        {
            // Create new user
            var newUser = new User
            {
                Email = request.Email,
                Username = request.Username,
                PhoneNumber = request.Phone, // Add this if your User model has Phone
                Password = _authComponent.EncryptPassword(request.Password),
                CreatedAt = DateTime.UtcNow,
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            // Generate Token for the new user
            var token = _authComponent.GenerateToken(newUser.Email, "User", newUser.Username);

            return Ok(
                new
                {
                    success = true,
                    token,
                    message = "Signup Successful!",
                    role = "User",
                }
            );
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                new { success = false, message = "An error occurred during signup." }
            );
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto request)
    {
        try
        {
            if (_authComponent.ValidateAdmin(request.Email, request.Password))
            {
                var token = _authComponent.GenerateToken(request.Email, "Admin", "Admin");
                return Ok(
                    new
                    {
                        success = true,
                        token,
                        message = "Admin login successful!",
                        role = "Admin",
                    }
                );
            }
            else if (await _authComponent.IfExist(request))
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (
                    user != null
                    && _authComponent.ValidatePassword(request.Password, user.Password)
                )
                {
                    var token = _authComponent.GenerateToken(user.Email, "User", user.Username);
                    return Ok(
                        new
                        {
                            success = true,
                            token,
                            message = "Login Successful!",
                            role = "User",
                        }
                    );
                }
                else
                {
                    return Unauthorized(new { success = false, message = "Invalid credentials" });
                }
            }
            else
            {
                return BadRequest(
                    new { success = false, message = "No User Found with this email!" }
                );
            }
        }
        catch (Exception)
        {
            return StatusCode(
                500,
                new { success = false, message = "An error occurred during login." }
            );
        }
    }
}
