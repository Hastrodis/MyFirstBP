using Abp.Domain.Repositories;
using MyFirstBP.EventsEnt;
using MyFirstBP.EventsAPP.Dto;
using Abp.Application.Services;

namespace MyFirstBP.EventsAPP
{
    public class EventsAppService : CrudAppService<EventTab, EventsListDto>
    {
        public EventsAppService (IRepository<EventTab> repository) : base(repository)
        {
        }

    }
}
