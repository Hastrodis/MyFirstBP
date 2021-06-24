using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using MyFirstBP.Configuration.Dto;

namespace MyFirstBP.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : MyFirstBPAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
