using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using MyFirstBP.EventsEnt;

namespace MyFirstBP.EventsAPP.Dto
{
    [AutoMapFrom(typeof(DateOfWeek))]
    public class CreateDateOfWeek : EntityDto
    {
        public SWeek WeekName { get; set; }

        public int EventID { get; set; }
    }
}
