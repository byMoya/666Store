/**
 * Created by qq515 on 2016/10/4.
 */
App

    .controller('searchCtrl',function($scope,$stateParams,common,globalValue){
        $scope.data = {};
        $scope.data.key = "";
        
        $scope.toSearchDetail = function(){
            globalValue.productRequest = {
                url:"newProject/wx/item/open/searchGood.do",
                params:{
                    condition:$scope.data.key
                }
            };
            globalValue.listRequest = null;
            window.location.href = "#/tab/searchDetail";
        }
    });