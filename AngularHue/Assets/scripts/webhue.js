
$(document).ready(function () {
    var t = new Trianglify({
        //x_gradient: Trianglify.colorbrewer.PuOr[9],
        noiseIntensity: 0,
        cellsize: 90
    });
    var pattern = t.generate($('#outerbox').width(), $('#outerbox').height());
    //$('#innerbox').setAttribute('style', 'background-image: ' + pattern.dataUrl);
    $('#outerbox').css('background-image', pattern.dataUrl);
     
       

    var appInsights = window.appInsights || function (config) {
        function s(config) {
            t[config] = function () {
                var i = arguments;
                t.queue.push(function () {
                    t[config].apply(t, i)
                })
            }
        } var t = { config: config },
            r = document,
            f = window,
            e = "script",
            o = r.createElement(e), i, u;
        for (o.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js",
            r.getElementsByTagName(e)[0].parentNode.appendChild(o), t.cookie = r.cookie, t.queue = [],
            i = ["Event", "Exception", "Metric", "PageView", "Trace"]; i.length;)
            s("track" + i.pop());
        return config.disableExceptionTracking || (i = "onerror", s("_" + i), u = f[i],
            f[i] = function (config, r, f, e, o) {
                var s = u && u(config, r, f, e, o);
                return s !== !0 && t["_" + i](config, r, f, e, o), s
            }), t
    }({
        instrumentationKey: "915e42dc-328b-442a-8e15-f49d6addfd4a"
    });

    window.appInsights = appInsights;
    appInsights.trackPageView();
});

