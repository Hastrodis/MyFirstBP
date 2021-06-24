using System.Threading.Tasks;
using MyFirstBP.Configuration.Dto;

namespace MyFirstBP.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
