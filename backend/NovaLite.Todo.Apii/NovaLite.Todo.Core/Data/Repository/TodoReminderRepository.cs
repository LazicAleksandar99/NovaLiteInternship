using Microsoft.EntityFrameworkCore;
using NovaLite.Todo.Core.Interface;
using NovaLite.Todo.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Data.Repository
{
    public class TodoReminderRepository : ITodoReminderRepository
    {
        private readonly DataContext _data;

        public TodoReminderRepository(DataContext data)
        {
            _data = data;
        }

        public IQueryable<TodoReminder> GetAllRemindersQueryable()
        {
            return _data.TodoReminders.AsQueryable();
        }
        public async Task<IEnumerable<TodoReminder>> Find(Expression<Func<TodoReminder, bool>> predicate)
        {
            return await _data.TodoReminders.Where(predicate).ToListAsync();
        }
        public void AddReminderToTodoList(TodoReminder newReminder)
        {
            _data.TodoReminders.Add(newReminder);
        }
    }
}
