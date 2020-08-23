using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task_manager_api.Dtos
{
    public class CardUpdateDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int Priority { get; set; }

        public DateTime Deadline { get; set; }
    }
}
