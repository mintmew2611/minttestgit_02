angular.module('Phyathai')

    .controller('5Change_PassControl',function($scope,$state,$stateParams,$ionicPopup,$rootScope,$ionicHistory){

		setTimeout(function(){
			//$rootScope.checkorientation(".setori_img_ownerCP");
		},200);


		$scope.btnchangpass = function(){
			//$(".CP_pass").val();


			if($(".CP_newpass").val().length > 5 && $(".CP_comnewpass").val().length > 5){

				if($(".CP_newpass").val() == $(".CP_comnewpass").val()){

					var request = {
						'api_id' : 21,
						'emp_id' : $rootScope.emps_id,
						'emp_password' : $(".CP_pass").val(),
						'emp_Newpassword' : $(".CP_newpass").val()

					};

					var confirmPopup = $ionicPopup.confirm({
						title: $scope.TitleDialog,
						template: $scope.DatailDialog_alartchangepass
					});

					confirmPopup.then(function(res) {
						if(res) {
							$scope.ServiceThread($scope.Base_URL,request).success(function(response,status,headers,config){
								if($scope.success){
									if(response.res_code != $scope.CODE_SUCCESS){
										$rootScope.toast(response.res_text);
									}else{
                    $rootScope.savelog($rootScope.emps_id,"ChangePassword",2,$rootScope.emps_id);
										$rootScope.toast("เปลี่ยน Password สำเร็จ");
										$rootScope.db.transaction(function(tx){
											$rootScope.checkconnect_statego('Login');
                      setTimeout(function(){
                        $ionicHistory.clearCache();
                        $ionicHistory.clearHistory();
                        $(".CP_pass").val('');
                        $(".CP_comnewpass").val('');
                        $(".CP_newpass").val('');
                        $(".popover-backdrop").html("");
                        $("#username_login").val('');
                        $("#password_login").val('');
                      },500);
											tx.executeSql("DELETE FROM login");
										});



									}
								}
							}).error(function(error,status,headers,config){console.log(error);});

						} else {
							console.log('ยกเลิก');
						}
					});

				}else{
					$rootScope.toast("New Password ไม่ตรงกัน");
				}
			}else{
				$rootScope.toast("กรุณากรอก New Password ไม่ต่ำกว่า 6 ตัวอักษร");
			}

		}
    })
