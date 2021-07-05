using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;

namespace MyFirstBP.Events
{
    public class DateOfWeek
    {
        [Key]
        public int WeekID { get; set; }

        public SWeek WeekName { get; set; }

        public int EventID { get; set; }

        [ForeignKey("EventID")]
        public Event Event { get; set; }


    }
    public enum SWeek : byte
    {
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday = 5,
        Saturday = 6,
        Sunday = 7
    }
}
