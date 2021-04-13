using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Dtos;
using task_manager_api.Models;

namespace task_manager_api.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly TaskManagerContext taskManagerContext;

        public UserRepository(TaskManagerContext taskManagerContext)
        {
            this.taskManagerContext = taskManagerContext;
        }

        public bool CreateUser(string username, string hashedPassword, string salt)
        {
            taskManagerContext.Add(new User
            {
                HashedPassword = hashedPassword,
                Fullname = "",
                Username = username,
                Salt = salt
            });
            return taskManagerContext.SaveChanges() >= 0;
        }

        public User GetUser(int id)
        {
            return taskManagerContext.Users.FirstOrDefault(x => x.Id == id);
        }

        public IList<User> GetUsers()
        {
            return taskManagerContext.Users.ToList();
        }


    }
}
