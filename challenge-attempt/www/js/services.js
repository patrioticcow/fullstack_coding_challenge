angular.module('starter.services', [])

	.factory('Cards', function () {
		// Some fake testing data
		var cards = [{
			name: 'Ben Sparrow',
			image : 'http://www.abc.net.au/radionational/image/6865068-1x1-340x340.jpg',
			id : 0,
			match : 85,
			age : 25
		}, {
			name: 'Max Lynx',
			image : 'http://images.all-free-download.com/images/graphiclarge/romantic_music_background_vector_535030.jpg',
			id : 1,
			match : 86,
			age : 32
		}, {
			name: 'Adam Bradleyson',
			image : 'http://graphics8.nytimes.com/newsgraphics/2015/07/15/pluto-flyby-images/assets/150724-pluto-ice-thumb.jpg',
			id : 2,
			match : 97,
			age : 47
		}, {
			name: 'Adam Test',
			image : 'http://images.medicinenet.com/images/appictures/mrsa-s1-infection-facts.jpg',
			id : 3,
			match : 80,
			age : 17
		}, {
			name: 'Test Tinder',
			image : 'http://www.abc.net.au/radionational/image/6497216-1x1-340x340.jpg',
			id : 4,
			match : 95,
			age : 27
		}, {
			name: '5 Test Tinder',
			image : 'http://www.abc.net.au/radionational/image/6667942-1x1-340x340.jpg',
			id : 5,
			match : 85,
			age : 27
		}, {
			name: '6 Test Tinder',
			image : 'http://www.hair-extensions.info/wp-content/uploads/2015/07/wedding-hairstyle-hair-extensions.info-HD-1.jpg',
			id : 6,
			match : 79,
			age : 37
		}, {
			name: '7 Test Tinder',
			image : 'http://4.bp.blogspot.com/-tu6Qew-IQW4/VMcWITE8ugI/AAAAAAAABqk/a_RULVowYV0/s1600/Chocolate-day-hd-wallpapers-images.jpg',
			id : 7,
			match : 85,
			age : 32
		}, {
			name: '8 Test Tinder',
			image : 'http://help.pcon-planner.com/en/help/pcon.planner_basics_materials_34_self-illuminating_yellow.png',
			id : 8,
			match : 55,
			age : 28
		}, {
			name: '9 Test Tinder',
			image : 'http://www.abc.net.au/radionational/image/6497216-1x1-340x340.jpg',
			id : 9,
			match : 85,
			age : 29
		}, {
			name: '10 Test Tinder',
			image : 'http://www.abc.net.au/radionational/image/6497216-1x1-340x340.jpg',
			id : 10,
			match : 100,
			age : 90
		}, {
			name: '11 Test Tinder',
			image : 'http://www.abc.net.au/radionational/image/6497216-1x1-340x340.jpg',
			id : 11,
			match : 85,
			age : 91
		}, {
			name: '12 Test Tinder',
			image : 'http://www.abc.net.au/radionational/image/6497216-1x1-340x340.jpg',
			id : 12,
			match : 85,
			age : 92
		}];

		return {
			all   : function (count) {
				if (count === undefined) return cards;

				var arr = [];
				for (var i = 0; i < count; i++) {
					arr.push(cards[i]);
				}

				return arr;
			},
			remove: function (chat) {
				cards.splice(cards.indexOf(chat), 1);
			},
			get   : function (chatId) {
				for (var i = 0; i < cards.length; i++) {
					if (cards[i].id === parseInt(chatId)) {
						return cards[i];
					}
				}
				return null;
			}
		};
	});
