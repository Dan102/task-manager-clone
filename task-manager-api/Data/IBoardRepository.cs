using System.Collections.Generic;
using task_manager_api.Dtos;
using task_manager_api.Model;

namespace task_manager_api.Repository
{
    public interface IBoardRepository
    {
        Board GetBoard(int id);
        IList<Board> GetBoards();
        bool CreateBoard(string title);
        bool DeleteBoard(int id);
    }
}