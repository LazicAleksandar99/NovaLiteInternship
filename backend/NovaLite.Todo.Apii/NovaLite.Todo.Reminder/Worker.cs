using NovaLite.Todo.Core.Data;
using NovaLite.Todo.Core.Data.Repository;
using NovaLite.Todo.Core.Interface;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace NovaLite.Todo.Reminder
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IConfiguration _configuration;

        public Worker(ILogger<Worker> logger, IConfiguration configuration, IServiceProvider services)
        {
            _logger = logger;
            _configuration = configuration;
            Services = services;
        }        

        public IServiceProvider Services { get; }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var pullInterval = TimeSpan.FromSeconds(_configuration.GetValue<int>("PullInterval"));
            while (!stoppingToken.IsCancellationRequested)
            {

                using (var scope = Services.CreateScope())
                {
                    var scopedUnitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                    var allReminders = await scopedUnitOfWork.TodoReminderRepository.Find(x => x.TimeStamp < DateTime.UtcNow && !x.Sent);
                    _logger.LogInformation("Worker entering loop: {time}", DateTimeOffset.Now);
                    if (allReminders != null)
                    {
                        foreach (var reminder in allReminders)
                        {
                            var api = _configuration.GetValue<string>("ApiKey");
                            var client = new SendGridClient(api);
                            var from = new EmailAddress("aleksandar.99.lazic@gmail.com", "Aleksandar");
                            var subject = "Reminder";
                            var to = new EmailAddress("ipleydota2@gmail.com", "Nikola");
                            var plainTextContent = "Your reminder" + reminder.Id + "has expired!";
                            var htmlContent = "<strong>Your reminder " + reminder.Id + " has expired!</strong>";
                            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                            var response = await client.SendEmailAsync(msg);

                            reminder.Sent = true;

                            _logger.LogInformation("Worker reminded them at: {time}", DateTimeOffset.Now);


                            await scopedUnitOfWork.SaveAsync();
                        }
                    }
                    _logger.LogInformation("Worker FINISHED at: {time}", DateTimeOffset.Now);
                    await Task.Delay(pullInterval, stoppingToken);
                }
            }

        }
    }
}