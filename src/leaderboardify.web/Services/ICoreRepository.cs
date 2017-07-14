using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Leaderboardify.Models;

namespace Leaderboardify.Services
{
    public interface ICoreRepository
    {
        //WorkoutEntry Get(int id);

        List<WorkoutEntry> GetAllWorkoutEntries(string userId);

        WorkoutEntry AddWorkoutEntry(WorkoutEntry entry);

        WorkoutEntry UpdateWorkoutEntry(WorkoutEntry entry);

        void DeleteWorkoutEntry(int id, string userId);

        List<NamedAthletePerformance> GetAllNamedPerformances();

        AthletePerformance GetPerformance(string userId);

        NamedAthletePerformance GetNamedPerformance(string userId);

        AthletePerformance SavePerformance(AthletePerformance performance);
    }
}
