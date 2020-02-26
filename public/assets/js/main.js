/*
  Stellar by HTML5 UP
  html5up.net | @ajlkn
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
  Modded by pGuerrerox
*/

(function ($) {
	var $window = $(window),
		$body = $('body');

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 200);
	});
})(jQuery);