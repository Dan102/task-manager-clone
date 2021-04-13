using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Dtos;
using task_manager_api.Models;

namespace task_manager_api.Data
{
    public interface IUserRepository
    {
        IList<User> GetUsers();
        User GetUser(int id);
        bool CreateUser(string username, string hashedPassword, string salt);
    }
}
