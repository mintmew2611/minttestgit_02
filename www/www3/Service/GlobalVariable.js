angular.module('Phyathai')

.run(function($ionicPlatform,$rootScope, $ionicPlatform, $location, $ionicHistory,$state,$ionicLoading,$ionicPopup) {

  $rootScope.Base_URL = "http://phyathaidev.demosite.ibusiness.co.th/apidemo_mint/index.php";
  $rootScope.version = "20161028";
  $rootScope.CODE_SUCCESS = "01";
  $rootScope.CODE_ERROR = "00";
  $rootScope.CheckPage_map_add = true;
  $rootScope.CheckPage_map_edit = true;
  $rootScope.checkmulti_hos = false;
  $rootScope.checkAddAss = true;
  $rootScope.backButtonPressedOnceToExit = false;
  $rootScope.Add_catDataArray = [];
  $rootScope.Add_brandDataArray = [];
  $rootScope.Add_statusDataArray = [];
  $rootScope.CostDataArray = [];
  $rootScope.buildDataArray = [];
  $rootScope.DepartDataArray = [];
  $rootScope.HospitalDataArray = [];
  $rootScope.Depart_empDataArray = [];
  $rootScope.PositionDataArray = [];

  $rootScope.TitleDialog = "ยืนยัน";
  $rootScope.DatailDialog_editmap = "คุณต้องการแก้ไขตำแหน่งทรัพย์สิน";
  $rootScope.DatailDialog_editdate1 = "คุณต้องการแก้ไขวันเริ่มถือครองทรัพย์สิน";
  $rootScope.DatailDialog_editdata2 = "คุณต้องการแก้ไขวันสิ้นสุดถือครองทรัพย์สิน";
  $rootScope.DatailDialog_addowner = "คุณต้องการเพิ่มผู้ดูแลทรัพย์สิน";
  $rootScope.DatailDialog_editass = "คุณต้องการแก้ไขข้อมูลทรัพย์สิน";
  $rootScope.DatailDialog_logout = "คุณต้องการออกจากระบบ";
  $rootScope.DatailDialog_addAss = "คุณต้องสร้าง Inventory";
  $rootScope.DatailDialog_alartedit = "กรุณากรอกข้อมูลให้ครบถ้วน";
  $rootScope.DatailDialog_alartchangepass = "คุณต้องการเปลี่ยน Password";
  $rootScope.DatailDialog_delete_ass = "คุณต้องการลบรูปภาพทรัพย์สิน";

  $rootScope.ImgArray_Ass = [];
  $rootScope.invent_id;

  $rootScope.filter_all = function(text,text2){
    if(text == "All"){
      $(text2).html(text);
    }else{
      $(text2).html(text.substring(3,(text.length-1)));
    }
  }

  $rootScope.screenSize = function (width, height) {
    var x = width ? width : $window.innerWidth;
    var y = height ? height : $window.innerHeight;

    return x + 'x' + y;
  };

  $rootScope.toast = function(text)
  {
    console.log(text);
    window.plugins.toast.showShortBottom(text, function(a){/*console.log('toast success: ' + a)*/}, function(b){alert('toast error: ' + b)});

    /*
    var alertPopup = $ionicPopup.alert({
    title: 'แจ้งเตือน',
    template: text
  });
  alertPopup.then(function (res) { });*/
}

$rootScope.typeupdate = 1;
if($rootScope.deviceType == 1){
  $rootScope.typeupdate = 2;
}
var request = {
  'api_id' : 34,
  'version_number' : $rootScope.version,
  'version_type' : $rootScope.typeupdate
};
$rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
  if($rootScope.success){
    if(response.res_code != $rootScope.CODE_SUCCESS){
      var alertPopup = $ionicPopup.alert({
        title: 'แจ้งเตือน',
        template: "application มีการอัพเดตเวอร์ชั่น"
      });
      alertPopup.then(function (res) {console.log(response);
        angular.forEach(response.result, function (items1) {
          window.open(items1.version_bundle, '_system');
        })
      });
      //window.open('http://play.google.com/store/apps/details?id='+arguments[0].result[0].version_bundle+'', '_system');
    }else{

    }
  }
}).error(function(error,status,headers,config){ console.log(error); });


var request = {
  'api_id' : 23,
  'cat_id' : "0",
  'brand_id' : "0"
};
$rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
  if($rootScope.success){
    if(response.res_code != $rootScope.CODE_SUCCESS){
      console.log(response.res_text);
    }else{
      angular.forEach(response.result, function (items1) {
        angular.forEach(items1.cat, function (items) {
          $rootScope.Add_catDataArray.push(items);
        })
        angular.forEach(items1.brand, function (items) {
          $rootScope.Add_brandDataArray.push(items);
        })
      })
    }
  }
}).error(function(error,status,headers,config){ console.log(error); });

var request = {
  'api_id' : 32
};
$rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
  if($rootScope.success){
    if(response.res_code != $rootScope.CODE_SUCCESS){
      console.log(response.res_text);
    }else{
      angular.forEach(response.result, function (items) {
        angular.forEach(items.status_in, function (items1) {
          $rootScope.Add_statusDataArray.push(items1);
        })
        angular.forEach(items.Cost, function (items2) {
          //var country = ["Australia", "Bangladesh", "Denmark", "Hong Kong", "Indonesia", "Netherlands", "New Zealand", "South Africa"];

          $rootScope.CostDataArray.push(items2);
        })
      })
    }
  }
}).error(function(error,status,headers,config){ console.log(error); });





var request = {
  'api_id' : 26
};
$rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
  if($rootScope.success){
    if(response.res_code != $rootScope.CODE_SUCCESS){
      console.log(response.res_text);
    }else{
      angular.forEach(response.result, function (items) {
        $rootScope.PositionDataArray.push(items);
      })
    }
  }
}).error(function(error,status,headers,config){ console.log(error); });

var request = {
  'api_id' : 29
};
$rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
  if($rootScope.success){
    if(response.res_code != $rootScope.CODE_SUCCESS){
      console.log(response.res_text);
    }else{
      angular.forEach(response.result, function (items) {
        $rootScope.Depart_empDataArray.push(items);
      })
    }
  }
}).error(function(error,status,headers,config){ console.log(error); });


$rootScope.getData = function()
{

  $rootScope.buildDataArray = [];
  $rootScope.DepartDataArray = [];
  $rootScope.HospitalDataArray = [];

  var request = {
    'api_id' : 6,
    'hospital_id' : $rootScope.hospital_id
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

  var request = {
    'api_id' : 25,
    'hospital_id' : $rootScope.hospital_id
  };
  $rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
    if($rootScope.success){
      if(response.res_code != $rootScope.CODE_SUCCESS){
        console.log(response.res_text);
      }else{
        angular.forEach(response.result, function (items) {
          $rootScope.DepartDataArray.push(items);
        })
      }
    }
  }).error(function(error,status,headers,config){ console.log(error); });

  $rootScope.PermisstionDataArray = [];
  var request = {
    'api_id' : 30,
    'group_id' : $rootScope.group_id,
    'hospital_id' : $rootScope.hospital_id
  };

  $rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
    if($rootScope.success){
      if(response.res_code != $rootScope.CODE_SUCCESS){
        console.log(response.res_text);
      }else{

        $rootScope.premiss__menu(true,1);
        $rootScope.premiss__menu(true,2);
        $rootScope.premiss__menu(true,3);
        $rootScope.premiss__menu(true,4);
        $rootScope.premiss__menu(true,5);
        $rootScope.premiss__menu(true,6);
        $rootScope.premiss__menu(true,7);
        $rootScope.premiss__menu(true,8);
        $rootScope.premiss__menu(true,9);
        $rootScope.premiss__menu(true,10);
        $rootScope.premiss__menu(true,11);
        $rootScope.premiss__menu(true,12);

        $rootScope.premiss_status(true,1);
        $rootScope.premiss_status(true,2);
        $rootScope.premiss_status(true,4);


        angular.forEach(response.result, function (items) {
          var ii=0;
          angular.forEach(items.phya_page, function (items2) {
            if(items.page_name == "Inventory"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,1);
              }else if(items2.page_permission == "2"){
                //$rootScope.premiss_status(false,1);
              }
            }else if(items.page_name == "ChangePassword"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,5);
              }else if(items2.page_permission == "2"){
                $rootScope.premiss_status(false,4);
              }
            }else if(items.page_name == "CheckMap"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,3);
              }
            }else if(items.page_name == "CreateNewAssets"){
              if(items2.page_permission == "1"){
                ii++;
              }else if(items2.page_permission == "2"){
                ii++;
              }
              if(ii == 2){
                $rootScope.premiss_status(false,2);
              }
            }else if(items.page_name == "Help"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,6);
              }
            }else if(items.page_name == "QRCode"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,4);
              }
            }else if(items.page_name == "Inventory Info"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,7);
              }else if(items2.page_permission == "2"){
                $rootScope.premiss_status(false,5);
              }
            }else if(items.page_name == "Inventory Repair"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,8);
              }else if(items2.page_permission == "2"){
                $rootScope.premiss_status(false,6);
              }
            }else if(items.page_name == "Inventory Owner"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,9);
              }else if(items2.page_permission == "2"){
                $rootScope.premiss_status(false,7);
              }
            }else if(items.page_name == "Inventory Map"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,10);
              }else if(items2.page_permission == "2"){
                $rootScope.premiss_status(false,8);
              }
            }else if(items.page_name == "Inventory Asset Location"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,11);
                $rootScope.premiss_write_ass11 = false;
              }else if(items2.page_permission == "2"){
                $rootScope.premiss_status(false,9);
              }
            }else if(items.page_name == "Inventoy Capex"){
              if(items2.page_permission == "1"){
                $rootScope.premiss__menu(false,12);
              }
            }
          })
        })
      }
    }
  }).error(function(error,status,headers,config){ console.log(error); });

  $rootScope.premiss_info1 = false;
  $rootScope.premiss_info2 = false;
  $rootScope.premiss_info3 = false;
  $rootScope.premiss_info4 = false;
  $rootScope.premiss_info5 = false;
  $rootScope.premiss_info6 = false;
  $rootScope.premiss_info7 = false;
  $rootScope.premiss_info8 = false;
  $rootScope.premiss_info9 = false;
  $rootScope.premiss_info10 = false;
  $rootScope.premiss_info11 = false;
  $rootScope.premiss_info12 = false;
  $rootScope.premiss_info13 = false;
  $rootScope.premiss_info14 = false;
  $rootScope.premiss_info15 = false;
  $rootScope.premiss_info16 = false;
  $rootScope.premiss_info17 = false;
  $rootScope.premiss_info18 = false;
  $rootScope.premiss_info19 = false;
  $rootScope.premiss_info20 = false;
  $rootScope.premiss_info21 = false;
  $rootScope.premiss_info22 = false;
  $rootScope.premiss_info23 = false;
  $rootScope.premiss_info24 = false;
  $rootScope.premiss_info25 = false;
  $rootScope.premiss_info26 = false;
  $rootScope.premiss_info27 = false;
  $rootScope.premiss_info28 = false;
  $rootScope.premiss_info29 = false;
  $rootScope.premiss_info30 = false;
  $rootScope.premiss_info31 = false;
  $rootScope.premiss_info32 = false;
  $rootScope.premiss_info33 = false;
  $rootScope.premiss_info34 = false;
  $rootScope.premiss_info35 = false;
  $rootScope.premiss_info36 = false;
  $rootScope.premiss_info37 = false;
  $rootScope.premiss_info38 = false;
  $rootScope.premiss_info39 = false;
  $rootScope.premiss_info40 = false;
  $rootScope.premiss_info41 = false;
  $rootScope.premiss_info42 = false;
  $rootScope.premiss_info43 = false;
  $rootScope.premiss_info44 = false;
  $rootScope.premiss_info45 = false;
  $rootScope.premiss_info46 = false;
  $rootScope.premiss_info47 = false;

  var request = {
    'api_id' : 35,
    'group_id' : $rootScope.group_id
  };
  $rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
    if($rootScope.success){
      if(response.res_code != $rootScope.CODE_SUCCESS){
        console.log(response.res_text);
      }else{
        angular.forEach(response.result, function (items) {

          if(items.info_name == "Asset Category"){
            $rootScope.premiss_info1 = true;
          }else if(items.info_name == "Category Description"){
            $rootScope.premiss_info2 = true;
          }else if(items.info_name == "Asset Account"){
            $rootScope.premiss_info3 = true;
          }else if(items.info_name == "Cost Center Description"){
            $rootScope.premiss_info4 = true;
          }else if(items.info_name == "Location"){
            $rootScope.premiss_info5 = true;
          }else if(items.info_name == "Tag Number"){
            $rootScope.premiss_info6= true;
          }else if(items.info_name == "Asset Number"){
            $rootScope.premiss_info7= true;
          }else if(items.info_name == "Major Category"){
            $rootScope.premiss_info8 = true;
          }else if(items.info_name == "Minor Category"){
            $rootScope.premiss_info9 = true;
          }else if(items.info_name == "Name Category"){
            $rootScope.premiss_info10 = true;
          }else if(items.info_name == "Asset Description"){
            $rootScope.premiss_info11 = true;
          }else if(items.info_name == "Units"){
            $rootScope.premiss_info12 = true;
          }else if(items.info_name == "Cost"){
            $rootScope.premiss_info13 = true;
          }else if(items.info_name == "Depreciation"){
            $rootScope.premiss_info14 = true;
          }else if(items.info_name == "Depreciation Reserve"){
            $rootScope.premiss_info15 = true;
          }else if(items.info_name == "NBV at Period End"){
            $rootScope.premiss_info16 = true;
          }else if(items.info_name == "Life Year.month"){
            $rootScope.premiss_info17 = true;
          }else if(items.info_name == "Date of Acquisition"){
            $rootScope.premiss_info18 = true;
          }else if(items.info_name == "Asset Cost Acct"){
            $rootScope.premiss_info19 = true;
          }else if(items.info_name == "Accum Deprn Acct"){
            $rootScope.premiss_info20 = true;
          }else if(items.info_name == "Account Description"){
            $rootScope.premiss_info21 = true;
          }else if(items.info_name == "Employee Name"){
            $rootScope.premiss_info22 = true;
          }else if(items.info_name == "Serial Number"){
            $rootScope.premiss_info23 = true;
          }else if(items.info_name == "IT Serial No"){
            $rootScope.premiss_info24 = true;
          }else if(items.info_name == "Category IT"){
            $rootScope.premiss_info25 = true;
          }else if(items.info_name == "Sub Category IT"){
            $rootScope.premiss_info26 = true;
          }else if(items.info_name == "Brand"){
            $rootScope.premiss_info27 = true;
          }else if(items.info_name == "Model"){
            $rootScope.premiss_info28 = true;
          }else if(items.info_name == "Specification"){
            $rootScope.premiss_info29 = true;
          }else if(items.info_name == "Ethernet Mac"){
            $rootScope.premiss_info30 = true;
          }else if(items.info_name == "Wireless Mac"){
            $rootScope.premiss_info31 = true;
          }else if(items.info_name == "Site"){
            $rootScope.premiss_info32 = true;
          }else if(items.info_name == "Building"){
            $rootScope.premiss_info33 = true;
          }else if(items.info_name == "Floor"){
            $rootScope.premiss_info34 = true;
          }else if(items.info_name == "Department"){
            $rootScope.premiss_info35 = true;
          }else if(items.info_name == "Computer Name"){
            $rootScope.premiss_info36 = true;
          }else if(items.info_name == "Recive Date"){
            $rootScope.premiss_info37 = true;
          }else if(items.info_name == "Date of purchase"){
            $rootScope.premiss_info38 = true;
          }else if(items.info_name == "Install Date"){
            $rootScope.premiss_info39 = true;
          }else if(items.info_name == "Warranty Date"){
            $rootScope.premiss_info40 = true;
          }else if(items.info_name == "Warranty Expire"){
            $rootScope.premiss_info41 = true;
          }else if(items.info_name == "Vender"){
            $rootScope.premiss_info42 = true;
          }else if(items.info_name == "Contact Vender"){
            $rootScope.premiss_info43 = true;
          }else if(items.info_name == "invoice number"){
            $rootScope.premiss_info44 = true;
          }else if(items.info_name == "Rent"){
            $rootScope.premiss_info45 = true;
          }else if(items.info_name == "Status"){
            $rootScope.premiss_info46 = true;
          }else if(items.info_name == "Remark"){
            $rootScope.premiss_info47 = true;
          }else if(items.info_name == "Employee Number"){
            $rootScope.premiss_info48 = true;
          }

        })
      }
    }
  }).error(function(error,status,headers,config){ console.log(error); });

  var request = {
    'api_id' : 6,
    'hospital_idAll' : $rootScope.hospital_id
  };
  $rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
    if($rootScope.success){
      if(response.res_code != $rootScope.CODE_SUCCESS){
        console.log(response.res_text);
      }else{
        angular.forEach(response.result, function (items) {
          $rootScope.HospitalDataArray.push(items);console.log(items);
        })
      }
    }
  }).error(function(error,status,headers,config){console.log(error);});

}

$rootScope.premiss__menu = function (text,index) {
  if(index == 1){
    $rootScope.premiss_write_menu1 = text;
  }else if(index == 2){
    $rootScope.premiss_write_menu2 = text;
  }else if(index == 3){
    $rootScope.premiss_write_menu3 = text;
  }else if(index == 4){
    $rootScope.premiss_write_menu4 = text;
  }else if(index == 5){
    $rootScope.premiss_write_menu5 = text;
  }else if(index == 6){
    $rootScope.premiss_write_menu6 = text;
  }else if(index == 7){
    $rootScope.premiss_write_menu7 = text;
  }else if(index == 8){
    $rootScope.premiss_write_menu8 = text;
  }else if(index == 9){
    $rootScope.premiss_write_menu9 = text;
  }else if(index == 10){
    $rootScope.premiss_write_menu10 = text;
  }else if(index == 11){
    $rootScope.premiss_write_menu11 = text;
  }else if(index == 12){
    $rootScope.premiss_write_menu12 = text;
  }
};

$rootScope.premiss_status = function (text,index) {
  if(index == 1){
    $rootScope.premiss_write_ass1 = text;
    $rootScope.premiss_write_ass2 = text;
    $rootScope.premiss_write_ass3 = text;
    $rootScope.premiss_write_ass4 = text;
    $rootScope.premiss_write_ass5 = text;
    $rootScope.premiss_write_ass6 = text;
    $rootScope.premiss_write_ass7 = text;
    $rootScope.premiss_write_ass8 = text;
    $rootScope.premiss_write_ass9 = text;
    $rootScope.premiss_write_ass10 = text;
    $rootScope.premiss_write_ass11 = text;
  }else if(index == 2){
    $rootScope.premiss_write_Cre1 = text;
    if(text){
      $rootScope.premiss__menu(true,2);
    }else{
      $rootScope.premiss__menu(false,2);
    }
  }else if(index == 4){
    $rootScope.premiss_write_Change1 = text;
  }else if(index == 5){
    $rootScope.premiss_write_ass2 = text;
  }else if(index == 6){

  }else if(index == 7){
    $rootScope.premiss_write_ass4 = text;
    $rootScope.premiss_write_ass5 = text;
    $rootScope.premiss_write_ass6 = text;
  }else if(index == 8){
    $rootScope.premiss_write_ass7 = text;
    $rootScope.premiss_write_ass8 = text;
  }else if(index == 9){
    $rootScope.premiss_write_ass1 = text;
    $rootScope.premiss_write_ass3 = text;
    $rootScope.premiss_write_ass9 = text;
    $rootScope.premiss_write_ass10 = text;
  }
};

$ionicPlatform.registerBackButtonAction(function() {
  console.log($location.path());

  if ($location.path() === "/app/Assets_Check" || $location.path() === "Assets_Check") {

    if($rootScope.backButtonPressedOnceToExit){
      navigator.app.exitApp();//ok
    }else{
      $rootScope.backButtonPressedOnceToExit = true;
      $rootScope.toast("Press back button again to exit");
      setTimeout(function(){
        $rootScope.backButtonPressedOnceToExit = false;
      },2000);
    }

  }else if ($location.path() === "/tab/Detail_Assets/Detail_Assets_INFO" || $location.path() === "Detail_Assets_INFO") {
    $rootScope.Back_1();//ok
  }else if ($location.path() === "/tab/Detail_Assets/Detail_Assets_REPAIR" || $location.path() === "Detail_Assets_REPAIR") {
    $rootScope.Back_1();//ok
  }else if ($location.path() === "/tab/Detail_Assets/Detail_Assets_OWNER" || $location.path() === "Detail_Assets_OWNER") {
    $rootScope.Back_1();//ok
  }else if ($location.path() === "/tab/Detail_Assets/Detail_Assets_OWNER_Detail" || $location.path() === "Detail_Assets_OWNER_Detail") {
    $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_OWNER'); //ok
  }else if ($location.path() === "/AddOwner" || $location.path() === "AddOwner") {
    $rootScope.Back_2();//ok
  }else if ($location.path() === "/tab/Detail_Assets/Detail_Assets_MAP" || $location.path() === "Detail_Assets_MAP") {
    $rootScope.Back_1();//ok
  }else if ($location.path() === "/AddMap" || $location.path() === "AddMap") {
    $rootScope.Back_3();//ok
  }else if ($location.path() === "/AssMapShow" || $location.path() === "AssMapShow") {
    $rootScope.Back_4();//ok
  }else if ($location.path() === "/Detail_AssetsImg" || $location.path() === "Detail_AssetsImg") {
    $rootScope.Back_5();//ok
  }else if ($location.path() === "/AssCapexShow" || $location.path() === "AssCapexShow") {
    $rootScope.Back_6();//ok
  }else if ($location.path() === "/app/Create_assets" || $location.path() === "Create_assets") {
    if($rootScope.btn_check_addass){
      $rootScope.back_7();//ok
    }else{
      $rootScope.checkconnect_statego('app.Assets_Check'); //ok
    }
  }else if ($location.path() === "/app/Check_Map" || $location.path() === "Check_Map") {
    $rootScope.checkconnect_statego('app.Assets_Check'); //ok
  }else if ($location.path() === "/app/Change_Pass" || $location.path() === "Change_Pass") {
    $rootScope.checkconnect_statego('app.Assets_Check'); //ok
  }else if ($location.path() === "/app/Help" || $location.path() === "Help") {
    $rootScope.checkconnect_statego('app.Assets_Check'); //ok
  }else if ($location.path() === "/Login" || $location.path() === "Login") {
    navigator.app.exitApp();//ok
  }

}, 100);

$rootScope.checkSeleteTab = function(index) {
  var text1="",text2="",text3="",text4="";
  if(index == 1){
    text1 = "active";
  }else if(index == 2){
    text2 = "active";
  }else if(index == 3){
    text3 = "active";
  }else if(index == 4){
    text4 = "active";
  }
  $rootScope.class_tab1 = text1;
  $rootScope.class_tab2 = text2;
  $rootScope.class_tab3 = text3;
  $rootScope.class_tab4 = text4;
}

$rootScope.fakeloadiong = function() {
  $ionicLoading.show({
    template: '<div class="textload">Loading</div>'+'<ion-spinner class="spinerload" icon="dots"></ion-spinner>',
    hideOnStageChange: true
  }).then(function(){});
  setTimeout(function(){
    $ionicLoading.hide().then(function(){});
  },600);
}

$rootScope.checkconnect_statego = function(text,test2) {
  $rootScope.connectionStatus = navigator.onLine ? 'online' : 'offline';
  if($rootScope.connectionStatus == "online"){
    $state.go(text,test2);
  }else{
    $rootScope.toast("Connection failure, please try again later");
  }
}

$rootScope.savelog = function(text,test2,test3,test4) {
  var request = {
    'api_id' : 33,
    'log_empid' : text,
    'log_page' : test2,
    'log_method' : test3,
    'log_type' : 2,
    'log_ref' : test4
  };
  $rootScope.ServiceThread($rootScope.Base_URL,request).success(function(response,status,headers,config){
    if($rootScope.success){
      if(response.res_code != $rootScope.CODE_SUCCESS){
        console.log(response.res_text);
      }else{

      }
    }
  }).error(function(error,status,headers,config){ console.log(error); });
}



})
