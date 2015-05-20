using Microsoft.Owin.Security.Facebook;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace AngularHue.Providers
{
    public class FacebookAuthProvider : FacebookAuthenticationProvider
    {
        public override Task Authenticated(FacebookAuthenticatedContext context)
        {
            context.Identity.AddClaim(new Claim("ExternalAccessToken", context.AccessToken));
            context.Identity.AddClaim(new Claim("image", "https://graph.facebook.com/v2.3/" + context.Id + "/picture"));
            context.Identity.AddClaim(new Claim("profile", context.Link));
            context.Identity.AddClaim(new Claim("name", context.Name));
            return Task.FromResult<object>(null);
        }
    }
}