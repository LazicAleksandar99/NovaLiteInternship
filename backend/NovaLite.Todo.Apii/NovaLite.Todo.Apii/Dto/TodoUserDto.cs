namespace NovaLite.Todo.Apii.Dto
{
    public class TodoUserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
