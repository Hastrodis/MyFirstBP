using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;

namespace MyFirstBP.EventsEnt
{
    public class EventType : Entity
    {
        [Key]
        public int EvTypeID { get; set; }

        [StringLength(256)]
        public string TypeName { get; set; }
    }
}
