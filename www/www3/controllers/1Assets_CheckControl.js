angular.module('Phyathai')

.controller('1Assets_CheckControl',function($scope,$state,$http,$rootScope,$cordovaBarcodeScanner,$ionicPopover,$ionicScrollDelegate,$ionicSlideBoxDelegate){

  $scope.cat_filter="";$scope.bran_filter="";$scope.build_filter="";$scope.floor_filter="";$scope.depart_filter="";
  if($rootScope.hospital_id == null){
    $scope.hospital_filter="1";
  }else{
    $scope.hospital_filter=$rootScope.hospital_id;
  }

  $ionicPopover.fromTemplateUrl('templates/filter_ass_main.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.checkone_filter = true;
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
    $scope.filter_hide(-1);
    $scope.btnback_filter = false;
    $scope.text_title_filter_ass = "Filter";
    if($scope.checkone_filter){
      $(".namesub_filter0").html("All");
      $(".namesub_filter1").html("All");
      $(".namesub_filter2").html("All");
      $(".namesub_filter3").html("All");
      $(".namesub_filter4").html("All");
      $(".namesub_filter5").html("All");
      $scope.checkone_filter = false;
    }
    if($rootScope.checkmulti_hos){
      $(".popover").css("height","426px");
    }
  };

  $scope.filter_sub_Ass = function(data,index) {
    if(index == 0){
      $scope.text_title_filter_ass = "Category";
    }else if(index == 1){
      $scope.text_title_filter_ass = "Brands";
    }

    if(!$rootScope.checkmulti_hos){
      if(index == 2){
        $scope.text_title_filter_ass = "อาคาร";
      }else if(index == 3 && $scope.build_filter != ""){
        $scope.text_title_filter_ass = "ชั้น";
      }else if(index == 4 && $scope.floor_filter != ""){
        $scope.text_title_filter_ass = "แผนกสินทรัพย์";
      }
    }else{
      if(index == 2){
        $scope.text_title_filter_ass = "โรงพยาบาล";
      }else if(index == 3 && $scope.hospital_filter != ""){
        $scope.text_title_filter_ass = "อาคาร";
      }else if(index == 4 && $scope.build_filter != ""){
        $scope.text_title_filter_ass = "ชั้น";
      }else if(index == 5 && $scope.floor_filter != ""){
        $scope.text_title_filter_ass = "แผนกสินทรัพย์";
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
      if(index == 3 && ($scope.hospital_filter == "" || $(".namesub_filter2").text() == "All") ){
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
    $scope.text_title_filter_ass = "Filter";
    console.log($rootScope.checkmulti_hos);
    console.log($rootScope.indexback);
    if(!$rootScope.checkmulti_hos){
      if($rootScope.indexback == 0){
        $scope.cat_filter="";
        $scope.cat_filter_name="All";
        angular.forEach($rootScope.Add_catDataArray, function (items) {
          if (document.getElementById("check_cat"+items.cat_id).checked) {
            $scope.cat_filter += items.cat_id+" ";
            $scope.cat_filter_name += items.cat_name+",";
          }
        })
        $rootScope.filter_all($scope.cat_filter_name,".namesub_filter0");
      }
      else if($rootScope.indexback == 1){
        $scope.bran_filter="";
        $scope.bran_filter_name="All";
        angular.forEach($rootScope.Add_brandDataArray, function (items) {
          if (document.getElementById("check_bran"+items.brand_id).checked) {
            $scope.bran_filter += items.brand_id+" ";
            $scope.bran_filter_name += items.brand_name+",";
          }
        })
        $rootScope.filter_all($scope.bran_filter_name,".namesub_filter1");
      }
      else if($rootScope.indexback == 2){
        $scope.build_filter="";
        $scope.build_filter_name ="All";
        angular.forEach($rootScope.buildDataArray, function (items) {
          if (document.getElementById("check_build"+items.building_id).checked) {
            $scope.build_filter += items.building_id+" ";
            $scope.build_filter_name += items.building_name+",";
          }
        })
        $rootScope.filter_all($scope.build_filter_name,".namesub_filter2");

        if($scope.build_filter !="" && $scope.build_filter != $scope.savetext_build_filter){
          $scope.savetext_build_filter = $scope.build_filter;
          $scope.filter_clear(1,".namesub_filter3");
          $scope.filter_clear(2,".namesub_filter4");
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
          $scope.filter_clear(1,".namesub_filter3");
          $scope.filter_clear(2,".namesub_filter4");
        }

      }
      else if($rootScope.indexback == 3){
        $scope.floor_filter="";
        $scope.floor_filter_name ="All";
        angular.forEach($rootScope.floorDataArray, function (items) {
          if (document.getElementById("check_floor"+items.floor_id).checked) {
            $scope.floor_filter += items.floor_id+" ";
            $scope.floor_filter_name += items.floor_name+",";
          }
        })
        $rootScope.filter_all($scope.floor_filter_name,".namesub_filter3");

        if($scope.floor_filter !="" && $scope.floor_filter != $scope.savetext_floor_filter){
          $scope.savetext_floor_filter = $scope.floor_filter;
          $scope.filter_clear(2,".namesub_filter4");
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
          $scope.filter_clear(2,".namesub_filter4");
        }

      }
      else if($rootScope.indexback == 4){
        $scope.depart_filter="";
        $scope.depart_filter_name="All";
        angular.forEach($rootScope.departDataArray, function (items) {
          if (document.getElementById("check_depart"+items.department_id).checked) {
            $scope.depart_filter += items.department_id+" ";
            $scope.depart_filter_name += items.department_name+",";
          }
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter4");
      }
    }else{
      if($rootScope.indexback == 0){
        $scope.cat_filter="";
        $scope.cat_filter_name="All";
        angular.forEach($rootScope.Add_catDataArray, function (items) {
          if (document.getElementById("check_cat"+items.cat_id).checked) {
            $scope.cat_filter += items.cat_id+" ";
            $scope.cat_filter_name += items.cat_name+",";
          }
        })
        $rootScope.filter_all($scope.cat_filter_name,".namesub_filter0");
      }
      else if($rootScope.indexback == 1){
        $scope.bran_filter="";
        $scope.bran_filter_name="All";
        angular.forEach($rootScope.Add_brandDataArray, function (items) {
          if (document.getElementById("check_bran"+items.brand_id).checked) {
            $scope.bran_filter += items.brand_id+" ";
            $scope.bran_filter_name += items.brand_name+",";
          }
        })
        $rootScope.filter_all($scope.bran_filter_name,".namesub_filter1");
      }
      else if($rootScope.indexback == 5){
        console.log($rootScope.HospitalDataArray);
        $scope.hospital_filter="";
        $scope.hospital_filter_name ="All";
        angular.forEach($rootScope.HospitalDataArray, function (items) {
          console.log(document.getElementById("check_hospital"+items.hospital_id).checked+" - "+items.hospital_id);
          if (document.getElementById("check_hospital"+items.hospital_id).checked) {
            $scope.hospital_filter += items.hospital_id+" ";
            $scope.hospital_filter_name += items.hospital_name+",";
          }
        })
        console.log($scope.hospital_filter);
        console.log($scope.hospital_filter_name);
        $rootScope.filter_all($scope.hospital_filter_name,".namesub_filter2");

        if($scope.hospital_filter !="" && $scope.hospital_filter != $scope.savetext_hospital_filter){
          $scope.savetext_hospital_filter = $scope.hospital_filter;
          $scope.filter_clear(0,".namesub_filter3");
          $scope.filter_clear(1,".namesub_filter4");
          $scope.filter_clear(2,".namesub_filter5");
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
          $scope.filter_clear(0,".namesub_filter3");
          $scope.filter_clear(1,".namesub_filter4");
          $scope.filter_clear(2,".namesub_filter5");
        }

      }
      else if($rootScope.indexback == 2){
        $scope.build_filter="";
        $scope.build_filter_name ="All";
        angular.forEach($rootScope.buildDataArray, function (items) {
          if (document.getElementById("check_build"+items.building_id).checked) {
            $scope.build_filter += items.building_id+" ";
            $scope.build_filter_name += items.building_name+",";
          }
        })
        $rootScope.filter_all($scope.build_filter_name,".namesub_filter3");
        if($scope.build_filter !="" && $scope.build_filter != $scope.savetext_build_filter){
          $scope.savetext_build_filter = $scope.build_filter;
          $scope.filter_clear(1,".namesub_filter4");
          $scope.filter_clear(2,".namesub_filter5");
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
          $scope.filter_clear(1,".namesub_filter4");
          $scope.filter_clear(2,".namesub_filter5");
        }

      }
      else if($rootScope.indexback == 3){
        $scope.floor_filter="";
        $scope.floor_filter_name ="All";
        angular.forEach($rootScope.floorDataArray, function (items) {
          if (document.getElementById("check_floor"+items.floor_id).checked) {
            $scope.floor_filter += items.floor_id+" ";
            $scope.floor_filter_name += items.floor_name+",";
          }
        })
        $rootScope.filter_all($scope.floor_filter_name,".namesub_filter4");

        if($scope.floor_filter !="" && $scope.floor_filter != $scope.savetext_floor_filter){
          $scope.savetext_floor_filter = $scope.floor_filter;
          $scope.filter_clear(2,".namesub_filter5");
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
          $scope.filter_clear(2,".namesub_filter5");
        }

      }
      else if($rootScope.indexback == 4){
        $scope.depart_filter="";
        $scope.depart_filter_name="All";
        angular.forEach($rootScope.departDataArray, function (items) {
          if (document.getElementById("check_depart"+items.department_id).checked) {
            $scope.depart_filter += items.department_id+" ";
            $scope.depart_filter_name += items.department_name+",";
          }
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter5");
      }
    }
    $(".ass_menu1").show();
    $scope.filter_hide(-1);
    $scope.btnback_filter = false;
  };
  $scope.done_filter = function() {
    $scope.popover.hide();
    $scope.noMoreItemsAvailable = false;
    $rootScope.doRefresh_list();
  };


  $scope.Clear_filter = function() {
    if(!$rootScope.checkmulti_hos){
      if($rootScope.indexback == 0){
        $rootScope.Clear_fuc(0);
      }
      else if($rootScope.indexback == 1){
        $rootScope.Clear_fuc(1);
      }
      else if($rootScope.indexback == 2){
        $rootScope.Clear_fuc(2);
        $rootScope.Clear_fuc(3);
        $rootScope.Clear_fuc(4);
      }
      else if($rootScope.indexback == 3){
        $rootScope.Clear_fuc(3);
        $rootScope.Clear_fuc(4);
      }
      else if($rootScope.indexback == 4){
        $rootScope.Clear_fuc(4);
      }
    }else{
      if($rootScope.indexback == 0){
        $rootScope.Clear_fuc(0);
      }
      else if($rootScope.indexback == 1){
        $rootScope.Clear_fuc(1);
      }
      else if($rootScope.indexback == 5){
        $rootScope.Clear_fuc(2);
        $rootScope.Clear_fuc(3);
        $rootScope.Clear_fuc(4);
        $rootScope.Clear_fuc(5);
      }
      else if($rootScope.indexback == 2){
        $rootScope.Clear_fuc(2);
        $rootScope.Clear_fuc(3);
        $rootScope.Clear_fuc(4);
      }
      else if($rootScope.indexback == 3){
        $rootScope.Clear_fuc(3);
        $rootScope.Clear_fuc(4);
      }
      else if($rootScope.indexback == 4){
        $rootScope.Clear_fuc(4);
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

  var TextSearch = "";
  $scope.InventoryDataArray = [];
  $scope.mCounts = 0;

  $scope.$on("$ionicView.enter", function () {
    if($scope.InventoryDataArray.length > 0){
      $rootScope.doRefresh_list();
    }
  });
  $rootScope.doRefresh_list = function() {
    $scope.noMoreItemsAvailable = false;
    var request = {
      'api_id' : 1,
      'mCount' : 0,
      'mSearchs' : TextSearch,
      'hospital_id' : $scope.hospital_filter.replace(" ", ","),
      'cat_id' : $scope.cat_filter,
      'brand_id' : $scope.bran_filter,
      'building_id' : $scope.build_filter,
      'floor_id' : $scope.floor_filter,
      'department_id' : $scope.depart_filter,
      'emp_status_allview' : $rootScope.SeeAll,
      'costcenter_id' : $rootScope.costcenter_id
    };
    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          console.log(response.res_text);
          $scope.InventoryDataArray = [];
        }else{ console.log(response.res_text);
          $scope.InventoryDataArray = [];
          $scope.mCounts = 1;
          angular.forEach(response.result, function (items) {
            $scope.InventoryDataArray.push(items);
          })
          //$rootScope.checkorientation(".setori_img_listass");
        }
      }
    }).error(function(error,status,headers,config){
      console.log(error);
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };


  $scope.loadMore = function() {
    var request = {
      'api_id' : 1,
      'mCount' : $scope.mCounts,
      'mSearchs' : TextSearch,
      'hospital_id' : $scope.hospital_filter.replace(" ", ","),
      'cat_id' : $scope.cat_filter,
      'brand_id' : $scope.bran_filter,
      'building_id' : $scope.build_filter,
      'floor_id' : $scope.floor_filter,
      'department_id' : $scope.depart_filter,
      'emp_status_allview' : $rootScope.SeeAll,
      'costcenter_id' : $rootScope.costcenter_id
    };

    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          $scope.noMoreItemsAvailable = true;
          console.log(response.res_text);
        }else{ //console.log(response.res_text);
          angular.forEach(response.result, function (items) {
            $scope.InventoryDataArray.push(items);
          })
          $scope.mCounts++;
          setTimeout(function(){
            //$rootScope.checkorientation(".setori_img_listass");
          },100);

        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    }).error(function(error,status,headers,config){console.log(error);});
  };

  $scope.viewModel = {};
  $scope.clearSearch = function() {
    $scope.viewModel.search = '';
    TextSearch = "";
    $rootScope.doRefresh_list();
  };
  $scope.Search = function(text) {
    TextSearch = text;
    $rootScope.doRefresh_list();
    $ionicScrollDelegate.scrollTop();
    $ionicScrollDelegate.resize();
  };

  $scope.changePage_AssetsDe = function(data){
    $rootScope.checkbackpageinfo = true;
    $rootScope.checkreset_banner = true;
    $scope.checkSeleteTab(1);
    $rootScope.invent_id = data.invent_id
    $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');

  }


  $scope.btncreate = function(){
    $rootScope.checkAddAss = true;
    $rootScope.btn_check_addass = false;
    $rootScope.btn_check_addass_new = true;
    $rootScope.checkconnect_statego('app.Create_assets');
  }

  $scope.btnqrc = function(){
    $cordovaBarcodeScanner.scan().then(function(barcodeData) {
      if(barcodeData.text !=""){
        var request = {
          'api_id' : 27,
          'invent_id' : barcodeData.text,
          'hospital_id' : $rootScope.hospital_id,
          'emp_status_allview' : $rootScope.SeeAll,
          'costcenter_id' : $rootScope.costcenter_id
        };
        $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
          if($scope.success){
            if(response.res_code != $scope.CODE_SUCCESS){
              $rootScope.toast("ไม่พบ ASSETS");
            }else{
              $rootScope.checkbackpageinfo = true;
              $rootScope.checkreset_banner = true;
              $scope.checkSeleteTab(1);
              $rootScope.invent_id = barcodeData.text;
              $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
            }
          }
        }).error(function(error,status,headers,config){console.log(error);});
      }
    }, function(error) {
      // An error occurred
    });

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


  $rootScope.Clear_fuc = function(index) {
    if(!$rootScope.checkmulti_hos){
      if(index == 0){
        $scope.cat_filter="";
        $scope.cat_filter_name="All";
        angular.forEach($rootScope.Add_catDataArray, function (items) {
          document.getElementById("check_cat"+items.cat_id).checked = false;
        })
        $rootScope.filter_all($scope.cat_filter_name,".namesub_filter0");
      }else if(index == 1){
        $scope.bran_filter="";
        $scope.bran_filter_name="All";
        angular.forEach($rootScope.Add_brandDataArray, function (items) {
          document.getElementById("check_bran"+items.brand_id).checked = false;
        })
        $rootScope.filter_all($scope.bran_filter_name,".namesub_filter1");
      }else if(index == 2){
        $scope.build_filter="";
        $scope.build_filter_name ="All";
        angular.forEach($rootScope.buildDataArray, function (items) {
          document.getElementById("check_build"+items.building_id).checked = false;
        })
        $rootScope.filter_all($scope.build_filter_name,".namesub_filter2");
      }else if(index == 3){
        $scope.floor_filter="";
        $scope.floor_filter_name ="All";
        angular.forEach($rootScope.floorDataArray, function (items) {
          document.getElementById("check_floor"+items.floor_id).checked = false;
        })
        $rootScope.filter_all($scope.floor_filter_name,".namesub_filter3");
      }else if(index == 4){
        $scope.depart_filter="";
        $scope.depart_filter_name="All";
        angular.forEach($rootScope.departDataArray, function (items) {
          document.getElementById("check_depart"+items.department_id).checked = false;
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter4");
      }
    }else{
      if(index == 0){
        $scope.cat_filter="";
        $scope.cat_filter_name="All";
        angular.forEach($rootScope.Add_catDataArray, function (items) {
          document.getElementById("check_cat"+items.cat_id).checked = false;
        })
        $rootScope.filter_all($scope.cat_filter_name,".namesub_filter0");
      }else if(index == 1){
        $scope.bran_filter="";
        $scope.bran_filter_name="All";
        angular.forEach($rootScope.Add_brandDataArray, function (items) {
          document.getElementById("check_bran"+items.brand_id).checked = false;
        })
        $rootScope.filter_all($scope.bran_filter_name,".namesub_filter1");
      }else if(index == 2){
        $scope.build_filter="";
        $scope.build_filter_name ="All";
        angular.forEach($rootScope.buildDataArray, function (items) {
          document.getElementById("check_build"+items.building_id).checked = false;
        })
        $rootScope.filter_all($scope.build_filter_name,".namesub_filter3");
      }else if(index == 3){
        $scope.floor_filter="";
        $scope.floor_filter_name ="All";
        angular.forEach($rootScope.floorDataArray, function (items) {
          document.getElementById("check_floor"+items.floor_id).checked = false;
        })
        $rootScope.filter_all($scope.floor_filter_name,".namesub_filter4");
      }else if(index == 4){
        $scope.depart_filter="";
        $scope.depart_filter_name="All";
        angular.forEach($rootScope.departDataArray, function (items) {
          document.getElementById("check_depart"+items.department_id).checked = false;
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter5");
      }else if(index == 5){
        $scope.hospital_filter="";
        $scope.hospital_filter_name ="All";
        angular.forEach($rootScope.HospitalDataArray, function (items) {
          document.getElementById("check_hospital"+items.hospital_id).checked = false;
        })
        $rootScope.filter_all($scope.depart_filter_name,".namesub_filter2");
      }
    }
  }


})
