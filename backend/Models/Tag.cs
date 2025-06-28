namespace ArtWebsite.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        // ✅ Many-to-many with Product
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}