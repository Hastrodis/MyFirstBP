﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyFirstBP.EventsEnt
{
    [Table("Events")]
    public class EventTab : Entity
    {
        [Required]
        [StringLength(256)]
        public string Title { get; set; }

        [StringLength(64 * 1024)]
        public string Description { get; set; }

        [StringLength(64 * 1024)]
        public string Picture { get; set; }
        
        public int EvTypeID { get; set; }
        [ForeignKey("EvTypeID")]
        public EventType EventType { get; set; }

    }
}
