(function() {
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {

		$scope.messageTypes = {
			OK: "Enjoy!",
			MUCH: "Too much!",
			NONE: "Please enter data first."
		};

		$scope.buttonCheck = function () {
			var numberOfItems = CountItemsInList($scope.listInput);

			if(numberOfItems == 0) {
				$scope.message = $scope.messageTypes.NONE;
			} else if(numberOfItems < 4) {
				$scope.message = $scope.messageTypes.OK;
			} else {
				$scope.message = $scope.messageTypes.MUCH;
			}
		};

		function CountItemsInList(list) {
			if(list == undefined || list == "")
			{
				return 0;
			}

			var items = list.split(',');
			items = items.filter(function(n){ return n.trim() != ''; });
			return items.length;
		};
	}
})();