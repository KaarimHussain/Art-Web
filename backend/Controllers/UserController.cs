using ArtWebsite.DTOs;
using ArtWebsite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{

    private readonly AppDbContext _context;
    private readonly ILogger<UserController> _logger;

    public UserController(AppDbContext context, ILogger<UserController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAllUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        Console.WriteLine("USER WITH ID " + id.ToString());
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User deleted successfully" });
    }

    [HttpPost]
    public async Task<ActionResult<User>> AddUser(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAllUsers), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto userDto)
    {
        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null)
            return NotFound(new { message = "User not found" });

        existingUser.Username = userDto.Username;
        existingUser.Email = userDto.Email;
        existingUser.PhoneNumber = userDto.PhoneNumber;

        await _context.SaveChangesAsync();

        return Ok(new { message = "User updated successfully", user = existingUser });
    }

    private async Task<bool> UserExists(int id)
    {
        return await _context.Users.AnyAsync(e => e.Id == id);
    }
}
