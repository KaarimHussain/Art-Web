using ArtWebsite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(AppDbContext context, ILogger<ProductsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/products
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _context
            .Products.Include(p => p.Images)
            .Include(p => p.Tags)
            .ToListAsync();

        return Ok(products);
    }

    // GET: api/products/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _context
            .Products.Include(p => p.Images)
            .Include(p => p.Tags)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return NotFound(new { Message = "Product not found" });

        return Ok(product);
    }

    // GET: api/products/category/Landscape
    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category)
    {
        var products = await _context.Products
            .Include(p => p.Images)
            .Include(p => p.Tags)
            .Where(p => p.Category == category)
            .ToListAsync();

        return Ok(products);
    }

    // GET: api/products/tag/Abstract
    [HttpGet("tag/{tagName}")]
    public async Task<IActionResult> GetByTag(string tagName)
    {
        var products = await _context
            .Products.Where(p => p.Tags.Any(t => t.Name.ToLower() == tagName.ToLower()))
            .Include(p => p.Images)
            .Include(p => p.Tags)
            .ToListAsync();

        return Ok(products);
    }



    // POST: api/products
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromForm] IFormFile featuredImage, [FromForm] List<IFormFile> additionalImages, [FromForm] string product)
    {
        if (string.IsNullOrEmpty(product))
            return BadRequest(new { Message = "Product data is required." });
        var productObj = JsonSerializer.Deserialize<Product>(product);
        if (productObj == null)
            return BadRequest(new { Message = "Invalid product data." });
        // TODO: Save images to storage (e.g., Cloudinary or local), set URLs on productObj
        // For now, just set dummy URLs
        if (featuredImage != null)
            productObj.FeaturedImage = $"/uploads/{featuredImage.FileName}";
        if (additionalImages != null && additionalImages.Count > 0)
        {
            productObj.Images = additionalImages.Select((img, idx) => new ProductImage
            {
                Url = $"/uploads/{img.FileName}",
                AltText = $"{productObj.Title} - Image {idx + 1}",
            }).ToList();
        }
        _context.Products.Add(productObj);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = productObj.Id }, productObj);
    }

    // PUT: api/products/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] Product updated)
    {
        var existing = await _context
            .Products.Include(p => p.Images)
            .Include(p => p.Tags)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (existing == null)
            return NotFound();

        // Simple mapping – can refactor to use AutoMapper later
        existing.Title = updated.Title;
        existing.Description = updated.Description;
        existing.Price = updated.Price;
        existing.OriginalPrice = updated.OriginalPrice;
        existing.Category = updated.Category;
        existing.Medium = updated.Medium;
        existing.Surface = updated.Surface;
        existing.Style = updated.Style;
        existing.WidthInInches = updated.WidthInInches;
        existing.HeightInInches = updated.HeightInInches;
        existing.DepthInInches = updated.DepthInInches;
        existing.IsFramed = updated.IsFramed;
        existing.IsSigned = updated.IsSigned;
        existing.YearCreated = updated.YearCreated;
        existing.IsAvailable = updated.IsAvailable;
        existing.QuantityAvailable = updated.QuantityAvailable;
        existing.ShippingFromCountry = updated.ShippingFromCountry;
        existing.ShippingWeightKg = updated.ShippingWeightKg;
        existing.IsSold = updated.IsSold;
        existing.IsFeatured = updated.IsFeatured;

        await _context.SaveChangesAsync();

        return Ok(existing);
    }

    // DELETE: api/products/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
