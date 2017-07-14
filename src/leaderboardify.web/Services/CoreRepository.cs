using System.Collections.Generic;
using System.Linq;
using Leaderboardify.Data;
using Leaderboardify.Models;

namespace Leaderboardify.Services
{
    public class CoreRepository : ICoreRepository
    {
        private ApplicationDbContext context;

        public CoreRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        #region Workout Entry Methods

        public WorkoutEntry AddWorkoutEntry(WorkoutEntry entry)
        {
            using (var transaction = this.context.Database.BeginTransaction())
            {
                this.context.WorkoutEntries.Add(entry);
                this.context.SaveChanges();
                this.RefreshPerformanceTotals(entry.UserId);

                transaction.Commit();
                return entry;
            }
        }

        public WorkoutEntry UpdateWorkoutEntry(WorkoutEntry entry)
        {
            using (var transaction = this.context.Database.BeginTransaction())
            {
                this.context.WorkoutEntries.Update(entry);
                this.context.SaveChanges();
                this.RefreshPerformanceTotals(entry.UserId);

                transaction.Commit();
                return entry;
            }
        }

        public List<WorkoutEntry> GetAllWorkoutEntries(string userId)
        {
            return this.context.WorkoutEntries.Where(x => x.UserId == userId).OrderByDescending(x => x.Date).ToList();
        }

        public void DeleteWorkoutEntry(int id, string userId)
        {
            using (var transaction = this.context.Database.BeginTransaction())
            {
                var entity = new WorkoutEntry { Id = id };
                this.context.Attach(entity);
                this.context.Remove(entity);
                context.SaveChanges();
                this.RefreshPerformanceTotals(userId);

                transaction.Commit();
            }
        }
        #endregion

        #region Performance Methods

        public AthletePerformance GetPerformance(string userId)
        {
            System.Console.WriteLine($"***Inside GetPerformance, userId: {userId}");
            return this.context.AthletePerformances.SingleOrDefault(x => x.UserId == userId);
        }

        public List<NamedAthletePerformance> GetAllNamedPerformances()
        {
            var result = from ap in this.context.AthletePerformances
                         join u in this.context.Users on ap.UserId equals u.Id
                         orderby ap.GrandTotal descending
                         select new NamedAthletePerformance
                         {
                             UserId = ap.UserId,
                             BikeTotal = ap.BikeTotal,
                             BikeTarget = ap.BikeTarget,
                             RowTotal = ap.RowTotal,
                             RowTarget = ap.RowTarget,
                             RunTotal = ap.RunTotal,
                             RunTarget = ap.RunTarget,
                             GrandTotal = ap.GrandTotal,
                             FirstName = u.FirstName,
                             LastName = u.LastName
                         };
            return result.ToList();
        }

        public NamedAthletePerformance GetNamedPerformance(string userId)
        {
            var result = from ap in this.context.AthletePerformances
                         join u in this.context.Users on ap.UserId equals u.Id
                         where ap.UserId == userId
                         select new NamedAthletePerformance
                         {
                             UserId = ap.UserId,
                             BikeTotal = ap.BikeTotal,
                             BikeTarget = ap.BikeTarget,
                             RowTotal = ap.RowTotal,
                             RowTarget = ap.RowTarget,
                             RunTotal = ap.RunTotal,
                             RunTarget = ap.RunTarget,
                             GrandTotal = ap.GrandTotal,
                             FirstName = u.FirstName,
                             LastName = u.LastName
                         };
            return result.SingleOrDefault();
        }

        public AthletePerformance SavePerformance(AthletePerformance performance)
        {
            var existingPerformance = this.GetPerformance(performance.UserId);
            if (existingPerformance == null)
            {
                this.context.AthletePerformances.Add(performance);
            }
            else
            {
                existingPerformance.BikeTarget = performance.BikeTarget;
                existingPerformance.RowTarget = performance.RowTarget;
                existingPerformance.RunTarget = performance.RunTarget;
                this.context.AthletePerformances.Update(existingPerformance);
            }
            this.context.SaveChanges();
            return existingPerformance ?? performance;
        }

        private void RefreshPerformanceTotals(string userId)
        {
            var totals = (from t in this.context.WorkoutEntries
                          where t.UserId == userId
                          group t by t.Type into g
                          select new { Type = g.Key, TotalDistance = g.Sum(t => t.Distance) }).ToList();

            var bikeTotal = totals.SingleOrDefault(x => x.Type == "Bike")?.TotalDistance ?? 0;
            var rowTotal = totals.SingleOrDefault(x => x.Type == "Row")?.TotalDistance ?? 0;
            var runTotal = totals.SingleOrDefault(x => x.Type == "Run")?.TotalDistance ?? 0;

            var athletePerformance = this.GetPerformance(userId) ?? new AthletePerformance { UserId = userId };
            athletePerformance.BikeTotal = bikeTotal;
            athletePerformance.RowTotal = rowTotal;
            athletePerformance.RunTotal = runTotal;
            athletePerformance.GrandTotal = bikeTotal + rowTotal + runTotal;

            this.SavePerformance(athletePerformance);

        }

        #endregion
    }
}