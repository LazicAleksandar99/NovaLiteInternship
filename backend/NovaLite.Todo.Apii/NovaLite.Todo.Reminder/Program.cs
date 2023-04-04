using Microsoft.EntityFrameworkCore;
using NovaLite.Todo.Core.Data;
using NovaLite.Todo.Core.Data.Repository;
using NovaLite.Todo.Core.Interface;
using NovaLite.Todo.Reminder;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        
        services.AddHostedService<Worker>();
        services.AddDbContext<DataContext>(options => options.UseSqlServer(
        "Data Source = .\\sqlexpress;Initial Catalog=mystorage;Integrated Security=True; TrustServerCertificate=True"
        ));
        services.AddScoped<IUnitOfWork, UnitOfWork>();
    })
    .Build();

await host.RunAsync();
