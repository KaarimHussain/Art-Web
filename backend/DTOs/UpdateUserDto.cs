namespace ArtWebsite.DTOs
{
    // DTO for Update
    public class UpdateUserDto
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? PhoneNumber { get; set; }
    }
}