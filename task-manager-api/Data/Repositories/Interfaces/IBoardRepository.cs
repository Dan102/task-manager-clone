using System.Collections.Generic;
using task_manager_api.Dtos;
using task_manager_api.Models;

namespace task_manager_api.Repository
{
    public interface IBoardRepository
    {
        Board GetBoard(int id);
        IList<Board> GetBoards();
        bool CreateBoard(string title);
        bool UpdateBoard(int id, Board board);
        bool DeleteBoard(int id);
    }
}