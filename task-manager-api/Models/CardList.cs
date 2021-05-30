using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace task_manager_api.Models
{
    public class CardList
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        [Required]
        [MaxLength(9)]
        public string Color { get; set; }

        public IList<Card> Cards { get; set; }

        public DateTime CreateDate { get; set; }

    }
}