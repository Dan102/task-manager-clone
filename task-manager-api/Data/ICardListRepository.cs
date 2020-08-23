using System.Collections.Generic;
using task_manager_api.Model;

namespace task_manager_api.Repository
{
    public interface ICardListRepository
    {
        bool CreateCardList(int boardId, string title);
        bool DeleteCardList(int id);
    }
}