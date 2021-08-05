using MyFirstBP.EntityFrameworkCore;
using MyFirstBP.EventsEnt;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyFirstBP.Tests
{
    class EventsTabTest
    {
        private readonly MyFirstBPDbContext _context;

        public EventsTabTest (MyFirstBPDbContext context) 
        {
            _context = context;
        }

        public void Build()
        {
            _context.Events.AddRange(
                new EventTab { Title = "First Events", Description = "Test Events" }
                );
        }
    }
}
