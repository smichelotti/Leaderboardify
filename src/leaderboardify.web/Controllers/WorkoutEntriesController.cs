using System;
using Microsoft.AspNetCore.Mvc;
using Leaderboardify.Models;
using Leaderboardify.Services;
using System.Security.Claims;

namespace leaderboardify.web.Controllers
{
    [Route("api/workout-entries")]
    public class WorkoutEntriesController : Controller
    {
        private ICoreRepository repository;

        public WorkoutEntriesController(ICoreRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetAll(string userId)
        {
            var entries = this.repository.GetAllWorkoutEntries(userId);
            return new ObjectResult(entries);
        }

        [HttpPost]
        public IActionResult Post([FromBody]WorkoutEntry entry)
        {
            entry.UserId = this.GetUserId();
            this.repository.AddWorkoutEntry(entry);
            return new ObjectResult(entry);
        }

        [HttpPut("{id}")]
        public IActionResult Put([FromBody]WorkoutEntry entry)
        {
            entry.UserId = this.GetUserId();
            this.repository.UpdateWorkoutEntry(entry);
            return new ObjectResult(entry);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            this.repository.DeleteWorkoutEntry(id, this.GetUserId());
            return this.Ok();
        }

        #region Private Methods

        private string GetUserId() => this.User.FindFirstValue(ClaimTypes.NameIdentifier);

        #endregion

    }
}