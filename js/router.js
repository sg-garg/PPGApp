// router.js
(function (router, $) {
  router.app = Sammy("body", function () {

    var that = this;
    var $index = $("#index-page");
    var $settings = $("#settings-page");

    // Hack to force Android Browser to not use push state
    var ua = navigator.userAgent;
    var downgradeAndroid = false;
    if (ua.indexOf("Android") >= 0) {
      this.disable_push_state = true;
    };

    function swapPages(oldPage, newPage) {
      oldPage.hide("fast", function () {
        newPage.show("fast");
      });
    }

    var routes = [{
      path: "#/",
      callback: function (i) {
        swapPages($settings, $index);
      }
    },
    {
      path: "#/settings",
      callback: function (i) {
        swapPages($index, $settings);
      }
    }];

    $.each(routes, function (i, r) {
      that.get(r.path, r.callback);
    });
  });

  router.init = function () {
    router.app.run("#/");
  };

})(window.router = window.router || {}, jQuery);