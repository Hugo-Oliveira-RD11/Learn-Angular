namespace backend.Models;

public class Todo
{
    public Guid id { get; set; }
    public string? title { get; set; }
    public bool done { get; set; }
}
