using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NovaLite.Todo.Core.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleToTodoUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "TodoUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "TodoUsers");
        }
    }
}
