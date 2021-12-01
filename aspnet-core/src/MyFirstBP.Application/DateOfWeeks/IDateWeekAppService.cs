using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyFirstBP.DateOfWeeks.Dto;
using System.Threading.Tasks;

namespace MyFirstBP.DateOfWeeks
{
    public interface IDateWeekAppService: IApplicationService
    {
        void Create(CreateDateOfWeek input);

        void Delete(int input);

        void Update(UpdateDateOfWeek input);

        Task<ListResultDto<DateOfWeekDto>> GetAll();

        Task<ListResultDto<DateOfWeekDto>> Get(DateOfWeekDto input);
    }
}
