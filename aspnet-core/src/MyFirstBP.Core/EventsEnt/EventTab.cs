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

        public string Picture { get; set; }
        [DataType(DataType.Time), DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:HH:mm}")]
        public DateTime EventStart { get; set; }
        [DataType(DataType.Time), DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:HH:mm}")]
        public DateTime EventEnd { get; set; }
        public int EvTypeID { get; set; }
        [ForeignKey("EvTypeID")]
        public EventType EventType { get; set; }

    }
}
