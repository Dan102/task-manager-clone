using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Dtos;
using task_manager_api.Models;

namespace task_manager_api.Services.Interfaces
{
    public interface IBoardService
    {
        bool UpdateBoardIsFavourite(int id, bool isFavourite);
        bool UpdateBoardCardListsOrder(int id, IList<IList<CardReadDto>> cardLists);
    }
}
