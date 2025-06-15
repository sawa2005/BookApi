using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookApi.Data;
using BookApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BookApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public QuotesController(ApplicationDbContext context)
    {
        _context = context;
    }

    private int GetCurrentUserId()
    {
        // This assumes your JWT contains the user ID as the "id" claim
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("id");
        if (userIdClaim == null)
            throw new Exception("User ID claim not found");

        return int.Parse(userIdClaim.Value);
    }

    [HttpGet]
    public IActionResult GetQuotes()
    {
        int userId = GetCurrentUserId();

        var quotes = _context.Quotes
            .Where(q => q.UserId == userId)
            .ToList();

        return Ok(quotes);
    }

    [HttpPost]
    public IActionResult AddQuote([FromBody] Quote quote)
    {
        int userId = GetCurrentUserId();

        if (_context.Quotes.Count(q => q.UserId == userId) >= 5)
            return BadRequest("Maximum of 5 quotes allowed.");

        quote.UserId = userId;
        _context.Quotes.Add(quote);
        _context.SaveChanges();

        return Ok(quote);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteQuote(int id)
    {
        var userId = GetCurrentUserId();
        var quote = await _context.Quotes.FirstOrDefaultAsync(q => q.Id == id && q.UserId == userId);
        if (quote == null) return NotFound();

        _context.Quotes.Remove(quote);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}