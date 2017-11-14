var app = angular.module("myApp", []);
			
app.controller("myCntrl", function($scope, $http){
	
	$scope.subHead = false;
	$scope.imageName = "";
	$scope.image1 = "";
	$scope.image2 = "";
	
	$http.get("/repo.json")
	.then(function(response){
		$scope.headings = response.data;
		// $scope.imageDir = imageName.toUpperCase();
		// $scope.data = response.data[$scope.imageDir];
	})
	
	$scope.searchImages = function() {
		$scope.image1 = "";
		$scope.image2 = "";
		$scope.cmpResult = "";
		if($scope.imageName == "" || $scope.imageName == null) {
			$scope.subHead = false;
		} else {
			$scope.subHead = true;
			$scope.imageDir = $scope.imageName;
			$scope.data = $scope.headings[$scope.imageName];
			console.log($scope.data);
		}
		// $http.get("http://www.json-generator.com/api/json/get/cfMEfGOIoi?indent=2")
		// .then(function(response){
			// $scope.headings = response.data;
			// $scope.imageDir = imageName.toUpperCase();
			// $scope.data = response.data[$scope.imageDir];
		// })
	}
	
	$scope.selectImg1 = function(img) {
		$scope.image1 = img;
		$scope.compareImg();
	}
	
	$scope.selectImg2 = function(img) {
		$scope.image2 = img;
		$scope.compareImg();
	}
	
	$scope.compareImg = function() {
		$scope.cmpResult = "";
		if($scope.image1 && $scope.image2) {
			$http.get("/convertcsv.json")
			.then(function(response){
				$scope.match = response.data;
				angular.forEach($scope.match, function(value, key) {
					if(value.img1 == $scope.image1 && value.img2 == $scope.image2) {
						$scope.cmpResult = value.result;
					}
				});
				
			})
		}
		
	}
});