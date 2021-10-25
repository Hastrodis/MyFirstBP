using Abp.Application.Services;
using Abp.Domain.Repositories;
using MyFirstBP.DateOfWeeks.Dto;
using MyFirstBP.EventsEnt;

namespace MyFirstBP.DateOfWeeks
{
    public class DateWeekAppService : CrudAppService<DateOfWeek, DateOfWeekDto>
    {
        public DateWeekAppService(IRepository<DateOfWeek> repository) : base(repository)
        {
        }
    }
}
