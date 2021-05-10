using Microsoft.EntityFrameworkCore.Migrations;

namespace task_manager_api.Migrations
{
    public partial class UpdateBoardTableIsFavouriteColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFavourite",
                table: "Boards",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFavourite",
                table: "Boards");
        }
    }
}
