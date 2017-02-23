/**
 * Created by qq515 on 2016/10/2.
 */
App
    .controller('windowIfrCtrl', function($scope,common,$rootScope,$stateParams){
        
        var src = decodeURIComponent($stateParams.ifr);
        var title = $stateParams.title;
        $scope.ifr = {
            src:src,
            title:title,
            init:function(){
                var H = $("#winIfr").closest("ion-content").height();
                var W = $("#winIfr").closest("ion-content").width();
                // debugger;
                $("#winIfr").attr("src",$scope.ifr.src).css({
                    "height":H,
                    "width":W
                });
            }
        }

        $scope.ifr.init();
    });