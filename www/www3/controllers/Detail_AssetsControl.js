angular.module('Phyathai')

.controller('Detail_AssetsControl',function($ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate   ,$window,$ionicLoading,$scope,$http,$state,$ionicSlideBoxDelegate,$ionicActionSheet,$rootScope,$ionicPopup,$timeout,$ionicModal,$ionicScrollDelegate, $cordovaCamera, $cordovaDevice, $cordovaActionSheet){

  if($rootScope.checkreset_banner){
    $rootScope.DetailImgDataArray = [];
    $rootScope.DetailImgDataArray.push("img/bg_white.png");
    $ionicSlideBoxDelegate.update();
  }
  $rootScope.checkreset_banner = false;

  $scope.positopn_delete = 0;
  $scope.zoomMin = 1;
  $scope.showImages = function(index) {
    if($rootScope.btnaddimage_ass){
      $scope.positopn_delete = index;
      $scope.text_count_zoom = (index+1)+" / "+$rootScope.DetailImgDataArray.length;
      $scope.activeSlide = index;
      $scope.showModal('templates/gallery-zoomview.html');
    }else{
      if(!$rootScope.premiss_write_ass10){
        $scope.AddImage();
      }else{
        $rootScope.toast("คุณไม่มีสิทธิ์ในการเพิ่มรูป");
      }
    }
  };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.slideChanged = function(index) {
    $scope.positopn_delete = index;
    $scope.text_count_zoom = (index+1)+" / "+$rootScope.DetailImgDataArray.length;
  };

  $scope.updateSlideStatus = function(slide) {

    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };

  $ionicScrollDelegate.scrollTop();
  $rootScope.IdImgDataArray = [];
  $scope.DetailOwnerDataArray = [];
  $scope.DetailRepairDataArray = [];
  $rootScope.EditBuildDataArray = [];
  $rootScope.EditfloorDataArray = [];
  $rootScope.EditDepartDataArray = [];

  $scope.clicktab1 = function() { $scope.checkSeleteTab(1); }
  $scope.clicktab2 = function() { $scope.checkSeleteTab(2); }
  $scope.clicktab3 = function() { $scope.checkSeleteTab(3); }
  $scope.clicktab4 = function() { $scope.checkSeleteTab(4); }

  $rootScope.savelenge = 0;

  if($rootScope.deviceType == "2"){
    $(".slider-slides").css("margin-top","19px");
  }

  var date = new Date();

  var request = {
    'api_id' : 2,
    'invent_id' : $rootScope.invent_id,
    'group_id' : $rootScope.group_id
  };
  $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
    if($scope.success){
      if(response.res_code != $scope.CODE_SUCCESS){
        console.log(response.res_text);
      }else{//console.log(response.result);

        $rootScope.DetailImgDataArray = [];
        $rootScope.IdImgDataArray = [];
        $rootScope.ImgArray_Ass = [];
        angular.forEach(response.result, function (items) {

          $rootScope.nametitle = items.invent_comp_name;
          $rootScope.name1 = items.invent_asset_cat;
          $rootScope.name2 = items.invent_asset_cat_description;
          $rootScope.name3 = items.invent_asset_account;
          $rootScope.name4 = items.costcenter_description;
          $rootScope.name5 = items.invent_asset_location;
          $rootScope.name6 = items.invent_tag_no;
          $rootScope.name7 = items.invent_asset_no;
          $rootScope.name8 = items.invent_major_cat;
          $rootScope.name9 = items.invent_minor_cat;
          $rootScope.name10 = items.invent_cat_name;
          $rootScope.name11 = items.invent_asset_description;
          $rootScope.name12 = items.invent_unit;
          $rootScope.name13 = items.invent_cost;
          $rootScope.name14 = items.invent_depreciation;
          $rootScope.name15 = items.invent_depreciation_reserve;
          $rootScope.name16 = items.invent_nbv;
          $rootScope.name17 = items.invent_life_year;
          $rootScope.name18 = items.invent_dateofacquistion;
          $rootScope.name19 = items.invent_asset_cost_acct;
          $rootScope.name20 = items.invent_accum;
          $rootScope.name21 = items.invent_accout_description;
          $rootScope.name22 = items.invent_employee_name;
          $rootScope.name23 = items.invent_asset_serial_no;
          $rootScope.name24 = items.invent_serial_no;
          $rootScope.name25 = items.invent_cat;
          $rootScope.name26 = items.cat_name;
          $rootScope.name27 = items.band_name;
          $rootScope.name28 = items.invent_model;
          $rootScope.name29 = items.invent_specification;
          $rootScope.name30 = items.invent_wifi_mac_address;
          $rootScope.name31 = items.invent_mac_ethernet;
          $rootScope.name32 = items.invent_site;
          $rootScope.name33 = items.invent_build;
          $rootScope.name34 = items.invent_floor;
          $rootScope.name35 = items.invent_department;
          $rootScope.name36 = items.invent_comp_name;
          $rootScope.name37 = items.invent_recivedate;
          $rootScope.name38 = items.invent_buy_date;
          $rootScope.name39 = items.invent_installdate;
          $rootScope.name40 = items.invent_waranty_date;
          $rootScope.name41 = items.invent_warranty_expire;
          $rootScope.name42 = items.invent_vender;
          $rootScope.name43 = items.invent_contactvender;
          $rootScope.name44 = items.invent_invoice_number;
          $rootScope.name45 = items.invent_rent;
          $rootScope.name46 = items.invent_status_name;
          $rootScope.name47 = items.invent_remark;
          $rootScope.name48 = items.hospital_name;


          $rootScope.add_status = items.invent_status_id;
          $rootScope.add_cat = items.cat_id;
          $rootScope.add_brand = items.brand_id;
          $rootScope.add_build = items.invent_build_id;
          $rootScope.add_floor = items.invent_floor_id;
          $rootScope.add_depart = items.invent_department_id;
          $rootScope.add_cost = items.costcenter_description;

          if(items.invent_department == null){
            $rootScope.checkbtnshowmap = false;
          }else{
            $rootScope.checkbtnshowmap = true;
          }

          $scope.depart_id = items.invent_department_id;
          $scope.build_id = items.invent_build_id;
          $scope.floor_id = items.invent_floor_id;
          $scope.brand_id = items.brand_id;
          $scope.cat_id = items.cat_id;
          $scope.capex = items.invent_capex;
          $scope.map_id = items.invent_floor_id;
          $scope.map_url = items.invent_map_image;
          $scope.map_location = items.invent_location;
          $rootScope.invent_type = items.invent_type;
          $scope.cat_img_icon = items.cat_img_icon;

          angular.forEach(items.img_url, function (items2) {
            $rootScope.DetailImgDataArray.push(items2.invent_img_url);
            $rootScope.IdImgDataArray.push(items2.invent_img_id);
            $rootScope.ImgArray_Ass.push(items2.invent_img_url);
          })
          angular.forEach(items.repair_history, function (items3) {
            $scope.DetailRepairDataArray.push(items3);
          })
          $scope.save_stoptime = true;
          angular.forEach(items.inventory_owner, function (items4) {
            $scope.DetailOwnerDataArray.push(items4);
            if($scope.save_stoptime){
              $rootScope.savetext_checkstart = items4.invent_own_start
              $rootScope.savetext_checkstop = items4.invent_own_stop;
              $scope.save_stoptime = false;
              $scope.save_stoptime2 = true;
            }else if($scope.save_stoptime2){
              $rootScope.savetext_checkstop2 = items4.invent_own_stop;
              $scope.save_stoptime2 = false;
            }
          })
          $rootScope.btnaddimage_ass = true;
          if($rootScope.DetailImgDataArray.length < 1){
            $rootScope.DetailImgDataArray.push('img/Assets_bg_img_empty.png');
            $rootScope.btnaddimage_ass = false;
          }

          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.slide(0);
          $rootScope.savelenge = $scope.DetailOwnerDataArray.length;

        })

      }
    }
  }).error(function(error,status,headers,config){
    console.log(error);
  });



  $scope.next_edit_map = function(){


    var invent_id = $rootScope.invent_id;
    var request1 = {
      'api_id' : 19,
      'hospital_id' : $rootScope.hospital_id,
      'building_id' : $scope.build_id,
      'floor_id' : $scope.floor_id
    };
    $scope.ServiceThread($scope.Base_URL,request1).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          console.log(response.res_text);
        }else{
          angular.forEach(response.result, function (items1) {
            angular.forEach(items1.build, function (items) {
              $rootScope.EditBuildDataArray.push(items);
            })
          })
          angular.forEach(response.result, function (items1) {
            angular.forEach(items1.floors, function (items) {
              $rootScope.EditfloorDataArray.push(items);
            })
          })
          angular.forEach(response.result, function (items1) {
            angular.forEach(items1.department, function (items) {
              $rootScope.EditDepartDataArray.push(items);
            })
          })

          $rootScope.Ass_namebuild = $scope.build_id;
          $rootScope.Ass_namefloor = $scope.floor_id;
          $rootScope.Ass_namedepart = $scope.depart_id;

          $rootScope.Ass_Select1 = $scope.build_id;
          $rootScope.Ass_Select2 = $scope.floor_id;
          $rootScope.Ass_Select3 = $scope.depart_id;

        }
      }}).error(function(error){console.log(error);});

      $rootScope.btn_check_map = false;
      $rootScope.title_check_map = "EDIT MAP";
      $rootScope.checkconnect_statego('AddMap');


    }
    $scope.next_add_owner = function(){


      if($scope.DetailOwnerDataArray.length > 0){
        var textdeta = $rootScope.savetext_checkstop.split("/");
        var dateS1 = new Date((textdeta[2]),(textdeta[1]-1),textdeta[0]);
        var dateS2 = new Date(date.getFullYear(),date.getMonth(),date.getDate());
        var textdeta2 = $rootScope.savetext_checkstart.split("/");
        var dateS3 = new Date((textdeta2[2]),(textdeta2[1]-1),textdeta2[0]);
      }

      if((dateS1 <= dateS2 && dateS3 <= dateS2) || $scope.DetailOwnerDataArray.length < 1){
        $rootScope.btn_add_owner = true;
        $rootScope.checkconnect_statego('AddOwner');
      }else{
        $rootScope.toast('กรุณาเลือกวันสิ้นสุดถือครองทรัพย์สินเป็นวันปัจจุบัน');
      }
    }

    $scope.btn_print = function(){
      $rootScope.toast('ฟังก์ชั่นนี้ ยังไม่สามารถใช้งานได้');
    }

    $scope.btn_editAss = function(){
      $rootScope.checkAddAss = false;
      $rootScope.btn_check_addass = true;
      $rootScope.btn_check_addass_new = false;
      if($rootScope.invent_type == "1"){
        $rootScope.btn_check_import = true;
      }else{
        $rootScope.btn_check_import = false;
      }

      $rootScope.checkconnect_statego('app.Create_assets');
    }

    $scope.showpagemap = function(){

      $.ajax({
        type: 'HEAD',
        url: $scope.map_url,
        success: function() {
          $rootScope.checkconnect_statego('AssMapShow',{map_url:$scope.map_url,map_id:$scope.map_id,map_location:$scope.map_location ,url_marker:$scope.cat_img_icon});
        },
        error: function() {
          $rootScope.toast("ไม่พบรูปแผนที่ตำแหน่งทรัพย์สิน");
        }
      });
    }

    $rootScope.Back_1 = function(){
      if($rootScope.checkbackpageinfo){
        $rootScope.checkconnect_statego('app.Assets_Check');
      }else{
        $rootScope.checkconnect_statego('app.Check_Map');
      }
    }


    $scope.btn_showcapex = function() {
      $.ajax({
        type: 'HEAD',
        url: $scope.capex,
        success: function() {
          $rootScope.checkconnect_statego('AssCapexShow',{capex:$scope.capex});
        },
        error: function() {
          $rootScope.toast("ไม่พบ Capex");
        }
      });
    };


    $scope.btn_showAssImg = function() {
      $rootScope.checkconnect_statego('Detail_AssetsImg');
    };

    $scope.changePage_ownerDetail = function(data,index){

      $rootScope.fakeloadiong();
      if(index == 0){
        $rootScope.checkedit_dateass = true;
      }else{
        $rootScope.checkedit_dateass = false;
      }
      $scope.checkSeleteTab(3);
      $rootScope.invent_owner_id = data.invent_owner_id;
      $rootScope.name_ownerdetail = data.emp_name+" "+data.emp_lastname;
      $rootScope.id_ownerdetail = data.emp_id_real;
      $rootScope.position_ownerdetail = data.position_name;
      $rootScope.depart_ownerdetail = data.department_name;
      $rootScope.date_ownerdetail = data.invent_own_start;
      $rootScope.date_st_ownerdetail = data.invent_own_stop;
      $rootScope.img_ownerdetail = data.emp_picture;
      $rootScope.id_empclick = data.emp_id;
      $rootScope.img_empclick = data.emp_picture_idcard;
      $rootScope.nameaddby = data.addby;
      $rootScope.nametitle = $scope.nametitle;
      $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_OWNER_Detail');
      setTimeout(function(){
        //$rootScope.checkorientation(".setori_img_owner");
      },100);


    }


    $scope.delete_imgzoom = function() {

      $scope.closeModal();
      var confirmPopup = $ionicPopup.confirm({
        title: $scope.TitleDialog,
        template: $scope.DatailDialog_delete_ass
      });

      confirmPopup.then(function (res) {
        if (res) {
          setTimeout(function(){
            // $scope.index_phswipe = $(".number_count_zoom").text().split(" / ");
            console.log($scope.positopn_delete+" - "+$rootScope.IdImgDataArray[($scope.positopn_delete)]);
            var request = {
              'api_id' : 20,
              'invent_img_id' : $rootScope.IdImgDataArray[($scope.positopn_delete)],
              'invent_id' : $rootScope.invent_id,
            };
            $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
              if($scope.success){
                if(response.res_code != $scope.CODE_SUCCESS){
                  console.log(response.res_text);
                }else{
                  $rootScope.savelog($rootScope.emps_id,"AssetsMangement",3,$rootScope.invent_id);
                  $rootScope.DetailImgDataArray.splice($scope.positopn_delete,1);
                  $rootScope.IdImgDataArray.splice($scope.positopn_delete,1);
                  $rootScope.ImgArray_Ass.splice($scope.positopn_delete,1);
                  //$rootScope.images.splice($scope.positopn_delete,1);

                  if($rootScope.DetailImgDataArray.length < 1){
                    $rootScope.btnaddimage_ass = false;
                    $rootScope.DetailImgDataArray.push('img/Assets_bg_img_empty.png');
                    $rootScope.doRefresh_list();
                  }
                  $ionicSlideBoxDelegate.update();
                  $ionicSlideBoxDelegate.slide(0);
                }
              }}).error(function(error,status,headers,config){ console.log(error); });
            },500);
          } else {
            console.log('ยกเลิก');
          }
        });
      };

$scope.showGallery = function(i){
  if($rootScope.btnaddimage_ass){
    $rootScope.count_i = i;
    $(".height_imgzoom").css("max-height",($window.innerHeight)+"px");
    $(".img"+i).click();
  }else{
    if(!$rootScope.premiss_write_ass10){
      $scope.AddImage();
    }else{
      $rootScope.toast("คุณไม่มีสิทธิ์ในการเพิ่มรูป");
    }
  }
}


/////////////////////////
//////////////////////////
$scope.AddImage = function() {

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
        $scope.selectPicture_Ass(type);
      }
      return true;
    }
  });
};

$scope.selectPicture_Ass = function(sourceType) {
  var options = {
    quality: 80,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: sourceType,
    correctOrientation: true,
    targetWidth: 800
  };
  navigator.camera.getPicture(onSuccess, onFail, options);
  function onSuccess(imageData) {
    var request = {
      'api_id' : 11,
      'invent_id' : $rootScope.invent_id,
      'invent_imgurl' : "data:image/jpeg;base64," + imageData
    };
    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          console.log(response.res_text);
        }else{
          $rootScope.savelog($rootScope.emps_id,"AssetsMangement",1,$rootScope.invent_id);
          $scope.checkref = false;
          if($rootScope.DetailImgDataArray[0] == "img/Assets_bg_img_empty.png") {
            $rootScope.btnaddimage_ass = true;
            $rootScope.DetailImgDataArray = [];
            $scope.checkref = true;
          }
          $rootScope.DetailImgDataArray.splice(0, 0, "data:image/jpeg;base64," + imageData);
          $rootScope.IdImgDataArray.splice(0, 0,response.result);
          $rootScope.ImgArray_Ass.splice(0, 0, "data:image/jpeg;base64," + imageData);
          /*$rootScope.images.splice(0, 0,{
          src: response.image,
          safeSrc: response.image,
          thumb: response.image,
          caption: '',
          size: $rootScope.screenSize($window.innerWidth	, $window.innerHeight),
          type: 'image'
        });*/
        if($scope.checkref){
          $rootScope.doRefresh_list();
        }
        $ionicSlideBoxDelegate.update();
        $ionicSlideBoxDelegate.slide(0);
      }
    }
  }).error(function(error,status,headers,config){console.log(error);});

}
function onFail(message) {
  //alert('Failed because: ' + message);
}
};
////////////////////////////
/////////////////////////////


/////////////////////////
//////////////////////////
$scope.AddImage_owner = function() {

  // Show the action sheet
  /*var hideSheet = $ionicActionSheet.show({
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
$scope.selectPicture_owner(type);
}
return true;
}
});*/
};

$scope.selectPicture_owner = function(sourceType) { console.log($rootScope.id_empclick);
  var options = {
    quality: 80,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: sourceType,
    correctOrientation: true,
    targetWidth: 800
  };
  navigator.camera.getPicture(onSuccess, onFail, options);
  function onSuccess(imageData) {
    var request = {
      'api_id' : 13,
      'emp_id' : $rootScope.id_empclick,
      'emp_imgurl' : "data:image/jpeg;base64," + imageData
    };
    $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
      if($scope.success){
        if(response.res_code != $scope.CODE_SUCCESS){
          console.log(response.res_text);
        }else{
          $rootScope.savelog($rootScope.emps_id,"AssetsMangement",2,$rootScope.id_empclick);
          $scope.img_ownerdetail = "data:image/jpeg;base64," + imageData;
          //$rootScope.checkorientation(".setori_img_owner");
        }
      }
    }).error(function(error,status,headers,config){
      console.log(error);
    });
  }
  function onFail(message) {
    //alert('Failed because: ' + message);
  }
};
////////////////////////////
/////////////////////////////




})
