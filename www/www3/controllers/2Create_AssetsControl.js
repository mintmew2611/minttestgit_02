angular.module('Phyathai')

.controller('2Create_AssetsControl',function($ionicHistory,$timeout,$scope,$state,$ionicActionSheet,
  $rootScope,$stateParams, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup,$ionicScrollDelegate,$window,$ionicLoading){

    $scope.textfake = "NaN:undefinedundefined:undefinedundefined:undefinedundefined:undefinedundefined:undefinedundefined";
    setTimeout(function(){
      $('#intro select').zelect({ placeholder:'' });
      $(".zelected").html('');
      $(".zelected").click(function(){
        //$(".divscoll_add").css("overflow","");
      });
    },0);

    var textbuildSelete1="",textbuildSelete2="",textbuildSelete3="";
    $rootScope.global_text26 = "";
    $rootScope.global_text27 = "";
    $rootScope.AddAss_Select1 = "";
    $rootScope.AddAss_Select2 = "";
    $rootScope.Add_buildDataArray = [];
    $rootScope.Add_floorDataArray = [];
    $rootScope.Add_departDataArray = [];
    $rootScope.Add_PhotoDataArray = [];
    $rootScope.Addbuild_Select1 = "";
    $rootScope.Addbuild_Select2 = "";
    $rootScope.Addbuild_Select3 = "";
    $rootScope.AssStatus_Select1 = "";
    $rootScope.Addbuild_SelectCost = "";
    $rootScope.pdf = "";
    $(".item-list-detail .ionic-scroll .scroll").css("width","166px");
    $("#inputFile").val('');
    $scope.title_creass = "Create new Assets";

    if($rootScope.btn_check_addass) {
      $scope.title_creass = "Edit Assets";

      $scope.edittext1 = $rootScope.name1;
      $scope.edittext2 = $rootScope.name2;
      $scope.edittext3 = $rootScope.name3;
      $scope.edittext4 = $rootScope.name4;
      $scope.edittext5 = $rootScope.name5;
      $scope.edittext6 = $rootScope.name6;
      $scope.edittext7 = $rootScope.name7;
      $scope.edittext8 = $rootScope.name8;
      $scope.edittext9 = $rootScope.name9;
      $scope.edittext10 = $rootScope.name10;
      $scope.edittext11 = $rootScope.name11;
      $scope.edittext12 = $rootScope.name12;
      $scope.edittext13 = $rootScope.name13;
      $scope.edittext14 = $rootScope.name14;
      $scope.edittext15 = $rootScope.name15;
      $scope.edittext16 = $rootScope.name16;
      $scope.edittext17 = $rootScope.name17;
      $scope.edittext18 = $rootScope.name18;
      $scope.edittext19 = $rootScope.name19;
      $scope.edittext20 = $rootScope.name20;
      $scope.edittext21 = $rootScope.name21;
      $scope.edittext22 = $rootScope.name22;
      $scope.edittext23 = $rootScope.name23;
      $scope.edittext24 = $rootScope.name24;
      $scope.edittext25 = $rootScope.name25;
      $scope.edittext26 = $rootScope.name26;
      $scope.edittext27 = $rootScope.name27;
      $scope.edittext28 = $rootScope.name28;
      $scope.edittext29 = $rootScope.name29;
      $scope.edittext30_1 = $rootScope.name30.charAt(0);
      $scope.edittext30_2 = $rootScope.name30.charAt(1);
      $scope.edittext30_3 = $rootScope.name30.charAt(3);
      $scope.edittext30_4 = $rootScope.name30.charAt(4);
      $scope.edittext30_5 = $rootScope.name30.charAt(6);
      $scope.edittext30_6 = $rootScope.name30.charAt(7);
      $scope.edittext30_7 = $rootScope.name30.charAt(9);
      $scope.edittext30_8 = $rootScope.name30.charAt(10);
      $scope.edittext30_9 = $rootScope.name30.charAt(12);
      $scope.edittext30_10 = $rootScope.name30.charAt(13);
      $scope.edittext30_11 = $rootScope.name30.charAt(15);
      $scope.edittext30_12 = $rootScope.name30.charAt(16);
      $scope.edittext31_1 = $rootScope.name31.charAt(0);
      $scope.edittext31_2 = $rootScope.name31.charAt(1);
      $scope.edittext31_3 = $rootScope.name31.charAt(3);
      $scope.edittext31_4 = $rootScope.name31.charAt(4);
      $scope.edittext31_5 = $rootScope.name31.charAt(6);
      $scope.edittext31_6 = $rootScope.name31.charAt(7);
      $scope.edittext31_7 = $rootScope.name31.charAt(9);
      $scope.edittext31_8 = $rootScope.name31.charAt(10);
      $scope.edittext31_9 = $rootScope.name31.charAt(12);
      $scope.edittext31_10 = $rootScope.name31.charAt(13);
      $scope.edittext31_11 = $rootScope.name31.charAt(15);
      $scope.edittext31_12 = $rootScope.name31.charAt(16);
      $scope.edittext32 = $rootScope.name32;
      $scope.edittext33 = $rootScope.name36;
      $scope.edittext34 = $rootScope.name37;
      $scope.edittext35 = $rootScope.name38;
      $scope.edittext36 = $rootScope.name39;
      $scope.edittext37 = $rootScope.name40;
      $scope.edittext38 = $rootScope.name41;
      $scope.edittext39 = $rootScope.name42;
      $scope.edittext40 = $rootScope.name43;
      $scope.edittext41 = $rootScope.name44;
      $scope.edittext42 = $rootScope.name45;
      $scope.edittext43 = $rootScope.name46;
      $scope.edittext44 = $rootScope.name47;



      var request1 = {
        'api_id' : 19,
        'hospital_id' : $rootScope.hospital_id,
        'building_id' : $rootScope.add_build,
        'floor_id' : $rootScope.add_floor
      };
      $scope.ServiceThread($scope.Base_URL,request1).success(function(response,status,headers,config){
        if($scope.success){
          if(response.res_code != $scope.CODE_SUCCESS){
            console.log(response.res_text);
          }else{
            angular.forEach(response.result, function (items1) {
              angular.forEach(items1.build, function (items) {
                $rootScope.Add_buildDataArray.push(items);
              })
            })
            angular.forEach(response.result, function (items1) {
              angular.forEach(items1.floors, function (items) {
                $rootScope.Add_floorDataArray.push(items);
              })
            })
            angular.forEach(response.result, function (items1) {
              angular.forEach(items1.department, function (items) {
                $rootScope.Add_departDataArray.push(items);
              })
            })

            $rootScope.AssStatus_Select1 = $rootScope.add_status;
            $rootScope.Addbuild_Select1 = $rootScope.add_build;
            $rootScope.Addbuild_Select2 = $rootScope.add_floor;
            $rootScope.Addbuild_Select3 = $rootScope.add_depart;
            $rootScope.Addbuild_SelectCost = $rootScope.add_cost;

            $rootScope.global_text43 = $rootScope.add_status;
            $rootScope.global_text46 = $rootScope.add_depart;

            $rootScope.AddAss_Select1 = $rootScope.add_cat;
            $rootScope.AddAss_Select2 = $rootScope.add_brand;

            setTimeout(function(){
              $(".zelected").html($rootScope.add_cost);
            },0);

            textbuildSelete1 = $rootScope.add_build;
            textbuildSelete2 = $rootScope.add_floor;
            textbuildSelete3 = $rootScope.add_depart;
          }
        }}).error(function(error){console.log(error);});

      }else{

        var request = {
          'api_id' : 6,
          'hospital_id' : $rootScope.hospital_id
        };
        $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
          if($scope.success){
            if(response.res_code != $scope.CODE_SUCCESS){
              console.log(response.res_text);
            }else{
              angular.forEach(response.result, function (items) {console.log(items);
                $rootScope.Add_buildDataArray.push(items);
              })
              if($rootScope.btn_check_addass) { $rootScope.Addbuild_Select1 = $rootScope.add_build; }
            }
          }
        }).error(function(error,status,headers,config){
          console.log(error);
        });

      }

      /*if(!$rootScope.btn_check_import || !$rootScope.btn_check_addass){
        if(!$rootScope.btn_check_import) {
          $rootScope.AddAss_Select1 = $rootScope.add_cat;
          $rootScope.AddAss_Select2 = $rootScope.add_brand;
        }
      }*/

/*-----------------------------------------------------------------------------*/
var date = new Date();
if($scope.edittext37 != null){
  $scope.splt_datestart1 = $scope.edittext37.split("/");
  $scope.datess1 = new Date($scope.splt_datestart1[2],($scope.splt_datestart1[1]-1),$scope.splt_datestart1[0]);
}else{
  $scope.datess1 = date;
}
$scope.onezoneDatepicker = {
  date: $scope.datess1,
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

      $scope.checkdatewarraty = true;

      var textdeta2 = $(".dateselete1_get").text().split("-");
      var dateS2 = new Date((textdeta2[0]),(textdeta2[1]-1),textdeta2[2]);
      if($rootScope.premiss_info38){
        var textdeta = $(".dateselete2_get").text().split("-");
        var dateS1 = new Date((textdeta[0]),(textdeta[1]-1),textdeta[2]);
        if(dateS1 > dateS2){
          $rootScope.toast('กรุณาเลือกวันเริ่มประกันหลังจากวันจ่ายเงิน');
            $scope.checkdatewarraty = false;
        }
      }
      if($rootScope.premiss_info41){
        var textdeta3 = $(".dateselete4_get").text().split("-");
        var dateS3 = new Date((textdeta3[0]),(textdeta3[1]-1),textdeta3[2]);
        if(dateS3 < dateS2){
          $rootScope.toast('กรุณาเลือกวันเริ่มประกันก่อนวันหมดประกัน');
            $scope.checkdatewarraty = false;
        }
      }

      if($scope.checkdatewarraty){
        $rootScope.global_text37 = $(".dateselete1_get").text();
      }else{
        $(".dateselete1").html($scope.savedateone);
      }

    },500);

  }
};
$scope.showDatepicker = function () {
  $scope.savedateone =  $(".dateselete1").text();
  $scope.onezoneDatepicker.showDatepicker = true;
};
/*-----------------------------------------------------------------------------*/
if($scope.edittext35 != null){
  $scope.splt_datestart2 = $scope.edittext35.split("/");
  $scope.datess2 = new Date($scope.splt_datestart2[2],($scope.splt_datestart2[1]-1),$scope.splt_datestart2[0]);
}else{
  $scope.datess2 = date;
}
$scope.onezoneDatepicker2 = {
  date: $scope.datess2,
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
      if($rootScope.premiss_info40){
        var textdeta = $(".dateselete2_get").text().split("-");
        var dateS1 = new Date((textdeta[0]),(textdeta[1]-1),textdeta[2]);
        var textdeta2 = $(".dateselete1_get").text().split("-");
        var dateS2 = new Date((textdeta2[0]),(textdeta2[1]-1),textdeta2[2]);
        if(dateS1 > dateS2){
            $(".dateselete2").html($scope.savedatetwo);
            $rootScope.toast('กรุณาเลือกวันจ่ายเงินก่อนวันเริ่มประกัน');
        }else{
            $rootScope.global_text35 = $(".dateselete2_get").text();
        }
      }else{
          $rootScope.global_text35 = $(".dateselete2_get").text();
      }
    },500);

  }
};
$scope.showDatepicker2 = function () {
  $scope.savedatetwo =  $(".dateselete2").text();
  $scope.onezoneDatepicker2.showDatepicker = true;
};
/*-----------------------------------------------------------------------------*/
if($scope.edittext36 != null){
  $scope.splt_datestart3 = $scope.edittext36.split("/");
  $scope.datess3 = new Date($scope.splt_datestart3[2],($scope.splt_datestart3[1]-1),$scope.splt_datestart3[0]);
}else{
  $scope.datess3 = date;
}
$scope.onezoneDatepicker3 = {
  date: $scope.datess3,
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
      $rootScope.global_text36 = $(".dateselete3_get").text();
    },500);
  }
};
$scope.showDatepicker3 = function () {
  $scope.onezoneDatepicker3.showDatepicker = true;
};
/*-----------------------------------------------------------------------------*/
if($scope.edittext38 != null){
  $scope.splt_datestart4 = $scope.edittext38.split("/");
  $scope.datess4 = new Date($scope.splt_datestart4[2],($scope.splt_datestart4[1]-1),$scope.splt_datestart4[0]);
}else{
  $scope.datess4 = date;
}
$scope.onezoneDatepicker4 = {
  date: $scope.datess4,
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
      if($rootScope.premiss_info40){
        var textdeta = $(".dateselete4_get").text().split("-");
        var dateS1 = new Date((textdeta[0]),(textdeta[1]-1),textdeta[2]);
        var textdeta2 = $(".dateselete1_get").text().split("-");
        var dateS2 = new Date((textdeta2[0]),(textdeta2[1]-1),textdeta2[2]);
        if(dateS1 < dateS2){
            $(".dateselete4").html($scope.savedatefour);
            $rootScope.toast('กรุณาเลือกวันหมดอายุหลังจากวันเริ่มประกัน');
        }else{
            $rootScope.global_text38 = $(".dateselete4_get").text();
        }
      }else{
          $rootScope.global_text38 = $(".dateselete4_get").text();
      }
    },500);

  }
};
$scope.showDatepicker4 = function () {
  $scope.savedatefour =  $(".dateselete4").text();
  $scope.onezoneDatepicker4.showDatepicker = true;
};
/*-----------------------------------------------------------------------------*/
if($scope.edittext34 != null){
  $scope.splt_datestart5 = $scope.edittext34.split("/");
  $scope.datess5 = new Date($scope.splt_datestart5[2],($scope.splt_datestart5[1]-1),$scope.splt_datestart5[0]);
}else{
  $scope.datess5 = date;
}
$scope.onezoneDatepicker5 = {
  date: $scope.datess5,
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
      $rootScope.global_text34 = $(".dateselete5_get").text();
    },500);
  }
};
$scope.showDatepicker5 = function () {
  $scope.onezoneDatepicker5.showDatepicker = true;
};
/*-----------------------------------------------------------------------------*/



setTimeout(function(){
  $rootScope.global_text37 = $(".dateselete1_get").text();
  $rootScope.global_text35 = $(".dateselete2_get").text();
},100);


$scope.next_add_owner = function(testtext){

  $scope.getvarable_gobalsave();

  if($rootScope.global_text26 != "" && $rootScope.global_text27 != "" && $rootScope.global_text6 != "" && ($rootScope.global_text30 == ":::::" || $rootScope.global_text30.length == 17 || $rootScope.global_text30 == $scope.textfake  ) && ($rootScope.global_text31 == ":::::" || $rootScope.global_text31.length == 17 || $rootScope.global_text31 == $scope.textfake )){
    if((textbuildSelete1 == "") || (textbuildSelete3 != 0)){
      var confirmPopup = $ionicPopup.confirm({
        title: $scope.TitleDialog,
        template: $scope.DatailDialog_addAss
      });
      confirmPopup.then(function (res) {
        if (res) {
          var request = {
            'api_id': 5,
            'invent_asset_cat': $rootScope.global_text1,
            'invent_asset_cat_description': $rootScope.global_text2,
            'invent_asset_account' : $rootScope.global_text3,
            'costcenter_description': $rootScope.global_text4,
            'invent_asset_location': $rootScope.global_text5,
            'invent_tag_no': $rootScope.global_text6,
            'invent_asset_no': $rootScope.global_text7,
            'invent_major_cat': $rootScope.global_text8,
            'invent_minor_cat': $rootScope.global_text9,
            'invent_cat_name': $rootScope.global_text10,
            'invent_asset_description': $rootScope.global_text11,
            'invent_unit': $rootScope.global_text12,
            'invent_cost': $rootScope.global_text13,
            'invent_depreciation': $rootScope.global_text14,
            'invent_depreciation_reserve': $rootScope.global_text15,
            'invent_nbv': $rootScope.global_text16,
            'invent_life_year': $rootScope.global_text17,
            'invent_dateofacquistion': $rootScope.global_text18,
            'invent_asset_cost_acct': $rootScope.global_text19,
            'invent_accum': $rootScope.global_text20,
            'invent_accout_description': $rootScope.global_text21,
            'invent_employee_name': $rootScope.global_text22,
            'invent_asset_serial_no': $rootScope.global_text23,
            'invent_serial_no': $rootScope.global_text24,
            'invent_cat': $rootScope.global_text25,
            'cat_id': $rootScope.global_text26,
            'brand_id': $rootScope.global_text27,
            'invent_model': $rootScope.global_text28,
            'invent_specification': $rootScope.global_text29,
            'invent_wifi_mac_address': $rootScope.global_text30,
            'invent_mac_ethernet': $rootScope.global_text31,
            'invent_site': $rootScope.global_text32,
            'department_id': $rootScope.global_text46,
            'invent_comp_name': $rootScope.global_text33,
            'invent_recivedate': $rootScope.global_text34,
            'invent_buy_date': $rootScope.global_text35,
            'invent_installdate': $rootScope.global_text36,
            'invent_waranty_date': $rootScope.global_text37,
            'invent_warranty_expire': $rootScope.global_text38,
            'invent_vender': $rootScope.global_text39,
            'invent_contactvender': $rootScope.global_text40,
            'invent_invoice_number': $rootScope.global_text41,
            'invent_rent': $rootScope.global_text42,
            'invent_status_id': $rootScope.global_text43,
            'invent_remark': $rootScope.global_text44,
            'invent_create_by': $rootScope.emps_id,
            'invent_employee_number': $rootScope.global_text45,
            'hospital_id' : $rootScope.hospital_id
          };
          $scope.ServiceThread($scope.Base_URL, request).success(function (response, status, headers, config) {
            if ($scope.success) {
              if (response.res_code != $scope.CODE_SUCCESS) {
                console.log(response.res_text);
                if(response.res_code == "02"){
                  $rootScope.toast(response.res_text);
                }
              } else { console.log(response.res_text);
                $rootScope.savelog($rootScope.emps_id,"CreateNewAssets",1,response.result);
                $rootScope.invent_id = response.result;
                $scope.count_p = 0;
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
                      }else{
                        $rootScope.savelog($rootScope.emps_id,"CreateNewAssets",1,$rootScope.invent_id);
                        $scope.count_p++;
                      }
                    }
                  }).error(function(error,status,headers,config){
                    console.log(error);
                  });
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////
                console.log($rootScope.pdf+"");
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
                $scope.countupload = $rootScope.Add_PhotoDataArray.length;
                if(($rootScope.pdf+"") !="") {
                  $scope.countupload++;
                }
                var refreshIntervalId = setInterval(function(){
                  if($scope.countupload == $scope.count_p){
                    $rootScope.doRefresh_list();
                    $scope.checkSeleteTab(1);
                    $rootScope.invent_id = $rootScope.invent_id;
                    $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
                    $rootScope.nametitle = $rootScope.global_text33;
                    $rootScope.pdf = "";
                    $rootScope.Add_PhotoDataArray = [];
                    $rootScope.checkbackpageinfo = true;
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
    }else{
      $rootScope.toast("กรุณากรอกข้อมูลสถานที่ให้ครบถ้วน");
    }

  }else{
    $rootScope.toast($rootScope.DatailDialog_alartedit);
  }
}

$scope.next_edit_owner = function(){

  $scope.getvarable_gobalsave();
  if($rootScope.global_text26 == ""){ $rootScope.global_text26 = $rootScope.add_cat;}
  if($rootScope.global_text27 == ""){ $rootScope.global_text27 = $rootScope.add_brand;}

  if($rootScope.global_text26 != "" && $rootScope.global_text27 != "" && $rootScope.global_text6 != "" && ($scope.global_text30 == ":::::" || $scope.global_text30.length == 17 || $scope.global_text30 == $scope.textfake ) && ($scope.global_text31 == ":::::" || $scope.global_text31.length == 17 || $scope.global_text31 == $scope.textfake )){
    if((textbuildSelete1 == "") || (textbuildSelete3 != 0)){
      if($rootScope.btn_check_import){
        var confirmPopup1 = $ionicPopup.confirm({
          title: $scope.TitleDialog,
          template: $scope.DatailDialog_editass
        });
        confirmPopup1.then(function(res) {
          if(res) {
            $scope.checkbuildselect();
            var request = {
              'api_id' : 12,
              'invent_id' : $rootScope.invent_id,
              'invent_asset_cat': $rootScope.global_text1,
              'invent_asset_cat_description': $rootScope.global_text2,
              'invent_asset_account' : $rootScope.global_text3,
              'costcenter_description': $rootScope.global_text4,
              'invent_asset_location': $rootScope.global_text5,
              'invent_asset_no': $rootScope.global_text7,
              'invent_major_cat': $rootScope.global_text8,
              'invent_minor_cat': $rootScope.global_text9,
              'invent_cat_name': $rootScope.global_text10,
              'invent_asset_description': $rootScope.global_text11,
              'invent_unit': $rootScope.global_text12,
              'invent_cost': $rootScope.global_text13,
              'invent_depreciation': $rootScope.global_text14,
              'invent_depreciation_reserve': $rootScope.global_text15,
              'invent_nbv': $rootScope.global_text16,
              'invent_life_year': $rootScope.global_text17,
              'invent_dateofacquistion': $rootScope.global_text18,
              'invent_asset_cost_acct': $rootScope.global_text19,
              'invent_accum': $rootScope.global_text20,
              'invent_accout_description': $rootScope.global_text21,
              'invent_employee_name': $rootScope.global_text22,
              'invent_asset_serial_no': $rootScope.global_text23,
              'invent_cat': $rootScope.global_text25,
              'invent_specification': $rootScope.global_text29,
              'invent_wifi_mac_address': $rootScope.global_text30,
              'invent_mac_ethernet': $rootScope.global_text31,
              'invent_site': $rootScope.global_text32,
              'department_id': $rootScope.global_text46,
              'invent_comp_name': $rootScope.global_text33,
              'invent_recivedate': $rootScope.global_text34,
              'invent_installdate': $rootScope.global_text36,
              'invent_warranty_expire': $rootScope.global_text38,
              'invent_vender': $rootScope.global_text39,
              'invent_contactvender': $rootScope.global_text40,
              'invent_invoice_number': $rootScope.global_text41,
              'invent_rent': $rootScope.global_text42,
              'invent_status_id': $rootScope.global_text43,
              'invent_remark': $rootScope.global_text44,
              'invent_create_by': $rootScope.emps_id,
              'invent_employee_number': $rootScope.global_text45,
              'hospital_id' : $rootScope.hospital_id,
              'invent_update_by': $rootScope.emps_id
            };
            $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
              if($scope.success){
                if(response.res_code != $scope.CODE_SUCCESS){
                  console.log(response.res_text);
                }else{
                  $rootScope.savelog($rootScope.emps_id,"AssetsMangement",2,$rootScope.invent_id);
                  $rootScope.doRefresh_list();
                  $scope.checkSeleteTab(1);
                  $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
                }
              }
            }).error(function(error,status,headers,config){ console.log(error); });
          } else { console.log('ยกเลิก');}
        });
      }else{
        var confirmPopup2 = $ionicPopup.confirm({
          title: $scope.TitleDialog,
          template: $scope.DatailDialog_editass
        });
        confirmPopup2.then(function(res) {
          if(res) {
            $scope.checkbuildselect();
            var request = {
              'api_id' : 24,
              'invent_id' : $rootScope.invent_id,
              'invent_asset_cat': $rootScope.global_text1,
              'invent_asset_cat_description': $rootScope.global_text2,
              'invent_asset_account' : $rootScope.global_text3,
              'costcenter_description': $rootScope.global_text4,
              'invent_asset_location': $rootScope.global_text5,
              'invent_tag_no': $rootScope.global_text6,
              'invent_asset_no': $rootScope.global_text7,
              'invent_major_cat': $rootScope.global_text8,
              'invent_minor_cat': $rootScope.global_text9,
              'invent_cat_name': $rootScope.global_text10,
              'invent_asset_description': $rootScope.global_text11,
              'invent_unit': $rootScope.global_text12,
              'invent_cost': $rootScope.global_text13,
              'invent_depreciation': $rootScope.global_text14,
              'invent_depreciation_reserve': $rootScope.global_text15,
              'invent_nbv': $rootScope.global_text16,
              'invent_life_year': $rootScope.global_text17,
              'invent_dateofacquistion': $rootScope.global_text18,
              'invent_asset_cost_acct': $rootScope.global_text19,
              'invent_accum': $rootScope.global_text20,
              'invent_accout_description': $rootScope.global_text21,
              'invent_employee_name': $rootScope.global_text22,
              'invent_asset_serial_no': $rootScope.global_text23,
              'invent_serial_no': $rootScope.global_text24,
              'invent_cat': $rootScope.global_text25,
              'cat_id': $rootScope.global_text26,
              'brand_id': $rootScope.global_text27,
              'invent_model': $rootScope.global_text28,
              'invent_specification': $rootScope.global_text29,
              'invent_wifi_mac_address': $rootScope.global_text30,
              'invent_mac_ethernet': $rootScope.global_text31,
              'invent_site': $rootScope.global_text32,
              'department_id': $rootScope.global_text46,
              'invent_comp_name': $rootScope.global_text33,
              'invent_recivedate': $rootScope.global_text34,
              'invent_buy_date': $rootScope.global_text35,
              'invent_installdate': $rootScope.global_text36,
              'invent_waranty_date': $rootScope.global_text37,
              'invent_warranty_expire': $rootScope.global_text38,
              'invent_vender': $rootScope.global_text39,
              'invent_contactvender': $rootScope.global_text40,
              'invent_invoice_number': $rootScope.global_text41,
              'invent_rent': $rootScope.global_text42,
              'invent_status_id': $rootScope.global_text43,
              'invent_remark': $rootScope.global_text44,
              'invent_create_by': $rootScope.emps_id,
              'invent_employee_number': $rootScope.global_text45,
              'hospital_id' : $rootScope.hospital_id,
              'invent_update_by': $rootScope.emps_id
            };

            $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
              if($scope.success){
                if(response.res_code != $scope.CODE_SUCCESS){
                  console.log(response.res_text);
                  if(response.res_code == "02"){
                    $rootScope.toast(response.res_text);
                  }
                }else{
                  $rootScope.savelog($rootScope.emps_id,"AssetsMangement",2,$rootScope.invent_id);
                  $rootScope.doRefresh_list();
                  $scope.checkSeleteTab(1);
                  $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
                }
              }
            }).error(function(error,status,headers,config){ console.log(error); });
          } else { console.log('ยกเลิก');}
        });
      }
    }else{
      $rootScope.toast("กรุณากรอกข้อมูลสถานที่ให้ครบถ้วน");
    }
  }else{
    $rootScope.toast($rootScope.DatailDialog_alartedit);
  }

}

$scope.checkbuildselect = function() {
  if(textstatusSelete1 == ''){ textstatusSelete1 = $rootScope.add_status; }
  if(textbuildSelete1 == '' ){ textbuildSelete1 = $rootScope.add_build; }
  if(textbuildSelete2 == '' && textbuildSelete2 != 0){ textbuildSelete2 = $rootScope.add_floor; }
  if(textbuildSelete3 == '' && textbuildSelete3 != 0){ textbuildSelete3 = $rootScope.add_depart; }
}


$rootScope.back_7 = function(){
  if(!$rootScope.checkAddAss){
    $scope.checkSeleteTab(1);
    $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
  }else{
    $rootScope.checkconnect_statego('app.Assets_Check');
  }
}

$scope.btn_seletefile = function() {
  console.log("123");
  $("#inputFile").click();
}


var textSelete1="",textSelete2="";
$scope.Ass_CreaSelect1 = function(mySelect) {
  textSelete1 = mySelect;
  $rootScope.global_text26 = textSelete1;
}

$scope.Ass_CreaSelect2 = function(mySelect) {
  textSelete2 = mySelect;
  $rootScope.global_text27 = textSelete2;
}

$scope.Addbuild_showSelect1 = function(mySelect) {
  textbuildSelete1 = mySelect;
  textbuildSelete2 = 0;
  textbuildSelete3 = 0;
  $rootScope.Add_floorDataArray = [];
  $rootScope.Add_departDataArray = [];
  var request = {
    'api_id' : 6,
    'building_id' : textbuildSelete1
  };
  $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
    if($scope.success){
      if(response.res_code != $scope.CODE_SUCCESS){
        console.log(response.res_text);
      }else{
        angular.forEach(response.result, function (items) {
          $rootScope.Add_floorDataArray.push(items);
        })
      }
    }
  }).error(function(error,status,headers,config){
    console.log(error);
  });
}
$scope.Addbuild_showSelect2 = function(mySelect) {
  textbuildSelete2 = mySelect;
  textbuildSelete3 = 0;
  $rootScope.Add_departDataArray = [];
  var request = {
    'api_id' : 6,
    'floor_id' : textbuildSelete2
  };
  $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
    if($scope.success){
      if(response.res_code != $scope.CODE_SUCCESS){
        console.log(response.res_text);
      }else{
        angular.forEach(response.result, function (items) {
          $rootScope.Add_departDataArray.push(items);
        })
      }
    }
  }).error(function(error,status,headers,config){
    console.log(error);
  });
}
$scope.Addbuild_showSelect3 = function(mySelect) {
  textbuildSelete3 = mySelect;
  $rootScope.global_text46 = textbuildSelete3;
}

var textstatusSelete1="";
$scope.AssStatus_showSelect1 = function(mySelect) {
  textstatusSelete1 = mySelect;
  $rootScope.global_text43 = textstatusSelete1;
}

$scope.btn_clickdelete = function(index) {
  $rootScope.Add_PhotoDataArray.splice(index,1);
  $(".item-list-detail .ionic-scroll .scroll").css("width",(166*($rootScope.Add_PhotoDataArray.length+1))+"px");
}

$scope.input_change1 = function(ex) {
  substring_inputsamtext(".text1","","","");
  if($(".text1").val() != ''){
    var searchInput = $(".text2");
    var strLength = searchInput.val().length * 2;
    searchInput.focus();
    searchInput[0].setSelectionRange(strLength, strLength);
  }
}
$scope.input_change2 = function() {
  substring_inputsamtext(".text2",2,1,3);
  //input_focus(2,1,3);
}
$scope.input_change3 = function() {
  substring_inputsamtext(".text3",3,2,4);
  //input_focus(3,2,4);
}
$scope.input_change4 = function() {
  substring_inputsamtext(".text4",4,3,5);
  //input_focus(4,3,5);
}
$scope.input_change5 = function() {
  substring_inputsamtext(".text5",5,4,6);
  //input_focus(5,4,6);
}
$scope.input_change6 = function() {
  substring_inputsamtext(".text6",6,5,7);
  //input_focus(6,5,7);
}
$scope.input_change7 = function() {
  substring_inputsamtext(".text7",7,6,8);
  //input_focus(7,6,8);
}
$scope.input_change8 = function() {
  substring_inputsamtext(".text8",8,7,9);
  //input_focus(8,7,9);
}
$scope.input_change9= function() {
  substring_inputsamtext(".text9",9,8,10);
  //input_focus(9,8,10);
}
$scope.input_change10 = function() {
  substring_inputsamtext(".text10",10,9,11);
  //input_focus(10,9,11);
}
$scope.input_change11 = function() {
  substring_inputsamtext(".text11",11,10,12);
  //input_focus(11,10,12);
}
$scope.input_change12 = function() {
  substring_inputsamtext(".text12","","","");
  if($(".text12").val() == ''){
    $(".text11").focus();
  }
}

$scope.input_change_1 = function() {
  substring_inputsamtext(".text_1","","","");
  if($(".text_1").val() != ''){
    var searchInput = $(".text_2");
    var strLength = searchInput.val().length * 2;
    searchInput.focus();
    searchInput[0].setSelectionRange(strLength, strLength);
  }
}
$scope.input_change_2 = function() {
  substring_inputsamtext(".text_2",'_2','_1','_3');
  //input_focus('_2','_1','_3');
}
$scope.input_change_3 = function() {
  substring_inputsamtext(".text_3",'_3','_2','_4');
  //input_focus('_3','_2','_4');
}
$scope.input_change_4 = function() {
  substring_inputsamtext(".text_4",'_4','_3','_5');
  //input_focus('_4','_3','_5');
}
$scope.input_change_5 = function() {
  substring_inputsamtext(".text_5",'_5','_4','_6');
  //input_focus('_5','_4','_6');
}
$scope.input_change_6 = function() {
  substring_inputsamtext(".text_6",'_6','_5','_7');
  //input_focus('_6','_5','_7');
}
$scope.input_change_7 = function() {
  substring_inputsamtext(".text_7",'_7','_6','_8');
  //input_focus('_7','_6','_8');
}
$scope.input_change_8 = function() {
  substring_inputsamtext(".text_8",'_8','_7','_9');
  //input_focus('_8','_7','_9');
}
$scope.input_change_9= function() {
  substring_inputsamtext(".text_9",'_9','_8','_10');
  //input_focus('_9','_8','_10');
}
$scope.input_change_10 = function() {
  substring_inputsamtext(".text_10",'_10','_9','_11');
  //input_focus('_10','_9','_11');
}
$scope.input_change_11 = function() {
  substring_inputsamtext(".text_11",'_11','_10','_12');
  //input_focus('_11','_10','_12');
}
$scope.input_change_12 = function() {
  substring_inputsamtext(".text_12","","","");
  if($(".text_12").val() == ''){
    var searchInput = $(".text_11");
    var strLength = searchInput.val().length * 2;
    searchInput.focus();
    searchInput[0].setSelectionRange(strLength, strLength);
  }
}

setTimeout(function(){
  $("#checkbtndelete").hide();
},200);

$scope.btn_clickdelete_pdf = function() {
  $("#checkbtndelete").hide();
  $("#inputFile").val('');
  $(".textnamepdf_show").html('');
  $rootScope.pdf = "";
}

$scope.getvarable_gobalsave = function() {

  $rootScope.global_text1 =$(".savetext1").val();
  $rootScope.global_text2 =$(".savetext2").val();
  $rootScope.global_text3 =$(".savetext3").val();
  $rootScope.global_text4 =$(".zelected").text();
  $rootScope.global_text5 =$(".savetext5").val();
  $rootScope.global_text6 =$(".savetext6").val();
  $rootScope.global_text7 =$(".savetext7").val();
  $rootScope.global_text8 =$(".savetext8").val();
  $rootScope.global_text9 =$(".savetext9").val();
  $rootScope.global_text10 =$(".savetext10").val();
  $rootScope.global_text11 =$(".savetext11").val();
  $rootScope.global_text12 =$(".savetext12").val();
  $rootScope.global_text13 =$(".savetext13").val();
  $rootScope.global_text14 =$(".savetext14").val();
  $rootScope.global_text15 =$(".savetext15").val();
  $rootScope.global_text16 =$(".savetext16").val();
  $rootScope.global_text17 =$(".savetext17").val();
  $rootScope.global_text18 =$(".savetext18").val();
  $rootScope.global_text19 =$(".savetext19").val();
  $rootScope.global_text20 =$(".savetext20").val();
  $rootScope.global_text21 =$(".savetext21").val();
  $rootScope.global_text22 =$(".savetext22").val();
  $rootScope.global_text23 =$(".savetext23").val();
  $rootScope.global_text24 =$(".savetext24").val();
  $rootScope.global_text25 =$(".savetext25").val();
  //$rootScope.global_text26 แคท
  //$rootScope.global_text27 แบรน
  $rootScope.global_text28 =$(".savetext28").val();
  $rootScope.global_text29 =$(".savetext29").val();
  $rootScope.global_text30 = $(".text1").val()+$(".text2").val()+":"+$(".text3").val()+$(".text4").val()+":"+$(".text5").val()+$(".text6").val()
  +":"+$(".text7").val()+$(".text8").val()+":"+$(".text9").val()+$(".text10").val()+":"+$(".text11").val()+$(".text12").val();
  $rootScope.global_text31 = $(".text_1").val()+$(".text_2").val()+":"+$(".text_3").val()+$(".text_4").val()+":"+$(".text_5").val()+$(".text_6").val()
  +":"+$(".text_7").val()+$(".text_8").val()+":"+$(".text_9").val()+$(".text_10").val()+":"+$(".text_11").val()+$(".text_12").val();
  $rootScope.global_text32 =$(".savetext32").val();
  $rootScope.global_text33 =$(".savetext33").val();
  $rootScope.global_text34 = $(".dateselete5_get").text();
  $rootScope.global_text35 = $(".dateselete2_get").text();
  $rootScope.global_text36 = $(".dateselete3_get").text();
  $rootScope.global_text37 = $(".dateselete1_get").text();
  $rootScope.global_text38 = $(".dateselete4_get").text();
  $rootScope.global_text39 =$(".savetext39").val();
  $rootScope.global_text40 =$(".savetext40").val();
  $rootScope.global_text41 =$(".savetext41").val();
  $rootScope.global_text42 =$(".savetext42").val();
  //$rootScope.global_text43 status
  $rootScope.global_text44 =$(".savetext44").val();
  $rootScope.global_text45 =$(".savetext45").val();
}

/////////////////////////
//////////////////////////

$scope.loadImage = function() {
  // Show the action sheet
  var hideSheet = $ionicActionSheet.show({
    buttons: [
      { text: 'Choose Form Library' },
      { text: 'Take Photo' }
    ],
    cancelText: '<b>Cancel</b>',
    cancel: function() {
    },
    buttonClicked: function(index) {

      var type = null;
      if (index === 0) {
        type = Camera.PictureSourceType.PHOTOLIBRARY;
      } else if (index === 1) {
        type = Camera.PictureSourceType.CAMERA;
      }
      if (type !== null) {
        $scope.selectPicture(type);
      }
      return true;
    }
  });
};

$scope.selectPicture = function(sourceType) {
  var options = {
    quality: 80,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: sourceType,
    correctOrientation: true,
    targetWidth: 800
  };
  navigator.camera.getPicture(onSuccess, onFail, options);
  function onSuccess(imageData) {
    $rootScope.Add_PhotoDataArray.push("data:image/jpeg;base64," + imageData);
    $scope.$apply();
    setTimeout(function(){
      //$rootScope.checkorientation(".setori_img_addass");
    },100);
    //if($rootScope.deviceType == "2"){
    $(".item-list-detail .ionic-scroll .scroll").css("width",(166*($rootScope.Add_PhotoDataArray.length+1))+"px");
    //}

  }
  function onFail(message) {
    alert('Failed because: ' + message);
  }
};

$scope.convertToBase64 = function () {

  var selectedFile = document.getElementById("inputFile").files;

  if (selectedFile.length > 0) {
    var fileToLoad = selectedFile[0];
    var fileReader = new FileReader();
    var base64;
    var textpdf = $('#inputFile').val();
    var last = textpdf.substring(textpdf.lastIndexOf("\\") + 1, textpdf.length);
    var checktype = last.split(".");
    if(checktype[1] == "pdf"){
      $("#checkbtndelete").show();
      $(".textnamepdf_show").html(last);
      fileReader.onload = function(fileLoadedEvent) {
        base64 = fileLoadedEvent.target.result;
        $rootScope.pdf = base64;
      };
      fileReader.readAsDataURL(fileToLoad);
    }else{
      //$rootScope.pdf = "";
      $("#inputFile").val('');
      $(".textnamepdf_show").html('');
      $rootScope.toast("กรุณาเลือกไฟล์ pdf");
    }
  }
};


})

function substring_inputsamtext(id,t1,t2,t3){
  var english = /^[A-Za-z0-9]*$/;
  if (english.test($(id).val())) {
    if(t1 != ""){
      input_focus(t1,t2,t3);
    }
    if($(id).val().length >1){
      var text1 = $(id).val().substr(1,1);
      $(id).val('');
      $(id).val(text1);
    }
  }else{
    $(id).val('');
  }
}

function input_focus(id1,id2,id3){
  if($(".text"+id1).val() == ''){
    var searchInput = $(".text"+id2);
    var strLength = searchInput.val().length * 2;
    searchInput.focus();
    searchInput[0].setSelectionRange(strLength, strLength);
  }else{
    var searchInput = $(".text"+id3);
    var strLength = searchInput.val().length * 2;
    searchInput.focus();
    searchInput[0].setSelectionRange(strLength, strLength);
  }
}



function isNumberKey_fc(id){


  /*	if (isNaN(document.getElementById(id).value))
  {
  return false;
}
return true;*/
/*var charCode = (evt.which) ? evt.which : event.keyCode
if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 123))
{
return false;
}
return true;*/
}
