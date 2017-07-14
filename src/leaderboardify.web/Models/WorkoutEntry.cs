using System;

namespace Leaderboardify.Models
{
    public class WorkoutEntry
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public int Distance { get; set; }

    }
}