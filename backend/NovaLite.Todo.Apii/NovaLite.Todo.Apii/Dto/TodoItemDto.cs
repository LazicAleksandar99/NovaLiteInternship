using NovaLite.Todo.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace NovaLite.Todo.Apii.Dto
{
    public class TodoItemDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public ItemStatus Status { get; set; }
        public Guid TodoListId { get; set; }
    }
}
