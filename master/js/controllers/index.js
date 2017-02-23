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