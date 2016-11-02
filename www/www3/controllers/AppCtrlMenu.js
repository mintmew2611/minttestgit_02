angular.module('Phyathai')

.controller('AppCtrl',function($scope,$state,$stateParams,$ionicPopup,$rootScope,$cordovaBarcodeScanner,$ionicHistory){

  $scope.btn_check_creass = function(){
    $rootScope.btn_check_addass = false;
    $rootScope.btn_check_addass_new = false;
    $rootScope.randomtext_re = Math.random();
    $rootScope.checkconnect_statego("app.Create_assets", { updater: $rootScope.randomtext_re });
  }


  $scope.btn_scanqrc = function(){
    $cordovaBarcodeScanner.scan().then(function(barcodeData) {console.log(barcodeData.text);
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
              console.log($rootScope.invent_id);
              $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
            }
          }
        }).error(function(error,status,headers,config){console.log(error);});

      }
    }, function(error) {
      // An error occurred
    });
  }

  $scope.btn_logout = function (){

    var confirmPopup = $ionicPopup.confirm({
      title: $scope.TitleDialog,
      template: $scope.DatailDialog_logout
    });

    confirmPopup.then(function(res) {
      if(res) {
        $rootScope.db.transaction(function(tx){
          setTimeout(function(){
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $(".popover-backdrop").html("");
            $("#username_login").val('');
            $("#password_login").val('');
          },500);

          $rootScope.checkconnect_statego('Login');
          tx.executeSql("DELETE FROM login");
        });
      } else {
        console.log('ยกเลิก');
      }
    });

  }

})
