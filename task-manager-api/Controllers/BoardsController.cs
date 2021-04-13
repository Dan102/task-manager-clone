using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using task_manager_api.Dtos;
using task_manager_api.Helpers;
using task_manager_api.Models;
using task_manager_api.Repository;

namespace task_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardsController : ControllerBase
    {
        private readonly IBoardRepository boardRepository;
        private readonly IMapper mapper;

        public BoardsController(IBoardRepository boardRepository, IMapper mapper) {
            this.boardRepository = boardRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<IList<Board>> GetBoardPreviews() {
            var boards = boardRepository.GetBoards();
            return Ok(mapper.Map<IList<BoardPreviewReadDto>>(boards));
        }

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<Board> GetBoard(int id) {
            var board = boardRepository.GetBoard(id);
            if (board == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<BoardReadDto>(board));
        }

        [HttpPost]
        [Authorize]
        public ActionResult CreateBoard([FromBody]string title)
        {
            var success = boardRepository.CreateBoard(title);
            if (!success)
            {
                throw new ArgumentException("Board couldn't be created");
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult DeleteBoard(int id)
        {
            var success = boardRepository.DeleteBoard(id);
            if (!success)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}