using Microsoft.EntityFrameworkCore.Migrations;

namespace task_manager_api.Migrations
{
    public partial class AddCardListColorColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "CardLists",
                type: "nvarchar(9)",
                maxLength: 9,
                nullable: false,
                defaultValue: "#caffbf");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "CardLists");
        }
    }
}
