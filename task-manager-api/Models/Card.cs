using System;
using System.ComponentModel.DataAnnotations;

namespace task_manager_api.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        [MaxLength(60)]
        public string Description { get; set; }

        // TODO: change to enum
        public int Priority { get; set; }

        public DateTime Deadline { get; set; }

        public DateTime CreateDate { get; set; }
    }
}