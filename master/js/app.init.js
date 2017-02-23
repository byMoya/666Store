/**
 * Created by qq515 on 2016/10/2.
 */
var App = angular.module('starter', ['ionic'])

    .run(function($ionicPlatform, $rootScope) {

        $rootScope.indexTitle = "首页";
        document.title = $rootScope.indexTitle;

        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });
