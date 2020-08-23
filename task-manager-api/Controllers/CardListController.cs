using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Dtos;
using task_manager_api.Repository;

namespace task_manager_api.Controllers
{
    [Route("api/cardlists")]
    [ApiController]
    public class CardListController : ControllerBase
    {
        private readonly ICardListRepository cardListRepository;

        public CardListController(ICardListRepository cardListRepository)
        {
            this.cardListRepository = cardListRepository;
        }

        [HttpPost]
        public ActionResult CreateCardList([FromBody]CardListCreateDto card)
        {
            var success = cardListRepository.CreateCardList(card.BoardId, card.Title);
            if (!success)
            {
                throw new ArgumentException("Card couldn't be created");
            }
            return Ok();
        }

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
