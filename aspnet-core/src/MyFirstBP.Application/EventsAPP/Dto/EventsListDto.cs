using Abp.AutoMapper;
using System;
using MyFirstBP.EventsEnt;
using Abp.Application.Services.Dto;

namespace MyFirstBP.EventsAPP.Dto
{
    public class GetAllTitleInput
    {
        public string Title { get; set; }
    }

    [AutoMapFrom(typeof(EventTab))]
    public class EventsListDto : EntityDto
    {
        public int EventID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int EvTypeID { get; set; }
    }
}
