using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private static readonly List<CartItem> _cartItems = new();
    private readonly ILogger<CartController> _logger;

    public CartController(ILogger<CartController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_cartItems);
    }

    [HttpPost]
    public IActionResult AddToCart(CartItem item)
    {
        // Check if item already exists in cart
        var existingItem = _cartItems.FirstOrDefault(i => i.Id == item.Id);
        if (existingItem != null)
        {
            // Update quantity
            existingItem.Quantity += item.Quantity;
            return Ok(new ApiResponse { Message = "Item quantity updated in cart" });
        }

        // Add new item
        _cartItems.Add(item);
        return Ok(new ApiResponse { Message = "Item added to cart" });
    }

    [HttpPut("{id}")]
    public IActionResult UpdateQuantity(int id, [FromBody] int quantity)
    {
        var item = _cartItems.FirstOrDefault(i => i.Id == id);
        if (item == null)
        {
            return NotFound(
                new ApiResponse { Message = "Item not found in cart", Status = "error" }
            );
        }

        item.Quantity = quantity;
        return Ok(new ApiResponse { Message = "Item quantity updated" });
    }

    [HttpDelete("{id}")]
    public IActionResult RemoveFromCart(int id)
    {
        var item = _cartItems.FirstOrDefault(i => i.Id == id);
        if (item == null)
        {
            return NotFound(
                new ApiResponse { Message = "Item not found in cart", Status = "error" }
            );
        }

        _cartItems.Remove(item);
        return Ok(new ApiResponse { Message = "Item removed from cart" });
    }

    [HttpDelete]
    public IActionResult ClearCart()
    {
        _cartItems.Clear();
        return Ok(new ApiResponse { Message = "Cart cleared" });
    }
}
