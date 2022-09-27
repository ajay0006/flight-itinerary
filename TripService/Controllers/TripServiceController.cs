using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripService.Controllers
{
    [EnableCors]
    [Route("[controller]")]
    [ApiController]
    public class TripServiceController : ControllerBase
    {
        [HttpGet]
        public List<TripItinerary> Get()
        {
            return DataAccessHelper.GetAllItineraries();
        }

        [HttpPost]

        public void Post([FromBody] TripItinerary tripItinerary)
        {
            DataAccessHelper.SaveItinerary(tripItinerary);
        }

        [Route("[action]")]
        [HttpGet]

        public List<string> Cities()
        {
            return DataAccessHelper.Cities;
        }
    }
}
