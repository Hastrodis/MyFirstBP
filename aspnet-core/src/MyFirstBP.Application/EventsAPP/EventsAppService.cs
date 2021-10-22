using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using MyFirstBP.EventsEnt;
using MyFirstBP.EventsAPP.Dto;
using Abp.Application.Services;
using Abp.Collections.Extensions;
using Abp.Linq.Extensions;

namespace MyFirstBP.EventsAPP
{
    public class EventsAppService : MyFirstBPAppServiceBase, IEventsAppService
    {
        private readonly IRepository<EventTab> _eventRepository;

        public EventsAppService (IRepository<EventTab> eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<ListResultDto<EventsListDto>> GetAll(GetAllTitleInput input)
        {
            var events = await _eventRepository
                .GetAll()
                //.WhereIf(t => t.Title != null)

                .ToListAsync();

            return new ListResultDto<EventsListDto>(
                ObjectMapper.Map<List<EventsListDto>>(events)
                );
        }
    }
}
