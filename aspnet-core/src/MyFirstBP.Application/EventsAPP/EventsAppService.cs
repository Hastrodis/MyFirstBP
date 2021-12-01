using Abp.Domain.Repositories;
using MyFirstBP.EventsEnt;
using MyFirstBP.EventsAPP.Dto;
using Abp.Application.Services;
using Abp.UI;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using MyFirstBP.DateOfWeeks.Dto;

namespace MyFirstBP.EventsAPP
{
    public class EventsAppService : MyFirstBPAppServiceBase, IEventsAppService
    {
        private readonly IRepository<EventTab> _eventRepository;
        private readonly IRepository<EventType> _eventTypeRepository;
        private readonly IRepository<DateOfWeek> _dateWeekRepository;

        public EventsAppService(IRepository<EventTab> eventRepository, IRepository<EventType> eventTypeRepository, IRepository<DateOfWeek> dateWeekRepository)
        {
            _eventRepository = eventRepository;
            _eventTypeRepository = eventTypeRepository;
            _dateWeekRepository = dateWeekRepository;
        }

        public void Create(CreateEvents input)
        {
            Random rnd = new Random();
            int idrand = rnd.Next(0, 65000);
            if (_eventRepository.FirstOrDefault(t => t.Id == idrand) != null)
                idrand = rnd.Next(0, 65000); 
            else
            {
                var events = new EventTab
                {
                    Id = idrand,
                    Title = input.Title,
                    Description = input.Description,
                    Picture = input.Picture,
                    EvTypeID = input.EvTypeID,
                };
                _eventRepository.Insert(events);
                foreach (var e in input.DateWeeks)
                {
                    var dateWeek = new DateOfWeek
                    {
                        EventID = idrand,
                        WeekName = e.WeekName
                    };
                    _dateWeekRepository.Insert(dateWeek);
                }
            }
            
        }

        public void Delete(int id)
        {
            var events = _eventRepository.FirstOrDefault(t => t.Id == id);
            if (events is null)
            {
                throw new UserFriendlyException("Мероприятие не найдено");
            }
            _eventRepository.Delete(id);
        }

        public void Update(UpdateEvents input)
        {
            var events = _eventRepository.Get(input.Id);
            if (events is null)
            {
                throw new UserFriendlyException("Мероприятие не найден");
            }

            events = new EventTab
            {
                Title = input.Title,
                Description = input.Description,
                Picture = input.Picture,
                EvTypeID = input.EvTypeID
            };
            events.Title = input.Title;
            events.Description = input.Description;
            events.Picture = input.Picture;
            events.EvTypeID = input.EvTypeID;
        }

        public async Task<ListResultDto<EventsListDto>> GetAll()
        {
            var events = await _eventRepository
                .GetAll()
                .ToListAsync();
            var eventType = await _eventTypeRepository
                .GetAll()
                .ToListAsync();
            var eventsAll = new List<EventsListDto>();
            foreach (var e in events)
            {
                foreach(var i in eventType)
                {
                    if (e.EvTypeID == i.Id)
                    {
                        /*var dateWeek = await _dateWeekRepository
                            .GetAll()
                            .Where(t => t.EventID == e.Id)
                            .ToListAsync();
                         var weekEvents = new CreateDateOfWeek();
                         foreach*/
                        eventsAll.Add(new EventsListDto()
                        {
                            Id = e.Id,
                            Title = e.Title,
                            Description = e.Description,
                            Picture = e.Picture,
                            EvTypeID = e.EvTypeID,
                            TypeName = i.TypeName,
                            //DateWeeks = 

                        });
                    }
                }
            }
            return new ListResultDto<EventsListDto>(
                ObjectMapper.Map<List<EventsListDto>>(eventsAll)
            );
        }

        public async Task<ListResultDto<EventsListDto>> Get(GetEvents input)
        {
            var events = await _eventRepository
                .GetAll()
                .Where(t => t.Title == input.Title || t.Id == input.Id)
                .ToListAsync();
            var eventType = await _eventTypeRepository
               .GetAll()
               .ToListAsync();
            var eventsAll = new List<EventsListDto>();
            foreach (var e in events)
            {
                foreach (var i in eventType)
                {
                    if (e.EvTypeID == i.Id)
                        eventsAll.Add(new EventsListDto()
                        {
                            Id = e.Id,
                            Title = e.Title,
                            Description = e.Description,
                            Picture = e.Picture,
                            EvTypeID = e.EvTypeID,
                            TypeName = i.TypeName
                        });
                }
            }
            return new ListResultDto<EventsListDto>(
                ObjectMapper.Map<List<EventsListDto>>(eventsAll)
            );
        }
    }
}
