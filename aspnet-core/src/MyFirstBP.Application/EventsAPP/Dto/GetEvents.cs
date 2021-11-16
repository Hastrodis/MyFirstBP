using Abp.AutoMapper;
using MyFirstBP.EventsEnt;
using Abp.Application.Services.Dto;

namespace MyFirstBP.EventsAPP.Dto
{
    [AutoMapFrom(typeof(EventTab))]
    public class GetEvents : EntityDto
    {
        public string Title { get; set; }

    }
}
