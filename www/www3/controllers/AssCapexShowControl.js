angular.module('Phyathai')

    .controller('AssCapexShowControl',function($scope,$state,$stateParams,$ionicPopup,$timeout,$rootScope,$window,$ionicLoading) {

        $scope.checkload = true;
        $rootScope.Back_6 = function(){
               $scope.checkSeleteTab(1);
			   $rootScope.checkconnect_statego('tabs.Detail_Assets.Detail_Assets_INFO');
        }

		$scope.last = $stateParams.capex.substring($stateParams.capex.lastIndexOf("/") + 1, $stateParams.capex.length);
		$scope.namecapex = $scope.last;
		
		$ionicLoading.show({
			template: '<div class="textload">Loading</div>'+'<ion-spinner class="spinerload" icon="dots"></ion-spinner>',
			hideOnStageChange: true
		}).then(function(){ $scope.checkload = true; });
		
		$(".iframe_help").css("height",($window.innerHeight-40)+"px");	
        $scope.text_pdf_capex = "https://drive.google.com/viewerng/viewer?url="+$stateParams.capex+"?pid=explorer&efh=false&a=v&chrome=false&embedded=true";
		
			
		$('iframe').load(function(){
			  //$(".loading").remove();
			  //alert("iframe is done loading");
			  $ionicLoading.hide().then(function(){
				$scope.checkload = false;
			  });
			  
		}).show();
		
		setTimeout(function(){
			if($scope.checkload){
				$ionicLoading.hide().then(function(){
					$scope.toast("ไม่สามารถเปิด Capex ได้");
				  });
			}
		},30000);
		
		$scope.btndownload = function(){
			
			if($rootScope.deviceType == "1"){
				$rootScope.pathphone = '/mnt/sdcard/';
			}else{
				try{
				$rootScope.pathphone = cordova.file.applicationStorageDirectory+'Documents/'
				}catch(error){}
			}
			
			$ionicLoading.show({
				template: '<div class="textload">Loading</div>'+'<ion-spinner class="spinerload" icon="dots"></ion-spinner>',
				hideOnStageChange: true
			}).then(function(){});
			<!------ โหลด เปิด pdf ------->
			
			 var fileTransfer = new FileTransfer();
				fileTransfer.download(		
				$stateParams.capex,
				$rootScope.pathphone+"Phyathai_pdf/"+$scope.last,
				function(entry) {
					  $ionicLoading.hide().then(function(){
						$rootScope.toast('ดาวน์โหลดไฟล์สำเร็จ');
					  });
				},
				function(error) {
					  $ionicLoading.hide().then(function(){
						$rootScope.toast('ดาวน์โหลดไฟล์ไม่สำเร็จ');
					  });
					
				});	
			}
        
		
			
			
			
    })
	
	.filter('trustAsResourceUrl', ['$sce', function($sce) {
		return function(val) {
			return $sce.trustAsResourceUrl(val);
		};
	 }])