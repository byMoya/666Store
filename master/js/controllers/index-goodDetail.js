/**
 * Created by qq515 on 2016/10/5.
 */
App

    .controller('goodDetailCtrl',function($scope,$stateParams,globalValue,$ionicPopup,common){


        console.log("goodDetailCtrl");
        console.log($stateParams.gid);

        var token = common.getSession('shopToken');
        var storeId = common.getSession('shopInfo').storeId;

        $scope.addNum = 0;

        $scope.disable = {
            add:false,
            min:false
        };
        var getProducdt = function(id){
            var url = "newProject/wx/item/open/queryItemByItemId.do",
                params = {
                    token:token,
                    storeId:id || storeId,
                    itemId:$stateParams.gid
                },
                fn = function(data){
                    $scope.data = data.result;
                    $scope.data.itemNums = 1;
                    $scope.$apply();
                };
            common.ngPost(url,params,fn);

            var url1 = "newProject/wx/shoppingCart/queryCart.do",
                params1 = {
                    token:token,
                    storeId:id || storeId,
                    pageNum:1,
                    pageSize:100
                },
                fn1 = function(data){
                    $scope.addNum = data.result.length;

                };
            common.ngPost(url1,params1,fn1);
        };

        $scope.add = function(){
            if($scope.data.itemNums == $scope.data.available){
                $scope.disable.add = true;
            }else{
                $scope.data.itemNums++;
                $scope.disable.min = false;
            }
        };

        $scope.min = function(){
            if($scope.data.itemNums == 1){
                $scope.disable.min = true;
            }else{
                $scope.data.itemNums--;
                $scope.disable.add = false;
            }
        };

        $scope.addShopCar = function(){
            common.checkToken();
            $scope.data.token = token;
            $scope.data.storeId = storeId;
            console.log($scope.data);
            var url = "newProject/wx/shoppingCart/putIntoCart.do",
                params = $scope.data,
                fn = function(data){
                    $scope.addNum = data.cartItemNums;
                };
            common.ngPost(url,params,fn);


        };

        /* 立即购买 */
        $scope.goOrder = function(){
            globalValue.listOrderDetail = [];
            globalValue.listOrderDetail.push($scope.data);
            // globalValue.name = "fuck wjh";

            if(globalValue.listOrderDetail.length != 0){
                window.location.href = "#/tab/shopcar";
                window.location.href = "#/tab/order";
            }else{
                dialogsManager.showMessage("请选择商品");
            }
        };

        getProducdt();

    });