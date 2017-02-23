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