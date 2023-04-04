using System.ComponentModel.DataAnnotations;

namespace NovaLite.Todo.Apii.Dto
{
    public class TodoListDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<TodoItemDto> TodoItems { get; set; } = new List<TodoItemDto>();
    }
}
