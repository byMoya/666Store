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