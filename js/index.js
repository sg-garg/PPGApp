// init.js
(function (index, $) {

  if (window.cordova) { // We're in PhoneGap
    //var url = "http://howtowat.ch/api/1/find/recent";
	 alert("In PhoneGap");
	var url = "recent.txt";
  } else {
	  alert("In desktop");
    var url = "recent.txt";
  }

  if (sessionStorage) {
    sessionStorage.helloWorld = "hi there";
  }

  index.vm = {
    items: ko.observableArray([]),
    msg: ko.observable(""),
    getRecent: function () {
      index.vm.msg("Loading");
      index.vm.items.removeAll();
      $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
          $.each(data.MediaResults, function (i, item) {
            index.vm.items.push(item)
          });
          index.vm.msg("Found " + index.vm.items().length + " Result(s)");
        },
        error: function (xhr, type) {
          index.vm.msg("Failed to load data");
        }
      });

    }
  };

  index.init = function () {

    // Add notification for click on item
    $("#body").on("click", ".recent-item", function (e) {
      if (window.cordova) {
        // PhoneGap API
        navigator.notification.alert("You picked one.");
      } else {
        alert("You picked one.");
      }
    });


    ko.applyBindings(index.vm, $("#index-page")[0]);
    index.vm.getRecent();
  };

})(window.index = window.index || {}, $);