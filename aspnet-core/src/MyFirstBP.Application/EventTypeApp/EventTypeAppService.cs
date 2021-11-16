using System.Collections.Generic;
using System.Linq;
using MyFirstBP.EventTypeApp.Dto;
using MyFirstBP.EventsEnt;
using Abp.Domain.Repositories;
using System.Threading.Tasks;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using Abp.Application.Services.Dto;

namespace MyFirstBP.EventTypeApp
{
    public class EventTypeAppService : MyFirstBPAppServiceBase, IEventTypeAppService
    {
        private readonly IRepository<EventType> _eventTypeRepository;
    
        public EventTypeAppService(IRepository<EventType> eventTypeReposytory)
        {
            _eventTypeRepository = eventTypeReposytory;
        }

        public void Create(CreateEvenTypeInput input)
        {
            var eventType = _eventTypeRepository.FirstOrDefault(p => p.TypeName == input.TypeName);
            if (eventType != null)
            {
                throw new UserFriendlyException("Такое мероприятие уже существует");
            }
            eventType = new EventType { TypeName = input.TypeName };
            _eventTypeRepository.Insert(eventType);
           
        }

        public void Delete(int id)
        {
            var eventType =  _eventTypeRepository.FirstOrDefault(t => t.Id == id);
            if (eventType is null)
            {
                throw new UserFriendlyException("Мероприятие не найдено");
            }
            _eventTypeRepository.Delete(id);
        }

        public void Update(UpdateEventTypeInput input)
        {
            var eventType = _eventTypeRepository.Get(input.Id);
            if (eventType is null)
            {
                throw new UserFriendlyException("Мероприятие не найден");
            }
            eventType.TypeName = input.TypeName;
        }

        public async Task<ListResultDto<EventTypeListDto>> GetAll()
        {
            var eventType = await _eventTypeRepository
                .GetAll()
                .ToListAsync();
            return new ListResultDto<EventTypeListDto>(
                ObjectMapper.Map<List<EventTypeListDto>>(eventType)
            );
        }

        public async Task<ListResultDto<EventTypeListDto>> Get(EventTypeListDto input)
        {
            var eventType = await _eventTypeRepository
                .GetAll()
                .Where(t => t.TypeName == input.TypeName || t.Id == input.Id)
                .ToListAsync();
            return new ListResultDto<EventTypeListDto>(
                ObjectMapper.Map<List<EventTypeListDto>>(eventType)
            );
        }
    }
}
