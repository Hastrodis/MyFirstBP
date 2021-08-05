using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using MyFirstBP.Authorization.Roles;
using MyFirstBP.Authorization.Users;
using MyFirstBP.MultiTenancy;
using MyFirstBP.EventsEnt;

namespace MyFirstBP.EntityFrameworkCore
{
    public class MyFirstBPDbContext : AbpZeroDbContext<Tenant, Role, User, MyFirstBPDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<EventType> EventType { get; set; }
        public DbSet<EventTab> Events { get; set; }
        public DbSet<DateOfWeek> DateOfWeeks { get; set; }

        public MyFirstBPDbContext(DbContextOptions<MyFirstBPDbContext> options)
            : base(options)
        {
        }
    }
}
