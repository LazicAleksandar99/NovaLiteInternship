using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        ITodoListRepository TodoListRepository { get; }
        ITodoItemRepository TodoItemRepository { get; }
        ITodoReminderRepository TodoReminderRepository { get; }
        ITodoAttachmentRepository TodoAttachmentRepository { get; }
        ITodoUserRepository TodoUserRepository { get; }
        Task<bool> SaveAsync();
    }
}
