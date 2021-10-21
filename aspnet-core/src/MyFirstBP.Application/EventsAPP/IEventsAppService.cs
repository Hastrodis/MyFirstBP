using Abp.Application.Services;
using MyFirstBP.EventsAPP.Dto;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;

namespace MyFirstBP.EventsAPP
{
    public interface IEventsAppService : IApplicationService
    {
        Task<ListResultDto<EventsListDto>> GetAll(GetAllTitleInput input);
    }
}
