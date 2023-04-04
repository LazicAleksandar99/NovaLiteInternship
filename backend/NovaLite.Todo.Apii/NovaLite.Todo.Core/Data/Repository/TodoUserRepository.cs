using Microsoft.EntityFrameworkCore;
using NovaLite.Todo.Core.Interface;
using NovaLite.Todo.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace NovaLite.Todo.Core.Data.Repository
{
    public class TodoUserRepository : ITodoUserRepository
    {
        private readonly DataContext _data;

        public TodoUserRepository(DataContext data)
        {
            _data = data;
        }
        public IQueryable<TodoUser> GetAllUsersQueryable()
        {
            return _data.TodoUsers.AsQueryable();
        }
        public async Task<TodoUser> GetTodoUserById(Guid id)
        {
            var date = GetAllUsersQueryable();
            return await date.Where(x => x.Id == id).FirstAsync();
        }
        public void AddNewTodoUser(TodoUser newTodouser)
        {
            _data.TodoUsers.Add(newTodouser);
        }
        public async Task<IEnumerable<TodoUser>> Find(Expression<Func<TodoUser, bool>> predicate)
        {
            return await _data.TodoUsers.Where(predicate).ToListAsync();
        }
    }
}
