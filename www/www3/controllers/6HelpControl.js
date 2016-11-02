angular.module('Phyathai')

    .controller('6HelpControl',function($scope,$state,$stateParams,$ionicPopup,$window,$sceDelegate,$ionicLoading){

		$(".iframe_help").css("height",($window.innerHeight-40)+"px");
		$scope.checkload = true;
        var request = {
            'api_id' : 16
        };

        $scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
            if($scope.success){
                if(response.res_code != $scope.CODE_SUCCESS){
                    $scope.noMoreItemsAvailable = true;
                    console.log(response.res_text);
                }else{ console.log(response.result);
				
					$ionicLoading.show({
						template: '<div class="textload">Loading</div>'+'<ion-spinner class="spinerload" icon="dots"></ion-spinner>',
						hideOnStageChange: true
					}).then(function(){ $scope.checkload = true; });
					
                    angular.forEach(response.result, function (items) {
						$scope.text_pdf = "https://drive.google.com/viewerng/viewer?url="+items.help_pdf+"?pid=explorer&efh=false&a=v&chrome=false&embedded=true";
						
						$('iframe').load(function(){
							  //$(".loading").remove();
							  //alert("iframe is done loading");
							  $ionicLoading.hide().then(function(){
								$scope.checkload = false;
							  }); 
						}).show();
					})
					
					setTimeout(function(){
						if($scope.checkload){
							$ionicLoading.hide().then(function(){
								$scope.toast("ไม่สามารถเปิด Help ได้");
							  });
						}
					},30000);
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }).error(function(error,status,headers,config){
            console.log(error);
        });


    })
	
	.filter('trustAsResourceUrl', ['$sce', function($sce) {
		return function(val) {
			return $sce.trustAsResourceUrl(val);
		};
	 }])