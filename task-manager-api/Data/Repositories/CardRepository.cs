using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using task_manager_api.Data;
using task_manager_api.Dtos;
using task_manager_api.Models;

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

        public bool CreateCard(int listId, string title, string? description, int? priority, DateTime? deadline)
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
                Description = description ?? "",
                Deadline = deadline ?? DateTime.Today,
                Priority = priority ?? 2,
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
            return taskManagerContext.SaveChanges() == 1;
        }

        public bool UpdateCards(List<CardsUpdateDto> cards)
        {
            var changedCardsCount = 0;

            using (var transaction = taskManagerContext.Database.BeginTransaction())
            {
                var cardLists = taskManagerContext.CardLists;
                foreach (var card in cards)
                {
                    var oldCard = GetCard(card.Id);
                    if (oldCard == null)
                    {
                        transaction.Rollback();
                        throw new ArgumentException("Updated card not found in database");
                    }
                    // Card was moved into different list
                    var oldCardCardList = cardLists.First(x => x.Cards.Contains(oldCard));
                    if (card.CardListId != oldCardCardList.Id)
                    {
                        oldCardCardList.Cards.Remove(oldCard);
                    }
                    mapper.Map(card, oldCard);
                    var newCardCardList = cardLists.First(x => x.Id == card.CardListId);
                    if (newCardCardList.Cards == null)
                    {
                        newCardCardList.Cards = new List<Card>();
                    }
                    newCardCardList.Cards.Add(oldCard);
                }
                changedCardsCount = taskManagerContext.SaveChanges();
                transaction.Commit();
            }
            return changedCardsCount == cards.Count;
        }

        public bool DeleteCard(int id)
        {
            taskManagerContext.Cards.Remove(new Card() { Id = id });
            return taskManagerContext.SaveChanges() >= 0;
        }
    }
}