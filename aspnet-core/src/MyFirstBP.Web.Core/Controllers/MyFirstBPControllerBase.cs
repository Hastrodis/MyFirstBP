using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace MyFirstBP.Controllers
{
    public abstract class MyFirstBPControllerBase: AbpController
    {
        protected MyFirstBPControllerBase()
        {
            LocalizationSourceName = MyFirstBPConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
