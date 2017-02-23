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