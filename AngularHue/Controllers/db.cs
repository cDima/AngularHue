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

    public class db : ApiController
    {
        private DBContext context = new DBContext();
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

        [HttpPost]
        public HttpResponseMessage log([FromBody]string input)
        {
            try
            {
                context.configs.Add(new HueConfig()
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
