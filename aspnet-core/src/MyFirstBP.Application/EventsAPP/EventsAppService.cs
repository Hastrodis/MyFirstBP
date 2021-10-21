using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using MyFirstBP.EventsEnt;
using MyFirstBP.EventsAPP.Dto;
using Abp.Application.Services;

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
                .ToListAsync();

            return new ListResultDto<EventsListDto>(
                ObjectMapper.Map<List<EventsListDto>>(events)
                );
        }
    }
}
