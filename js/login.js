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

        $ionicConfigProvider.views.maxCache(0);
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

        .state('register', {
            url: '/register',
            templateUrl: 'templates/login/register.html',
            controller: 'registerCtrl'
        })

        .state('forget', {
            url: '/forget',
            templateUrl: 'templates/login/forget.html',
            controller: 'forgetCtrl'
        })

        .state('position', {
            url: '/position',
            templateUrl: 'templates/login/position.html',
            controller: 'positionCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login/login.html',
            controller: 'loginCtrl'
        })

        // setup an abstract state for the tabs directive

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
}]);

/**
 * Created by qq515 on 2016/10/3.
 */
App
    .controller('forgetCtrl', function($scope,common,dialogsManager) {

        console.log("forgetCtrl");

        $scope.data = {};
        $scope.phoneBtnMsg = '获取手机验证码';
        $scope.phoneBtnDis = false;


        $scope.getCodeUrl = function(){
            $scope.data.codeUrl = common.globalUrl + 'newProject/code.do?'+ Math.random();
            console.log('aa');
        };
        $scope.getCodeUrl();

        $scope.getPhoneCode = function(){

            if($scope.data.account){
                var url = 'newProject/wx/customer/open/captcha.do',
                    params = {
                        account:$scope.data.account,
                        type:"register",
                        imaCaptcha:$scope.data.imaCaptcha
                    },
                    fn = function(data){
                        $scope.phoneBtnMsg = "已发送验证码到手机";
                        $scope.phoneBtnDis = true;
                        var time = 180;
                        var timer = setInterval(function(){
                            time--;
                            $scope.phoneBtnMsg = "已发送验证码到手机(" + time + ")";
                            $scope.$apply();
                        },1000)
                        setTimeout(function(){
                            clearInterval(timer);
                            $scope.phoneBtnMsg = "获取手机验证码";
                            $scope.phoneBtnDis = false;
                            $scope.$apply();
                        },180000)

                    };
                common.ngPost(url,params,fn);
            }else{
                dialogsManager.showMessage("请输入手机号");
            }



        };

        $scope.save = function(){
            if($scope.data.password1 == $scope.data.password){

                var url = 'wx/customer/open/'+ $scope.data.phoneCode +'/resetPwd.do',
                    params = {
                        account:$scope.data.account,
                        resetPwd:$scope.data.password
                    },
                    fn = function(data){
                        dialogsManager.showMessage(data.msg);
                    };
                common.ngPost(url,params,fn);
            }else{

            }
        };

    });
/**
 * Created by qq515 on 2016/10/4.
 */
App
    .controller('loginCtrl', function($scope,$ionicSlideBoxDelegate,common,dialogsManager) {



        console.log("loginCtrl");
        $scope.data = {};

        var getData = function(){
            var url = 'newProject/wx/customer/open/login.do',
                params = $scope.data;
            var openId = sessionStorage.getItem("openId");
            params.openId = openId;
            // var paramsStr = JSON.stringify(params);    
            // dialogsManager.showMessage(paramsStr);
            // setTimeout(function(){
                common.ngPost(url,params,callback);
            // },3000);
        };

        var callback = function(data){
            common.setSession('shopToken',data.result.token);
            common.setSession('userInfo',data.result);
            dialogsManager.showMessage("登陆成功，即将跳转！")
            setTimeout(function(){
                window.location.href = '#/position';
            },1500);
        };

        $scope.save = function(){
            //console.log($scope.data);
            getData();
        };

    });
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
/**
 * Created by qq515 on 2016/10/2.
 */

App
    .controller('registerCtrl', function($scope,common,dialogsManager) {

        console.log("registerCtrl");

        $scope.data = {};
        $scope.phoneBtnMsg = '获取手机验证码';
        $scope.phoneBtnDis = false;
        /* 写死校验码 */
        $scope.data.imaCaptcha = "fuckWJH";

        $scope.getCodeUrl = function(){
            $scope.data.codeUrl = common.globalUrl + 'newProject/code.do?'+ Math.random();
        };

        $scope.getPhoneCode = function(){
            if($scope.data.account && $scope.data.imaCaptcha){
                var url = 'newProject/wx/customer/open/captcha.do',
                    params = {
                        account:$scope.data.account,
                        type:"register",
                        imaCaptcha:$scope.data.imaCaptcha
                    },
                    fn = function(data){
                        $scope.phoneBtnMsg = "已发送验证码到手机";
                        $scope.phoneBtnDis = true;
                        var time = 180;
                        var timer = setInterval(function(){
                            time--;
                            $scope.phoneBtnMsg = "已发送验证码到手机(" + time + ")";
                            $scope.$apply();
                        },1000)
                        setTimeout(function(){
                            clearInterval(timer);
                            $scope.phoneBtnMsg = "获取手机验证码";
                            $scope.phoneBtnDis = false;
                            $scope.$apply();
                        },180000)

                    };
                common.ngPost(url,params,fn);
            }else{
                // dialogsManager.showMessage("手机号和图片验证码不能为空");
                dialogsManager.showMessage("手机号不能为空");
            }
        };

        $scope.save = function(){
            if($scope.data.password1 == $scope.data.password){

                var url = 'newProject/wx/customer/open/'+ $scope.data.phoneCode +'/register.do',
                    params = {
                        account:$scope.data.account,
                        pwd:$scope.data.password
                    },
                    fn = function(data){
                        dialogsManager.showMessage("注册成功");
                        window.location.href = 'login.html';
                    };
                common.ngPost(url,params,fn);
            }else{
                dialogsManager.showMessage("两次密码不一致");
            }
        };

        $scope.getCodeUrl();

    });
App

    .factory('value', function() {

    })

    .service('common',function($http,$ionicLoading,dialogsManager){

        this.globalUrl = 'http://app.520coding.com:8080/';
        // this.globalUrl = 'http://www.520coding.com/';
        // this.globalUrl = 'http://192.168.31.121:8080/';
        

        this.ngGet = function(url,params,callbackFn){

            $ionicLoading.show({
                template: 'Loading...'
            });
            $http({
                method: 'get',
                url:this.globalUrl + url + "?t=" + (new Date()).getTime(),
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
                url:this.globalUrl +  url,
                type:'POST',
                dataType:'json',
                data:params,
                success:function(rs){
                    if(rs.code == '200'){
                        console.info(rs);
                        if(rs.result && rs.result.length == 0){
                            dialogsManager.showMessage("没有数据");
                        }
                        callbackFn(rs);
                    }else{
                        dialogsManager.showMessage(rs.msg);
                        console.warn(rs.msg);
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
