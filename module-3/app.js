(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .constant('ApiBasePath', "http://coursera-jhu-default-rtdb.firebaseio.com")
        .factory('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItems);


    function foundItems() {
        let ddo = {
            templateUrl: 'foundItems.html',
            scope: {
            items: '<',
            message: '<',
            onRemove: '&'
            }
        };
    
        return ddo;
    }
    function loader() {
        let ddo = {
          templateUrl: 'app/loader/loader.template.html',
        };
    
        return ddo;
    }
    NarrowItDownController.$inject = ['MenuSearchService'];

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      let menu = this;
  
      menu.found = [];
      menu.removeMenuItem = removeMenuItem;
      menu.searchMenuItem = searchMenuItem;
      menu.searchTerm = ''
  
      function searchMenuItem(){
        menu.loading = true;
        menu.message = '';
  
        return MenuSearchService.getMatchedMenuItems(menu.searchTerm)
        .then(function(data) {
            menu.found = data;
  
            menu.loading = false;
          if (menu.found.length == 0) {
            menu.message = 'Nothing found!';
          }
        })
        .catch(function(error) {
          console.log(
            'Failed loading information. Error Code: %s, Error Message: %s',
            error.status,
            error.statusText
          );
  
          menu.loading = false;
          menu.message = 'Error loading information';
        });
      }
  
      function removeMenuItem(index){
        menu.found.splice(index, 1);
      }
  
    }

    MenuSearchService.$inject = ['$http', '$q', 'ApiBasePath']
    function MenuSearchService($http, $q, ApiBasePath) {
      let service = {
        getMatchedMenuItems: getMatchedMenuItems
      };
  
      return service;
  
      function getMatchedMenuItems(searchTerm) {
  
        if (searchTerm == '') {
         return $q.when([]);
        }
  
        return $http.get(ApiBasePath + "/menu_items.json")
          .then(getMenuItemsComplete);
  
        function getMenuItemsComplete(response) {
          let foundItems = response.data.menu_items;
  
          foundItems = foundItems.filter(function(item) {
            return item.description.indexOf(searchTerm) !== -1;
          });
          return foundItems || [];
        }
  
      }
  
    }
})();