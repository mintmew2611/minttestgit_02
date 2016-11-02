// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
//fefe
    var pathphone = "/mnt/sdcard/";
    var fileTransfer = new FileTransfer();
		fileTransfer.download(
		"https://files.graphiq.com/stories/t4/15_Tiniest_Dog_Breeds_1718_3083.jpg",
		pathphone+'minttest02/123.jpg',
		function(entry) {
      console.log(entry);
  		$rootScope.img_pp = pathphone+'minttest02/123.jpg';
      $rootScope.$apply();
		},
		function(error) {
  		console.log(error);
		});

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
