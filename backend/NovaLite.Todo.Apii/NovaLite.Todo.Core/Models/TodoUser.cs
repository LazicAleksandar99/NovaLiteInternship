using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Models
{
    public class TodoUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public ICollection<TodoList> TodoLists { get; set; } = new List<TodoList>();

    }
}
