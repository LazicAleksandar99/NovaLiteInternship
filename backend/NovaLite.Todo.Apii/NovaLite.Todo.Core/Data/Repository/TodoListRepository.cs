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
    public class TodoListRepository : ITodoListRepository
    {
        private readonly DataContext _data;

        public TodoListRepository(DataContext data)
        {
            _data = data;
        }
        public IQueryable<TodoList> GetAllTodoListsQueryable()
        {
            return _data.TodoLists.AsQueryable();
        }
        public async Task<IEnumerable<TodoList>> GetAllTodoLists()
        {
            return await _data.TodoLists.ToListAsync();
        }
        public async Task<IEnumerable<TodoList>> Find(Expression<Func<TodoList, bool>> predicate)
        {
            return await _data.TodoLists.Where(predicate).ToListAsync();
        }
        public async Task<TodoList> GetTodoListById(Guid id)
        {
            var date = GetAllTodoListsQueryable();
            return await date.Where(x => x.Id == id).FirstAsync();
        }
        public void AddNewTodoList(TodoList newTodoList)
        {
            _data.TodoLists.Add(newTodoList);
        }
    }
}
