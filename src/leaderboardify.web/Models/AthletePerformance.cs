using System.ComponentModel.DataAnnotations;

namespace Leaderboardify.Models
{
    public class AthletePerformance
    {
        [Key]
        public string UserId { get; set; }

        public int RowTarget { get; set; }
        public int RunTarget { get; set; }
        public int BikeTarget { get; set; }

        public int RowTotal { get; set; }
        public int RunTotal { get; set; }
        public int BikeTotal { get; set; }

        public int GrandTotal { get; set; }
    }

    public class NamedAthletePerformance : AthletePerformance
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
