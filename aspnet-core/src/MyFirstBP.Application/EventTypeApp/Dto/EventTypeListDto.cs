using Abp.AutoMapper;
using MyFirstBP.EventsEnt;
using Abp.Application.Services.Dto;

namespace MyFirstBP.EventTypeApp.Dto
{
    public class GetAllEventTypeInput
    {
        public string TypeName { get; set; }
    }

    [AutoMapFrom(typeof(EventType))]
    public class EventTypeListDto: EntityDto
    {
        public int EvTypeID { get; set; }
        public string TypeName { get; set; }
    }
}
