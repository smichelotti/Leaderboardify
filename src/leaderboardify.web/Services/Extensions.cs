using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Leaderboardify.Services
{
    public static class Extensions
    {
        public static string GetUserId(this Controller controller) => controller.User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}