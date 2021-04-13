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
    public class CardListRepository : ICardListRepository
    {
        private readonly TaskManagerContext taskManagerContext;

        public CardListRepository(TaskManagerContext taskManagerContext)
        {
            this.taskManagerContext = taskManagerContext;
        }

        private CardList GetCardList(int id)
        {
            return taskManagerContext.CardLists
                .Include(x => x.Cards)
                .FirstOrDefault(cardList => cardList.Id == id);
        }

        public bool CreateCardList(int boardId, string title)
        {
            if (title == "" || title == null)
            {
                throw new ArgumentException("Card list couldnt be created because title is empty or null");
            }
            Board targetBoard = taskManagerContext.Boards.FirstOrDefault(board => board.Id == boardId);
            if (targetBoard.CardLists == null)
            {
                targetBoard.CardLists = new List<CardList>();
            }
            targetBoard.CardLists.Add(new CardList()
            {
                Title = title,
                Cards = new List<Card>(),
                CreateDate = DateTime.Today
            });
            return taskManagerContext.SaveChanges() >= 0;
        }

        public bool DeleteCardList(int id)
        {
            var cardList = GetCardList(id);
            taskManagerContext.CardLists.Remove(cardList);
            return taskManagerContext.SaveChanges() >= 0;
        }
    }
}