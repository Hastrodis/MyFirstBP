using System.Threading.Tasks;
using MyFirstBP.Models.TokenAuth;
using MyFirstBP.Web.Controllers;
using Shouldly;
using Xunit;

namespace MyFirstBP.Web.Tests.Controllers
{
    public class HomeController_Tests: MyFirstBPWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}