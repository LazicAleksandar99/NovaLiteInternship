using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Models
{
    public class TodoReminder
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public DateTime TimeStamp { get; set; }
        [Required]
        public bool Sent { get; set; }
        public Guid TodoListId { get; set; }
        public TodoList TodoList { get; set; } = null!;
    }
}
