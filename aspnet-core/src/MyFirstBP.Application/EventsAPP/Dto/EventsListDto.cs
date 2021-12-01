using Abp.AutoMapper;
using MyFirstBP.EventsEnt;
using Abp.Application.Services.Dto;
using System.Collections.Generic;
using MyFirstBP.DateOfWeeks.Dto;

namespace MyFirstBP.EventsAPP.Dto
{
    [AutoMapFrom(typeof(EventTab))]
    public class EventsListDto : EntityDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int EvTypeID { get; set; }
        public string TypeName { get; set; }
        public List<CreateDateOfWeek> DateWeeks { get; set; }
    }
}
