using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task_manager_api.Dtos
{
    public class UserLoggedDto
    {
        public string Username { get; set; }

        public string Fullname { get; set; }

        public string Token { get; set; }
    }
}
