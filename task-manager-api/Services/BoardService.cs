using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Models;
using task_manager_api.Repository;
using task_manager_api.Services.Interfaces;

namespace task_manager_api.Services
{
    public class BoardService : IBoardService
    {
        private readonly IBoardRepository boardRepository;

        public BoardService(IBoardRepository boardRepository)
        {
            this.boardRepository = boardRepository;
        }

        public bool UpdateBoardIsFavourite(int id, bool isFavourite)
        {
            Board board = this.boardRepository.GetBoard(id);
            board.IsFavourite = isFavourite;
            return this.boardRepository.UpdateBoard(id, board);
        }
    }
}
