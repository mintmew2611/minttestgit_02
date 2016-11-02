angular.module('Phyathai')

.controller('AddOwnerControl',function($window,$scope,$state,$rootScope,$ionicPopup,$ionicPopover,$ionicScrollDelegate){

  $scope.position_filter="";$scope.departs_filter="";

  $ionicPopover.fromTemplateUrl('templates/filter_owner_main.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.checkone_filter_owner = true;
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
    $scope.filter_hide(-1);
    $scope.btnback_filter = false;
    if($scope.checkone_filter_owner){
      $(".namesub_filter_owner0").html("All");
      $(".namesub_filter_owner1").html("All");
      $scope.checkone_filter_owner = false;
    }
  };

  $scope.filter_sub_Ass = function(data,index) {
    $rootScope.indexback = index;
    $scope.filter_hide(index);
    $scope.btnback_filter = true;
  };
  $scope.back_filter = function() {

    if($rootScope.indexback == 0){
      $scope.position_filter="";
      $scope.position_filter_name="All";
      angular.forEach($rootScope.PositionDataArray, function (items) {
        if (document.getElementById("check_position"+items.position_id).checked) {
          $scope.position_filter += items.position_id+" ";
          $scope.position_filter_name += items.position_name+",";
        }
      })
      $rootScope.filter_all($scope.position_filter_name,".namesub_filter_owner0");
    }else if($rootScope.indexback == 1){
      $scope.departs_filter="";
      $scope.departs_filter_name="All";
      angular.forEach($rootScope.Depart_empDataArray, function (items) {
        if (document.getElementById("check_departs"+items.emp_depart_id).checked) {
          $scope.departs_filter += items.emp_depart_id+" ";
          $scope.departs_filter_name += items.emp_depart_name+",";
        }
      })
      $rootScope.filter_all($scope.departs_filter_name,".namesub_filter_owner1");
    }

    $(".owner_menu1").show();
    $scope.filter_hide(-1);
    $scope.btnback_filter = false;
  };


  $scope.done_filter = function() {
    $scope.sorts = "";
    $scope.popover.hide();
    if (document.getElementById("check_sort1").checked) {
      $scope.sorts = "1";
    }else if (document.getElementById("check_sort2").checked) {
      $scope.sorts = "2";
    }else if (document.getElementById("check_sort3").checked) {
      $scope.sorts = "3";
    }else if (document.getElementById("check_sort4").checked) {
      $scope.sorts = "4";
    }

    $scope.noMoreItemsAvailable = false;
    $scope.doRefresh();

  };


  $scope.filter_hide = function(index) {
    $(".owner_menu1").hide();
    $(".owner_menu2").hide();
    $(".owner_menu3").hide();
    $(".owner_menu"+(index+2)).show();
  };

  $scope.DataArrayFilter = [{"name":"ตำแหน่ง"},{"name":"แผนกสังกัด"}];


  $rootScope.Back_2 = function(){
    if($rootScope.btn_add_owner){
      $scope.checkSeleteTab(3);
      $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_OWNER');
    }else{
      $rootScope.checkconnect_statego('AssMapShow_Cre',{ updater: $rootScope.randomtext_re });
      //$window.history.back();
    }

  }

  $scope.next_add_map = function(){
    $rootScope.btn_check_map = true;
    $rootScope.title_check_map = "ADD MAP";
    $rootScope.checkconnect_statego('AddMap');
  }

  $scope.next_add_owner_fin = function(){
    $scope.checkSeleteTab(3);
    $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_OWNER');
  }




  var TextSearch = "";
  $scope.OwnerDataArray = [];
  var mCounts = 0;

  $scope.doRefresh = function() {
    $scope.noMoreItemsAvailable = false;
    var request = {
      'api_id' : 8,
      'mCount' : 0,
      'mSearchs' : TextSearch,
      'sorts' : $scope.sorts,
      'position_id' : $scope.position_filter,
      'department_id' : $scope.departs_filter,
      'emp_status_allview' : $rootScope.SeeAll,
      'costcenter_id' : $rootScope.costcenter_id
    };

    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          console.log(response.res_text);
          $scope.OwnerDataArray = [];
        }else{console.log(response.status);
          $scope.OwnerDataArray = [];
          mCounts = 1;
          angular.forEach(response.result, function (items) {
            $scope.OwnerDataArray.push(items);
          })
          mCounts++;
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
      'api_id' : 8,
      'mCount' : mCounts,
      'mSearchs' : TextSearch,
      'sorts' : $scope.sorts,
      'position_id' : $scope.position_filter,
      'department_id' : $scope.departs_filter,
      'emp_status_allview' : $rootScope.SeeAll,
      'costcenter_id' : $rootScope.costcenter_id
    };

    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          $scope.noMoreItemsAvailable = true;
          console.log(response.res_text);
        }else{  console.log(response.res_text);
          angular.forEach(response.result, function (items) {
            $scope.OwnerDataArray.push(items);
          })
          mCounts++;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    }).error(function(error,status,headers,config){
      console.log(error);
    });

  };

  $scope.viewModel = {};
  $scope.clearSearch = function() {
    $scope.viewModel.search = '';
    TextSearch = "";
    $scope.doRefresh();
  };
  $scope.Search = function(text) {
    TextSearch = text;
    $scope.doRefresh();
    $ionicScrollDelegate.scrollTop();
    $ionicScrollDelegate.resize();
  };

  $scope.Add_owner_click = function(data){

    if($rootScope.btn_add_owner) {

      var request = {
        'api_id': 9,
        'invent_id': $rootScope.invent_id,
        'emp_id': data.emp_id,
        'emps_id': $rootScope.emps_id
      };

      var confirmPopup = $ionicPopup.confirm({
        title: $scope.TitleDialog,
        template: $scope.DatailDialog_addowner
      });

      confirmPopup.then(function (res) {
        if (res) {
          $scope.ServiceThread($scope.Base_URL, request).success(function (response, status, headers, config) {
            if ($scope.success) {
              if (response.res_code != $scope.CODE_SUCCESS) {
                console.log(response.res_text);
              } else {console.log(response.res_text);
                $rootScope.savelog($rootScope.emps_id,"AssetsMangement",1,$rootScope.invent_id);
                $scope.checkSeleteTab(3);
                $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_OWNER', {
                  invent_id: $rootScope.invent_id
                });
              }
              $scope.$broadcast('scroll.infiniteScrollComplete');
            }
          }).error(function (error, status, headers, config) {
            console.log(error);
          });
        } else {
          console.log('ยกเลิก');
        }
      });

    }else{

      /*
      var confirmPopup = $ionicPopup.confirm({
      title: $scope.TitleDialog,
      template: $scope.DatailDialog_addAss
    });

    confirmPopup.then(function (res) {
    if (res) {
    var request = {
    'api_id': 5,
    'cat_id': $rootScope.global_text1,'band_id': $rootScope.global_text2,
    'invent_model': $rootScope.global_text3,'invent_comp_name': $rootScope.global_text4,
    'invent_wifi_mac_address': $rootScope.global_text5,'invent_mac_ethernet': $rootScope.global_text6
    ,'invent_asset_no': $rootScope.global_text7,'invent_serial_no': $rootScope.global_text8
    ,'invent_status': $rootScope.global_text11,'hospital_id': $rootScope.hospital_id,
    'building_id': $rootScope.global_text12,'floor_id':$rootScope.global_text13,
    'department_id':$rootScope.global_text14,'invent_expire_date': "",
    'invent_waranty_date': $rootScope.global_text9,'invent_buy_date': $rootScope.global_text10,
    'invent_remark': $rootScope.global_text15,'invent_create_by': $rootScope.emps_id
  };
  $scope.ServiceThread($scope.Base_URL, request).success(function (response, status, headers, config) {
  if ($scope.success) {
  if (response.res_code != $scope.CODE_SUCCESS) {
  console.log(response.res_text);
} else {
$rootScope.invent_id = response.result;
$scope.count_p = 0;
////////////////////////////////////////////////////////////////////////////////////////////////
var request = {
'api_id': 9,
'invent_id': $rootScope.invent_id,
'emp_id': data.emp_id
};
$scope.ServiceThread($scope.Base_URL, request).success(function (response, status, headers, config) {
if ($scope.success) {
if (response.res_code != $scope.CODE_SUCCESS) {
console.log(response.res_text);
} else {$scope.count_p++;}
$scope.$broadcast('scroll.infiniteScrollComplete');
}
}).error(function (error, status, headers, config) {
console.log(error);
});
////////////////////////////////////////////////////////////////////////////////////////////////
var request = {
'api_id' : 7,
'invent_id' : $rootScope.invent_id,
'invent_location' : $rootScope.totelleft_per+","+$rootScope.toteltop_per
};
$scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
if($scope.success){
if(response.res_code != $scope.CODE_SUCCESS){
console.log(response.res_text);
}else{$scope.count_p++;}
}
}).error(function(error,status,headers,config){
console.log(error);
});
////////////////////////////////////////////////////////////////////////////////////////////////
for($scope.i = 0 ; $scope.i < $rootScope.Add_PhotoDataArray.length ;$scope.i++)
{
var request = {
'api_id' : 11,
'invent_id' : $rootScope.invent_id,
'invent_imgurl' : $rootScope.Add_PhotoDataArray[$scope.i]
};
$scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
if($scope.success){
if(response.res_code != $scope.CODE_SUCCESS){
console.log(response.res_text);
}else{$scope.count_p++;}
}
}).error(function(error,status,headers,config){
console.log(error);
});
}
////////////////////////////////////////////////////////////////////////////////////////////////
if(($rootScope.pdf+"") !="") {
var request = {
'api_id': 17,
'invent_id': $rootScope.invent_id,
'invent_capex': $rootScope.pdf
};
$scope.ServiceThread($scope.Base_URL, request).success(function (response, status, headers, config) {
if ($scope.success) {
if (response.res_code != $scope.CODE_SUCCESS) {
console.log(response.res_text);
}else{$scope.count_p++; }
}
}).error(function (error, status, headers, config) {
console.log(error);
});
}
////////////////////////////////////////////////////////////////////////////////////////////////
$scope.countupload = $rootScope.Add_PhotoDataArray.length + 2;
if(($rootScope.pdf+"") !="") {
$scope.countupload++;
}

var refreshIntervalId = setInterval(function(){
if($scope.countupload == $scope.count_p){
$scope.checkSeleteTab(1);
$state.go('tabs.Detail_Assets.Detail_Assets_INFO', {
invent_id: $rootScope.invent_id
});
$rootScope.nametitle = $rootScope.global_text4;
$rootScope.pdf = "";
$rootScope.Add_PhotoDataArray = [];
clearInterval(refreshIntervalId);
}
},300);

}
$scope.$broadcast('scroll.infiniteScrollComplete');
}
}).error(function (error, status, headers, config) {
console.log(error);
});

} else {
console.log('ยกเลิก');
}
});
*/


}


}


})
