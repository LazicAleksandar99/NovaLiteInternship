using AutoMapper;
using NovaLite.Todo.Apii.Dto;
using NovaLite.Todo.Core.Models;

namespace NovaLite.Todo.Apii.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<TodoList, TodoListDto>().ReverseMap();
            CreateMap<TodoItem, TodoItemDto>().ReverseMap();
            CreateMap<TodoItem, NewItemDto>().ReverseMap();
            CreateMap<TodoReminder, NewReminderDto>().ReverseMap();
            CreateMap<TodoList, NewTodoListDto>().ReverseMap();
            CreateMap<TodoUser, TodoUserDto>().ReverseMap();
            CreateMap<TodoAttachment, NewAttachmentDto>().ReverseMap();
            CreateMap<TodoAttachment,  TodoAttachmentDto>().ReverseMap();
        }
    }
}
