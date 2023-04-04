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
    public class TodoItemRepository : ITodoItemRepository
    {
        private readonly DataContext _data;

        public TodoItemRepository(DataContext data)
        {
            _data = data;
        }

        public IQueryable<TodoItem> GetAllItemsQueryable()
        {
            return _data.TodoItems.AsQueryable();
        }
        public async Task<IEnumerable<TodoItem>> GetItemsForSpecifiedList(Guid id)
        {
            var data = GetAllItemsQueryable();
            return await data.Where(x => x.TodoListId == id).ToListAsync();
        }
        public async Task<TodoItem> GetTodoItemById(Guid id)
        {
            var date = GetAllItemsQueryable();
            return await date.Where(x => x.Id == id).FirstAsync();
        }
        public async Task<IEnumerable<TodoItem>> Find(Expression<Func<TodoItem, bool>> predicate)
        {
            return await _data.TodoItems.Where(predicate).ToListAsync();
        }
        public void AddItemToTodoList(TodoItem newItem)
        {
            _data.TodoItems.Add(newItem);
        }
    }
}
