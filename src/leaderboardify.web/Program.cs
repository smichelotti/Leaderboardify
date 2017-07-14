using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace leaderboardify.web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                // .UseKestrel(options => {
                //     options.NoDelay = true;
                //     options.UseHttps("local-kestral-cert.pfx", "Pass12!!");
                //     //options.UseConnectionLogging();
                // })
                // .UseUrls("https://localhost:5001")
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
