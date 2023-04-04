using NovaLite.Todo.Core.Models;

namespace NovaLite.Todo.Apii.Dto
{
    public class UpdateTodoItemDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public ItemStatus Status { get; set; }
    }
}
