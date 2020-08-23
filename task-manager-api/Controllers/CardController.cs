using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.Dtos;
using task_manager_api.Model;
using task_manager_api.Repository;

namespace task_manager_api.Controllers
{
    [Route("api/cards")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardRepository cardRepository;
        private readonly IMapper mapper;

        public CardController(ICardRepository cardRepository, IMapper mapper)
        {
            this.cardRepository = cardRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public ActionResult CreateCard([FromBody]CardCreateDto card)
        {
            var success = cardRepository.CreateCard(card.CardListId, card.Title);
            if (!success)
            {
                throw new ArgumentException("Card couldn't be created");
            }
            return Ok();
        }

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
