using NovaLite.Todo.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Interface
{
    public interface ITodoUserRepository
    {
        Task<IEnumerable<TodoUser>> Find(Expression<Func<TodoUser, bool>> predicate);
        void AddNewTodoUser(TodoUser newTodoUser);
        Task<TodoUser> GetTodoUserById(Guid id);
        IQueryable<TodoUser> GetAllUsersQueryable();

    }
}
