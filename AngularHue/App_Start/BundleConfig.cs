using System.Web;
using System.Web.Optimization;

namespace AngularHue
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/styles").Include(
                     //"~/bower_components/bootstrap/dist/css/bootstrap.css",
                     //"~/bower_components/bootstrap/dist/css/bootstrap-theme.css",
                     //"~/bower_components/bootstrap-material-design/dist/css/ripples.css",
                     //"~/bower_components/bootstrap-material-design/dist/css/material.css",
                     "~/bower_components/angular-material/angular-material.css",
                     "~/bower_components/angular-material/themes/blue-theme.css",
                     "~/bower_components/ngprogress/ngProgress.css",
                     "~/bower_components/components-font-awesome/css/font-awesome.min.css",
                     "~/bower_components/material-design-icons/sprites/css-sprite/sprite-navigation-white.css",
                     "~/bower_components/material-design-icons/sprites/css-sprite/sprite-action-white.css",
                     "~/Assets/styles/styles.css"
                     ));

            bundles.Add(new ScriptBundle("~/webcomponents").Include(
                        "~/bower_components/webcomponentsjs/webcomponents.js"
                        ));

            bundles.Add(new ScriptBundle("~/ng").Include(
                        "~/bower_components/angular/angular.js",
                        "~/bower_components/angular-route/angular-route.js",
                        "~/bower_components/angular-aria/angular-aria.js",
                        "~/bower_components/angular-cookies/angular-cookies.js",
                        "~/bower_components/angular-animate/angular-animate.js",
                        "~/bower_components/hammerjs/hammer.js",
                        "~/bower_components/angular-material/angular-material.js",
                        "~/bower_components/ngprogress/build/ngProgress.js"
                   ));
            bundles.Add(new ScriptBundle("~/scripts").Include(
                        //"~/bower_components/jquery/dist/jquery.min.js",
                        //"~/bower_components/bootstrap/js/bootstrap.js",
                        ));
            

            bundles.Add(new ScriptBundle("~/app").IncludeDirectory("~/Assets/app", "*.js", true));
            //bundles.Add(new ScriptBundle("~/misc").IncludeDirectory("~/Assets/misc", "*.js", true));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
#if !DEBUG
            BundleTable.EnableOptimizations = true;
#endif

        }
    }
}
