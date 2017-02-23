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
