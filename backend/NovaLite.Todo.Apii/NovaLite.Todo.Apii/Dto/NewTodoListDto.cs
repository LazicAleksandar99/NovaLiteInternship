using System.ComponentModel.DataAnnotations;

namespace NovaLite.Todo.Apii.Dto
{
    public class NewTodoListDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Guid TodoUserId { get; set; }
    }
}
