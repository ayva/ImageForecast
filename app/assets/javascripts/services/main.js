futugram.service('main', ['$rootScope', function ($rootScope) {

    var chosenMonth = $("[data-month='" + getCurrentMonth() + "']")[0],
        day = getCurrentDay(),
        month = getCurrentMonth(),
        date = day + ' ' + month;

    this.initSlider = function (steps) {
        if ($(".slider")[0]) {
            $(".slider")[0].remove();
        }
        $("[data-slider]").each(function () {
            var $el, allowedValues, settings, x;
            $el = $(this);
            settings = {};
            allowedValues = $el.data("slider-values");
            if (allowedValues) {
                settings.allowedValues = (function () {
                    var _i, _len, _ref, _results;
                    _ref = allowedValues.split(",");
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        x = _ref[_i];
                        _results.push(parseFloat(x));
                    }
                    return _results;
                })();
            }
            if ($el.data("slider-range")) {
                settings.range = steps.split(",");
            }
            if ($el.data("slider-step")) {
                settings.step = $el.data("slider-step");
            }
            settings.snap = $el.data("slider-snap");
            return $el.simpleSlider(settings);
        });

        $("#slider-input")
            .each(function () {
                var input = $(this);
            })
            .bind("slider:ready slider:changed", function (event, data) {
                day = data.value.toFixed(0);
                $($('.output')[0]).html(day + ' ' + $(chosenMonth).text());
            });
        $("#slider-input").simpleSlider("setValue", day);
    };

    this.init = function () {

        $('.mnth-button').on('click', function () {
            if ($('.clicked')[0]) {
                $('.clicked')[0].className = 'mnth-button';
            }
            this.className = 'clicked';
            chosenMonth = $('.clicked')[0];
            $($('.output')[0]).html(day + ' ' + $(chosenMonth).text());
        });

        $('.weather-info')[0].style.display = 'none';

        chosenMonth.className = 'clicked';
        $($(".output")[0]).text(date);

        $(function () {
            $("#datepicker").datepicker({
                onSelect: function (date, ins) {
                    $rootScope.$broadcast('mobile-calendar:uploaded', {date: ins});
                }
            });
            $("#format").change(function () {
                $("#datepicker").datepicker("option", "dateFormat", $(this).val());
            });
        });
    };

    this.wrapFirstPhoto = function () {
        $('.weather-info')[0].style.display = 'block';
        $('#photo-1')[0].className = '';
        $($('#photo-1')[0]).appendTo('.weather-block-wrapper');
    };

    function getCurrentMonth() {
        var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];

        var d = new Date();
        return monthNames[d.getMonth()];
    }

    function getCurrentDay() {
        var d = new Date();
        return d.getDate();
    }


    this.daysInSlider = function (days) {
        $($('.days-list')[0]).html('');
        var dayWidth = 720 / days;
        for (var i = 1; i <= days; i++) {
            $($('.days-list')[0]).append('<li class=\'days\' style=\'width:' + dayWidth + 'px;\'>' + i + '</li>');
        }
    };

    this.daysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };

}]);
