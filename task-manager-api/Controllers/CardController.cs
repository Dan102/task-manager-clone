using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Dtos;
using task_manager_api.Helpers;
using task_manager_api.Models;
using task_manager_api.Repository;

namespace task_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly ICardRepository cardRepository;
        private readonly IMapper mapper;

        public CardsController(ICardRepository cardRepository, IMapper mapper)
        {
            this.cardRepository = cardRepository;
            this.mapper = mapper;
        }

        [Authorize]
        [HttpPost]
        public ActionResult CreateCard([FromBody]CardCreateDto card)
        {
            var success = cardRepository.CreateCard(card.CardListId, card.Title, card.Description, card.Priority, card.Deadline);
            if (!success)
            {
                throw new ArgumentException("Card couldn't be created");
            }
            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public ActionResult UpdateCard(int id, [FromBody]CardUpdateDto card)
        {
            var success = cardRepository.UpdateCard(id, mapper.Map<Card>(card));
            if (!success)
            {
                return NotFound();
            }
            return Ok();
        }

        [Authorize]
        [HttpPut]
        public ActionResult UpdateCards([FromBody]List<CardsUpdateDto> cards)
        {
            var success = cardRepository.UpdateCards(cards);
            if (!success)
            {
                return NotFound();
            }
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult DeleteCard(int id)
        {
            var success = cardRepository.DeleteCard(id);
            if (!success)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
