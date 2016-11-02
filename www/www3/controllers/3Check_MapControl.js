angular.module('Phyathai')

.controller('3Check_MapControl',function($scope,$state,$stateParams,$ionicPopup,$timeout,$rootScope,$ionicPopover,$ionicScrollDelegate){

  $scope.mCounts = 0;
  $scope.noMoreItemsAvailable = false;
  //$scope.checksearch_loadmore = true;

  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    if(toState.name == "app.Check_Map"){
      if($scope.arraymarker.length > 0){
        $scope.loaddata();
      }
    }
  })


  if($rootScope.deviceType == "2"){
    $(".classmap_zoom").css("top","160px");
  }

  $rootScope.zoom_size = 1;
  $scope.index2 = 1;

  $scope.arraymarker = [];
  $scope.arraymarker2 = [];
  $scope.check_map_marker = "img/Assets_icon_marker.png";
  $scope.TextSearch = "";

  $scope.cat_filter="";$scope.bran_filter="";$scope.hospital_filter=$rootScope.hospital_id;$scope.build_filter="";$scope.floor_filter="";$scope.depart_filter="";

  $ionicPopover.fromTemplateUrl('templates/filter_map_main.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.checkone_filter_map = true;
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
    $scope.filter_hide(-1);
    $scope.btnback_filter = false;
    $scope.text_title_filter_map = "Filter";
    if($scope.checkone_filter_map){
      $(".namesub_filter_map0").html("All");
      $(".namesub_filter_map1").html("All");
      $(".namesub_filter_map2").html("All");
      $(".namesub_filter_map3").html("All");
      $(".namesub_filter_map4").html("All");
      $(".namesub_filter_map5").html("All");
      $scope.checkone_filter_map = false;
    }
    if($rootScope.checkmulti_hos){
      $(".popover").css("height","426px");
    }
  };

  $scope.filter_sub_Ass = function(data,index) {

    if(index == 0){
      $scope.text_title_filter_map = "Category";
    }else if(index == 1){
      $scope.text_title_filter_map = "Brands";
    }

    if(!$rootScope.checkmulti_hos){
      if(index == 2){
        $scope.text_title_filter_map = "อาคาร";
      }else if(index == 3 && $scope.build_filter != ""){
        $scope.text_title_filter_map = "ชั้น";
      }else if(index == 4 && $scope.floor_filter != ""){
        $scope.text_title_filter_map = "แผนกสินทรัพย์";
      }
    }else{
      if(index == 2){
        $scope.text_title_filter_map = "โรงพยาบาล";
      }else if(index == 3 && $scope.hospital_filter != ""){
        $scope.text_title_filter_map = "อาคาร";
      }else if(index == 4 && $scope.build_filter != ""){
        $scope.text_title_filter_map = "ชั้น";
      }else if(index == 5 && $scope.floor_filter != ""){
        $scope.text_title_filter_map = "แผนกสินทรัพย์";
      }
    }

    if(!$rootScope.checkmulti_hos){
      if(index == 3 && $scope.build_filter == ""){
        $rootScope.toast("กรุณาเลือกอาคาร");
      }else if(index == 4 && $scope.floor_filter == ""){
        $rootScope.toast("กรุณาเลือกชั้น");
      }else{
        $rootScope.indexback = index;
        $scope.filter_hide(index);
        $scope.btnback_filter = true;
      }
    }else{
      if(index == 3 && $(".namesub_filter_map2").text() == "All"){
        $rootScope.toast("กรุณาเลือกโรงพยาบาล");
      }else if(index == 4 && $scope.build_filter == ""){
        $rootScope.toast("กรุณาเลือกอาคาร");
      }else if(index == 5 && $scope.floor_filter == ""){
        $rootScope.toast("กรุณาเลือกชั้น");
      }else{
        if(index == 2){
          index = 5;
        }else if(index > 2){
          index--;
        }
        $rootScope.indexback = index;
        $scope.filter_hide(index);
        $scope.btnback_filter = true;
      }
    }
  };
  $scope.back_filter = function() {
    $scope.text_title_filter_map = "Filter";
    if(!$rootScope.checkmulti_hos){
      if($rootScope.indexback == 0){
        $scope.cat_filter="";
        $scope.cat_filter_name="All";
        angular.forEach($rootScope.Add_catDataArray, function (items) {
          if (document.getElementById("check_cat_map"+items.cat_id).checked) {
            $scope.cat_filter += items.cat_id+" ";
            $scope.cat_filter_name += items.cat_name+",";
          }
        })
        $rootScope.filter_all($scope.cat_filter_name,".namesub_filter_map0");
      }
      else if($rootScope.indexback == 1){
        $scope.bran_filter="";
        $scope.bran_filter_name="All";
        angular.forEach($rootScope.Add_brandDataArray, function (items) {
          if (document.getElementById("check_bran_map"+items.brand_id).checked) {
            $scope.bran_filter += items.brand_id+" ";
            $scope.bran_filter_name += items.brand_name+",";
          }
        })
        $rootScope.filter_all($scope.bran_filter_name,".namesub_filter_map1");
      }
      else if($rootScope.indexback == 2){
        $scope.build_filter="";
        $scope.build_filter_name ="All";
        angular.forEach($rootScope.buildDataArray, function (items) {
          if (document.getElementById("check_build_map"+items.building_id).checked) {
            $scope.build_filter += items.building_id+" ";
            $scope.build_filter_name += items.building_name+",";
          }
        })
        $rootScope.filter_all($scope.build_filter_name,".namesub_filter_map2");

        if($scope.build_filter !="" && $scope.build_filter != $scope.savetext_build_filter){
          $scope.savetext_build_filter = $scope.build_filter;
          $scope.filter_clear(1,".namesub_filter_map3");
          $scope.filter_clear(2,".namesub_filter_map4");
          var request = {
            'api_id' : 6,
            'building_id' : $scope.build_filter
          };
          $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
            if($scope.success){
              if(response.res_code != $scope.CODE_SUCCESS){
                console.log(response.res_text);
              }else{
                angular.forEach(response.result, function (items) {
                  $rootScope.floorDataArray.push(items);
                })
              }
            }
          }).error(function(error,status,headers,config){console.log(error);});
        }
        if($scope.build_filter == ""){
          $scope.savetext_build_filter="";
          $scope.filter_clear(1,".namesub_filter_map3");
          $scope.filter_clear(2,".namesub_filter_map4");
        }

      }
      else if($rootScope.indexback == 3){
        $scope.floor_filter="";
        $scope.floor_filter_name ="All";
        angular.forEach($rootScope.floorDataArray, function (items) {
          if (document.getElementById("check_floor_map"+items.floor_id).checked) {
            $scope.floor_filter += items.floor_id+" ";
            $scope.floor_filter_name += items.floor_name+",";
          }
        })
        $rootScope.filter_all($scope.floor_filter_name,".namesub_filter_map3");

        if($scope.floor_filter !="" && $scope.floor_filter != $scope.savetext_floor_filter){
          $scope.savetext_floor_filter = $scope.floor_filter;
          $scope.filter_clear(2,".namesub_filter_map4");
          var request = {
            'api_id' : 6,
            'floor_id' : $scope.floor_filter
          };
          $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
            if($scope.success){
              if(response.res_code != $scope.CODE_SUCCESS){
                console.log(response.res_text);
              }else{
                angular.forEach(response.result, function (items) {
                  $rootScope.departDataArray.push(items);
                })
              }
            }
          }).error(function(error,status,headers,config){console.log(error);});
        }
        if($scope.floor_filter == ""){
          $scope.savetext_floor_filter="";
          $scope.filter_clear(2,".namesub_filter_map4");
        }

      }
      else if($rootScope.indexback == 4){
        $scope.depart_filter="";
        $scope.depart_filter_name="All";
        angular.forEach($rootScope.departDataArray, function (items) {
          if (document.getElementById("check_depart_map"+items.department_id).checked) {
            $scope.depart_filter += items.department_id+" ";
            $scope.depart_filter_name += items.department_name+",";
          }
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter_map4");
      }
    }else{
      if($rootScope.indexback == 0){
        $scope.cat_filter="";
        $scope.cat_filter_name="All";
        angular.forEach($rootScope.Add_catDataArray, function (items) {
          if (document.getElementById("check_cat_map"+items.cat_id).checked) {
            $scope.cat_filter += items.cat_id+" ";
            $scope.cat_filter_name += items.cat_name+",";
          }
        })
        $rootScope.filter_all($scope.cat_filter_name,".namesub_filter_map0");
      }
      else if($rootScope.indexback == 1){
        $scope.bran_filter="";
        $scope.bran_filter_name="All";
        angular.forEach($rootScope.Add_brandDataArray, function (items) {
          if (document.getElementById("check_bran_map"+items.brand_id).checked) {
            $scope.bran_filter += items.brand_id+" ";
            $scope.bran_filter_name += items.brand_name+",";
          }
        })
        $rootScope.filter_all($scope.bran_filter_name,".namesub_filter_map1");
      }
      else if($rootScope.indexback == 5){
        $scope.hospital_filter="";
        $scope.hospital_filter_name ="All";
        angular.forEach($rootScope.HospitalDataArray, function (items) {
          if (document.getElementById("check_hospital_map"+items.hospital_id).checked) {
            $scope.hospital_filter += items.hospital_id+" ";
            $scope.hospital_filter_name += items.hospital_name+",";
          }
        })
        $rootScope.filter_all($scope.hospital_filter_name,".namesub_filter_map2");

        if($scope.hospital_filter !="" && $scope.hospital_filter != $scope.savetext_hospital_filter){
          $scope.savetext_hospital_filter = $scope.hospital_filter;
          $scope.filter_clear(0,".namesub_filter_map3");
          $scope.filter_clear(1,".namesub_filter_map4");
          $scope.filter_clear(2,".namesub_filter_map5");
          var request = {
            'api_id' : 6,
            'hospital_id' : $scope.hospital_filter
          };
          $rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
            if($rootScope.success){
              if(response.res_code != $rootScope.CODE_SUCCESS){
                console.log(response.res_text);
              }else{
                angular.forEach(response.result, function (items) {console.log(items);
                  $rootScope.buildDataArray.push(items);
                })
              }
            }
          }).error(function(error,status,headers,config){ console.log(error); });
        }
        if($scope.hospital_filter == ""){
          $scope.savetext_hospital_filter = "";
          $scope.filter_clear(0,".namesub_filter_map3");
          $scope.filter_clear(1,".namesub_filter_map4");
          $scope.filter_clear(2,".namesub_filter_map5");
        }

      }
      else if($rootScope.indexback == 2){
        $scope.build_filter="";
        $scope.build_filter_name ="All";
        angular.forEach($rootScope.buildDataArray, function (items) {
          if (document.getElementById("check_build_map"+items.building_id).checked) {
            $scope.build_filter += items.building_id+" ";
            $scope.build_filter_name += items.building_name+",";
          }
        })
        $rootScope.filter_all($scope.build_filter_name,".namesub_filter_map3");
        if($scope.build_filter !="" && $scope.build_filter != $scope.savetext_build_filter){
          $scope.savetext_build_filter = $scope.build_filter;
          $scope.filter_clear(1,".namesub_filter_map4");
          $scope.filter_clear(2,".namesub_filter_map5");
          var request = {
            'api_id' : 6,
            'building_id' : $scope.build_filter
          };
          $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
            if($scope.success){
              if(response.res_code != $scope.CODE_SUCCESS){
                console.log(response.res_text);
              }else{
                angular.forEach(response.result, function (items) {
                  $rootScope.floorDataArray.push(items);
                })
              }
            }
          }).error(function(error,status,headers,config){console.log(error);});
        }
        if($scope.build_filter == ""){
          $scope.savetext_build_filter = "";
          $scope.filter_clear(1,".namesub_filter_map4");
          $scope.filter_clear(2,".namesub_filter_map5");
        }

      }
      else if($rootScope.indexback == 3){
        $scope.floor_filter="";
        $scope.floor_filter_name ="All";
        angular.forEach($rootScope.floorDataArray, function (items) {
          if (document.getElementById("check_floor_map"+items.floor_id).checked) {
            $scope.floor_filter += items.floor_id+" ";
            $scope.floor_filter_name += items.floor_name+",";
          }
        })
        $rootScope.filter_all($scope.floor_filter_name,".namesub_filter_map4");

        if($scope.floor_filter !="" && $scope.floor_filter != $scope.savetext_floor_filter){
          $scope.savetext_floor_filter = $scope.floor_filter;
          $scope.filter_clear(2,".namesub_filter_map5");
          var request = {
            'api_id' : 6,
            'floor_id' : $scope.floor_filter
          };
          $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
            if($scope.success){
              if(response.res_code != $scope.CODE_SUCCESS){
                console.log(response.res_text);
              }else{
                angular.forEach(response.result, function (items) {
                  $rootScope.departDataArray.push(items);
                })
              }
            }
          }).error(function(error,status,headers,config){console.log(error);});
        }
        if($scope.floor_filter == ""){
          $scope.savetext_floor_filter = "";
          $scope.filter_clear(2,".namesub_filter_map5");
        }

      }
      else if($rootScope.indexback == 4){
        $scope.depart_filter="";
        $scope.depart_filter_name="All";
        angular.forEach($rootScope.departDataArray, function (items) {
          if (document.getElementById("check_depart_map"+items.department_id).checked) {
            $scope.depart_filter += items.department_id+" ";
            $scope.depart_filter_name += items.department_name+",";
          }
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter_map5");
      }
    }

    $(".ass_menu1").show();
    $scope.filter_hide(-1);
    $scope.btnback_filter = false;
  };

  $scope.done_filter = function() {
    $scope.popover.hide();
    if($scope.depart_filter != ""){
      $scope.loaddata();
      $("#container").show();
      $("#boxnearshop").show();
      $(".classmap").show();
    }else{
      $("#container").hide();
      $("#boxnearshop").hide();
      $(".classmap").hide();
      $rootScope.toast("กรุณาเลือกแผนก");
      $scope.arraymarker = [];
      $scope.arraymarker2 = [];
    }
  };

  $scope.Clear_map_filter = function() {
    if(!$rootScope.checkmulti_hos){
      if($rootScope.indexback == 0){
        $rootScope.Clear_fuc_map(0);
      }
      else if($rootScope.indexback == 1){
        $rootScope.Clear_fuc_map(1);
      }
      else if($rootScope.indexback == 2){
        $rootScope.Clear_fuc_map(2);
        $rootScope.Clear_fuc_map(3);
        $rootScope.Clear_fuc_map(4);
      }
      else if($rootScope.indexback == 3){
        $rootScope.Clear_fuc_map(3);
        $rootScope.Clear_fuc_map(4);
      }
      else if($rootScope.indexback == 4){
        $rootScope.Clear_fuc_map(4);
      }
    }else{
      if($rootScope.indexback == 0){
        $rootScope.Clear_fuc_map(0);
      }
      else if($rootScope.indexback == 1){
        $rootScope.Clear_fuc_map(1);
      }
      else if($rootScope.indexback == 5){
        $rootScope.Clear_fuc_map(2);
        $rootScope.Clear_fuc_map(3);
        $rootScope.Clear_fuc_map(4);
        $rootScope.Clear_fuc_map(5);
      }
      else if($rootScope.indexback == 2){
        $rootScope.Clear_fuc_map(2);
        $rootScope.Clear_fuc_map(3);
        $rootScope.Clear_fuc_map(4);
      }
      else if($rootScope.indexback == 3){
        $rootScope.Clear_fuc_map(3);
        $rootScope.Clear_fuc_map(4);
      }
      else if($rootScope.indexback == 4){
        $rootScope.Clear_fuc_map(4);
      }
    }
  };


  $scope.filter_hide = function(index) {
    $(".ass_menu1").hide();
    $(".ass_menu2").hide();
    $(".ass_menu3").hide();
    $(".ass_menu4").hide();
    $(".ass_menu5").hide();
    $(".ass_menu6").hide();
    $(".ass_menu7").hide();
    $(".ass_menu"+(index+2)).show();
  };

  if(!$rootScope.checkmulti_hos){
    $scope.DataArrayFilter = [{"name":"Category"},{"name":"Brands"},{"name":"อาคาร"},{"name":"ชั้น"},{"name":"แผนกสินทรัพย์"}];
  }else{
    $scope.DataArrayFilter = [{"name":"Category"},{"name":"Brands"},{"name":"โรงพยาบาล"},{"name":"อาคาร"},{"name":"ชั้น"},{"name":"แผนกสินทรัพย์"}];
  }

  $scope.loaddata = function() {
    $ionicScrollDelegate.scrollTop();
    $scope.arraymarker = [];
    $scope.arraymarker2 = [];
    
    var request = {
      'api_id' : 22,
      'mCount' : 999,
      'hospital_id' : $scope.hospital_filter,
      'cat_id' : $scope.cat_filter,
      'brand_id' : $scope.bran_filter,
      'building_id' : $scope.build_filter,
      'floor_id' : $scope.floor_filter,
      'department_id' : $scope.depart_filter,
      'mSearchs' : $scope.TextSearch,
      'emp_status_allview' : $rootScope.SeeAll,
      'costcenter_id' : $rootScope.costcenter_id
    };
    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          console.log(response.res_text);
        }else{
          $scope.iframeHeight = (window.innerWidth);
          $timeout(function(){

            //if($scope.checksearch_loadmore){
              $scope.noMoreItemsAvailable = false;
              $scope.mCounts = 0;
              $scope.loadMore();
            //}
            //$scope.checksearch_loadmore = true;

            angular.forEach(response.result, function (items) {
              $scope.check_map_url = items.map_image;
              $(".classmap").css("background-color","#FFF");
              angular.forEach(items.inventory, function (items2) {
                $scope.arraymarker.push(items2);
              })
            })
            var refreshIntervalId = setInterval(function(){
              if($scope.wi_top = $("#image_show3").css("width").replace("px", "") != 0){
                //$rootScope.checkorientation(".setori_img_listcheckmap");
                $scope.hi_left = $("#image_show3").css("height").replace("px", "");
                $scope.wi_top = $("#image_show3").css("width").replace("px", "");
                for($scope.i = 0 ; $scope.i < $scope.arraymarker.length ; $scope.i++)
                {
                  $scope.textlocation = $scope.arraymarker[$scope.i].invent_location;
                  $scope.location_marker = $scope.textlocation.split(",");
                  $scope.setlocation_left  = ($scope.hi_left-(40/$scope.index2))*(100-$scope.location_marker[1])/100;
                  $scope.setlocation_top   = ($scope.wi_top-(40/$scope.index2))*($scope.location_marker[0])/100;
                  $("#marker"+$scope.i).css("top",($scope.setlocation_top*$scope.index2)+"px");
                  $("#marker"+$scope.i).css("left",($scope.setlocation_left*$scope.index2)+"px");
                  $("#marker"+$scope.i).css("background-image","url("+$scope.arraymarker[$scope.i].cat_img_icon+")");
                }
                clearInterval(refreshIntervalId);
              }
            },100);
          }, 0);
        }
      }
    }).error(function(error,status,headers,config){console.log(error);});
  }

  $scope.loadMore = function() {

    var request = {
      'api_id' : 22,
      'mCount' : $scope.mCounts,
      'hospital_id' : $scope.hospital_filter,
      'cat_id' : $scope.cat_filter,
      'brand_id' : $scope.bran_filter,
      'building_id' : $scope.build_filter,
      'floor_id' : $scope.floor_filter,
      'department_id' : $scope.depart_filter,
      'mSearchs' : $scope.TextSearch,
      'emp_status_allview' : $rootScope.SeeAll,
      'costcenter_id' : $rootScope.costcenter_id
    };

    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          $scope.noMoreItemsAvailable = true;
          console.log(response.res_text);
        }else{
          angular.forEach(response.result, function (items) {
            angular.forEach(items.inventory, function (items2) {
              $scope.arraymarker2.push(items2);
            })
          })
          $scope.mCounts++;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    }).error(function(error,status,headers,config){console.log(error);});
  };


  if($scope.depart_filter != ""){
    $scope.loaddata();
  }else{
    $("#container").hide();
    $("#boxnearshop").hide();
    $(".classmap").hide();
  }

  $scope.viewModel = {};
  $scope.clearSearch = function() {
    $scope.viewModel.search = '';
    $scope.TextSearch = "";
    $scope.loaddata();
  };
  $scope.Search = function(text) {
    $scope.TextSearch = text;
    //$scope.checksearch_loadmore = false;
    $scope.loaddata();
  };

  $('#boxnearshop').animate({'bottom':'0%'},300);
  $( "#imgslideupnearshop" ).toggle(
    function() {
      locationfake = 0.002;
      $('#boxnearshop').animate({'bottom':'-240px'},300);
      $('.box').animate({'margin-bottom':'0px'},300);
      boolslide_createshop = true;
      document.getElementById("imgslideupnearshop").style.backgroundImage = 'url("img/icon-slideup.png")';
    },
    function() {
      locationfake = 0.006;
      $('#boxnearshop').animate({'bottom':'0%'},300);
      $('.box').animate({'margin-bottom':'0px'},300);
      boolslide_createshop = false;
      document.getElementById("imgslideupnearshop").style.backgroundImage = 'url("img/icon-slidedown.png")';
    }
  );

  $scope.changePage_AssetsDe = function(data){
    $rootScope.checkbackpageinfo = false;
    $scope.checkSeleteTab(1);
    $rootScope.invent_id = data.invent_id;
    $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
    $rootScope.nametitle = data.invent_comp_name;
  }

  $scope.marker_AssetsDe = function(data){
    $rootScope.checkbackpageinfo = false;
    $scope.checkSeleteTab(1);
    $rootScope.invent_id = data.invent_id;
    $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
    $rootScope.nametitle = data.invent_comp_name;
  }



  $scope.btn_zoommap1 = function(index){
    $(".marker_checkmap").hide();
    if(index == 0 && $scope.index2 >= 2){
      $scope.index2--;
    }else if(index == 1 && $scope.index2 <= 2){
      $scope.index2++;
    }
    if($scope.index2 == "1"){
      $("#image_show3").animate({ 'zoom': 1 }, 400);
    }else if($scope.index2 == "2"){
      $("#image_show3").animate({ 'zoom': 2 }, 400);
    }else if($scope.index2 == "3"){
      $("#image_show3").animate({ 'zoom': 3 }, 400);
    }
    $rootScope.zoom_size = $scope.index2;
    setTimeout(function(){
      $ionicScrollDelegate.resize();
    },400);

    $timeout(function(){
      for($scope.i = 0 ; $scope.i < $scope.arraymarker.length ; $scope.i++)
      {
        $scope.textlocation = $scope.arraymarker[$scope.i].invent_location;
        $scope.location_marker = $scope.textlocation.split(",");
        $scope.setlocation_left  = ($("#image_show3").css("height").replace("px", "")-(40/$scope.index2))*(100-$scope.location_marker[1])/100;
        $scope.setlocation_top   = ($("#image_show3").css("width").replace("px", "")-(40/$scope.index2))*($scope.location_marker[0])/100;
        $("#marker"+$scope.i).css("top",($scope.setlocation_top*$scope.index2)+"px");
        $("#marker"+$scope.i).css("left",($scope.setlocation_left*$scope.index2)+"px");
        $("#marker"+$scope.i).css("background-image","url("+$scope.arraymarker[$scope.i].cat_img_icon+")");
        $("#marker"+$scope.i).show();
      }
    }, 400);

  }

  $scope.filter_clear = function (index,text) {
    if(index == 0){
      $scope.savetext_build_filter = "";
      $rootScope.buildDataArray = [];
      $scope.build_filter="";
      $scope.build_filter_name ="All";
      $(text).html($scope.build_filter_name);
    }else if(index == 1){
      $scope.savetext_floor_filter = "";
      $rootScope.floorDataArray = [];
      $scope.floor_filter="";
      $scope.floor_filter_name ="All";
      $(text).html($scope.floor_filter_name);
    }else if(index == 2){
      $rootScope.departDataArray = [];
      $scope.depart_filter="";
      $scope.depart_filter_name ="All";
      $(text).html($scope.depart_filter_name);
    }
  };

  $rootScope.Clear_fuc_map = function(index) {
    if(!$rootScope.checkmulti_hos){
      if(index == 0){
        $scope.cat_filter="";
        $scope.cat_filter_name="All";
        angular.forEach($rootScope.Add_catDataArray, function (items) {
          document.getElementById("check_cat_map"+items.cat_id).checked = false;
        })
        $rootScope.filter_all($scope.cat_filter_name,".namesub_filter_map0");
      }else if(index == 1){
        $scope.bran_filter="";
        $scope.bran_filter_name="All";
        angular.forEach($rootScope.Add_brandDataArray, function (items) {
          document.getElementById("check_bran_map"+items.brand_id).checked = false;
        })
        $rootScope.filter_all($scope.bran_filter_name,".namesub_filter_map1");
      }else if(index == 2){
        $scope.build_filter="";
        $scope.build_filter_name ="All";
        angular.forEach($rootScope.buildDataArray, function (items) {
          document.getElementById("check_build_map"+items.building_id).checked = false;
        })
        $rootScope.filter_all($scope.build_filter_name,".namesub_filter_map2");
      }else if(index == 3){
        $scope.floor_filter="";
        $scope.floor_filter_name ="All";
        angular.forEach($rootScope.floorDataArray, function (items) {
          document.getElementById("check_floor_map"+items.floor_id).checked = false;
        })
        $rootScope.filter_all($scope.floor_filter_name,".namesub_filter_map3");
      }else if(index == 4){
        $scope.depart_filter="";
        $scope.depart_filter_name="All";
        angular.forEach($rootScope.departDataArray, function (items) {
          document.getElementById("check_depart_map"+items.department_id).checked = false;
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter_map4");
      }
    }else{
      if(index == 0){
        $scope.cat_filter="";
        $scope.cat_filter_name="All";
        angular.forEach($rootScope.Add_catDataArray, function (items) {
          document.getElementById("check_cat_map"+items.cat_id).checked = false;
        })
        $rootScope.filter_all($scope.cat_filter_name,".namesub_filter_map0");
      }else if(index == 1){
        $scope.bran_filter="";
        $scope.bran_filter_name="All";
        angular.forEach($rootScope.Add_brandDataArray, function (items) {
          document.getElementById("check_bran_map"+items.brand_id).checked = false;
        })
        $rootScope.filter_all($scope.bran_filter_name,".namesub_filter_map1");
      }else if(index == 2){
        $scope.build_filter="";
        $scope.build_filter_name ="All";
        angular.forEach($rootScope.buildDataArray, function (items) {
          document.getElementById("check_build_map"+items.building_id).checked = false;
        })
        $rootScope.filter_all($scope.build_filter_name,".namesub_filter_map3");
      }else if(index == 3){
        $scope.floor_filter="";
        $scope.floor_filter_name ="All";
        angular.forEach($rootScope.floorDataArray, function (items) {
          document.getElementById("check_floor_map"+items.floor_id).checked = false;
        })
        $rootScope.filter_all($scope.floor_filter_name,".namesub_filter_map4");
      }else if(index == 4){
        $scope.depart_filter="";
        $scope.depart_filter_name="All";
        angular.forEach($rootScope.departDataArray, function (items) {
          document.getElementById("check_depart_map"+items.department_id).checked = false;
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter_map5");
      }else if(index == 5){
        $scope.hospital_filter="";
        $scope.hospital_filter_name ="All";
        angular.forEach($rootScope.HospitalDataArray, function (items) {
          document.getElementById("check_hospital_map"+items.hospital_id).checked = false;
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter_map2");
      }
    }
  }


})
