angular.module('Phyathai')

.controller('LoginControl',function($scope,$state,$rootScope,$ionicPopup){


  $scope.heightkeybroad = window.innerHeight;
  $scope.Widthkeybroad = window.innerWidth;
  $scope.class_user = "login_icon_focus ion-user1";
  $scope.class_pass = "login_icon_blur ion-pass1";
  $scope.class_border_user = "login_border_blur";
  $scope.class_border_pass = "login_border_blur";

  setTimeout(function(){
    var clientHeight = document.getElementById('iddiv_login').clientHeight;
    if($rootScope.deviceType == "1"){
      $(".div_login").css("margin-top",$scope.heightkeybroad-clientHeight-10+"px");
    }else{
      $(".div_login").css("bottom",(-$scope.heightkeybroad+20)+"px");
    }
  },300);

  $("#username_login").removeClass("ng-untouched").addClass("ng-touched");
  $("#password_login").removeClass("ng-untouched").addClass("ng-touched");

  $scope.focused_user = function() {
    $scope.class_user = "login_icon_focus ion-user2";
    $scope.class_border_user = "login_border_focus";
  }
  $scope.blurred_user = function(username) {
      if(username == "" || username == null) {
          $scope.class_user = "login_icon_blur ion-user1";
          $scope.class_border_user = "login_border_blur";
      }
  }

  $scope.focused_pass = function() {
    $scope.class_pass = "login_icon_focus ion-pass2";
    $scope.class_border_pass = "login_border_focus";
  }
  $scope.blurred_pass = function(password) {
    if(password == "" || password == null) {
      $scope.class_pass = "login_icon_blur ion-pass1";
      $scope.class_border_pass = "login_border_blur";
    }
  }


  $("#username_login").on("keypress", function(event){
    if (event.keyCode === 13) {
      $("#idmail_Select").focus();
      event.preventDefault();
    }
  });
  $("#password_login").on("keypress", function(event){
    if (event.keyCode === 13) {
      $("#idhospital_Select").focus();
      event.preventDefault();
    }
  });




  $rootScope.AllhospitalDataArray = [];
  $rootScope.AllmailDataArray = [];

  var request = {
    'api_id' : 15
  };
  $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
    if($scope.success){
      if(response.res_code != $scope.CODE_SUCCESS){
        console.log(response.res_text);
      }else{
        angular.forEach(response.result, function (items) {
          angular.forEach(items.hosp, function (items2) {
            $rootScope.AllhospitalDataArray.push(items2);
          })
          angular.forEach(items.mail, function (items3) {
            $rootScope.AllmailDataArray.push(items3);
          })
        })
        setTimeout(function () { $scope.nameselete_login = "โปรดเลือกศูนย์การแพทย์"; }, 0);
        setTimeout(function () { $scope.nameselete_mail = "โปรดเลือกเมล์"; }, 0);
      }
    }
  }).error(function(error,status,headers,config){
    console.log(error);
  });

  $scope.textSelete1="999";
  $scope.textSelete2="999";
  $scope.hospital_showSelect = function(mySelect) {
    $scope.textSelete1 = mySelect;
  }

  $scope.mail_showSelect = function(mySelect) {
    $scope.textSelete2 = mySelect;
  }



  $scope.click_login = function(){

    if($scope.textSelete2 != "999") {
      if($scope.textSelete1 != "999") {
        var request = {
          'api_id': 14,
          'emp_id': $("#username_login").val()+$scope.textSelete2,
          'emp_password': $("#password_login").val(),
          'hospital_id': $scope.textSelete1
        };
        $scope.ServiceThread($scope.Base_URL, request).success(function (response, status, headers, config) {
          if ($scope.success) {
            if (response.res_code != $scope.CODE_SUCCESS) {
              console.log(response.res_text);
              console.log(response.test);
              $rootScope.toast(response.res_text);
            } else {
              $scope.comma = "";
              $scope.id_hospital_array = "";
              angular.forEach(response.result, function (items) {
                angular.forEach(items.role, function (items2) {
                  $scope.id_hospital_array += $scope.comma+items2.hospital_id.toString();
                  if(items.role.length > 1){
                    $scope.comma = ",";
                  }
                })
                $rootScope.hospital_id = $scope.id_hospital_array;
                $rootScope.group_id = items.group_id;
                $rootScope.emps_id = items.emp_id;
                $rootScope.emps_img1 = items.emp_picture_idcard;
                $rootScope.emps_img2 = items.emp_picture;
                $rootScope.emps_fname = items.emp_name;
                $rootScope.emps_lname = items.emp_lastname;
                $rootScope.img_ownerCP = $rootScope.emps_img1;
                $rootScope.name_ownerCP = $rootScope.emps_fname+" "+$rootScope.emps_lname;
                $rootScope.id_ownerCP  = items.emp_id_real;
                $rootScope.SeeAll = items.emp_status_allview;
                $rootScope.costcenter_id = items.costcenter_id;
                if($rootScope.hospital_id.indexOf(",") == -1){
                  $rootScope.checkmulti_hos = false;
                }else{
                  $rootScope.checkmulti_hos = true;
                }
                $rootScope.Model_login(items.emp_id,items.emp_name, items.emp_lastname, items.emp_id, items.emp_picture_idcard, items.emp_picture, $scope.id_hospital_array, items.group_id, items.emp_id_real,items.emp_status_allview,items.costcenter_id);
              })

              $scope.class_user = "login_icon_blur ion-user1";
              $scope.class_border_user = "login_border_blur";
              $scope.class_pass = "login_icon_blur ion-pass1";
              $scope.class_border_pass = "login_border_blur";

              $("#username_login").val('');
              $("#password_login").val('');
              $rootScope.checkconnect_statego('app.Assets_Check');
              $rootScope.getData();
            }
          }
        }).error(function (error, status, headers, config) {
          console.log(error);
        });

      }
      else{
        $rootScope.toast('กรุณาเลือกศูนย์การแพทย์');
      }
    }else{
      $rootScope.toast('กรุณาเลือกเมล์');
    }
  }

  $scope.showPopup_forgot = function() {
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.wifi" class="forgotpass_input">',
      title: 'กรอก Email เพื่อรีเซ็ตรหัสผ่าน',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Send</b>',
          type: 'button-positive',
          onTap: function(e) {

            if (!$scope.data.wifi) {
              e.preventDefault();
            } else {
              return !$scope.data.wifi
            }
          }
        }
      ]
    });

    myPopup.then(function(res) {
      if(res != null){

        var request = {
          'api_id' : 31,
          'emp_email' : $scope.data.wifi
        };
        $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
          if($scope.success){
            if(response.res_code != $scope.CODE_SUCCESS){
              var alertPopup = $ionicPopup.alert({
                title: 'แจ้งเตือน',
                template: "รีเซ็ตรหัสผ่านไม่สำเร็จ"
              });
              alertPopup.then(function (res) { });
            }else{
              if(response.res_code == '01'){
                var alertPopup = $ionicPopup.alert({
                  title: 'แจ้งเตือน',
                  template: "ระบบได้ทำการรีเซ็ตรหัสผ่าน และส่งรหัสผ่านใหม่ไปที่ Email อาจใช้เวลา 5-10 นาที"
                });
                alertPopup.then(function (res) { });
              }else if(response.res_code == '02'){
                var alertPopup = $ionicPopup.alert({
                  title: 'แจ้งเตือน',
                  template: "Username ผิดพลาดไม่สามารถส่ง Email ไดี"
                });
                alertPopup.then(function (res) { });
              }
            }
          }
        }).error(function(error,status,headers,config){
          console.log(error);
        });

      }
    });

  };

})
