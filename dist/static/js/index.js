var app = angular.module("myApp", ["ui.bootstrap"]);
			
app.controller("myCntrl", function($scope, $http){
	
	$scope.subHead = false;
	$scope.pagination = {
		currentPage : 1,
		pages : 1,
		numPerPage : 2,
		maxSize : 5
	}
	
	$scope.filteredGroups = [];
	$scope.groups = [];
	
	$http.get("/convertcsv.json")
	.then(function(response){
		$scope.headings = response.data;
	});
	
	$scope.searchImages = function() {
		$scope.pagination.pages = 1;
		var data = $scope.headings[$scope.imageName];
		var length = 0;
		$scope.data = angular.copy(data);
		angular.forEach(data, function(value, index) {
			if(index != "$$hashKey") {
			length++;
			$scope.groups.push(index);
			}
		});
		$scope.pagination.pages = length;
		$scope.initialReview = [];
		$scope.published = [];
		if($scope.imageName) {
			$scope.subHead = true;
		}
		
		angular.forEach(data, function(value, key) {
			angular.forEach(value, function(item, index) {
				if(index == "Initial Review") {
					for(i in item) {
						if(item[i].Name) {
							$scope.initialReview.push(item[i].Name);
						}
					}
				} else if(index == "Published") {
					for(i in item) {
						if(item[i].Name) {
							$scope.published.push(item[i].Name);
						}
					}
				}
			});
		});
		var begin = (($scope.pagination.currentPage - 1) * $scope.pagination.numPerPage), end = begin + $scope.pagination.numPerPage;
		$scope.filteredGroups = $scope.groups.slice(begin, end);
	}
	
	$scope.resetRepo = function() {
		console.log($scope.subHead);
		$scope.subHead = false;
		console.log($scope.subHead);
	}
	
	$scope.pageChanged = function() {
		console.log($scope.pagination.currentPage);
		var begin = (($scope.pagination.currentPage - 1) * $scope.pagination.numPerPage), end = begin + $scope.pagination.numPerPage;
		$scope.filteredGroups = $scope.groups.slice(begin, end);
	}
});