using task_manager_api.Dtos;
using task_manager_api.Model;

namespace task_manager_api.Repository
{
    public interface ICardRepository
    {
        bool CreateCard(int listId, string title);
        bool DeleteCard(int id);
        bool UpdateCard(int id, Card card);
    }
}