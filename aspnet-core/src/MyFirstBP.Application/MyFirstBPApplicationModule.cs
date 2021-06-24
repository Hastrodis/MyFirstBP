using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MyFirstBP.Authorization;

namespace MyFirstBP
{
    [DependsOn(
        typeof(MyFirstBPCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class MyFirstBPApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<MyFirstBPAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(MyFirstBPApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
