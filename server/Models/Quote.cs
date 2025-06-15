namespace BookApi.Models;

public class Quote
{
    public int Id { get; set; }
    public string Text { get; set; } = null!;
    public int UserId { get; set; }
    public User? User { get; set; }

}