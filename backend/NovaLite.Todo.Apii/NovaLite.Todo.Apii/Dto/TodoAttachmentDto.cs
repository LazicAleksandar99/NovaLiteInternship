namespace NovaLite.Todo.Apii.Dto
{
    public class TodoAttachmentDto
    {
        public Guid id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public Guid TodoListId { get; set; }
    }
}
