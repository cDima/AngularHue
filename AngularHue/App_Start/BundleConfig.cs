using System.Web;
using System.Web.Optimization;

namespace AngularHue
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            
            //bundles.Add(new StyleBundle("~/bower_components/roboto-fontface")
            //    .Include("~/bower_components/roboto-fontface/roboto-fontface.css"));
            //bundles.Add(new StyleBundle("~/bower_components/components-font-awesome/css")
            //    .Include("~/bower_components/components-font-awesome/css", new CssRewriteUrlTransform()));

            //bundles.Add(new StyleBundle("~/bundles/styles")
            //    .Include(
            //         "~/bower_components/angular-material/angular-material.css",
            //         //"~/bower_components/angular-material/themes/cyan-theme.css",
            //         "~/bower_components/ngprogress/ngProgress.css",
            //         "~/bower_components/material-design-icons/sprites/css-sprite/sprite-navigation-white.css",
            //         "~/bower_components/material-design-icons/sprites/css-sprite/sprite-action-white.css",
            //         "~/Assets/styles/flat-social-icons.css",

            //         "~/Assets/styles/bootstrap-slider.min.css",
            //         "~/Assets/styles/slider.css",
            //         "~/Assets/styles/popup.css",
            //         "~/Assets/styles/switch.css",

            //         "~/Assets/styles/styles.css"
            //         ));

            //bundles.Add(new StyleBundle("~/bundles/material-themes").IncludeDirectory(
            //         "~/bower_components/angular-material/modules/css", "*.css"));

            //bundles.Add(new ScriptBundle("~/bundles/webcomponents").Include(
            //            "~/bower_components/webcomponentsjs/webcomponents.js"
            //            ));
            
            //bundles.Add(new ScriptBundle("~/bundles/app").IncludeDirectory("~/Assets/app", "*.js", true));
            //bundles.Add(new ScriptBundle("~/misc").IncludeDirectory("~/Assets/misc", "*.js", true));

        //    bundles.Add(new ScriptBundle("~/bundles/hue").Include(
        //                "~/bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js",
        //                "~/Assets/scripts/hue/bootstrap-slider.min.js",
        //                "~/Assets/scripts/hue/color-thief.min.js",
        //                "~/Assets/scripts/config.js",
        //                "~/Assets/scripts/config.features.js",
        //                "~/Assets/scripts/hue/ga.js",
        //                "~/Assets/scripts/hue/uservoice.js",
        //                "~/Assets/scripts/hue/colors.js",
        //                "~/Assets/scripts/hue/palettes.js",  
        //                "~/Assets/scripts/hue/sequence.js",  
        //                "~/Assets/scripts/hue/ambient.js",  
        //                "~/Assets/scripts/hue/scenes.js",  
        //                "~/Assets/scripts/hue/sceneCommander.js",  
        //                "~/Assets/scripts/hue/hue.js",  
        //                "~/Assets/scripts/hue/colorUtil.js",
        //                "~/Assets/scripts/hue/hueCommander.js",
        //                "~/Assets/scripts/webhue.js"
        //));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
#if !DEBUG
            BundleTable.EnableOptimizations = true;
#endif

        }
    }
}
