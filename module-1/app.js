(function() {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.menu = '';
        $scope.message = '';
        $scope.messageStyle = '';

        $scope.getMenu = function() {
            // Check if the menu is empty
            if ($scope.menu === '') {
                $scope.message = 'Please enter data first';
                $scope.messageStyle = 'red';
                return;
            }

            // Split the menu items by comma
            let menuItemsArray = $scope.menu.split(',');

            // Remove empty items (bonus feature) with trim
            menuItemsArray = menuItemsArray.filter(item => item.trim() !== '');

            // Check the number of items and set the message accordingly
            if (menuItemsArray.length <= 3) {
                $scope.message = 'Enjoy!';
                $scope.messageStyle = 'green';
            } else {
                $scope.message = 'Too much!';
                $scope.messageStyle = 'green';
            }
        }
    }
})();