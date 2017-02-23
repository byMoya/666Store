/**
 * Created by qq515 on 2016/10/3.
 */
App
    .controller('positionCtrl', function($scope,common,dialogsManager) {

        console.log("positionCtrl");

        $scope.shopMessage = {};
        $scope.shopId = true;

        var getData = function(){
            var url = 'newProject/wx/store/open/getStore.do',
                params = {},
                fn = function(re){

                    $scope.data = re.result;

                    $scope.shopId = false;

                    if($scope.data.length == 1){
                        if($scope.data[0].storeList.length == 1){
                            common.setSession('shopInfo',$scope.data[0].storeList[0]);
                            window.location.href = "index.html#/tab/index";
                        }
                    }

                    //
                    common.setSession('shopInfo',$scope.data[0].storeList[0]);
                    window.location.href = "index.html#/tab/index";
                    //

                };
            common.ngPost(url,params,fn);
        };

        getData();

        $scope.save = function(){
            common.setSession('shopInfo',$scope.shopMessage.shopInfo);
            if($scope.shopMessage.city && $scope.shopMessage.shopInfo){
                window.location.href = "index.html#/tab/index";
            }else{
                dialogsManager.showMessage("请选择门店");
            }

        };

    });