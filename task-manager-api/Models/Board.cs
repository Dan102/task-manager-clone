using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace task_manager_api.Models
{
    public class Board
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        public bool IsFavourite { get; set; }

        public IList<CardList> CardLists { get; set; }

        public DateTime CreateDate { get; set; }
    }
}