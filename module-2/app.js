(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];


    function ToBuyController(ShoppingListCheckOffService) {
        let toBuyList = this;
        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();  

        toBuyList.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        let alreadyBoughtList = this;
        alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }
    function ShoppingListCheckOffService() {
        let service = this;
        let toBuyItems = [
            { name: "Cookies", quantity: 10 },
            { name: "Milk", quantity: 2 },
            { name: "Onions", quantity: 5 },
            { name: "Tomatoes", quantity: 8 },
            { name: "Apples", quantity: 4 }
        ];
        let alreadyBoughtItems = [];
        service.getToBuyItems = function() {
            return toBuyItems;
        };
        service.getAlreadyBoughtItems = function() {
            return alreadyBoughtItems;
        };
        service.buyItem = function(itemIndex) {
            let item = toBuyItems[itemIndex];

            alreadyBoughtItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        };
    }
})();