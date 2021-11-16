﻿using Abp.AutoMapper;
using MyFirstBP.EventsEnt;
using Abp.Application.Services.Dto;

namespace MyFirstBP.EventsAPP.Dto
{
    [AutoMapFrom(typeof(EventTab))]
    public class UpdateEvents : EntityDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int EvTypeID { get; set; }
    }
}
