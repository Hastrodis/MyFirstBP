using MyFirstBP.EventTypeApp.Dto;
using Abp.Application.Services.Dto;
using System.Threading.Tasks;
using Abp.Application.Services;

namespace MyFirstBP.EventTypeApp
{
    public interface IEventTypeService: IApplicationService
    {
        Task<ListResultDto<EventTypeListDto>> GetAll(GetAllEventTypeInput input);
    }
}
