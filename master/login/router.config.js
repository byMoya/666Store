/**
 * Created by qq515 on 2016/10/2.
 */

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider','$ionicConfigProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider,$ionicConfigProvider) {

        $ionicConfigProvider.views.maxCache(0);
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

        .state('register', {
            url: '/register',
            templateUrl: 'templates/login/register.html',
            controller: 'registerCtrl'
        })

        .state('forget', {
            url: '/forget',
            templateUrl: 'templates/login/forget.html',
            controller: 'forgetCtrl'
        })

        .state('position', {
            url: '/position',
            templateUrl: 'templates/login/position.html',
            controller: 'positionCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login/login.html',
            controller: 'loginCtrl'
        })

        // setup an abstract state for the tabs directive

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
}]);
