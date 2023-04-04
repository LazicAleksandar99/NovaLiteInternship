using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Models
{
    public enum ItemStatus { Open, Active, Closed }
    public class TodoItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string Content { get; set; } = string.Empty;
        [Required]
        public ItemStatus Status { get; set; }
        public Guid TodoListId { get; set; }
        public TodoList TodoList { get; set; } = null!;
    }
}
