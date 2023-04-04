using Azure.Storage.Blobs;
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
    public class TodoAttachmentRepository : ITodoAttachmentRepository
    {
        DataContext _data;
        public TodoAttachmentRepository(DataContext data)
        {
            _data = data;
        }

        public void AddAttachmentToTodoList(TodoAttachment attachment)
        {
            _data.TodoAttachments.Add(attachment);
        }

        public async Task<IEnumerable<TodoAttachment>> Find(Expression<Func<TodoAttachment, bool>> predicate)
        {
            return await _data.TodoAttachments.Where(predicate).ToListAsync();
        }
    }
}
