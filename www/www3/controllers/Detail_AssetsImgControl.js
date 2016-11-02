angular.module('Phyathai')


.controller('Detail_AssetsImgControl',function($ionicActionSheet,$scope,$state,$stateParams,$rootScope,$window,$timeout,$ionicModal,$ionicScrollDelegate,$ionicSlideBoxDelegate, $cordovaCamera, $cordovaDevice, $ionicPopup, $cordovaActionSheet) {



  if($rootScope.deviceType == "2"){
    $(".classios_imgall").css("top","120px");
  }

  $scope.windowWidth = $window.innerWidth;
  $window.onresize = function(event) {
    $timeout(function() {
      $scope.windowWidth = $window.innerWidth;
    });
  };

  $rootScope.Back_5 = function(){
    $scope.checkSeleteTab(1);
    $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
  }

  $rootScope.images_all_ass = [];
  for(var i = 0; i < $rootScope.ImgArray_Ass.length; i++) {
    $rootScope.images_all_ass.push($rootScope.ImgArray_Ass[i]);
  }
  //$rootScope.checkorientation(".setori_img_assall");


  $scope.positopn_delete = 0;
  $scope.zoomMin = 1;
  $scope.showImages = function(index) {
    $scope.positopn_delete = index;
    $scope.text_count_zoom = (index+1)+" / "+$rootScope.images_all_ass.length;
    $scope.activeSlide = index;
    $scope.showModal('templates/gallery-zoomview2.html');
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
    $scope.text_count_zoom = (index+1)+" / "+$rootScope.images_all_ass.length;
  };

  $scope.updateSlideStatus = function(slide) {

    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };


  $scope.showGallery = function(i){console.log(i);
    $rootScope.count_i = i;
    $(".height_imgzoom").css("max-height",($window.innerHeight)+"px");
    $(".img"+i).click();
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
          //$scope.index_phswipe = $(".pswp__counter").text().split(" / ");
          var request = {
            'api_id' : 20,
            'invent_img_id' : $rootScope.IdImgDataArray[$scope.positopn_delete],
            'invent_id' : $rootScope.invent_id,
          };
          $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
            if($scope.success){
              if(response.res_code != $scope.CODE_SUCCESS){
                console.log(response.res_text);
              }else{
                $rootScope.savelog($rootScope.emps_id,"AssetsMangement",3,$rootScope.invent_id);
                // $scope.DetailImgDataArray2.splice(($scope.index_phswipe[0]-1),1);
                $rootScope.IdImgDataArray.splice($scope.positopn_delete,1);
                $rootScope.ImgArray_Ass.splice($scope.positopn_delete,1);
                //$rootScope.images.splice($scope.positopn_delete,1);
                $rootScope.images_all_ass.splice($scope.positopn_delete,1);
                $ionicSlideBoxDelegate.update();
                //$rootScope.checkorientation(".setori_img_assall");
              }
            }}).error(function(error,status,headers,config){ console.log(error); });
          },500);
        } else {
          console.log('ยกเลิก');
        }
      });

    };
    /*$(".delete_imgzoom").unbind("click").click(function() {

    $(".pswp__button--close").click();
    var confirmPopup = $ionicPopup.confirm({
    title: $scope.TitleDialog,
    template: $scope.DatailDialog_delete_ass
  });

  confirmPopup.then(function (res) {
  if (res) {
  setTimeout(function(){
  //$scope.index_phswipe = $(".pswp__counter").text().split(" / ");
  var request = {
  'api_id' : 20,
  'invent_img_id' : $rootScope.IdImgDataArray[$scope.positopn_delete],
  'invent_id' : $rootScope.invent_id,
};
$scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
if($scope.success){
if(response.res_code != $scope.CODE_SUCCESS){
console.log(response.res_text);
}else{
// $scope.DetailImgDataArray2.splice(($scope.index_phswipe[0]-1),1);
$rootScope.IdImgDataArray.splice($scope.positopn_delete,1);
$rootScope.ImgArray_Ass.splice($scope.positopn_delete,1);
//$rootScope.images.splice($scope.positopn_delete,1);
$rootScope.images_all_ass.splice($scope.positopn_delete,1);
$ionicSlideBoxDelegate.update();
$rootScope.checkorientation(".setori_img_assall");
}
}}).error(function(error,status,headers,config){ console.log(error); });
},500);
} else {
console.log('ยกเลิก');
}
});

});*/


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
          $rootScope.IdImgDataArray.splice(0, 0,response.result);
          /*$rootScope.images.splice(0, 0,{
          src: response.image,
          safeSrc: response.image,
          thumb: response.image,
          caption: '',
          size: $rootScope.screenSize($window.innerWidth	, $window.innerHeight),
          type: 'image'
        });*/
        $rootScope.images_all_ass.splice(0, 0, "data:image/jpeg;base64," + imageData);
        $rootScope.ImgArray_Ass.splice(0, 0, "data:image/jpeg;base64," + imageData);
        setTimeout(function(){
          //$rootScope.checkorientation(".setori_img_assall");
        },100);

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



});
