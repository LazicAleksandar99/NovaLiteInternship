using NovaLite.Todo.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Interface
{
    public interface ITodoAttachmentRepository
    {
        void AddAttachmentToTodoList(TodoAttachment attachment);
        Task<IEnumerable<TodoAttachment>> Find(Expression<Func<TodoAttachment, bool>> predicate);
    }
}
