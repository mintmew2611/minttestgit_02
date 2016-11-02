// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Phyathai', ['ionic', 'onezone-datepicker', 'ngCordova' , 'ngPhotoSwipe']).config(function($ionicConfigProvider ) {
  $ionicConfigProvider.views.transition('none');
  $ionicConfigProvider.views.swipeBackEnabled(false);
})

.run(function($ionicPlatform,$rootScope,$state) {


  //FastClick.attach(document.body);
  $rootScope.deviceTypes = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
  if($rootScope.deviceTypes == "Android"){
    $rootScope.deviceType = "1";
  }else{
    $rootScope.deviceType = "2";
  }

  $rootScope.db = window.openDatabase("phyathai6", "1.0", "phyathai DB", 10000000);
  $rootScope.db.transaction(function(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS login (login_id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(50),fname VARCHAR(50),lname VARCHAR(50),  emp_id VARCHAR(11) , emp_img1 VARCHAR(255) , emp_img2 VARCHAR(255) , hospital_id VARCHAR(255) , group_id VARCHAR(2),  emp_real_id VARCHAR(11),  SeeAll VARCHAR(1),  costcenter_id VARCHAR(10))',[]);

    tx.executeSql('SELECT * FROM login',[],
    function SuccessInsert(tx,result) {
      if (result.rows.length > 0) {
        $rootScope.group_id = result.rows.item(0).group_id;
        $rootScope.hospital_id = result.rows.item(0).hospital_id;
        $rootScope.emps_id = result.rows.item(0).emp_id;
        $rootScope.emps_img1 = result.rows.item(0).emp_img1;
        $rootScope.emps_img2 = result.rows.item(0).emp_img2;
        $rootScope.emps_fname = result.rows.item(0).fname;
        $rootScope.emps_lname = result.rows.item(0).lname;
        $rootScope.img_ownerCP = $rootScope.emps_img1;
        $rootScope.name_ownerCP = $rootScope.emps_fname+" "+$rootScope.emps_lname;
        $rootScope.id_ownerCP = result.rows.item(0).emp_real_id;
        $rootScope.SeeAll = result.rows.item(0).SeeAll;
        $rootScope.costcenter_id = result.rows.item(0).costcenter_id;
        if($rootScope.hospital_id.indexOf(",") == -1){
          $rootScope.checkmulti_hos = false;
        }else{
          $rootScope.checkmulti_hos = true;
        }
        $rootScope.getData();
        setTimeout(function(){
          $rootScope.checkconnect_statego('app.Assets_Check');
        },1000);

      }
    });
  });



  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider,$urlRouterProvider){
  $stateProvider


  .state('MainMenu', {
    url: '/MainMenu',
    templateUrl: 'templates/MainMenu.html',
    controller:'MainMenuControl'
  })
  .state('Login', {
    cache: false,
    url: '/Login',
    templateUrl: 'templates/0Login.html',
    controller:'LoginControl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/MainMenu.html",
    controller: 'AppCtrl'
  })


  .state('app.Assets_Check', {
    url: "/Assets_Check",
    views: {
      'content': {
        templateUrl: "templates/1Assets_Check.html",
        controller: '1Assets_CheckControl'
      }
    }
  })
  .state('app.Create_assets', {
    cache: false,
    /*params: {  updater:'',name0:'',name1:'',name2:'',name3:'',name4:'',name5:'',name6:'',name7:''
    ,name8:'',name9:'',name10:'',name11:'',name11_2:'',name12:'',name13:'',name14:'',name14_2:''
    ,name15:'',name16:'',name17:'',name18:'',name19:'',name20:''},*/
    url: "/Create_assets",
    views: {
      'content': {
        templateUrl: "templates/2Create_Assets.html",
        controller: '2Create_AssetsControl'
      }
    }
  })
  .state('app.Check_Map', {
    url: "/Check_Map",
    views: {
      'content': {
        templateUrl: "templates/3Check_Map.html",
        controller: '3Check_MapControl'
      }
    }
  })
  .state('app.QR_Code', {
    url: "/QR_Code",
    views: {
      'content': {
        templateUrl: "templates/4QR_Code.html",
        controller: '4QR_CodeControl'
      }
    }
  })
  .state('app.Change_Pass', {
    url: "/Change_Pass",
    views: {
      'content': {
        templateUrl: "templates/5Change_Pass.html",
        controller: '5Change_PassControl'
      }
    }
  })
  .state('app.Help', {
    url: "/Help",
    cache: false,
    views: {
      'content': {
        templateUrl: "templates/6Help.html",
        controller: '6HelpControl'
      }
    }
  })


  .state('tabs', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
  .state('tabs.Detail_Assets', {
    url: "/Detail_Assets",
    views: {
      'home-tab': {
        templateUrl: "templates/Detail_Assets.html",
        controller: 'Detail_AssetsControl'
      }
    }
  })
  .state('tabs.Detail_Assets.Detail_Assets_INFO', {
    url: "/Detail_Assets_INFO",
    views: {
      'Detail_Assets-page': {
        templateUrl: "templates/Detail_Assets_INFO.html",
        controller: 'Detail_AssetsControl'
      }
    }
  })
  .state('tabs.Detail_Assets.Detail_Assets_REPAIR', {
    url: "/Detail_Assets_REPAIR",
    views: {
      'Detail_Assets-page': {
        templateUrl: "templates/Detail_Assets_REPAIR.html",
        controller: 'Detail_AssetsControl'
      }
    }
  })

  .state('tabs.Detail_Assets.Detail_Assets_OWNER', {
    url: "/Detail_Assets_OWNER",
    views: {
      'Detail_Assets-page': {
        templateUrl: "templates/Detail_Assets_OWNER.html",
        controller: 'Detail_AssetsControl'
      }
    }
  })
  .state('tabs.Detail_Assets.Detail_Assets_OWNER_Detail', {
    url: "/Detail_Assets_OWNER_Detail",
    views: {
      'Detail_Assets-page': {
        templateUrl: "templates/Detail_Assets_OWNER_Detail.html",
        controller: 'Detail_Assets_OWNER_DetailControl'
      }
    }
  })
  .state('tabs.Detail_Assets.Detail_Assets_MAP', {
    url: "/Detail_Assets_MAP",
    views: {
      'Detail_Assets-page': {
        templateUrl: "templates/Detail_Assets_MAP.html",
        controller: 'Detail_AssetsControl'
      }
    }
  })

  .state('AddOwner', {
    url: '/AddOwner',
    templateUrl: 'templates/AddOwner.html',
    controller:'AddOwnerControl'
  })
  .state('AddMap', {
    cache: false,
    url: '/AddMap',
    templateUrl: 'templates/AddMap.html',
    controller:'AddMapControl'
  })

  .state('AssMapShow', {
    params: {  map_url:'',map_id:'',map_location:'',url_marker:''},
    url: '/AssMapShow',
    cache: false,
    templateUrl: 'templates/AssMapShow.html',
    controller:'AssMapShowControl'
  })

  .state('Detail_AssetsImg', {
    url: '/Detail_AssetsImg',
    cache: false,
    templateUrl: 'templates/Detail_Assets_INFO_IMG.html',
    controller:'Detail_AssetsImgControl'
  })

  .state('AssCapexShow', {
    params: {  capex:''},
    url: '/AssCapexShow',
    cache: false,
    templateUrl: 'templates/AssCapexShow.html',
    controller:'AssCapexShowControl'
  })

  $urlRouterProvider.otherwise('Login');

})

.directive('onErrorSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.onErrorSrc) {
          attrs.$set('src', attrs.onErrorSrc);
        }
      });
    }
  }
});
