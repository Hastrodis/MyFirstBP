using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyFirstBP.EventsAPP.Dto;
using System.Threading.Tasks;

namespace MyFirstBP.EventsAPP
{
    public interface IEventsAppService : IApplicationService
    {
        void Create(CreateEvents input);

        void Delete(int input);

        void Update(UpdateEvents input);

        Task<ListResultDto<EventsListDto>> GetAll();

        Task<ListResultDto<EventsListDto>> Get(GetEvents input);
    }
}
