using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using MyFirstBP.Configuration;
using MyFirstBP.Web;

namespace MyFirstBP.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class MyFirstBPDbContextFactory : IDesignTimeDbContextFactory<MyFirstBPDbContext>
    {
        public MyFirstBPDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MyFirstBPDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            MyFirstBPDbContextConfigurer.Configure(builder, configuration.GetConnectionString(MyFirstBPConsts.ConnectionStringName));

            return new MyFirstBPDbContext(builder.Options);
        }
    }
}
