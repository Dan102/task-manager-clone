using System.Collections.Generic;
using task_manager_api.Models;

namespace task_manager_api.Repository
{
    public interface ICardListRepository
    {
        bool CreateCardList(int boardId, string title, string color);
        bool DeleteCardList(int id);
    }
}