using Abp.Application.Services;
using MyFirstBP.EventTypeApp.Dto;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using MyFirstBP.EventsEnt;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MyFirstBP.EventTypeApp
{
    class EventTypeAppService : ApplicationService, IEventTypeService
    {
        private readonly IRepository<EventType> _evenTypetRepository;

        public EventTypeAppService(IRepository<EventType> eventTypeRepository)
        {
            _evenTypetRepository = eventTypeRepository;
        }

        public async Task<ListResultDto<EventTypeListDto>> GetAll(GetAllEventTypeInput input)
        {
            var events = await _evenTypetRepository
                .GetAll()
                .ToListAsync();

            return new ListResultDto<EventTypeListDto>(
                ObjectMapper.Map<List<EventTypeListDto>>(events)
                );
        }
    }
}
