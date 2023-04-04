using NovaLite.Todo.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Interface
{
    public interface ITodoListRepository
    {
        IQueryable<TodoList> GetAllTodoListsQueryable();
        Task<IEnumerable<TodoList>> GetAllTodoLists();
        Task<IEnumerable<TodoList>> Find(Expression<Func<TodoList, bool>> predicate);
        Task<TodoList> GetTodoListById(Guid id);
        void AddNewTodoList(TodoList newTodoList);

    }
}
