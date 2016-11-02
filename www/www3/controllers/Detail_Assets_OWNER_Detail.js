angular.module('Phyathai')

.controller('Detail_Assets_OWNER_DetailControl',function($scope,$state,$stateParams,$ionicPopup,$rootScope,$ionicPlatform,$location,$ionicScrollDelegate){

  $scope.checkhidepiktime = false;
  $scope.checkhidepiktime2 = false;
  var refreshIntervalId = setInterval(function(){
    if ($location.path() === "/tab/Detail_Assets/Detail_Assets_OWNER_Detail" || $location.path() === "Detail_Assets_OWNER_Detail") {
      if(!$scope.onezoneDatepicker1.showDatepicker && $scope.checkhidepiktime){
        setTimeout(function(){
          $ionicScrollDelegate.resize();
          $scope.checkhidepiktime = false;
        },500);

      }

      if(!$scope.onezoneDatepicker2.showDatepicker && $scope.checkhidepiktime2){
        setTimeout(function(){
          $ionicScrollDelegate.resize();
          $scope.checkhidepiktime2 = false;
        },500);

      }
    }else{
      clearInterval(refreshIntervalId);
    }
  },500);
  var date = new Date();
  $rootScope.split_startdate = $rootScope.date_ownerdetail.split("/");
  $scope.onezoneDatepicker1 = {
    date: new Date($rootScope.split_startdate[2],($rootScope.split_startdate[1]-1),$rootScope.split_startdate[0]),
    mondayFirst: false,
    startDate: new Date(1989, 1, 26),
    endDate: new Date(2024, 1, 26),
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    disableDates: false,
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    callback: function callback_Datepic1(date) {
      setTimeout(function(){
        $scope.textdateedit_start = $(".dateselete_edit1_get").text();
        var confirmPopup = $ionicPopup.confirm({
          title: $scope.TitleDialog,
          template: $scope.DatailDialog_editdate1
        });

        confirmPopup.then(function (res) {
          if (res) {

            var textdeta = $(".dateselete_edit1_get").text().split("/");
            var dateS1 = new Date((textdeta[2]),(textdeta[1]-1),textdeta[0]);

            var textdeta2 = $(".dateselete_edit2_get").text().split("/");
            var dateS2 = new Date((textdeta2[2]),(textdeta2[1]-1),textdeta2[0]);

            var textdeta3="",dateS3="";
            try{
              textdeta3 = $rootScope.savetext_checkstop2.split("/");
              dateS3 = new Date((textdeta3[2]),(textdeta3[1]-1),textdeta3[0]);
            }catch(error){}

            if(dateS1 <= dateS2 || $(".date_se2").text().trim() == "00/00/0000"){
              if(dateS1 >= dateS3 || $rootScope.savelenge == 1){
                var request = {
                  'api_id' : 28,
                  'invent_own_updateby' : $rootScope.emps_id,
                  'invent_owner_id' : $rootScope.invent_owner_id,
                  'invent_own_start' : $(".dateselete_edit1_sent").text()
                };
                $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
                  if($scope.success){
                    if(response.res_code != $scope.CODE_SUCCESS){
                      console.log(response.res_text);
                    }else{
                      $rootScope.savelog($rootScope.emps_id,"AssetsMangement",2,$rootScope.invent_owner_id);
                      $scope.date_ownerdetail = $scope.textdateedit_start;
                    }
                  }
                }).error(function(error,status,headers,config){console.log(error);});
              }else{
                $rootScope.toast("กรุณาเลือกวันเริ่มต้น หลังวันสิ้นสุดของผู้ดูแลคนเก่า");
              }
            }else{
              $rootScope.toast("กรุณาเลือกวันเริ่มต้น ก่อนวันสิ้นสุด");
            }
            $ionicScrollDelegate.resize();
          } else {
            $ionicScrollDelegate.resize();
            console.log('ยกเลิก');
          }
        });
      },250);
    }
  };

  $scope.showDatepicker1 = function () {
    $scope.checkhidepiktime = true;
    $rootScope.fakeloadiong();
    $scope.onezoneDatepicker1.showDatepicker = true;
  };

  $rootScope.split_stopdate = $rootScope.date_st_ownerdetail.split("/");
  if($rootScope.split_stopdate[2] != "0000"){
    $scope.datess = new Date($rootScope.split_stopdate[2],($rootScope.split_stopdate[1]-1),$rootScope.split_stopdate[0]);
  }else{
    $scope.datess = date;
  }
  $scope.onezoneDatepicker2 = {
    date: $scope.datess,
    mondayFirst: false,
    startDate: new Date(1989, 1, 26),
    endDate: new Date(2024, 1, 26),
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    disableDates: false,
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    callback: function (date) {
      setTimeout(function(){
        $scope.textdateedit_stop = $(".dateselete_edit2_get").text();
        var confirmPopup = $ionicPopup.confirm({
          title: $scope.TitleDialog,
          template: $scope.DatailDialog_editdata2
        });

        confirmPopup.then(function (res) {
          if (res) {

            var textdeta = $(".dateselete_edit1_get").text().split("/");
            var dateS1 = new Date((textdeta[2]),(textdeta[1]-1),textdeta[0]);

            var textdeta2 = $(".dateselete_edit2_get").text().split("/");
            var dateS2 = new Date((textdeta2[2]),(textdeta2[1]-1),textdeta2[0]);


            if(dateS1 <= dateS2){
              var request = {
                'api_id' : 28,
                'invent_own_updateby' : $rootScope.emps_id,
                'invent_owner_id' : $rootScope.invent_owner_id,
                'invent_own_stop' : $(".dateselete_edit2_sent").text()
              };
              $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
                if($scope.success){
                  if(response.res_code != $scope.CODE_SUCCESS){
                    console.log(response.res_text);
                  }else{
                    $rootScope.savelog($rootScope.emps_id,"AssetsMangement",2,$rootScope.invent_owner_id);
                    $scope.date_st_ownerdetail = $scope.textdateedit_stop;
                  }
                }
              }).error(function(error,status,headers,config){console.log(error);});
            }else{
              $rootScope.toast("กรุณาเลือกวันสิ้นสุด หลังจากวันเริ่มต้น");
            }
            $ionicScrollDelegate.resize();
          } else {
            console.log('ยกเลิก');
            $ionicScrollDelegate.resize();
          }
        });
      },250);
    }
  };
  $scope.showDatepicker2 = function () {
    $scope.checkhidepiktime2 = true;
    $rootScope.fakeloadiong();
    $scope.onezoneDatepicker2.showDatepicker = true;
  };


  $rootScope.back_listowner = function(){
    $scope.checkSeleteTab(3);
  }

  $scope.btn_openphoto_card = function(){

    $.ajax({
      type: 'HEAD',
      url: $rootScope.img_empclick,
      success: function() {
        PhotoViewer.show($rootScope.img_empclick, '');
      },
      error: function() {
        $rootScope.toast("ไม่พบรูปบัตรพนักงาน");
      }
    });

  }

})
