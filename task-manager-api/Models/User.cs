using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace task_manager_api.Models
{
    [Index(nameof(Username), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Username { get; set; }

        public string Fullname { get; set; }

        public string HashedPassword { get; set; }

        public string Salt { get; set; }
    }
}
