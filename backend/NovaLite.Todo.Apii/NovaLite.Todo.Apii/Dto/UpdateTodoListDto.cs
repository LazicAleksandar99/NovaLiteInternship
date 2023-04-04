namespace NovaLite.Todo.Apii.Dto
{
    public class UpdateTodoListDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
