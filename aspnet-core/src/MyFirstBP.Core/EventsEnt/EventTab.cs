using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;

namespace MyFirstBP.EventsEnt
{
    [Table("Events")]
    public class EventTab : Entity<int>
    {
        [Required]
        [StringLength(256)]
        public string Title { get; set; }

        [StringLength(64 * 1024)]
        public string Description { get; set; }

        [StringLength(64 * 1024)]
        public string Picture { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{HH:mm}")]
        public TimeSpan EventStart { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{HH:mm}")]
        public TimeSpan EventEnd { get; set; }
        public int EvTypeID { get; set; }
        [ForeignKey("EvTypeID")]
        public EventType EventType { get; set; }

    }
}
