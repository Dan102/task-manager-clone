using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task_manager_api.Dtos
{
    public class BoardPreviewUpdateCardListsDto
    {
        public IList<IList<CardReadDto>> CardLists { get; set; }
    }
}
