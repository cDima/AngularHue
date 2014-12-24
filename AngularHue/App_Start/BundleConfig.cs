using System.Web;
using System.Web.Optimization;

namespace AngularHue
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //c:\Projects\AngularHue\AngularHue\bower_components\bootstrap\dist\css\bootstrap.min.css
            //c:\Projects\AngularHue\AngularHue\bower_components\bootstrap\dist\css\bootstrap-theme.css
            bundles.Add(new StyleBundle("~/styles").Include(
                     "~/bower_components/bootstrap/dist/css/bootstrap.css",
                     "~/bower_components/bootstrap/dist/css/bootstrap-theme.css",
                     "~/bower_components/bootstrap-material-design/dist/css/ripples.css",
                     "~/bower_components/bootstrap-material-design/dist/css/material.css",
                     "~/Assets/styles/styles.css"
                     ));


            bundles.Add(new ScriptBundle("~/bootstrap").Include(
                     "~/bower_components/bootstrap/js/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/material").Include(
                     "~/bower_components/bootstrap-material-design/dist/js/ripples.js",
                     "~/bower_components/bootstrap-material-design/dist/js/material.js"));

            bundles.Add(new ScriptBundle("~/ng").Include(
                        "~/bower_components/hammerjs/hammer.js",
                        "~/bower_components/angular/angular.js",
                        "~/bower_components/angular-route/angular-route.js",
                        "~/bower_components/angular-cookies/angular-cookies.js",
                        "~/bower_components/ng/angular-cookies.min.js",
                        "~/bower_components/angular-animate/angular-animate.js",
                        "~/bower_components/ng/ngProgress.min.js"));

            bundles.Add(new ScriptBundle("~/app").IncludeDirectory("~/Assets/app", "*.js", true));

            bundles.Add(new ScriptBundle("~/jquery").Include(
                        "~/Assets/jquery/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/misc").IncludeDirectory("~/Assets/misc", "*.js", true));

            bundles.Add(new ScriptBundle("~/polymer").Include(
                "~/bower_components/webcomponentsjs/webcomponents.min.js"
                ));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
#if !DEBUG
            BundleTable.EnableOptimizations = true;
#endif

        }
    }
}
