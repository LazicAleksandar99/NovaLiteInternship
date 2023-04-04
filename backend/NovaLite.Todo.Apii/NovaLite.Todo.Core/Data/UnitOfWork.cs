using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NovaLite.Todo.Core.Data.Repository;
using NovaLite.Todo.Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _data;
        private int _executionCount;
        private readonly ILogger<UnitOfWork> _logger;
        public UnitOfWork(DataContext data, ILogger<UnitOfWork> logger)
        {
            _data = data;
            _logger = logger;
        }
        public ITodoListRepository TodoListRepository => new TodoListRepository(_data);
        public ITodoItemRepository TodoItemRepository => new TodoItemRepository(_data);
        public ITodoReminderRepository TodoReminderRepository => new TodoReminderRepository(_data);
        public ITodoAttachmentRepository TodoAttachmentRepository => new TodoAttachmentRepository(_data);
        public ITodoUserRepository TodoUserRepository => new  TodoUserRepository(_data);
        public async Task<bool> SaveAsync()
        {
            return await _data.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            _data.Dispose();
        }
    }
}
