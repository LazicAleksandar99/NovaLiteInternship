﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NovaLite.Todo.Core.Data;

#nullable disable

namespace NovaLite.Todo.Core.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoAttachment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid>("TodoListId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TodoListId");

                    b.ToTable("TodoAttachments");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<Guid>("TodoListId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TodoListId");

                    b.ToTable("TodoItems");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoList", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid>("TodoUserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TodoUserId");

                    b.ToTable("TodoLists");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoReminder", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Sent")
                        .HasColumnType("bit");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("TodoListId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TodoListId");

                    b.ToTable("TodoReminders");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("TodoUsers");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoAttachment", b =>
                {
                    b.HasOne("NovaLite.Todo.Core.Models.TodoList", "TodoList")
                        .WithMany("TodoAttachments")
                        .HasForeignKey("TodoListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TodoList");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoItem", b =>
                {
                    b.HasOne("NovaLite.Todo.Core.Models.TodoList", "TodoList")
                        .WithMany("TodoItems")
                        .HasForeignKey("TodoListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TodoList");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoList", b =>
                {
                    b.HasOne("NovaLite.Todo.Core.Models.TodoUser", "TodoUser")
                        .WithMany("TodoLists")
                        .HasForeignKey("TodoUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TodoUser");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoReminder", b =>
                {
                    b.HasOne("NovaLite.Todo.Core.Models.TodoList", "TodoList")
                        .WithMany("TodoReminder")
                        .HasForeignKey("TodoListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TodoList");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoList", b =>
                {
                    b.Navigation("TodoAttachments");

                    b.Navigation("TodoItems");

                    b.Navigation("TodoReminder");
                });

            modelBuilder.Entity("NovaLite.Todo.Core.Models.TodoUser", b =>
                {
                    b.Navigation("TodoLists");
                });
#pragma warning restore 612, 618
        }
    }
}
