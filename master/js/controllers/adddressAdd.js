/**
 * Created by qq515 on 2016/10/7.
 */
App

    .controller('addressAddCtrl',function($scope,$stateParams ,$ionicPopup,common,globalValue,dialogsManager){


        console.log("addressAddCtrl");

        $scope.data = {};
        var token = common.getSession('shopToken');
        $scope.data.isDefault = false;



        var storeId = common.getSession('shopInfo').storeId;
        $scope.save = function(){
            $scope.data.token = token;
            $scope.data.storeId = storeId;
            if($scope.data.isDefault == false){
                $scope.data.isDefault = 0;
            }else{
                $scope.data.isDefault = 1;
            }
            var url = "newProject/wx/address/addAddress.do",
                params = $scope.data,
                fn = function(data){
                    dialogsManager.showMessage(data.msg);
                    window.history.back();

                };
            common.ngPost(url,params,fn);
            console.log($scope.data);
        };



    });