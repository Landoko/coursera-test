(function(){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
	var buyer = this;
	buyer.items = ShoppingListCheckOffService.getItems();
	buyer.buyItem = function(index) {
		ShoppingListCheckOffService.buyItem(index);
	};
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
	var bought = this;
	bought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService(){
	var service = this;

	var toBuyItems = [{
		name: 'birra',
		quantity: 10
	},
	{
		name: 'cookies',
		quantity: 5
	},
	{
		name: 'chips',
		quantity: 4
	}];
	var boughtItems = [];

	service.buyItem = function(index){
		// var item = {
		// 	name: itemName,
		// 	quantity: quantity
		// }
		boughtItems.push(toBuyItems.splice(index, 1)[0]);

	};

	service.getItems = function() {
		return toBuyItems;
	};
	service.getBoughtItems = function(){
		return boughtItems;
	};
}

})();