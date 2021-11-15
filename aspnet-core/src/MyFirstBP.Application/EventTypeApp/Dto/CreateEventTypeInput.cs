using Abp.AutoMapper;
using MyFirstBP.EventsEnt;
using Abp.Application.Services.Dto;

namespace MyFirstBP.EventTypeApp.Dto
{
    [AutoMapFrom(typeof(EventType))]
    public class CreateEvenTypeInput : EntityDto
    {
        public string TypeName { get; set; }
    }
}
