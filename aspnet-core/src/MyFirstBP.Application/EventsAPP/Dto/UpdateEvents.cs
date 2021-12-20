using Abp.AutoMapper;
using MyFirstBP.EventsEnt;
using Abp.Application.Services.Dto;
using System.Collections.Generic;
using System;

namespace MyFirstBP.EventsAPP.Dto
{
    [AutoMapFrom(typeof(EventTab))]
    public class UpdateEvents : EntityDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int EvTypeID { get; set; }
        public DateTime EventStart { get; set; }
        public DateTime EventEnd { get; set; }
        public List<CreateDateOfWeek> DateWeeks { get; set; }
    }
}
