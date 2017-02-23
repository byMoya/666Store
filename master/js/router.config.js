/**
 * Created by qq515 on 2016/10/2.
 */

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider','$ionicConfigProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider,$ionicConfigProvider) {

        $ionicConfigProvider.views.maxCache(4);
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

        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

        // Each tab has its own nav history stack:

        .state('tab.index', {
            url: '/index',
            views: {
                'tab-index': {
                    templateUrl: 'templates/tab-index.html',
                    controller: 'indexCtrl'
                }
            }
        })

        .state('tab.cateDetail', {
            url: '/cateDetail',
            views: {
                'tab-index': {
                    templateUrl: 'templates/index/cate-detail.html',
                    controller: 'cateDetailCtrl'
                }
            }
        })

        .state('tab.actionDetail', {
            url: '/actionDetail',
            views: {
                'tab-index': {
                    templateUrl: 'templates/index/cate-detail.html',
                    controller: 'cateDetailCtrl'
                }
            }
        })

        .state('tab.goodDetail', {
            url: '/goodDetail/:gid',
            cache:false,
            views: {
                'tab-index': {
                    templateUrl: 'templates/index/good-detail.html',
                    controller: 'goodDetailCtrl'
                }
            }
        })


        /*
        * member star
        * */

        .state('tab.member', {
            url: '/member',
            views: {
                'tab-member': {
                    templateUrl: 'templates/tab-member.html',
                    controller: 'memberCtrl'
                }
            }
        })

        .state('tab.memberIframe', {
            url: '/memberIframe/:ifr/:title',
            views: {
                'tab-member': {
                    templateUrl: 'templates/public/window-byIframe.html',
                    controller: 'windowIfrCtrl'
                }
            }
        })

        .state('tab.address', {
            url: '/address',
            cache:false,
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/address.html',
                    controller: 'addressCtrl'
                }
            }
        })

        .state('tab.addressOrder', {
            url: '/addressOrder',
            cache:false,
            views: {
                'tab-shopcar': {
                    templateUrl: 'templates/member/address.html',
                    controller: 'addressCtrl'
                }
            }
        })

        .state('tab.addressAdd', {
            url: '/addressAdd',
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/address-add.html',
                    controller: 'addressAddCtrl'
                }
            }
        })

        .state('tab.addressEdit', {
            url: '/addressEdit',
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/address-add.html',
                    controller: 'addressEditCtrl'
                }
            }
        })

        /* 订单管理 */
        .state('tab.ordersManage', {
            url: '/ordersManage',
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/orders-manage.html',
                    controller: 'ordersManageCtrl'
                }
            }
        })

        /* 意见反馈 */
        .state('tab.comment', {
            url: '/comment',
            views: {
                'tab-member': {
                    templateUrl: 'templates/member/comment.html',
                    controller: 'commentCtrl'
                }
            }
        })

        .state('tab.shopcar', {
            url: '/shopcar',
            cache:false,
            views: {
                'tab-shopcar': {
                    templateUrl: 'templates/tab-shopcar.html',
                    controller: 'shopCarCtrl'
                }
            }
        })

        .state('tab.order', {
            url: '/order',
            cache:false,
            views: {
                'tab-shopcar': {
                    templateUrl: 'templates/shopcar/order.html',
                    controller: 'orderCtrl'
                }
            }
        })

        .state('tab.setting', {
            url: '/setting',
            views: {
                'tab-setting': {
                    templateUrl: 'templates/tab-setting.html',
                    //controller: 'AccountCtrl'
                }
            }
        })

        .state('tab.search', {
            url: '/search',
            views: {
                'tab-search': {
                    templateUrl: 'templates/tab-search.html',
                    controller: 'searchCtrl'
                }
            }
        })

        .state('tab.searchDetail', {
            url: '/searchDetail',
            views: {
                'tab-search': {
                    templateUrl: 'templates/index/cate-detail.html',
                    controller: 'cateDetailCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/index');
}]);
