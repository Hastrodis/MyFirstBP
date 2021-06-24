using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MyFirstBP.Configuration;

namespace MyFirstBP.Web.Host.Startup
{
    [DependsOn(
       typeof(MyFirstBPWebCoreModule))]
    public class MyFirstBPWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public MyFirstBPWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MyFirstBPWebHostModule).GetAssembly());
        }
    }
}
