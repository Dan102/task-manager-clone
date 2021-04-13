using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using task_manager_api.Model;
using task_manager_api.Repository;
using task_manager_api_tests.Common;

namespace task_manager_api_tests
{
    public class Tests
    {
        private Mock<IBoardRepository> boardRepository = new Mock<IBoardRepository>();
        private IList<Board> boards;

        [SetUp]
        public void Setup()
        {
            boardRepository = new Mock<IBoardRepository>();
            var card = new CardBuilder()
                .WithId(1)
                .WithTitle("Card 1")
                .WithDescription("Important task")
                .Build();
            var cardList = new CardListBuilder()
                .WithId(1)
                .WithTitle("Important things")
                .WithCards(new List<Card> { card })
                .Build();
            var board = new BoardBuilder()
                .WithId(1)
                .WithTitle("Important board")
                .WithCardLists(new List<CardList> { cardList })
                .Build();
            boards.Add(board);
        }

        [Test]
        public void TestGetBoards()
        {
            boardRepository.Setup(x => x.)
        }
    }
}