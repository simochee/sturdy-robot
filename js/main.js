var app = angular.module('myapp', ['ngSanitize']);

// Get device infomations
app.service('info', function() {
	this._ua = function(u) {
		return {
			Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
			|| u.indexOf("ipad") != -1
			|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
			|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
			|| u.indexOf("kindle") != -1
			|| u.indexOf("silk") != -1
			|| u.indexOf("playbook") != -1,
			Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
			|| u.indexOf("iphone") != -1
			|| u.indexOf("ipod") != -1
			|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
			|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
			|| u.indexOf("blackberry") != -1
		}
	};
	this.ua = function() {
		return 'sp';
		if(this._ua.Tablet || this._ua.Mobile) {
			return 'sp';
		} else {
			return 'pc';
		}
	};
});

app.constant('utils', function() {
	this.now = function() {
		var d = new Date();
		return {
			n: d,
			y: d.getFullYear(),
			m: d.getMonth() + 1,
			d: d.getDate(),
			w: d.getDay(),
			h: d.getHours(),
			i: d.getMinutes(),
			s: d.getSeconds(),
			u: Math.floor(d.getTime() / 1000)
		}
	}
});

app.directive('resize', function($timeout, $rootScope, $window) {
	return function() {
		var timer = false;
		return angular.element($window).on('load resize', function(e) {
			if(timer) {
				$timeout.cancel(timer);
			}
			return timer = $timeout(function() {
				var html = angular.element(document).find('html');
				var cW = html[0].clientWidth;
				var cH = html[0].clientHeight;
				return $rootScope.$broadcast('resize::resize', {
					cW: cW,
					cH: cH
				});
			}, 200);
		});
	}
});
app.value(
	'menuList', [
		{
			ja: '食べる',
			en: 'Dishes',
			list: [
				{
					ja: 'つまみ',
					en: 'Snack',
					menu: [
						{
							name: '枝豆',
							price: 320,
							img: null,
							comment: 'おつまみの大定番！<br>とりあえずビールと一緒にどうぞ。'
						},
						{
							name: 'チャンジャ',
							price: 280,
							img: 'img/menu-img/jangja.jpg',
							comment: 'コチュジャンやごま油、唐辛子をベースにした調味料にしっかり漬け込みました。<br>深い辛味と旨味をお楽しみください。'
						},
						{
							name: 'たこわさ',
							price: 320,
							img: 'img/menu-img/takowasa.jpg',
							comment: '新鮮なタコとおろしたてのわさびを使った、ピリッと涼しい味わいです。<br>〆や箸休めにどうぞ。'
						}
					]
				},
				{
					ja: '前菜・サラダ',
					en: 'Appetizer･Salad',
					menu: [
						{
							name: '手作りポテトサラダ',
							price: 380,
							img: null,
							comment: '毎日手作りのポテトサラダです。<br>ホクホクのじゃがいもにマイルドなマヨネーズが絶妙にマッチします。'
						},
						{
							name: 'トマトのカプレーゼ',
							price: 550,
							img: null,
							comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis provident tempora saepe libero labore dicta sunt vitae veniam! Ipsum itaque nulla eaque officia accusantium tempore quos quod, similique voluptas perspiciatis.'
						}
					]
				},
				{
					ja: 'お刺身',
					en: 'Sashimi',
					menu: [
						{
							name: '刺身の盛り合わせ',
							price: '1250',
							img: null,
							comment: '季節の旬に合わせた新鮮なお刺身の盛り合わせです。<br>夏シーズンは、黒鯛・太刀魚・鱧・サザエなどをご用意しています。'
						}
					]
				}
			]
		}
	]
);

app.value('articles', {
	articles: [
		{
			id: 'hello-world',
			title: 'みなさん、はじめましてこんにちは！',
			date: '2016-8-17',
			time: '20:51:51',
			catId: '0',
			body: '<p>みなさんはじめまして！</p>'
		}
	],
	categories: [
		{
			idx: 0,
			id: 0,
			name: 'おしらせ',
			count: 1
		},
		{
			idx: 1,
			id: 1,
			name: '今月の営業',
			count: 1
		},
		{
			idx: 2,
			id: 2,
			name: 'おすすめ',
			count: 4
		},
		{
			idx: 3,
			id: 3,
			name: '日記',
			count: 0
		}
	]
})
app.controller('appCtrl', ['$scope', 'info', function($scope, info) {
	$scope.ua = info.ua();

	// Include templates
	$scope.viewsNavbar = $scope.ua + '/navbar.html';
	$scope.viewsFooter = $scope.ua + '/footer.html';

	// Site menu
	$scope.siteMenu = [
		{
			href: '#', ja: 'こだわり', en: 'Persistence'
		},
		{
			href: 'news.html', ja: 'おしらせ', en: 'News'
		},
		{
			href: 'menu.html', ja: 'お品書き', en: 'Menu'
		},
		{
			// href: 'discount.html', ja: 'お得な情報', en: 'Discount'
			href: '#', ja: 'お得な情報', en: 'Discount'
		},
		{
			href: 'info.html', ja: '店舗情報', en: 'Information'
		},
		{
			href: 'reserve.html', ja: 'ご予約', en: 'Reservation'
		}
	]

}]);

app.controller('navbarCtrl', ['$scope', function($scope) {

}]);

app.controller('footerCtrl', ['$scope', function($scope) {
	$scope.bgSrc = 'img/footer-pic/pic1.jpg';
}]);
app.controller('indexCtrl', ['$scope', 'info', 'menuList', function($scope, info, menuList) {
	$scope.viewsIndexHeader = 'common/index-header.html';
	console.log($scope.viewsIndexHeader);
	$scope.menuList = menuList;
}]);

app.controller('indexHeaderCtrl', ['$scope', '$interval', function($scope, $interval) {
	var imgPath = 'img/index-pic/';

	$scope.slides = [
		{ img: imgPath + 'idx-pic1.jpg', active: true },
		{ img: imgPath + 'idx-pic2.jpg', active: false },
		{ img: imgPath + 'idx-pic3.jpg', active: false }
	];

	var activeIdx = 0;
	$interval(function() {
		$scope.slides[activeIdx].active = false;
		activeIdx ++;
		if($scope.slides[activeIdx] !== undefined) {
			$scope.slides[activeIdx].active = true;
		} else {
			$scope.slides[0].active = true;
			activeIdx = 0;
		}
	}, 5000);
}]);


app.controller('openCalCtrl', ['$scope', '$timeout', 'utils', function($scope, $timeout, utils) {
}]);

app.controller('menuCtrl', ['$scope', 'menuList', function($scope, menuList) {
	$scope.headerBg = '../img/header/menu.jpg';
	$scope.pageName = { ja: 'お品書き', en: 'Menu' };
	$scope.menuList = menuList;
}]);

app.controller('NewsCtrl', ['$scope', 'articles', function($scope, articles) {
	$scope.headerBg = '../img/header/news.jpg';
	$scope.pageName = { ja: 'おしらせ', en: 'News' };

	$scope.articles = articles.articles;
	$scope.categories = articles.categories;

	$scope.dateFormat = function(date) {
		var m = moment(date);
		return m.format('YYYY/MM/DD');
	}
	$scope.timeFormat = function(time) {
		var m = moment(time, 'hh:mm:ss');
		return m.format('hh:mm A');
	}
}]);
$(function() {
	// Anchor link scroller
	$('a[href^="#"]').click(function(e) {
		var href = $(this).attr('href');
		if( !(href == '#' || href == '') ) { 
			var target = $(href == '#top' ? 'html' : href);
			var offsetY = supplement(0, $(this).data('offsetY'));
			var position = target.offset().top + offsetY;
			var speed = supplement(300, $(this).data('speed'));
			var easing = supplement('swing', $(this).data('easing'));
			$('body,html').animate({
				scrollTop: position
			}, speed, easing);
		}
		return false;
	});

	function supplement(def, opt) {
		return opt === undefined ? def : opt;
	}
});