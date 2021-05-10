using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task_manager_api.Services.Interfaces
{
    public interface IBoardService
    {
        bool UpdateBoardIsFavourite(int id, bool isFavourite);
    }
}
