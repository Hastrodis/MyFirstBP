using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;


namespace MyFirstBP.EventsEnt
{
    public class DateOfWeek: Entity
    {
        public SWeek WeekName { get; set; }

        public int EventID { get; set; }
        [ForeignKey("EventID")]

        public EventTab Event { get; set; }
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
