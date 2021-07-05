using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace MyFirstBP.EntityFrameworkCore
{ 
    
    public static class MyFirstBPDbContextConfigurer
    {
        //private static readonly MySqlServerVersion serverVersion = new MySqlServerVersion(new System.Version(8, 0, 25));
        public static void Configure(DbContextOptionsBuilder<MyFirstBPDbContext> builder, string connectionString)
        {
            builder.UseMySql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<MyFirstBPDbContext> builder, DbConnection connection)
        {
            builder.UseMySql(connection);
        }
    }
}
