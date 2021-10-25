using Abp.Application.Services;
using MyFirstBP.EventTypeApp.Dto;
using MyFirstBP.EventsEnt;
using Abp.Domain.Repositories;

namespace MyFirstBP.EventTypeApp
{
    public class EventTypeAppService : CrudAppService<EventType, EventTypeListDto> 
    {
        public EventTypeAppService(IRepository<EventType> repository) :base(repository)
        {
        }
    }
}
