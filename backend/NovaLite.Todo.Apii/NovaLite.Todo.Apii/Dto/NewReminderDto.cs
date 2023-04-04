namespace NovaLite.Todo.Apii.Dto
{
    public class NewReminderDto
    {
        public Guid TodoListId { get; set; }
        public DateTime TimeStamp { get; set; }
        public bool Sent { get; set; } = false;
    }
}
