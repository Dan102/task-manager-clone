using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Dtos;
using task_manager_api.Helpers;
using task_manager_api.Repository;

namespace task_manager_api.Controllers
{
    [Route("api/card-lists")]
    [ApiController]
    public class CardListsController : ControllerBase
    {
        private readonly ICardListRepository cardListRepository;

        public CardListsController(ICardListRepository cardListRepository)
        {
            this.cardListRepository = cardListRepository;
        }

        [Authorize]
        [HttpPost]
        public ActionResult CreateCardList([FromBody]CardListCreateDto cardList)
        {
            var success = cardListRepository.CreateCardList(cardList.BoardId, cardList.Title, cardList.Color);
            if (!success)
            {
                throw new ArgumentException("Card couldn't be created");
            }
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult DeleteCardList(int id)
        {
            var success = cardListRepository.DeleteCardList(id);
            if (!success)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
