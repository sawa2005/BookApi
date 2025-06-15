public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}