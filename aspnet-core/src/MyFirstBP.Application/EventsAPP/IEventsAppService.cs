using Abp.Application.Services;
using System;
using MyFirstBP.EventsAPP.Dto;
using MyFirstBP.EventsEnt;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;

namespace MyFirstBP.EventsAPP
{
    public interface IEventsAppService : IApplicationService
    {
        Task<ListResultDto<EventsListDto>> GetAll(GetAllTitleInput input);
    }
}
