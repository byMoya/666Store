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