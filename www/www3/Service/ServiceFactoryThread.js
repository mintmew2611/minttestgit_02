angular.module('Phyathai')

    .run(function($ionicPlatform,$rootScope,$http,$ionicLoading) {

        $rootScope.ServiceThread = function(url,request) {

				$ionicLoading.show({
					template: '<div class="textload">Loading</div>'+'<ion-spinner class="spinerload" icon="dots"></ion-spinner>',
					hideOnStageChange: true
				}).then(function(){});
				//$ionicLoading.show();
        
				return $http({
					method: 'POST',
					datatype:'json',
					timeout : 30000,
					contentType: "application/json; charset=utf-8",
					cache: false,
					url: url,
					data:request
				}).success(function (data, status, headers, config){
					if (status == '200') {
						var obj = data;
						$rootScope.success = true;
					}
					$ionicLoading.hide().then(function(){});
				}).error(function (data, status, headers, config){
					$ionicLoading.hide().then(function(){
						$rootScope.toast("Connection failure, please try again later");
					});
				});

        }

    })
