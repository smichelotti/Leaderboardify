using System;
using Microsoft.AspNetCore.Mvc;
using Leaderboardify.Models;
using Leaderboardify.Services;

namespace leaderboardify.web.Controllers
{
    [Route("api/performances")]
    public class PerformanceController : Controller
    {
        private ICoreRepository repository;

        public PerformanceController(ICoreRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return this.Ok(this.repository.GetAllNamedPerformances());
        }

        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            var performance = this.repository.GetNamedPerformance(userId);
            return performance == null ? new ObjectResult(new AthletePerformance()) : new ObjectResult(performance);
        }

        [HttpPut("{userId}")]
        public IActionResult Put(string userId, [FromBody]AthletePerformance performance)
        {
            // var updated = this.repository.SavePerformance(performance);
            // return new ObjectResult(updated);

            this.repository.SavePerformance(performance);
            var namedPerformance = this.repository.GetNamedPerformance(userId);
            return new ObjectResult(namedPerformance);
        }
    }
    
}