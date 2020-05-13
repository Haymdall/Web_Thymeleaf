var app = angular.module("AngularApp", [ "LocalStorageModule" ]);
/* angular.module("ToDoList",["LocalStorageModule"]) */
(function() {
	angular.module('AngularApp').controller(
			'Controller',
			[
					'$scope',
					'localStorageService',
					'$http',
					function($scope, localStorageService, $http) {

						if (localStorageService.get("angular-todolist")) {
							$scope.todo = localStorageService
									.get("angular-todolist");
							$scope.todo2 = localStorageService
									.get("angular-todolist");
						} else {
							$scope.todo = [];
							$scope.todo2 = [];
						}

						$scope.newActv = {};
						$scope.newActv2 = {};

						$scope.$watchCollection('todo', function(newValue,
								oldValue) {
							localStorageService.set("angular-todolist",
									$scope.todo);
						});
						$scope.addActv = function() {
							$scope.todo.push($scope.newActv);
							$scope.newActv = {};
							$scope.newActv2.descripcion = "Hola2";
							localStorageService.set("angular-todolist",
									$scope.todo);
						}
						$scope.clean = function() {
							$scope.todo = [];
							localStorageService.set("angular-todolist",
									$scope.todo);
						}

						$scope.$watchCollection('todo2', function(newValue,
								oldValue) {
							localStorageService.set("angular-todolist",
									$scope.todo2);
						});
						$scope.addActv2 = function() {
							$scope.todo2.push($scope.newActv2);
							$scope.newActv2 = {};
							$scope.newActv.descripcion = "Hola1";
							localStorageService.set("angular-todolist",
									$scope.todo2);
						}
						$scope.clean2 = function() {
							$scope.todo2 = [];
							localStorageService.set("angular-todolist",
									$scope.todo2);
						}
						
						$scope.posts = [];
						$scope.newPost = {};
						
						/*$http.get('http://jsonplaceholder.typicode.com/posts')
		                .success(function(data) {
		                	console.log(success);
							$scope.posts = success.data;
		                })
		                .error(function(data) {
		                	alert(data);
		                	console.log('Error: ' + data);
		                });*/
		                
						$http({
					       method: 'GET',
					       url: "http://jsonplaceholder.typicode.com/posts"
					   }).then(
					       function(success) { // success
					       
								console.log(success);
								$scope.posts = success.data;
					       
					       },
					       function(error) { // error
					       		console.log("error");
					       }
					   );

						$scope.addPost = function(){
						
							$scope.mensaje = {};
							$scope.mensaje.title  = $scope.newPost.title;
							$scope.mensaje.body   = $scope.newPost.body;
							$scope.mensaje.userId = 1;
							
							$http({
					           method: 'POST',
					           data: angular.toJson($scope.mensaje),
					           url: "http://jsonplaceholder.typicode.com/posts",
					           headers: {
					            'Content-Type': 'application/json'
					           }
					        }).then(
					           function(success) { // success
					           
					           	$scope.posts.push($scope.mensaje);
					           	$scope.newPost = {};
					            console.log(success);
					           
					           },
					           function(error) { // error

					           	console.log(error);

					           }
					        );
						}

					} ]);
})();