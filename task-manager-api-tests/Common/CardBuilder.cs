using System;
using task_manager_api.Model;

namespace task_manager_api_tests.Common
{
    public class CardBuilder
    {
        private int Id { get; set; }
        private string Title { get; set; }
        private string Description { get; set; }
        private int Priority { get; set; }
        private DateTime Deadline { get; set; }
        private DateTime CreateDate { get; set; }

        public CardBuilder()
        {
            this.Id = 1;
            this.Title = "";
            this.Description = "";
            this.Priority = 3;
            this.Deadline = DateTime.Today;
            this.CreateDate = DateTime.Today;
        }

        public CardBuilder WithId(int id)
        {
            this.Id = id;
            return this;
        }

        public CardBuilder WithTitle(string title)
        {
            this.Title = title;
            return this;
        }

        public CardBuilder WithDescription(string description)
        {
            this.Description = description;
            return this;
        }

        public CardBuilder WithPriority(int priority)
        {
            this.Priority = priority;
            return this;
        }

        public CardBuilder WithDeadline(DateTime deadline)
        {
            this.Deadline = deadline;
            return this;
        }

        public CardBuilder WithCreateDate(DateTime createDate)
        {
            this.CreateDate = createDate;
            return this;
        }

        public Card Build()
        {
            return new Card
            {
                Id = this.Id,
                Title = this.Title,
                Description = this.Description,
                Priority = this.Priority,
                Deadline = this.Deadline,
                CreateDate = this.CreateDate
            };
        }
    }
}
