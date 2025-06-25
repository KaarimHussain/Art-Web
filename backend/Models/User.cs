
using System.ComponentModel.DataAnnotations;

namespace ArtWebsite.Models
{
    public class User
    {

        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = null!;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [DataType(DataType.Text)]
        public string? Address { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Phone]
        public string? PhoneNumber { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}