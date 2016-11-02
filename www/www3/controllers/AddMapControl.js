angular.module('Phyathai')


.controller('AddMapControl',function($scope,$state,$rootScope,$ionicPopup,$stateParams){

  var textSelete1="",textSelete2="",textSelete3="";
  $scope.Ass_showSelect1 = function(mySelect) {
    textSelete1 = mySelect;
    textSelete2 = "";
    textSelete3 = "";
    $rootScope.EditfloorDataArray = [];
    $rootScope.EditDepartDataArray = [];
    $rootScope.Ass_namefloor = "";
    $rootScope.Ass_namedepart = "";
    var request = {
      'api_id' : 6,
      'building_id' : textSelete1
    };
    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          console.log(response.res_text);
        }else{
          angular.forEach(response.result, function (items) {
            $rootScope.EditfloorDataArray.push(items);
          })
        }
      }
    }).error(function(error,status,headers,config){
      console.log(error);
    });

  }

  $scope.Ass_showSelect2 = function(mySelect) {
    textSelete2 = mySelect;
    textSelete3 = "";
    $rootScope.EditDepartDataArray = [];
    $rootScope.Ass_namedepart = "";
    var request = {
      'api_id' : 6,
      'floor_id' : textSelete2
    };
    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          console.log(response.res_text);
        }else{
          angular.forEach(response.result, function (items) {
            $rootScope.EditDepartDataArray.push(items);
          })
        }
      }
    }).error(function(error,status,headers,config){
      console.log(error);
    });
  }

  $scope.Ass_showSelect3 = function(mySelect) {
    textSelete3 = mySelect;
  }

  $rootScope.Back_3 = function(){
    if($rootScope.btn_check_map){
      $rootScope.checkconnect_statego('AddOwner');
    }else{
      $scope.checkSeleteTab(4);
      $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_MAP');
    }

  }

  $scope.save_fin = function(){

    if(textSelete1 == ""){ textSelete1 = $rootScope.Ass_namebuild}
    if(textSelete2 == ""){ textSelete2 = $rootScope.Ass_namefloor}
    if(textSelete3 == ""){ textSelete3 = $rootScope.Ass_namedepart}

    if((textSelete1 == null) || (textSelete3 != null && textSelete3 != "")){

      var request = {
        'api_id' : 3,
        'invent_id' : $rootScope.invent_id,
        'building_id' : textSelete1,
        'floor_id' : textSelete2,
        'department_id' : textSelete3
      };

      var confirmPopup = $ionicPopup.confirm({
        title: $scope.TitleDialog,
        template: $scope.DatailDialog_editmap
      });

      confirmPopup.then(function(res) {
        if(res) {
          $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
            if($scope.success){
              if(response.res_code != $scope.CODE_SUCCESS){
                console.log(response.res_text);
              }else{
                $rootScope.savelog($rootScope.emps_id,"AssetsMangement",2,$rootScope.invent_id);
                $scope.checkSeleteTab(4);
                $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_MAP');
                $rootScope.checkbtnshowmap = true;
              }
            }
          }).error(function(error,status,headers,config){
            console.log(error);
          });
        } else {
          console.log('ยกเลิก');
        }
      });

    }else{
      $rootScope.toast('กรุณากรอกข้อมูลให้ครบถ้วน');
    }

  }



})
