﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Net.Http.Formatting;

namespace AngularHue
{
    public static class WebApiConfig
    {
        public static HttpConfiguration Configuration 
        {
            get
            {
                var conf = new HttpConfiguration();
                Register(conf);
                return conf;
            }
        }
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.

            config.SuppressDefaultHostAuthentication();

            //config.Filters.Add(new HostAuthenticationFilter(new OAuthBearerAuthenticationOptions().AuthenticationType));
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
            
            //config.Filters.Add(new HostAuthenticationFilter(Startup.OAuthBearerOptions.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            //I chaned the routeTemplate so that methods/services would be identified by their action, and not by their parameters.
            //I was getting conflicts if I had more than one GET services, that had identical parameter options, but totally different return data.
            //Adding the action to the routeTemplte correct this issue.
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}", //routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            
            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
