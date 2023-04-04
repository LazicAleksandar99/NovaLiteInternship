using NovaLite.Todo.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Interface
{
    public interface ITodoReminderRepository
    {
        IQueryable<TodoReminder> GetAllRemindersQueryable();
        Task<IEnumerable<TodoReminder>> Find(Expression<Func<TodoReminder, bool>> predicate);
        void AddReminderToTodoList(TodoReminder newReminder);
    }
}
