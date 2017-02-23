/**
 * Created by qq515 on 2016/10/7.
 */
App

    .controller('addressEditCtrl',function($scope,$stateParams ,$ionicPopup,common,globalValue,dialogsManager){


        console.log("addressEditCtrl");
        $scope.data = globalValue.addressEdit;

        console.log($scope.data);

        var token = common.getSession('shopToken');
        var storeId = common.getSession('shopInfo').storeId;

        $scope.data.token = token;

        $scope.save = function(){

            if($scope.data.isDefault == false){
                $scope.data.isDefault = 0;
            }else{
                $scope.data.isDefault = 1;
            }
            var url = "newProject/wx/address/updateAddress.do",
                params = $scope.data,
                fn = function(data){
                    dialogsManager.showMessage(data.msg);
                    window.history.back();

                };
            common.ngPost(url,params,fn);
            console.log($scope.data);
        };



    });