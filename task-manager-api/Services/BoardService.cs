using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Dtos;
using task_manager_api.Models;
using task_manager_api.Repository;
using task_manager_api.Services.Interfaces;

namespace task_manager_api.Services
{
    public class BoardService : IBoardService
    {
        private readonly IBoardRepository boardRepository;
        private readonly IMapper mapper;

        public BoardService(IBoardRepository boardRepository, IMapper mapper)
        {
            this.boardRepository = boardRepository;
            this.mapper = mapper;
        }

        public bool UpdateBoardIsFavourite(int id, bool isFavourite)
        {
            Board board = this.boardRepository.GetBoard(id);
            board.IsFavourite = isFavourite;
            return this.boardRepository.UpdateBoard(id, board);
        }

        public bool UpdateBoardCardListsOrder(int id, IList<IList<CardReadDto>> cardLists)
        {
            Board board = this.boardRepository.GetBoard(id);
            var cardHashMap = board.CardLists.SelectMany(x => x.Cards).ToDictionary(x => x.Id, x => x);
            for (int i = 0; i < cardLists.Count; ++i)
            {
                board.CardLists[i].Cards = cardLists[i].Select(x => cardHashMap[x.Id]).ToList();
            }
            return this.boardRepository.UpdateBoard(id, board);
        }
    }
}
