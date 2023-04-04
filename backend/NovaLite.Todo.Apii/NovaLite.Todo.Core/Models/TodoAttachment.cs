using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Models
{
    public class TodoAttachment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        [StringLength(255)]
        public string FileName {  get; set; } = string.Empty;
        public TodoList TodoList { get; set; } = null!;
        public Guid TodoListId { get; set; }

    }
}
