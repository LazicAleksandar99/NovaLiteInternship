using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using NovaLite.Todo.Apii.Dto;
using NovaLite.Todo.Apii.Interface.IServices;
using NovaLite.Todo.Core.Interface;
using NovaLite.Todo.Core.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NovaLite.Todo.Apii.Services
{
    public class TodoListService : ITodoListService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public TodoListService(IUnitOfWork uow,
                               IMapper mapper,
                               IConfiguration configuration) 
        {
            _uow = uow;
            _mapper = mapper; 
            _config = configuration;
        }
        public async Task<Object> Login(TodoUserDto userDto)
        {

            //if (String.IsNullOrWhiteSpace(user.Email))
            //{
            //    apiError.ErrorCode = 400;
            //    apiError.ErrorMessage = "Email can not be blank";
            //    return apiError;
            //}
            //if (String.IsNullOrWhiteSpace(loginReq.Password) || loginReq.Password.Length < 8)
            //{
            //    apiError.ErrorCode = 400;
            //    apiError.ErrorMessage = "Password can not be blank or less then 8 characters";
            //    return apiError;
            //}

            var users = await _uow.TodoUserRepository.Find(x => x.Email == userDto.Email);
            if (users.ToList() == null || users.ToList().Count == 0)
            {
                _uow.TodoUserRepository.AddNewTodoUser(new TodoUser() { Email = userDto.Email, Id = userDto.Id, Role = "User" });
                await _uow.SaveAsync();
            }
            var theUser = await _uow.TodoUserRepository.GetTodoUserById(userDto.Id);
            string token = CreateJWT(theUser);
            return token;
        }
        public async Task<Object> GetAllTodoLists(string email, Guid userId)
        {
            if (string.IsNullOrWhiteSpace(email))
                return null;

            var allTodoLists = await _uow.TodoListRepository.Find(x => x.TodoUserId == userId);
            List<TodoListDto> allTodoListDtos = (List<TodoListDto>)_mapper.Map<IEnumerable<TodoListDto>>(allTodoLists);

            for (int i = 0; i < allTodoListDtos.Count; i++)
            {
                var allItemFromSpecifiedList = await _uow.TodoItemRepository.Find(x => x.TodoListId == allTodoListDtos[i].Id);
                List<TodoItemDto> allItemsFromSpecifiedListDto = (List<TodoItemDto>)_mapper.Map<IEnumerable<TodoItemDto>>(allItemFromSpecifiedList);

                allTodoListDtos[i].TodoItems = allItemsFromSpecifiedListDto;
            }
            return allTodoListDtos;
        }
        public async Task<Object> GetTodoListById(Guid id)
        {
            var todoList = await _uow.TodoListRepository.GetTodoListById(id);
            if (todoList == null)
                return null;
            TodoListDto todoListDto = _mapper.Map<TodoListDto>(todoList);
            var allItemFromSpecifiedList = await _uow.TodoItemRepository.GetItemsForSpecifiedList(todoList.Id);
            List<TodoItemDto> allItemsFromSpecifiedListDto = (List<TodoItemDto>)_mapper.Map<IEnumerable<TodoItemDto>>(allItemFromSpecifiedList);
            todoListDto.TodoItems = allItemsFromSpecifiedListDto;

            return todoListDto;
        }
        public async Task<Object> GetAllUsersExceptAdmins()
        {
            var users = await _uow.TodoUserRepository.Find(x => x.Role != "Admin");
            List<TodoUserDto> allUsersExceptAdmins = (List<TodoUserDto>)_mapper.Map<IEnumerable<TodoUserDto>>(users);
            return allUsersExceptAdmins;
        }
        public async Task<Object> GetAllAttachmentsFromTodoList(Guid id)
        {
            var attachments = await  _uow.TodoAttachmentRepository.Find(x => x.TodoListId == id);
            List<TodoAttachmentDto> allAttachments = (List<TodoAttachmentDto>)_mapper.Map<IEnumerable<TodoAttachmentDto>>(attachments);
            return allAttachments;
        }
        public async Task<Object> UpdateTodoList(UpdateTodoListDto updatedUserDto)
        {
            TodoList todoList = await _uow.TodoListRepository.GetTodoListById(updatedUserDto.Id);
            if (todoList == null)
                return null;
            if (string.IsNullOrWhiteSpace(updatedUserDto.Title))
                return null;
            if (string.IsNullOrWhiteSpace(updatedUserDto.Description))
                return null;
            todoList.Title = updatedUserDto.Title;
            todoList.Description = updatedUserDto.Description;
            
            await _uow.SaveAsync();

            var updatedTodoList = _mapper.Map<TodoListDto>(todoList);
            var todoItem = await _uow.TodoItemRepository.GetItemsForSpecifiedList(updatedTodoList.Id);
            updatedTodoList.TodoItems =(List<TodoItemDto>)_mapper.Map<IEnumerable<TodoItemDto>>(todoItem);
            return updatedTodoList;
        }
        public async Task<Object> UpdateTodoItem(UpdateTodoItemDto updateTodoItem)
        {
            TodoItem todoItem = await _uow.TodoItemRepository.GetTodoItemById(updateTodoItem.Id);
            if (todoItem == null)
                return null;
            if (string.IsNullOrWhiteSpace(todoItem.Content))
                return null;
            todoItem.Content = updateTodoItem.Content;
            todoItem.Status = updateTodoItem.Status;//

            await _uow.SaveAsync();
            return todoItem;
        }
        public async Task<Object> AddItemToTodoList(NewItemDto newItemDto)
        {
            if (string.IsNullOrWhiteSpace(newItemDto.Content))
                return null;
            if (await _uow.TodoListRepository.GetTodoListById(newItemDto.TodoListId) == null)
                return null;

            var newItem = _mapper.Map<TodoItem>(newItemDto);
            _uow.TodoItemRepository.AddItemToTodoList(newItem);
            await _uow.SaveAsync();

            var newItemCreatedDto = _mapper.Map<TodoItemDto>(newItem);
            return newItemCreatedDto;
        }
        public async Task<string> AddReminderToTodoList(NewReminderDto newReminderDto)
        {
            if (newReminderDto.TimeStamp < DateTime.UtcNow)
                return "Reminder_Time_Old";

            var remindersOfGivenTodoList = await _uow.TodoReminderRepository.Find(x => x.TodoListId == newReminderDto.TodoListId && x.Sent == false);
            if (remindersOfGivenTodoList.ToList() == null || remindersOfGivenTodoList.ToList().Count == 0)
            {
                var newReminder = _mapper.Map<TodoReminder>(newReminderDto);
                newReminder.Sent = false;
                _uow.TodoReminderRepository.AddReminderToTodoList(newReminder);

                await _uow.SaveAsync();

                return "Reminder_Created";
            }
            return "Reminder_Exists";
        }
        public async Task<Object> AddNewTodoList(NewTodoListDto newTodoListDto)
        {
            if (string.IsNullOrWhiteSpace(newTodoListDto.Title))
                return null;
            if (string.IsNullOrWhiteSpace(newTodoListDto.Description))
                return null;
            if (await _uow.TodoUserRepository.GetTodoUserById(newTodoListDto.TodoUserId) == null)
                return null;

            var newTodoList = _mapper.Map<TodoList>(newTodoListDto);
            _uow.TodoListRepository.AddNewTodoList(newTodoList);
            await _uow.SaveAsync();

            var responseNewTodoList = _mapper.Map<TodoListDto>(newTodoList);

            return responseNewTodoList;
        }
        public async Task<Object> AddAttachmentToTodoList(NewAttachmentDto newAttachmentDto)
        {
            if (string.IsNullOrWhiteSpace(newAttachmentDto.FileName))
                return null!;

            var newAttachment = _mapper.Map<TodoAttachment>(newAttachmentDto);
            _uow.TodoAttachmentRepository.AddAttachmentToTodoList(newAttachment);
            await _uow.SaveAsync();

            return newAttachment;
        }
        public async Task<Object> ChangeUserRole(TodoUserDto userDto)
        {
            var user = await _uow.TodoUserRepository.GetTodoUserById(userDto.Id);
            if (user == null)
                return null;
            if (user.Role == "Admin")
                return null;
            user.Role = userDto.Role;
            await _uow.SaveAsync();

            return user;
        }
        private string CreateJWT(TodoUser user)
        {
            var secretKey = _config.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey));

            var claims = new Claim[] {
                new Claim(ClaimTypes.Name,user.Email),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Role,user.Role)
            };

            var signingCredentials = new SigningCredentials(
                    key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(20),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
