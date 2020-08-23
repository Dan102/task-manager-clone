using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace task_manager_api.Model
{
    public class Board
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        public IList<CardList> CardLists { get; set; }

        public DateTime CreateDate { get; set; }
    }
}