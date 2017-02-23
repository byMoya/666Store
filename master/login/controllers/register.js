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