using Microsoft.AspNetCore.Mvc;
using Leaderboardify.Services;

namespace leaderboardify.web.Controllers
{
    [Route("api/identity")]
    public class IdentityController : Controller
    {
        [HttpGet]
        public IActionResult GetIdentityInfo()
        {
            if (this.User.Identity.IsAuthenticated)
            {
                var identityInfo = new
                {
                    isAuthenticated = true,
                    authenticatedUserName = this.User.Identity.Name,
                    userId = this.GetUserId()
                };
                return this.Ok(identityInfo);
            }

            // var anonymousIdentityInfo = new
            // {
            //     isAuthenticated = false,
            //     authenticatedUserName = "Steve Michelotti",
            //     userId = "steve.michelotti@gmail.com"
            // };
            var anonymousIdentityInfo = new {
                isAuthenticated = false,
                authenticatedUserName = "",
                userId = ""
            };
            return this.Ok(anonymousIdentityInfo);
        }
    }
}