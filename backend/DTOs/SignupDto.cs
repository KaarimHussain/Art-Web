namespace ArtWebsite.DTO
{
    public class SignupDto
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Phone { get; set; } = null;
    }
}