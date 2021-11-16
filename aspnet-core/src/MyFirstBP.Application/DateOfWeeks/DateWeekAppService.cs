using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using MyFirstBP.DateOfWeeks.Dto;
using MyFirstBP.EventsEnt;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFirstBP.DateOfWeeks
{
    public class DateWeekAppService : MyFirstBPAppServiceBase, IDateWeekAppService
    {
        private readonly IRepository<DateOfWeek> _dateWeekRepository;

        public DateWeekAppService(IRepository<DateOfWeek> dateWeekRepository)
        {
            _dateWeekRepository = dateWeekRepository;
        }

        public void Create(CreateDateOfWeek input)
        {
            var dateWeek = _dateWeekRepository.FirstOrDefault(t => t.EventID == input.EventID && t.WeekName == input.WeekName);
            if (dateWeek != null)
            {
                throw new UserFriendlyException("День недели уже использован для этого мероприятия");
            }
            dateWeek = new DateOfWeek
            {
                WeekName = input.WeekName,
                EventID = input.EventID
            };
            _dateWeekRepository.Insert(dateWeek);

        }

        public void Delete(int id)
        {
            var events = _dateWeekRepository.FirstOrDefault(t => t.Id == id);
            if (events is null)
            {
                throw new UserFriendlyException("День недели свободен");
            }
            _dateWeekRepository.Delete(id);
        }

        public void Update(UpdateDateOfWeek input)
        {
            var dateWeek = _dateWeekRepository.Get(input.Id);
            dateWeek.WeekName = input.WeekName;
            dateWeek.EventID = input.EventID;
        }

        public async Task<ListResultDto<DateOfWeekDto>> Get(DateOfWeekDto input)
        {
            var events = await _dateWeekRepository
                .GetAll()
                .Where(t => t.WeekName == input.WeekName || t.Id == input.Id || t.EventID == input.EventID)
                .ToListAsync();
            return new ListResultDto<DateOfWeekDto>(
                ObjectMapper.Map<List<DateOfWeekDto>>(events)
            );
        }

    }
}
