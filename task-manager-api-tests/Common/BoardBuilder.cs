using System;
using System.Collections.Generic;
using task_manager_api.Model;

namespace task_manager_api_tests.Common
{
    public class BoardBuilder
    {
        private int Id { get; set; }
        private string Title { get; set; }
        private IList<CardList> CardLists { get; set; }
        private DateTime CreateDate { get; set; }

        public BoardBuilder()
        {
            this.Id = 1;
            this.Title = "";
            this.CardLists = new List<CardList>();
            this.CreateDate = DateTime.Today;
        }

        public BoardBuilder WithId(int id)
        {
            this.Id = id;
            return this;
        }

        public BoardBuilder WithTitle(string title)
        {
            this.Title = title;
            return this;
        }

        public BoardBuilder WithCardLists(IList<CardList> cardLists)
        {
            this.CardLists = cardLists;
            return this;
        }

        public BoardBuilder WithCreateDate(DateTime createDate)
        {
            this.CreateDate = createDate;
            return this;
        }

        public Board Build()
        {
            return new Board
            {
                Id = this.Id,
                Title = this.Title,
                CardLists = this.CardLists,
                CreateDate = this.CreateDate
            };
        }
    }
}
