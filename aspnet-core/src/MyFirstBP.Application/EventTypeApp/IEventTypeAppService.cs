using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyFirstBP.EventTypeApp.Dto;
using System.Threading.Tasks;

namespace MyFirstBP.EventTypeApp
{
    public interface IEventTypeAppService: IApplicationService
    {
        void Create(CreateEvenTypeInput input);

        void Delete(int input);

        void Update(UpdateEventTypeInput input);

        Task<ListResultDto<EventTypeListDto>> GetAll();

        Task<ListResultDto<EventTypeListDto>> Get(EventTypeListDto input);

    }
}
