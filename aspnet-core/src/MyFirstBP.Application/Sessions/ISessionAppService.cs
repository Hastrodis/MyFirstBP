using System.Threading.Tasks;
using Abp.Application.Services;
using MyFirstBP.Sessions.Dto;

namespace MyFirstBP.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
