(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('EndpointUrl', "https://davids-restaurant.herokuapp.com/menu_items.json");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
	var ctrl = this;

	ctrl.searchText = "";
	ctrl.foundItems = [];

	ctrl.onSearch = function(){
		if(ctrl.searchText !=""){
			MenuSearchService.getMatchedMenuItems(ctrl.searchText).then(function(response){
				ctrl.foundItems = response;
			});
		} else {
			ctrl.foundItems = [];
		}
	};

	ctrl.removeItem = function(index){
		ctrl.foundItems.splice(index, 1);
	};
}

MenuSearchService.$inject = ['$http', 'EndpointUrl'];
function MenuSearchService($http, EndpointUrl){
	var service = this;

	service.getMatchedMenuItems = function(searchTerm){
		return $http({
			method: 'GET',
			url: EndpointUrl
		}).then(function(result) {
			var foundItems = result.data.menu_items;

			var filteredItems = foundItems.filter(function(value){
				return value.description.indexOf(searchTerm) != -1;
			});

			return filteredItems;
		});
	};
}

function FoundItemsDirective(){
	var ddo = {
		restrict: "E",
		templateUrl: "foundItems.html",
		scope: {
			foundItems: "<",
			onRemove: "&"
		},
		controller: FoundItemsDirectiveController,
		controllerAs: "list",
		bindToController: true
	};

	return ddo;
}

function FoundItemsDirectiveController(){
	var list = this;

	list.title = "Found Items";
}

})();