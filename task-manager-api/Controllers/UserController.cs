using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Data;
using task_manager_api.Dtos;
using task_manager_api.Services.Interfaces;

namespace task_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository userRepository;
        private readonly IAuthenticationService authenticationService;
        private readonly IMapper mapper;

        public UserController(
            IUserRepository userRepository,
            IAuthenticationService authenticationService,
            IMapper mapper)
        {
            this.userRepository = userRepository;
            this.authenticationService = authenticationService;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("login")]
        public ActionResult Login([FromBody] UserLoginDto userLogin)
        {
            var user = authenticationService.Authenticate(userLogin.Username, userLogin.Password);
            if (user == null)
            {
                return BadRequest();
            }
            return Ok(user);
        }

        [HttpPost]
        [Route("register")]
        public ActionResult Register([FromBody] UserLoginDto userRegister)
        {
            var success = authenticationService.Register(userRegister.Username, userRegister.Password);
            if (!success)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
