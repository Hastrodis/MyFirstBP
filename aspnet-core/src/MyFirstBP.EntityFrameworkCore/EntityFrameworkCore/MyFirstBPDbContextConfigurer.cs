using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace MyFirstBP.EntityFrameworkCore
{
    public static class MyFirstBPDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<MyFirstBPDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<MyFirstBPDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
