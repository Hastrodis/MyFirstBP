using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MyFirstBP.EntityFrameworkCore;
using MyFirstBP.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace MyFirstBP.Web.Tests
{
    [DependsOn(
        typeof(MyFirstBPWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class MyFirstBPWebTestModule : AbpModule
    {
        public MyFirstBPWebTestModule(MyFirstBPEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MyFirstBPWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(MyFirstBPWebMvcModule).Assembly);
        }
    }
}