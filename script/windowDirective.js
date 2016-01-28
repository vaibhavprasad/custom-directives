 /*
The four functions are: compile, controller, pre-link and post-Link.

The compile function allows the directive to manipulate the DOM before it is compiled and linked thereby allowing it to add/remove/change directives, as well as, add/remove/change other DOM elements.

The controller function facilitates directive communication. Sibling and child directives can request the controller of their siblings and parents to communicate information.

The pre-link function allows for private $scope manipulation before the post-link process begins.

The post-link method is the primary workhorse method of the directive.


 */



var app = angular.module('panelApp',['ngAnimate']);
app.directive('paneldiv', function(){
	return{
		restrict: 'E',
		replace: true,
		scope:{											// use a new isolated scope. To inherit parent scope, use scope: true
			value:'=',
			title:'='
		},
		templateUrl: 'template/panelTemplate.html',
		link: function(scope, elem, attrs) {			//The link function is mainly used for attaching event listeners to DOM elements, watching model properties for changes, and updating the DOM

			// scope: scope passed to the directive
			// elem: the JQLite wrapped element on which the directive is applied
			// attrs: object representing attributes attached to the element on which the directive is applied. Example:-
			//<paneldiv some-attribute></paneldiv> and access it in the link function as attrs.someAttribute

			//here "elem" contains the panelTemplate.html's contents

			scope.hidePanel = false;		// variable controlling show and hide of the panel contents
			scope.maxSize = false;

			scope.reloadPanel = function(){
				alert("reloadPanel clicked");
			};

			scope.maximizePanel = function() {
				
				scope.hidePanel = false;

			};

			scope.minimizePanel = function() {
				
				scope.hidePanel = true;
				scope.maxSize = false;

			};
			scope.resizePanel = function() {
				
				scope.maxSize = !scope.maxSize;
				scope.hidePanel = false;
				setTimeout(function () {
        				window.scrollTo(0, elem[0].offsetTop)		// scroll to the maximized directive
      				}, 0);
			};
		}
	}
});
app.controller('PanelController', ['$scope', function($scope){
	$scope.value = "Sample data for the pannel. trying to run two directives simultaneously";
	$scope.title = "Test Panel";
	$scope.title1 = "Test Pane 2";
}]);
