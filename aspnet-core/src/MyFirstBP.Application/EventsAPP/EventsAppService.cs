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
            var events = new EventTab
            {
                Title = input.Title,
                Description = input.Description,
                Picture = input.Picture,
                EventStart = input.EventStart,
                EventEnd = input.EventEnd,
                EvTypeID = input.EvTypeID,
            };
            var lastId = _eventRepository.InsertAndGetId(events);

           /* foreach (var e in input.DateWeeks)
            {
                var dateWeek = new DateOfWeek
                {
                    EventID = lastId,
                    WeekName = e.WeekName
                };
                _dateWeekRepository.Insert(dateWeek);
            }*/
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
            events.Title = input.Title;
            events.Description = input.Description;
            events.Picture = input.Picture;
            events.EventStart = input.EventStart;
            events.EventEnd = input.EventEnd;
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
                var dateWeek = await _dateWeekRepository
                           .GetAll()
                           .Where(t => t.EventID == e.Id)
                           .ToListAsync();
                var weekEvents = new List<DateOfWeek>();
                foreach (var date in dateWeek)
                {
                    weekEvents.Add(new DateOfWeek()
                    {
                        Id = date.Id,
                        WeekName = date.WeekName,
                        EventID = e.Id,
                    }
                    );
                }
                foreach (var i in eventType)
                {
                    
                    if (e.EvTypeID == i.Id)
                    {
                        eventsAll.Add(new EventsListDto()
                        {
                            Id = e.Id,
                            Title = e.Title,
                            Description = e.Description,
                            Picture = e.Picture,
                            EvTypeID = e.EvTypeID,
                            TypeName = i.TypeName,
                            EventStart = e.EventStart,
                            EventEnd = e.EventEnd,
                            DateWeeks = weekEvents,
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
                    var dateWeek = await _dateWeekRepository
                           .GetAll()
                           .Where(t => t.EventID == e.Id)
                           .ToListAsync();
                    var weekEvents = new List<DateOfWeek>();
                    foreach (var date in dateWeek)
                    {
                        weekEvents.Add(new DateOfWeek()
                        {
                            Id = date.Id,
                            WeekName = date.WeekName,
                            EventID = e.Id,
                        }
                        );
                    }
                    if (e.EvTypeID == i.Id)
                    {
                        eventsAll.Add(new EventsListDto()
                        {
                            Id = e.Id,
                            Title = e.Title,
                            Description = e.Description,
                            Picture = e.Picture,
                            EvTypeID = e.EvTypeID,
                            TypeName = i.TypeName,
                            EventStart = e.EventStart,
                            EventEnd = e.EventEnd,
                            DateWeeks = weekEvents,
                        });
                    }
                }
            }
            return new ListResultDto<EventsListDto>(
                ObjectMapper.Map<List<EventsListDto>>(eventsAll)
            );
        }
    }
}
