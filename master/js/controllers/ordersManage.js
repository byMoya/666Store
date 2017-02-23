/**
 * Created by qq515 on 2016/10/2.
 */
App
    .controller('ordersManageCtrl',function($scope,$stateParams,$ionicPopup,common,globalValue,dialogsManager,$ionicModal){


        console.log("ordersManageCtrl");

        var token = common.getSession('shopToken');
        var storeId = common.getSession('shopInfo').storeId;

        $scope.data = common.getSession("userInfo");

        /* 上拉加载 */
        $scope.ref = common.createRef(function(){
                        this.pageNum += 1;
                        _getOrdersData($scope.ordersManage.type,function(data){
                            if(data.result.length == 0){
                                $scope.ref.canMore = false;
                            }
                            $scope.ordersManage.data = $scope.ordersManage.data.concat(data.result);
                            // console.log("infiniteScrollComplete");
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        });
                    });

        $scope.ordersManage = {
        	type:'0',		//0待配送,1配送中,
            statusData:[
                {type:0,text:"待付款"},
                {type:1,text:"待配送"},
                {type:2,text:"配送中"},
                {type:3,text:"完成"},
                {type:4,text:"退货"}
            ],
        	data:[],
        	changeType:function(_type){
        		this.type = _type;
                $scope.ordersManage.data = [];
                $scope.ref.pageNum = 1;
        		_getOrdersData(_type);
        	},
            openDetail:function(order){
                $scope.orderDetail.data = order;
                $scope.orderDetailWin.show();
            }
        };
        $scope.orderDetail = {
            type:globalValue.payWay==0?1:0,   //0订单状态,1订单详情
            data:{},
            statusData:[],
            changeType:function(_type){
                this.type = _type;
                if(!this.statusData.result && this.type==0){
                    _getOrderStatus();
                }
            }
        };
        $scope.goPay = function(_order){
            var url = 'newProject/wx/order/rePay.do',
                params = {
                    token: token,
                    orderId: _order.orderId,
                    openId:sessionStorage.getItem("openId")
                },
                fn = function(data){
                    var args = data.result;
                    wxSingle.args = args;
                    if(wxSingle.args){
                        wxSingle.pay();
                    }
                };
            common.ngPost(url,params,fn);
        }

        function _init(){
        	_getOrdersData($scope.ordersManage.type);
            _initOrderDetailWin();
        }
        function _initOrderDetailWin(){
            $ionicModal.fromTemplateUrl('templates/member/orders-detail.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.orderDetailWin = modal;
            });
        }
        function _getOrdersData(_type,_fn){
        	var url = "newProject/wx/order/queryOrder.do",
                params = {
                	token:token,
                	type:_type,
                	pageNum:$scope.ref.pageNum || 1,
                	pageSize:$scope.ref.pageSize || 10
                },
                fn = function(data){
                	$scope.ordersManage.data = $scope.ordersManage.data.concat(data.result);
                };
                fn = typeof _fn == "function"?_fn:fn;
            common.ngPost(url,params,fn);
        }
        function _getOrderStatus(){
            var url = "newProject/wx/order/queryOrderStatus.do",
                params = {
                    token:token,
                    orderId:$scope.orderDetail.data.orderId
                },
                fn = function(data){
                    $scope.orderDetail.statusData = data.result;
                    console.log($scope.orderDetail.statusData);
                };
            common.ngPost(url,params,fn);
        }

        $scope.doRefresh = function(){
            var url = "newProject/wx/order/queryOrderStatus.do",
                params = {
                    token:token,
                    orderId:$scope.orderDetail.data.orderId
                },
                fn = function(data){
                    $scope.orderDetail.statusData = data.result;
                    console.log($scope.orderDetail.statusData);
                    $scope.$broadcast('scroll.refreshComplete');
                };
            common.ngPost(url,params,fn);
        }

        /* 初始化 */
        _init();
    });