/**
 * Created by qq515 on 2016/10/2.
 */
var App = angular.module('starter', ['ionic'])

    .run(function($ionicPlatform, $rootScope) {

        $rootScope.indexTitle = "首页";
        document.title = $rootScope.indexTitle;

        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });

/**
 * Created by qq515 on 2016/10/2.
 */

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider','$ionicConfigProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider,$ionicConfigProvider) {

        $ionicConfigProvider.views.maxCache(4);
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

    $stateProvider

        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

        // Each tab has its own nav history stack:

        .state('tab.index', {
            url: '/index',
            views: {
                'tab-index': {
                    templateUrl: 'templates/tab-index.html',
                    controller: 'indexCtrl'
                }
            }
        })

        .state('tab.cateDetail', {
            url: '/cateDetail',
            views: {
                'tab-index': {
                    templateUrl: 'templates/index/cate-detail.html',
                    controller: 'cateDetailCtrl'
                }
            }
        })

        .state('tab.actionDetail', {
            url: '/actionDetail',
            views: {
                'tab-index': {
                    templateUrl: 'templates/index/cate-detail.html',
                    controller: 'cateDetailCtrl'
                }
            }
        })

        .state('tab.goodDetail', {
            url: '/goodDetail/:gid',
            cache:false,
            views: {
                'tab-index': {
                    templateUrl: 'templates/index/good-detail.html',
                    controller: 'goodDetailCtrl'
                }
            }
        })


        /*
        * member star
        * */

        .state('tab.member', {
            url: '/member',
            views: {
                'tab-member': {
                    templateUrl: 'templates/tab-member.html',
                    controller: 'memberCtrl'
                }
            }
        })

        .state('tab.memberIframe', {
            url: '/memberIframe/:ifr/:title',
            views: {
                'tab-member': {
                    templateUrl: 'templates/public/window-byIframe.html',
                    controller: 'windowIfrCtrl'
                }
            }
        })

        .state('tab.address', {
            url: '/address',
            cache:false,
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/address.html',
                    controller: 'addressCtrl'
                }
            }
        })

        .state('tab.addressOrder', {
            url: '/addressOrder',
            cache:false,
            views: {
                'tab-shopcar': {
                    templateUrl: 'templates/member/address.html',
                    controller: 'addressCtrl'
                }
            }
        })

        .state('tab.addressAdd', {
            url: '/addressAdd',
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/address-add.html',
                    controller: 'addressAddCtrl'
                }
            }
        })

        .state('tab.addressEdit', {
            url: '/addressEdit',
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/address-add.html',
                    controller: 'addressEditCtrl'
                }
            }
        })

        /* 订单管理 */
        .state('tab.ordersManage', {
            url: '/ordersManage',
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/orders-manage.html',
                    controller: 'ordersManageCtrl'
                }
            }
        })

        /* 意见反馈 */
        .state('tab.comment', {
            url: '/comment',
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/comment.html',
                    controller: 'commentCtrl'
                }
            }
        })

        .state('tab.shopcar', {
            url: '/shopcar',
            cache:false,
            views: {
                'tab-shopcar': {
                    templateUrl: 'templates/tab-shopcar.html',
                    controller: 'shopCarCtrl'
                }
            }
        })

        .state('tab.order', {
            url: '/order',
            cache:false,
            views: {
                'tab-shopcar': {
                    templateUrl: 'templates/shopcar/order.html',
                    controller: 'orderCtrl'
                }
            }
        })

        .state('tab.setting', {
            url: '/setting',
            views: {
                'tab-setting': {
                    templateUrl: 'templates/tab-setting.html',
                    //controller: 'AccountCtrl'
                }
            }
        })

        .state('tab.search', {
            url: '/search',
            views: {
                'tab-search': {
                    templateUrl: 'templates/tab-search.html',
                    controller: 'searchCtrl'
                }
            }
        })

        .state('tab.searchDetail', {
            url: '/searchDetail',
            views: {
                'tab-search': {
                    templateUrl: 'templates/index/cate-detail.html',
                    controller: 'cateDetailCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/index');
}]);

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
/**
 * Created by qq515 on 2016/10/7.
 */
App

    .controller('addressCtrl',function($scope,$stateParams ,$ionicPopup,common,globalValue,dialogsManager){


        console.log("addressCtrl");

        var token = common.getSession('shopToken');
        var storeId = common.getSession('shopInfo').storeId;

        var getData = function(){
            var url = "newProject/wx/address/queryAddress.do",
                params = {
                    token:token
                },
                fn = function(data){
                   $scope.list = data.result;

                };
            common.ngPost(url,params,fn);
        };

        getData();

        $scope.del = function(item,index){

            var confirmPopup = $ionicPopup.confirm({
                title: '温馨提示',
                template: '确定删除该地址?',
                buttons: [
                    {
                        text: '取消',
                        type: 'button-stable'
                    },
                    {
                        text: '确定',
                        type: 'button-balanced',
                        onTap:function(e){
                            var url = "newProject/wx/address/deleteddress.do",
                                params = {
                                    token:token,
                                    custAddrId:item.custAddrId
                                },
                                fn = function(data){
                                    $scope.list.splice(index, 1);;

                                };
                            common.ngPost(url,params,fn);
                            console.log(item);
                            //e.preventDefault();
                        }
                    }
                ]

            });


        };

        $scope.edit = function(item){
            globalValue.addressEdit = item;
            window.location.href = '#/tab/addressEdit'
        }

        $scope.setDefault = function(item){
            angular.forEach($scope.list , function(_item, key){
                _item.isDefault = 0;
            });
            item.isDefault = 1;
            item.token = common.getSession('shopToken');
            item.storeId = common.getSession('shopInfo').storeId;
            var url = "newProject/wx/address/updateAddress.do",
                params = item,
                fn = function(data){
                    dialogsManager.showMessage("设置默认地址成功！");
                };
            common.ngPost(url,params,fn);
            console.log($scope.data);
        }

    });
/**
 * Created by qq515 on 2016/10/2.
 */
App
    .controller('commentCtrl',function($scope,$stateParams,$ionicPopup,common,globalValue,dialogsManager,$ionicModal){
    	$scope.commentSingle = {
    		typeDate:[
    			[
    				{text:"商品品质",value:0},
    				{text:"软件功能",value:1},
    				{text:"配送服务",value:2}
				],
				[
    				{text:"促销活动",value:3},
    				{text:"退款相关",value:4},
    				{text:"其他问题",value:5}
				]
    		],
            backType:{},
            typeSelect:function(item){
                $scope.commentSingle.backType = item;
            },
            content:''
    	};

    	$scope.submitComment = function(){
            if($scope.commentSingle.content=='' || $scope.commentSingle.backType.value==undefined){
                dialogsManager.showMessage("请选择反馈类型或填写反馈意见");
                return ;
            }
            var url = 'newProject/wx/feeBack/open/addFeeBack.do',
                params = {
                    backType:$scope.commentSingle.backType.value,
                    content:$scope.commentSingle.content
                },
                fn = function(){
                    dialogsManager.showMessage("提交成功，感谢你的反馈意见，我们一定努力改进，为你提供更优质的服务！");
                    setTimeout(function(){
                        // window.history.back();
                        window.location.href = "#/tab/member";
                    },1500);
                }
            common.ngPost(url,params,fn);
    	};
    });
/**
 * Created by qq515 on 2016/10/4.
 */
App

    .controller('cateDetailCtrl',function($scope,$stateParams ,common,$rootScope,globalValue,dialogsManager){

        /* fuck变量声明 */
        $scope.goodList = [];
        $scope.currentCate = null;

        /* 上拉加载 */
        $scope.ref = common.createRef(function(){
                        this.pageNum += 1;
                        var cateId = $scope.currentCate?$scope.currentCate.categoryId:"";
                        getProducdt(cateId,function(data){
                            if(data.result.length == 0){
                                $scope.ref.canMore = false;
                                dialogsManager.showMessage("已加载所有商品");
                            }
                            $scope.goodList = $scope.goodList.concat(data.result);
                            // console.log("infiniteScrollComplete");
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        });
                    });

        console.log("cateDetailCtrl");
        // console.log($stateParams.gid);

        var listRequest = globalValue.listRequest;
        var productRequest = globalValue.productRequest;

        console.log(listRequest);
        console.log(productRequest);
        // console.log(shopParams);

        function _init(){
            if(listRequest){
                getCateList();
            }
            if(productRequest){
                getProducdt();
            }
        }

        var getCateList = function(){
            var url = listRequest.url,
                params = angular.extend({
                    token:common.getSession('shopToken'),
                    storeId:common.getSession('shopInfo').storeId,
                    pageNum:1,
                    pageSize:100
                },listRequest.params),
                fn = function(data){
                    $scope.cateList = data.result;
                    $scope.$apply();
                };
            common.ngPost(url,params,fn);
        };
        var getProducdt = function(id,_fn){
            var url = productRequest.url,
                params = angular.extend({
                    token:common.getSession('shopToken'),
                    storeId:common.getSession('shopInfo').storeId,
                    pageNum:$scope.ref.pageNum || 1,
                    pageSize:$scope.ref.pageSize || 10
                },productRequest.params),
                fn = function(data){
                    $scope.goodList = $scope.goodList.concat(data.result);         
                    $scope.$apply();
                };
            fn = typeof _fn == "function"?_fn:fn;
            if(params.categoryId){
                params.categoryId = id || params.categoryId;
            }
            common.ngPost(url,params,fn);
        };

        $scope.changeCate = function(cate){
            $scope.currentCate = cate?cate:productRequest.params;
            var e =event || window.event;
            $(e.target).addClass('on').siblings().removeClass('on');
            $scope.goodList = [];
            $scope.ref.pageNum = 1;
            $scope.ref.canMore = true;
            getProducdt($scope.currentCate.categoryId);
        };
        
        /* 初始化 */
        _init();
    });
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
/**
 * Created by qq515 on 2016/10/2.
 */
App
    .controller('indexCtrl', function($scope,$ionicSlideBoxDelegate,common,globalValue) {

        var checkShop = function(){
            $scope.shopInfo = common.getSession('shopInfo');
            if($scope.shopInfo) {
                document.title = $scope.shopInfo.storeBriefName;

            }else{
                window.location.href = "login.html#/position";
            }
        };

        console.log("indexCtrl");

        var getData = function(){
            var url = 'newProject/wx/item/open/index.do',
                params = {
                    storeId:$scope.shopInfo.storeId
                };
            common.ngPost(url,params,callback);
        };

        var callback = function(data){
            $scope.banners = data.result.carouselList;
            //$ionicSlideBoxDelegate.$getByHandle('my-banner').update();

            $scope.cates = data.result.categoryShowList;
            //$ionicSlideBoxDelegate.$getByHandle('my-cate').update();
            $ionicSlideBoxDelegate.update();
            $scope.activeList = data.result.pageActList;

        };

        checkShop();

        getData();

        /********************agument********************/
        $scope.toCateDetail = function(item){
            globalValue.listRequest = {
                url:"newProject/wx/open/category/getSubCategory.do",
                params:{
                    categoryId:item.categoryId
                }
            };
            globalValue.productRequest = {
                url:"newProject/wx/item/open/queryItemByCategoryId.do",
                params:{
                    categoryId:item.categoryId
                }
            };
            window.location.href = "#/tab/cateDetail";
        }
        $scope.toActionDetail = function(item){
            globalValue.productRequest = {
                url:"newProject/wx/item/open/getGoodByPageActId.do",
                params:{
                    pageActId:item.pageActId
                }
            };
            globalValue.listRequest = null;
            window.location.href = "#/tab/actionDetail";
        }

    });
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
            type:'1',   //0订单状态,1订单详情
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
/**
 * Created by qq515 on 2016/10/2.
 */
App
    .controller('memberCtrl',function($scope,$stateParams,$ionicPopup,common,globalValue,dialogsManager,$ionicModal){


        console.log("memberCtrl");

        var token = common.getSession('shopToken');
        var storeId = common.getSession('shopInfo').storeId;

        $scope.data = common.getSession("userInfo");	//用户信息

        /* 页面跳转 */
        $scope.urls = {
        	data:{
        		problem:'',
        		about:'',
        		join:''
        	}
        };
        function _openPageUrlWin(_pageUrl){
            $ionicModal.fromTemplateUrl(_pageUrl,{
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.urls.win = modal;
                $scope.urls.win.show();
            });
        }
        function _getPageUrl(){
            var urls = [
                    {type:'problem',url:"newProject/wx/store/open/commonProblem.do"},
                    {type:'about',url:"newProject/wx/store/open/aboutOur.do"},
                    {type:'join',url:"newProject/wx/store/open/joinOur.do"}
                ];
            angular.forEach(urls,function(item,key){
                var fn = function(data){
                    $scope.urls.data[item.type] = encodeURIComponent(encodeURIComponent(data.result));
                };
                common.ngPost(item.url,{},fn);
            });
        }
        /* 页面跳转 END */

        /* 电话联系 */
        $scope.tels = {
            type:'',
            data:{
                storeOwner:[110],
                customerService:[]
            },
            popup:null,
            openTelsPopup:function(_type){
                $scope.tels.type = _type;
                _initTelsPopup();
            }
        };
        function _initTelsPopup(){
            $scope.tels.popup = $ionicPopup.show({
                template:"<a ng-repeat=\"tel in tels.data[tels.type]\" href=\"tel:{{tel}}\"><p class=\"item\">{{tel}}</p></a>",
                title: '联系电话',
                scope:$scope,
                buttons:[
                    { text:'关闭'}
                ]
            });
        }
        function _getTels(){
            var urls = [
                    {type:'storeOwner',url:"newProject/wx/store/open/contactStoreOwner.do"},
                    {type:'customerService',url:"newProject/wx/store/open/contactCustomerService.do"},
                ];
            angular.forEach(urls,function(item,key){
                var fn = function(data){
                    $scope.tels.data[item.type] = data.result;
                };
                common.ngPost(item.url,{},fn);
            });
        }
        /* 电话联系 END */

        /*优惠券*/
        $scope.coupon = {
            data:[],
            popup:null,
            win:null,
            openCouponPopup:function(){
                $scope.coupon.popup = $ionicPopup.show({
                    template:"<div ng-repeat=\"item in coupon.data\" class=\"item\">"+
                                "<p>{{item.couponName}}：￥{{item.couponAmount}}</p>"+
                                "<p>满￥{{item.useLimit}}可使用</p>"+
                                "<p>过期时间：{{item.outOfDate | date:'yyyy-MM-dd'}}</p>"+
                             "</div>",
                    title: '优惠券',
                    scope:$scope,
                    buttons:[
                        { text:'关闭'}
                    ]
                });
            },
            openCouponWin:function(){
                $scope.coupon.win.show();
            }
        };
        function _initCouponWin(){
            $ionicModal.fromTemplateUrl('templates/member/orders-coupon.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.coupon.win = modal;
            });
        }
        function _getCoupon(){
            var url = "newProject/wx/coupon/listCoupon.do";
            var params = {
                token:token,
                storeId:storeId
            };
            var fn = function(data){
                $scope.coupon.data = data.result;
            };
            common.ngPost(url,params,fn);
        }
        /*优惠券 END*/

        /**
         * [_init description 初始化执行]
         * @return {[type]} [description]
         */
        function _init(){
        	_getIntegral();
        	_getPageUrl();
            _getTels();
            _getCoupon();
            _initCouponWin();
        }

        /**
         * [_getIntegral description 获取积分]
         * @return {[type]} [description]
         */
        function _getIntegral(){
        	var url = "newProject/wx/customer/queryIntegral.do",
            params = {
            	token:token
            },
            fn = function(data){
            	// console.log(data);
            	$scope.data.integral = data.result;
            };
            common.ngPost(url,params,fn);
        }

        $scope.showExitLoginfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '温馨提示',
                template: '你确定注销登录吗?',
                buttons: [
                    {
                        text: '取消',
                        type: 'button-stable'
                    },
                    {
                        text: '确定',
                        type: 'button-balanced',
                        onTap:function(e){
                            _exitLogin();
                        }
                    }
                ]
            });
        };

        /**
         * [exitLogin description 退出登录]
         * @return {[type]} [description]
         */
        function _exitLogin(){
            var url = "newProject/wx/customer/loginOut.do",
            params = {
                token:token
            },
            fn = function(){
                window.location.href = 'login.html';
            };
            common.ngPost(url,params,fn);
        }

        _init();

    });
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
/**
 * Created by qq515 on 2016/10/2.
 */
App
    .controller('windowIfrCtrl', function($scope,common,$rootScope,$stateParams){
        
        var src = decodeURIComponent($stateParams.ifr);
        var title = $stateParams.title;
        $scope.ifr = {
            src:src,
            title:title,
            init:function(){
                var H = $("#winIfr").closest("ion-content").height();
                var W = $("#winIfr").closest("ion-content").width();
                // debugger;
                $("#winIfr").attr("src",$scope.ifr.src).css({
                    "height":H,
                    "width":W
                });
            }
        }

        $scope.ifr.init();
    });
App

    .factory('globalValue', function() {
        return{
            listOrderDetail:[],
            order:{},
            addressEdit:{}
        }

    })

    .service('common',function($http,$ionicLoading,$ionicPopup,dialogsManager){

        this.globalUrl = 'http://app.520coding.com:8080/';
        // this.globalUrl = 'http://www.520coding.com/';
        // this.globalUrl = 'http://192.168.31.121:8080/';

        this.ngGet = function(url,params,callbackFn){

            $ionicLoading.show({
                template: 'Loading...'
            });
            $http({
                method: 'get',
                url:this.globalUrl + url,
                data: params
            }).success(function(data){
                $ionicLoading.hide();
                if(data.code == '200'){
                    callbackFn(data);
                }else{
                    console.error(data);
                };
            }).error(function(data){
                $ionicLoading.hide();
                console.error(data);
            })
        };

        this.ngPost = function(url,params,callbackFn){

            $.ajax({
                url:this.globalUrl +  url + "?t=" + (new Date()).getTime(),
                type:'POST',
                dataType:'json',
                data:params,
                success:function(rs){
                    if(rs.code == '200'){
                        console.info(rs);
                        callbackFn(rs);
                    }else{
                        dialogsManager.showMessage(rs.msg);
                        console.warn(rs.msg);
                        if(rs.code == 40008){
                            window.location.href = 'login.html'
                        }
                    }
                },
                error:function(rs){
                    dialogsManager.showMessage(rs.msg);
                    console.error(rs.msg);
                },
                complete: function (xhr, status) {
                    $ionicLoading.hide();
                },
                //发送请求前触发
                beforeSend: function (xhr) {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });

                },
            });

        };

        this.setSession = function(name,obj){
            var val = JSON.stringify(obj);
            var key = name;
            sessionStorage.setItem(key,val);
        };

        this.getSession = function(name){
            var meg = sessionStorage.getItem(name);
            return JSON.parse(meg);
        };

        this.clearSession = function(name){
            sessionStorage.clear(name);
        };

        this.checkToken = function(){
            var token = this.getSession('shopToken');
            var showConfirm = function() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '温馨提示',
                    template: '请先登录',
                    buttons: [
                        {
                            text: '暂不登录',
                            type: 'button-stable'
                        },
                        {
                            text: '前往登录',
                            type: 'button-balanced',
                            onTap:function(e){
                                e.preventDefault();
                                window.location.href = 'login.html#/login';
                            }
                        }
                    ]
                });
            };

            if(!token){
               showConfirm();
            }
        };

        this.createRef = function(_dofn,_pageNum,_pageSize){
            return {
                canMore:true,
                pageNum:_pageNum || 1,
                pageSize:_pageSize || 10,
                do:_dofn
            };
        }
    })

    .factory("dialogsManager", function($q,$http,$compile,$timeout,$rootScope) {

        //不明白可加  qq群517568588 交流

        //消息模板
        var megTmp="<div class='nspop_megcontainer myactive' >" +
            "<div class='main'>" +
            "<div class='textContent'>{{content}}</div>" +
            "</div>" +
            "</div>";

        var dialog={
            megs:[],
            showMessage:showMessage,
            alert:alert,  //未实现
            confirm:confirm, //未实现
        };

        //消息展示
        function showMessage(content,options) {
            //移除已存在的消息展示
            angular.forEach(dialog.megs, function (item,index) {
                item.remove();
            });
            createMeg(content,options);
        };

        //消息创建
        function createMeg(content,options){
            options = angular.extend({
                bottom: '100', //继续下边距离
                scope: $rootScope.$new(), //创建一个继承自根的作用域
                timeout: 2000  //多少秒后自动隐藏
            }, options);
            //消息文本
            options.scope.content = content;
            var megPromise = $q.when(compileTmp({template: megTmp, scope: options.scope, appendTo: angular.element(document.body)}))
            megPromise.then(function (result) {
                dialog.megs.push(result);
                result.css("bottom", options.bottom + "px");
                $timeout(function () {
                    result.remove(); //移除消息展示
                    options.scope.$destroy();  //摧毁作用域
                },options.timeout);
            })
        }

        //编译模板
        function compileTmp(options){
            var tem=  $compile(options.template)(options.scope);
            if(options.appendTo){
                options.appendTo.append(tem);
            }
            return tem;
        };
        return dialog;

    });
