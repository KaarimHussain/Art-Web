using System.ComponentModel.DataAnnotations;

namespace ArtWebsite.Models
{
    public class Product // aka Artwork
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string Slug { get; set; } = string.Empty; // For SEO-friendly URLs

        public string Description { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; } // Selling price

        public decimal? OriginalPrice { get; set; } // For discounts

        public bool IsAvailable { get; set; } = true; // In stock or not

        public int QuantityAvailable { get; set; } = 1; // For prints/multiples

        // ✅ Physical details
        public string Medium { get; set; } = string.Empty; // e.g. Oil, Acrylic
        public string Surface { get; set; } = string.Empty; // e.g. Canvas, Paper
        public string Style { get; set; } = string.Empty; // e.g. Abstract, Realism

        public float WidthInInches { get; set; }
        public float HeightInInches { get; set; }
        public float DepthInInches { get; set; }

        public bool IsFramed { get; set; } = false;
        public bool IsSigned { get; set; } = true;

        public string YearCreated { get; set; } = string.Empty;

        // ✅ Images (URLs or paths)
        public string FeaturedImage { get; set; } = string.Empty;
        public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();

        // ✅ Tags (many-to-many)
        public ICollection<Tag> Tags { get; set; } = new List<Tag>();

        // ✅ Categories (e.g. Painting, Photography, etc.)
        public string Category { get; set; } = string.Empty;

        // ✅ Shipping
        public float ShippingWeightKg { get; set; }
        public string ShippingFromCountry { get; set; } = string.Empty;

        // ✅ Status flags
        public bool IsSold { get; set; } = false;
        public bool IsFeatured { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
