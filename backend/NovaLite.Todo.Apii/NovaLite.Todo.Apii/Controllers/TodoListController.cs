using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using NovaLite.Todo.Apii.Dto;
using NovaLite.Todo.Apii.Interface.IServices;
using SendGrid.Helpers.Mail;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Cryptography;

namespace NovaLite.Todo.Apii.Controllers
{
    [Route("lists")]
    [ApiController]
    public class TodoListController : Controller
    {
        private readonly ITodoListService _todoListService;
        private readonly IBlobService _blobService;
        public TodoListController(ITodoListService todoListService, IBlobService blobService)
        {
            _todoListService = todoListService;
            _blobService = blobService;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Login(TodoUserDto userDto)
        {
            var result = await _todoListService.Login(userDto);
            return result != null ? Ok(result) : BadRequest();
        }

        [HttpGet("{email}/{id}")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public async Task<IActionResult> Overview(string email, Guid id)
        {
            var result = await _todoListService.GetAllTodoLists(email, id);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public async Task<IActionResult> Details(Guid id)
        {
            var result = await _todoListService.GetTodoListById(id);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPut("update")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public async Task<IActionResult> UpdateTodoList(UpdateTodoListDto oldTodoList)
        {
            var result = await _todoListService.UpdateTodoList(oldTodoList);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPatch("update/item")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public async Task<IActionResult> UpdateTodoItem(UpdateTodoItemDto oldTodoItem)
        {
            var result = await _todoListService.UpdateTodoItem(oldTodoItem);
            return result != null ?  Ok() : NotFound();
        }

        [HttpPost("new")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public async Task<IActionResult> AddTodoList(NewTodoListDto newTodoList)
        {
            var result = await _todoListService.AddNewTodoList(newTodoList);
            return result != null ? Ok(result) : BadRequest();
        }
        [HttpPost("new/item")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles ="Admin, User")]
        public async Task<IActionResult> AddTodoItem(NewItemDto newItem)
        {
            var result = await _todoListService.AddItemToTodoList(newItem); 
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost("new/reminder")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public async Task<IActionResult> AddReminder(NewReminderDto newReminder)
        {
            var result = await _todoListService.AddReminderToTodoList(newReminder);

            if (string.Equals(result, "Reminder_Created"))
                return Ok(result);
            else if (string.Equals(result, "Reminder_Exists"))
                return Ok(result);
            else
                return BadRequest(result);
        }

        //fali mi download link
        [HttpPost("new/attachment")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public async Task<IActionResult> AddAttachment(NewAttachmentDto newAttachment)
        {
            var result = await _todoListService.AddAttachmentToTodoList(newAttachment);
            return result != null ? Ok() : BadRequest();            
        }

        [HttpGet("users")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin")]
        public async Task<IActionResult> GetAllUserExceptAdmins()
        {
            return Ok(await _todoListService.GetAllUsersExceptAdmins());
        }

        [HttpPatch("user/role")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin")]
        public async Task<IActionResult> ChangeUserRole(TodoUserDto user)
        {
            var result = await _todoListService.ChangeUserRole(user);
            return result != null ? Ok(result) : BadRequest();
        }

        [HttpGet("attachments/{id}")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public async Task<IActionResult> Attachments(Guid id)  
        {
            var result = await _todoListService.GetAllAttachmentsFromTodoList(id);
            return result != null ? Ok(result) : BadRequest();
        }

        [HttpGet("attachments/upload")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public IActionResult UploadAttachment()
        {
            var token = _blobService.GenerateBlobSas("upload");
            return Ok(token);
        }

        [HttpGet("attachments/download")]
        [Authorize(Policy = "OnlySecondJwtScheme", Roles = "Admin, User")]
        public IActionResult DownloadAttachment()
        {
            var token = _blobService.GenerateBlobSas("download");
            return Ok(token);
        }
    }
}
