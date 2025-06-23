using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> _products = new()
    {
        new Product
        {
            Id = 1,
            Name = "Abstract Portrait",
            Description = "A beautiful abstract portrait painting",
            Price = 299.99m,
            OriginalPrice = 349.99m,
            Image =
                "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=890&q=80",
            Category = "Portrait",
            Rating = 5,
            Popular = true,
        },
        new Product
        {
            Id = 2,
            Name = "Landscape Painting",
            Description = "A serene landscape painting of mountains",
            Price = 199.99m,
            Image =
                "https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            Category = "Landscape",
            Rating = 4,
            Popular = false,
        },
        new Product
        {
            Id = 3,
            Name = "Modern Art Piece",
            Description = "A contemporary modern art piece",
            Price = 399.99m,
            OriginalPrice = 499.99m,
            Image =
                "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            Category = "Modern",
            Rating = 5,
            Popular = true,
        },
    };

    private readonly ILogger<ProductsController> _logger;

    public ProductsController(ILogger<ProductsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_products);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound(new ApiResponse { Message = "Product not found", Status = "error" });
        }

        return Ok(product);
    }

    [HttpGet("category/{category}")]
    public IActionResult GetByCategory(string category)
    {
        var products = _products.Where(p => p.Category.ToLower() == category.ToLower()).ToList();
        return Ok(products);
    }

    [HttpGet("popular")]
    public IActionResult GetPopular()
    {
        var products = _products.Where(p => p.Popular).ToList();
        return Ok(products);
    }
}
