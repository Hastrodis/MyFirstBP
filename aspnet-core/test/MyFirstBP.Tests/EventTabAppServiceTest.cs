using System;
using MyFirstBP.EventsAPP;
using Shouldly;
using Xunit;

namespace MyFirstBP.Tests
{
    public class EventTabAppServiceTest: MyFirstBPTestBase 
    {
        private readonly IEventsAppService _eventsAppService;

        public EventTabAppServiceTest()
        {
            _eventsAppService = Resolve<IEventsAppService>();
        }

        [Fact]
        public async System.Threading.Tasks.Task Should_Get_All_Tasks()
        {
            //Act
            var output = await _eventsAppService.GetAll(new EventsAPP.Dto.GetAllTitleInput());

            //Assert
            output.Items.Count.ShouldBe(1);
        }

    }
}
