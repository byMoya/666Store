/**
 * Created by qq515 on 2016/10/7.
 */
App

    .controller('shopCarCtrl',function($scope,$stateParams ,$ionicPopup,common,globalValue,dialogsManager){


        console.log("shopCarCtrl");
        $scope.disable = {};
        $scope.totalPrices = 0;
        $scope.carList = [];

        var token = common.getSession('shopToken');
        var storeId = common.getSession('shopInfo').storeId;

        /* 上拉加载 */
        // $scope.ref = common.createRef(function(){
        //                 this.pageNum += 1;
        //                 getData(function(data){
        //                     if(data.result.length == 0){
        //                         $scope.ref.canMore = false;
        //                     }
        //                     $scope.carList = $scope.carList.concat(data.result);
        //                     // console.log("infiniteScrollComplete");
        //                     $scope.$broadcast('scroll.infiniteScrollComplete');
        //                 });
        //             },'',1);

        var getData = function(_fn){
            var url = "newProject/wx/shoppingCart/queryCart.do",
                params = {
                    token:token,
                    storeId:storeId,
                    pageNum:1,
                    pageSize:100
                },
                fn = function(data){
                    $scope.carList = $scope.carList.concat(data.result);
                };
                fn = typeof _fn == "function"?_fn:fn;
            common.ngPost(url,params,fn);
        };

        getData();

        $scope.$watch('carList',function(){
            angular.forEach($scope.carList,function(val,key){
                //console.log(val);
                $scope.totalPrices += (val.itemNums*val.appActPrice);
            });

        });

        $scope.getTotalPrices = function(){
            $scope.totalPrices=0;
            angular.forEach($scope.carList,function(val,key){
                if(val[val.cartId] == true){
                    $scope.totalPrices += (val.itemNums*val.appActPrice);
                }
            });
        };

        var upDataNum = function(item){
            var url = "newProject/wx/shoppingCart/ updateCart.do",
                params = {
                    token:token,
                    cartId:item.cartId,
                    itemNums:item.itemNums

                },
                fn = function(data){
                    //$scope.carList = data.result;

                };
            common.ngPost(url,params,fn);
        };

        var delectItem = function(item,index){
            console.log(item);

            var arr = [];
            arr.push(item.cartId);
            arr = JSON.stringify(arr)

            var url = "newProject/wx/shoppingCart/deleteCart.do",
                params = {
                    token:token,
                    arrCarId:arr
                },
                fn = function(data){
                    //$scope.carList = data.result;
                    $scope.carList.splice(index, 1);
                    $scope.getTotalPrices();

                };
            common.ngPost(url,params,fn);
        };

        $scope.deleteItem = function(item,index){
            //console.log(item);
            var confirmPopup = $ionicPopup.confirm({
                title: '温馨提示',
                template: '确定删除该商品?',
                buttons: [
                    {
                        text: '取消',
                        type: 'button-stable'
                    },
                    {
                        text: '确定',
                        type: 'button-balanced',
                        onTap:function(e){
                            console.log(item);
                            delectItem(item,index);
                            //e.preventDefault();
                        }
                    }
                ]

            });
        };

        $scope.min = function(item){
            //console.log(item);
            if(item.itemNums == 1){
                item.itemNums = 1;
            }else{
                item.itemNums--;
                $scope.getTotalPrices();
                upDataNum(item);
            }
        };

        $scope.add = function(item){
            if(item.itemNums == item.available){
                item.itemNums =item.available
            }else{
                item.itemNums++;
                $scope.getTotalPrices();
                upDataNum(item);
            }
        };

        $scope.goOrder = function(){
            globalValue.listOrderDetail = [];
            angular.forEach($scope.carList,function(val,key){
                if(val[val.cartId] == true){
                    globalValue.listOrderDetail.push(val)
                }
            });
            if(globalValue.listOrderDetail.length != 0){
                window.location.href = "#/tab/order"
            }else{
                dialogsManager.showMessage("请选择商品");
            }
        };


    });