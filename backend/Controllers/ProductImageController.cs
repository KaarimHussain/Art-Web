using ArtWebsite.Models;
using Microsoft.AspNetCore.Mvc;

namespace ArtWebsite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductImagesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly CloudinaryService _cloudinary;

        public ProductImagesController(AppDbContext context, CloudinaryService cloudinary)
        {
            _context = context;
            _cloudinary = cloudinary;
        }
        [HttpPost("{productId}")]
        public async Task<IActionResult> UploadImage(int productId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { Message = "No file uploaded." });

            // Check if product exists
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
                return NotFound(new { Message = "Product not found." });

            try
            {
                // Upload to Cloudinary
                string imageUrl = await _cloudinary.UploadImageAsync(file);

                // Save in DB
                var image = new ProductImage
                {
                    Url = imageUrl,
                    AltText = Path.GetFileNameWithoutExtension(file.FileName),
                    ProductId = productId
                };

                _context.ProductImages.Add(image);
                await _context.SaveChangesAsync();

                return Ok(image);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Upload failed.", Error = ex.Message });
            }
        }

        // Optional: Delete image from DB (does NOT remove from Cloudinary)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.ProductImages.FindAsync(id);
            if (image == null)
                return NotFound();

            _context.ProductImages.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}