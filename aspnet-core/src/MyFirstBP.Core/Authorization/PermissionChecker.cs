using Abp.Authorization;
using MyFirstBP.Authorization.Roles;
using MyFirstBP.Authorization.Users;

namespace MyFirstBP.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
