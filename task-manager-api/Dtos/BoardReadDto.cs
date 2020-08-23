using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Dtos;

namespace task_manager_api.Dtos
{
    public class BoardReadDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public IList<CardListReadDto> CardLists { get; set; }
    }
}
