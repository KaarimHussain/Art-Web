namespace ArtWebsite.Models
{
    public class ProductImage
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public string AltText { get; set; } = string.Empty;

        // Foreign Key
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
