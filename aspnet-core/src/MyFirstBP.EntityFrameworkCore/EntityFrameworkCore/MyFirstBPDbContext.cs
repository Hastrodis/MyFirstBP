using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using MyFirstBP.Authorization.Roles;
using MyFirstBP.Authorization.Users;
using MyFirstBP.MultiTenancy;

namespace MyFirstBP.EntityFrameworkCore
{
    public class MyFirstBPDbContext : AbpZeroDbContext<Tenant, Role, User, MyFirstBPDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public MyFirstBPDbContext(DbContextOptions<MyFirstBPDbContext> options)
            : base(options)
        {
        }
    }
}
