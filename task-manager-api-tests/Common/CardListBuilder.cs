using System;
using System.Collections.Generic;
using System.Text;
using task_manager_api.Model;

namespace task_manager_api_tests.Common
{
    public class CardListBuilder
    {
        private int Id { get; set; }
        private string Title { get; set; }
        private IList<Card> Cards { get; set; }
        private DateTime CreateDate { get; set; }

        public CardListBuilder()
        {
            this.Id = 1;
            this.Title = "";
            this.Cards = new List<Card>();
            this.CreateDate = DateTime.Today;
        }

        public CardListBuilder WithId(int id)
        {
            this.Id = id;
            return this;
        }

        public CardListBuilder WithTitle(string title)
        {
            this.Title = title;
            return this;
        }

        public CardListBuilder WithCards(IList<Card> cards)
        {
            this.Cards = cards;
            return this;
        }

        public CardListBuilder WithCreateDate(DateTime createDate)
        {
            this.CreateDate = createDate;
            return this;
        }

        public CardList Build()
        {
            return new CardList
            {
                Id = this.Id,
                Title = this.Title,
                Cards = this.Cards,
                CreateDate = this.CreateDate
            };
        }
    }
}
