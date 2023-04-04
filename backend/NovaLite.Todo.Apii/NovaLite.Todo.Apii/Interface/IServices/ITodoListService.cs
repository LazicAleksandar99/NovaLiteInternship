using NovaLite.Todo.Apii.Dto;

namespace NovaLite.Todo.Apii.Interface.IServices
{
    public interface ITodoListService
    {
        Task<Object> Login(TodoUserDto userDto);
        Task<Object> GetAllTodoLists(string email, Guid id);
        Task<Object> GetTodoListById(Guid id);
        Task<Object> GetAllUsersExceptAdmins();
        Task<Object> GetAllAttachmentsFromTodoList(Guid id);
        Task<Object> AddItemToTodoList(NewItemDto item);
        Task<string> AddReminderToTodoList(NewReminderDto newReminder);
        Task<Object> AddNewTodoList(NewTodoListDto todoList);
        Task<Object> AddAttachmentToTodoList(NewAttachmentDto newAttachmentDto);
        Task<Object> UpdateTodoList(UpdateTodoListDto updatedUserDto);
        Task<Object> UpdateTodoItem(UpdateTodoItemDto updateTodoItem);
        Task<Object> ChangeUserRole(TodoUserDto user);
    }
}
