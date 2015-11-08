angular.module('starter.controllers', [])

	.controller('DashCtrl', function ($scope, $ionicModal, Cards, Logic) {
		/**
		 * the idea is to get in 4, 5 items.
		 * then as the cards get removed, keep adding more
		 * and keep 4, 5 card in teh DOM for performance.
		 */
		$scope.cards = Cards.all(4);

		$scope.clientWidth  = document.documentElement.clientWidth;
		$scope.clientHeight = document.documentElement.clientHeight;

		$scope.currentUser = $scope.cards[0];

		/**
		 * let the cards auto resize based on the window size (refresh the page)
		 */
		$scope.cardWidth = Math.round($scope.clientWidth - ($scope.clientWidth * 0.2)) + 'px';
		$scope.cardHeight = Math.round(($scope.clientHeight - 100) - ($scope.clientHeight * 0.2)) + 'px';

		$scope.bgColor = document.getElementById('bgColor');

		$scope.contentArea = angular.element(document.querySelectorAll(".content-area")[0]);
		$scope.cWidth      = $scope.contentArea[0].clientWidth;
		$scope.cHeight     = $scope.contentArea[0].clientHeight;

		/**
		 * store the initial mouse position so we ca use it to know
		 * when we remove a card
		 */
		$scope.onSwipeStart = function (e) {
			$scope.mauseStartX = e.deltaX;
			$scope.mauseStartY = e.deltaY;
		};

		$scope.onSwipeEnd = function (e) {
			if ($scope.toRemove === true) {
				$scope.removeCard(e);
				$scope.getNextCard(e);
				$scope.itsAMatch(e);
			}

			if ($scope.toRemove === false) Logic.dontRemoveCard(e);

			$scope.resetColors();
		};

		/**
		 * simulate It's a Match!
		 */
		$scope.itsAMatch = function (e) {
			if ($scope.dragSide === 'right' && 2 === $scope.key) {
				$scope.modalName = 'itsAMatch';
				$scope.setModal('show');
			}
		};

		/**
		 * get next card and append it to the DOM
		 * if no cards, start form the begining
		 */
		$scope.getNextCard = function (e) {
			var nextCardId = $scope.key + 4;
			var card       = Cards.get(nextCardId);

			if (card) $scope.cards.push(card);
			if (!card) $scope.cards = Cards.all(4);

			for (var i = 0; i < 3; i++) {
				Logic.setTransform(document.querySelectorAll(".tinder-card")[i], i);
			}
		};

		/**
		 * remove the card from the DOM
		 * as well from the cards data array
		 */
		$scope.removeCard = function (e) {
			e.element.html('');
			e.element.remove();

			$scope.cards.shift();
		};

		/**
		 * set bg to white. this connects to the colors that appear on drag
		 */
		$scope.resetColors = function () {
			$scope.bgColor.style.background = "linear-gradient(to bottom, #ffa84c 0%,#ff7b0d 100%)";
		};

		/**
		 * this sets some params
		 */
		$scope.setParams = function (data) {
			$scope.toRemove = data.value;
			$scope.dragSide = data.side;
			$scope.key      = data.key;

			$scope.currentUser = $scope.cards[$scope.key];
		};

		/**
		 * calculate a threshold that we can use to remove a card.
		 * in this case if the card is gragged in the last 20% of the screen.
		 */
		var windowWidth  = Math.round($scope.clientWidth / 2);
		$scope.threshold = windowWidth - (windowWidth * 0.2);

		/**
		 * add some way to know if to accept this user or not, i choose a color
		 * set some helper vars
		 */
		$scope.onSwipeLeft = function (e) {
			$scope.setParams({value: false, side: 'none'});
			if ($scope.mauseStartX - e.deltaX >= $scope.threshold) {
				var key = parseInt(e.element[0].getAttribute('data-key'));

				$scope.bgColor.style.background = "linear-gradient(to right,  #cc0000 0%,#cc0000 100%)";
				$scope.setParams({value: true, side: 'left', key: key});
			}
		};

		/**
		 * add some way to know if to accept this user or not, i choose a color
		 * set some helper vars
		 */
		$scope.onSwipeRight = function (e) {
			$scope.setParams({value: false, side: 'none'});
			if ((($scope.mauseStartX - e.deltaX) * -1) >= $scope.threshold) {
				var key = parseInt(e.element[0].getAttribute('data-key'));

				$scope.bgColor.style.background = "linear-gradient(to right,  #057200 0%,#126300 100%)";
				$scope.setParams({value: true, side: 'right', key: key});
			}
		};

		/**
		 *  modal controls below
		 */
		$scope.sendGift = function () {
			$scope.modalName = 'gift';
			$scope.setModal('show');
		};

		$scope.modalName = 'itsAMatch';
		$scope.setModal  = function (type) {
			$ionicModal.fromTemplateUrl($scope.modalName + '.html', {scope: $scope, animation: 'slide-in-up'}).then(function (modal) {
				$scope.modal = modal;
				if (type === 'show') $scope.modal.show();
			});
		};

		$scope.closeModal = function () {
			$scope.modal.hide();
		};

		$scope.$on('$destroy', function () {
			$scope.modal.remove();
		});
	})

	.factory('Logic', function () {
		return {
			/**
			 * this is used to adjust the transform controls for the cards
			 */
			setTransform: function (element, key) {
				var el        = angular.element(element);
				var transform = 'translate3d(0, 0, 0)';
				var zIndex    = key == 0 ? 3 : (key === 2 ? 1 : 2);

				el.removeClass('displayNone');

				if (key === 1) transform = 'translate3d(0, 30px, -60px)';
				if (key === 2) transform = 'translate3d(0, 60px, -120px)';
				if (key > 2) el.addClass('displayNone');

				el.css({transform: transform, 'z-index': zIndex});
			},

			/**
			 * the cards that are not removed, we can reset them to the center
			 */
			dontRemoveCard: function (e) {
				e.element.children().css({
					transition                  : 'all 0.5s ease-out',
					transform : 'translate3d(0, 0, 0)',
					'transition-timing-function': 'cubic-bezier(0.1, 0.8, 0.4, 1.3)'
				});
			}
		};
	})

	/**
	 * this deals with each card
	 */
	.directive('cardDirective', function (Logic) {
		return function (scope, element, attr) {
			/**
			 * initial setup
			 *
			 * setup the initial position or the first 3 cards
			 * hide the rest
			 */
			var key = parseInt(attr['key']);

			Logic.setTransform(element, key);

			// on card drag
			scope.onSwipe = function (e) {
				/**
				 * we can use LEFT and TOP for compatibility
				 * but better performance can be achieved with translate3d
				 */
				e.element.children().css({
					transition: '0s',
					transform : 'translate3d(' + e.deltaX + 'px, ' + e.deltaY + 'px, 0)'
				});
			};
		};
	})

	/**
	 * NON RELATED STUFF
	 */
	.controller('ChatsCtrl', function ($scope, Cards) {
		$scope.chats  = Cards.all();
		$scope.remove = function (chat) {
			Cards.remove(chat);
		};
	})

	.controller('ChatDetailCtrl', function ($scope, $stateParams, Cards) {
		$scope.chat = Cards.get($stateParams.chatId);
	})

	.controller('AccountCtrl', function ($scope) {
		$scope.settings = {
			enableFriends: true
		};
	});
