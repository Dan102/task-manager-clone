using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using task_manager_api.Data;
using task_manager_api.Dtos;
using task_manager_api.Models;

namespace task_manager_api.Repository
{
    public class BoardRepository : IBoardRepository
    {
        private readonly TaskManagerContext taskManagerContext;
        private readonly IMapper mapper;

        public BoardRepository(TaskManagerContext taskManagerContext, IMapper mapper)
        {
            this.taskManagerContext = taskManagerContext;
            this.mapper = mapper;
        }

        public Board GetBoard(int id)
        {
            var board = taskManagerContext.Boards
                .Include(board => board.CardLists)
                .ThenInclude(cardList => cardList.Cards)
                .FirstOrDefault(board => board.Id == id);
            return board;
        }

        public IList<Board> GetBoards()
        {
            return taskManagerContext.Boards
                .Include(board => board.CardLists)
                .ThenInclude(cardList => cardList.Cards)
                .ToList();
        }

        public bool CreateBoard([FromBody]string title)
        {
            if (title == "" || title == null)
            {
                throw new ArgumentException("Board couldnt be created because title is empty or null");
            }
            taskManagerContext.Add(new Board {
                Title = title,
                CardLists = new List<CardList>(),
                CreateDate = DateTime.Today
            });
            return taskManagerContext.SaveChanges() >= 0;
        }

        public bool UpdateBoard(int id, Board board)
        {
            Board oldBoard = GetBoard(id);
            if (oldBoard == null)
            {
                return false;
            }
            mapper.Map(board, oldBoard);
            return taskManagerContext.SaveChanges() >= 0;
        }

        public bool DeleteBoard(int id)
        {
            var board = GetBoard(id);
            taskManagerContext.Boards.Remove(board);
            return taskManagerContext.SaveChanges() >= 0;
        }
    }
}