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