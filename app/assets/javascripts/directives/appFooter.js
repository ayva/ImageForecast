futugram.directive('appFooter', ['$timeout', function($timeout){
  return {
                restrict: 'A',
                // template: 'WOOHOO',
                scope: true,
                templateUrl: 'partials/footer.html',
                link: function (scope, iElement, iAttrs) {
                    var stickyFooterWrapper = $(iAttrs.appFooter);

                    // Quite often you will occur a few wrapping `<div>`s in the
                    // top level of your DOM, so we need to set the height
                    // to be 100% on each of those. This will also set it on
                    // the `<html>` and `<body>`.
                    stickyFooterWrapper.parents().css('height', '100%');
                    stickyFooterWrapper.css({
                        'min-height': '100%',
                        'height': 'auto'
                    });

                    // Append a pushing div to the stickyFooterWrapper.
                    var stickyFooterPush = $('<div class="push"></div>');
                    stickyFooterWrapper.append(stickyFooterPush);

                    var setHeights = function () {
                        var height = iElement.outerHeight();
                        stickyFooterPush.height(height);
                        stickyFooterWrapper.css('margin-bottom', -(height));
                    };

                    $timeout(setHeights, 0);
                    $(window).on('resize', setHeights);
                }
          };
}]);