using System.Threading.Tasks;
using Abp.Application.Services;
using MyFirstBP.Authorization.Accounts.Dto;

namespace MyFirstBP.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
