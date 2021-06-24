using Abp.Application.Services.Dto;

namespace MyFirstBP.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

