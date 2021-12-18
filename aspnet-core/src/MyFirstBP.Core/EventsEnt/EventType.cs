using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities;

namespace MyFirstBP.EventsEnt
{
    public class EventType : Entity
    {
        [Required,StringLength(256)]
        public string TypeName { get; set; }
    }
}
