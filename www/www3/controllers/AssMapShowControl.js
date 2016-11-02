angular.module('Phyathai')

.controller('AssMapShowControl',function($scope,$state,$stateParams,$ionicPopup,$timeout,$rootScope,$ionicScrollDelegate) {

  $rootScope.zoom_size = 1;
  $scope.index2 = 1;
  $scope.locationmarker =  $stateParams.map_location.split(",");
  $timeout(function(){
    $scope.scelmap_map = document.getElementById("image_show1");
  }, 100);

  //$stateParams.map_id
  $scope.urlmap =  $stateParams.map_url
  $scope.btn_opnedit = true;

  $rootScope.Back_4 = function(){
    $scope.checkSeleteTab(4);
    $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_MAP');
  }

  if($rootScope.deviceType == "2"){
    $(".classmap_zoom2").css("top","110px");
  }

  $timeout(function(){
    $scope.setlocation_left  = ($("#image_show1").css("height").replace("px", "")-(40/$scope.index2))*(100-$scope.locationmarker[1])/100;
    $scope.setlocation_top   = ($("#image_show1").css("width").replace("px", "")-(40/$scope.index2))*($scope.locationmarker[0])/100;
    $("#draggable_show1").css("top",($scope.setlocation_top*$scope.index2)+"px")
    $("#draggable_show1").css("left",($scope.setlocation_left*$scope.index2)+"px")
    $("#draggable_show1").css("background-image","url("+$stateParams.url_marker+")");
  }, 300);



  $scope.path_map_url = $scope.urlmap;
  $scope.iframeHeight = (window.innerWidth);
  $scope.iframeHeight2= (window.innerHeight-100);

  $scope.btn_editmap_open = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: $scope.TitleDialog,
      template: $scope.DatailDialog_editmap
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.btn_opnedit = false;
        $( "#draggable_show1" ).draggable();
      } else {
        console.log('ยกเลิก');
      }
    });
  }



  $scope.btn_savemap_open = function(){

    $scope.leftmarker = $("#draggable_show1").css('left').replace("px", "");
    $scope.heightmap = ($scope.scelmap_map.clientHeight*$rootScope.zoom_size)-40;
    $scope.toteltop = $scope.heightmap-$scope.leftmarker;
    $scope.toteltop_per = $scope.toteltop*100/$scope.heightmap;
    $scope.topmarker = $( "#draggable_show1" ).css('top').replace("px", "");
    $scope.widthmap = ($scope.scelmap_map.clientWidth*$rootScope.zoom_size)-40;
    $scope.totelleft = $scope.widthmap-$scope.topmarker;
    $scope.totelleft_per = 100-($scope.totelleft*100/$scope.widthmap);

    var confirmPopup2 = $ionicPopup.confirm({
      title: $scope.TitleDialog,
      template: $scope.DatailDialog_editmap
    });
    confirmPopup2.then(function(res) {
      if(res) {
        $scope.btn_opnedit = true;
        $( "#draggable_show1" ).draggable('destroy');
        var request = {
          'api_id' : 7,
          'invent_id' : $rootScope.invent_id,
          'invent_location' : $scope.totelleft_per+","+$scope.toteltop_per
        };
        $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
          if($scope.success){
            if(response.res_code != $scope.CODE_SUCCESS){
              console.log(response.res_text);
            }else{
              $rootScope.savelog($rootScope.emps_id,"AssetsMangement",2,$rootScope.invent_id);
              $scope.locationnew = $scope.totelleft_per+","+$scope.toteltop_per;
              $scope.locationmarker =  $scope.locationnew.split(",");
            }
          }
        }).error(function(error,status,headers,config){
          console.log(error);
        });
      } else {
        console.log('ยกเลิก');
      }
    });
  }



  $scope.btn_zoommap1 = function(index){
    if(index == 0 && $scope.index2 >= 2){
      $scope.index2--;
    }else if(index == 1 && $scope.index2 <= 2){
      $scope.index2++;
    }
    console.log($scope.index2);
    if($scope.index2 == "1"){
      $("#image_show1").animate({ 'zoom': 1 }, 400);
    }else if($scope.index2 == "2"){
      $("#image_show1").animate({ 'zoom': 2 }, 400);
    }else if($scope.index2 == "3"){
      $("#image_show1").animate({ 'zoom': 3 }, 400);
    }
    $rootScope.zoom_size = $scope.index2;
    setTimeout(function(){
      $ionicScrollDelegate.resize();
    },400);
    $("#draggable_show1").hide();
    $timeout(function(){
      $scope.setlocation_left  = ($("#image_show1").css("height").replace("px", "")-(40/$scope.index2))*(100-$scope.locationmarker[1])/100;
      $scope.setlocation_top   = ($("#image_show1").css("width").replace("px", "")-(40/$scope.index2))*($scope.locationmarker[0])/100;
      $("#draggable_show1").css("top",(($scope.setlocation_top*$scope.index2))+"px");
      $("#draggable_show1").css("left",(($scope.setlocation_left*$scope.index2))+"px");
      $("#draggable_show1").show();
    }, 400);
  }




})
