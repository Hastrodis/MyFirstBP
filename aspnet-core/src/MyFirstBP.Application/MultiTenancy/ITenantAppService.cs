using Abp.Application.Services;
using MyFirstBP.MultiTenancy.Dto;

namespace MyFirstBP.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

