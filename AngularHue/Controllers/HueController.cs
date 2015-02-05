using AngularHue.Models;
using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity.Owin;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;

namespace AngularHue.Controllers
{

    public class HueController : ApiController
    {
        private DBContext db = new DBContext();
        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [HttpGet]
        public IQueryable<HueConfig> GetItems99()
        {
            return db.configs.OrderByDescending(d => d.AddedOn).Take(100);
        }

        [HttpPost]
        public HttpResponseMessage PostHueConfig([FromBody]string input)
        {
            try
            {
                db.configs.Add(new HueConfig()
                {
                        AddedOn = DateTime.UtcNow,
                        FromIP = System.Web.HttpContext.Current.Request.UserHostAddress,
                        Config = input, 
                });
                return Request.CreateResponse(HttpStatusCode.Accepted);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

    }
}
