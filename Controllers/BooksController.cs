using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookApi.Data;
using BookApi.Models;

namespace BookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BooksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BooksController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_context.Books.ToList());

    [HttpPost]
    public IActionResult Create(Book book)
    {
        _context.Books.Add(book);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAll), new { id = book.Id }, book);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Book updatedBook)
    {
        var book = _context.Books.Find(id);
        if (book == null) return NotFound();

        book.Title = updatedBook.Title;
        book.Author = updatedBook.Author;
        book.PublishingDate = updatedBook.PublishingDate;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var book = _context.Books.Find(id);
        if (book == null) return NotFound();

        _context.Books.Remove(book);
        _context.SaveChanges();
        return NoContent();
    }
}