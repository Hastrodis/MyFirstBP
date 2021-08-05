using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using MyFirstBP.EventsEnt;
using MyFirstBP.EventsAPP.Dto;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using Abp.Application.Services;

namespace MyFirstBP.EventsAPP
{
    class EventsAppService : ApplicationService, IEventsAppService
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
