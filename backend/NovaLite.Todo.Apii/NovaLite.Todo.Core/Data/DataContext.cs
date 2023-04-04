using Microsoft.EntityFrameworkCore;
using NovaLite.Todo.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace NovaLite.Todo.Core.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<TodoList> TodoLists { get; set; }
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<TodoReminder> TodoReminders { get; set; }
        public DbSet<TodoAttachment> TodoAttachments { get; set; }
        public DbSet<TodoUser> TodoUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
            modelBuilder.Entity<TodoUser>()
           .HasIndex(x => x.Email)
           .IsUnique();
        }

    }
}
