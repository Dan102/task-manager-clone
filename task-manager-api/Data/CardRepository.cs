using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using task_manager_api.Data;
using task_manager_api.Dtos;
using task_manager_api.Model;

namespace task_manager_api.Repository
{
    public class CardRepository : ICardRepository
    {
        private readonly TaskManagerContext taskManagerContext;
        private readonly IMapper mapper;

        public CardRepository(TaskManagerContext taskManagerContext, IMapper mapper)
        {
            this.taskManagerContext = taskManagerContext;
            this.mapper = mapper;
        }

        private Card GetCard(int id)
        {
            return taskManagerContext.Cards.FirstOrDefault(card => card.Id == id);
        }

        public bool CreateCard(int listId, string title)
        {
            if (title == "" || title == null)
            {
                throw new ArgumentException("Card couldnt be created because title is empty or null");
            }
            CardList targetList = taskManagerContext.CardLists.FirstOrDefault(cardList => cardList.Id == listId);
            if (targetList.Cards == null)
            {
                targetList.Cards = new List<Card>();
            }
            targetList.Cards.Add( new Card
            {
                Title = title,
                Description = "",
                Deadline = DateTime.Today,
                Priority = 2,
                CreateDate = DateTime.Today
            });
            return taskManagerContext.SaveChanges() >= 0;
        }

        public bool UpdateCard(int id, Card card)
        {
            Card oldCard = GetCard(id);
            if (oldCard == null)
            {
                return false;
            }
            mapper.Map(card, oldCard);
            return taskManagerContext.SaveChanges() >= 0;
        }

        public bool DeleteCard(int id)
        {
            taskManagerContext.Cards.Remove(new Card() { Id = id });
            return taskManagerContext.SaveChanges() >= 0;
        }
    }
}