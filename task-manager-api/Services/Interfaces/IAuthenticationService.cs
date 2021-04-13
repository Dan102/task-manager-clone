using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using task_manager_api.Data;
using task_manager_api.Dtos;
using task_manager_api.Models;

namespace task_manager_api.Services.Interfaces
{
    public interface IAuthenticationService
    {
        UserLoggedDto Authenticate(string name, string password);
        bool Register(string username, string password);
    }
}
