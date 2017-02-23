/**
 * Created by qq515 on 2016/10/7.
 */
App

    .controller('orderCtrl',function($scope,$stateParams ,$ionicPopup,common,globalValue, dialogsManager){


        console.log("orderCtrl");
        console.log(globalValue.listOrderDetail);

        var token = common.getSession('shopToken');
        var storeId = common.getSession('shopInfo').storeId;
        
        $scope.orderList = globalValue.listOrderDetail;

        $scope.data = {
            payWay :"0",
            remarks: "特别嘱咐"
        };

        $scope.getTotalPrices = function(){
            $scope.totalPrices=0;
            angular.forEach($scope.orderList,function(val,key){
                $scope.totalPrices += (val.itemNums*val.appActPrice);
            });
        };
        $scope.getTotalPrices();

        var getAddress = function(){
          var url = 'newProject/wx/address/queryAddress.do',
              params = {
                  token:token
              },
              fn = function(data){
                  angular.forEach(data.result,function(val,key){
                      if(val.isDefault == 1){
                          $scope.addressInfo = val;
                          console.log(val);
                      }
                  })

              };
            common.ngPost(url,params,fn);
        };
        getAddress();

        if(globalValue.listOrderDetail.length == 0){
            window.location.href = "#/tab/index"
        }

        $scope.goOrder = function(){
            if(!$scope.addressInfo){
                dialogsManager.showMessage("无地址,请选择所在地址信息或添加新地址");
            }
            var order = {
                storeId:storeId,
                addressId:$scope.addressInfo.custAddrId,
                payWay:$scope.data.payWay,
                remarks:$scope.data.remarks,
                custCouId:$scope.coupon.data.substring($scope.coupon.data.indexOf("custCouId\":\"")+12,$scope.coupon.data.indexOf("}")-1)
            };
            var detail = new Object();
            var listOrderDetail = new Array();
            angular.forEach($scope.orderList,function(val,key){

                listOrderDetail.push({
                    itemId: val.itemId,
                    nums: val.itemNums
                })

            });
            detail.listOrderDetail=listOrderDetail;
            var url = 'newProject/wx/order/addWxOrder.do',
                params = {
                    token: token,
                    order: JSON.stringify(order),
                    listOrderDetail: JSON.stringify(detail),
                    listShopIds:getListShopIds()
                },
                fn = function(data){
                    if($scope.data.payWay==0){
                        var args = data.result;
                        wxSingle.args = args;
                        if(wxSingle.args){
                            // dialogsManager.showMessage(window.location.href);
                            wxSingle.pay(function(){
                                window.location.href = "#/tab/shopcar";
                                window.location.href = "#/tab/member";
                                window.location.href = "#/tab/ordersManage";
                                globalValue.payWay = 0;
                            });
                        }
                    }else{
                        window.location.href = "#/tab/shopcar";
                        window.location.href = "#/tab/member";
                        window.location.href = "#/tab/ordersManage";
                        globalValue.payWay = 2;
                    }
                };
            common.ngPost(url,params,fn);

            console.log(order);
            console.log(listOrderDetail);
        }

        function getListShopIds(){
            var cartIdArr = [];
            angular.forEach($scope.orderList, function(value, key){
                cartIdArr.push(value.cartId);
            });
            return cartIdArr.join(",");
        }

        /* 获取优惠券 */
        $scope.coupon = {
            used:0,
            data:'',
            list:[]
        };
        var initCoupon = function(){
            var url = 'newProject/wx/coupon/listCoupon.do',
                params = {
                    token: token,
                    storeId:common.getSession('shopInfo').storeId
                },
                fn = function(data){
                    var _arr = [];
                    angular.forEach(data.result,function(value, key){
                        if(value.isUse==0 && $scope.totalPrices>=value.useLimit){
                            _arr.push(value);
                        }
                    });
                    $scope.coupon.list = _arr;
                };
            common.ngPost(url,params,fn);
        }
        initCoupon();

        $scope.selectCoupon = function(){
            var item = $scope.coupon.data?JSON.parse($scope.coupon.data):{couponAmount:0};
            // console.log(item);
            $scope.totalPrices += $scope.coupon.used;
            $scope.totalPrices -= item.couponAmount;
            $scope.coupon.used = item.couponAmount;
        }
    });