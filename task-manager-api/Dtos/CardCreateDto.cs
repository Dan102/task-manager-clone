using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task_manager_api.Dtos
{
    public class CardCreateDto
    {
        public int CardListId { get; set; }

        public string Title { get; set; }
    }
}
