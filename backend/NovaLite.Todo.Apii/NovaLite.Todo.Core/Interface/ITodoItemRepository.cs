using NovaLite.Todo.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Interface
{
    public interface ITodoItemRepository
    {
        IQueryable<TodoItem> GetAllItemsQueryable();
        Task<IEnumerable<TodoItem>> GetItemsForSpecifiedList(Guid id);
        Task<TodoItem> GetTodoItemById(Guid id);
        Task<IEnumerable<TodoItem>> Find(Expression<Func<TodoItem, bool>> predicate);
        void AddItemToTodoList(TodoItem newItem);
    }
}
