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