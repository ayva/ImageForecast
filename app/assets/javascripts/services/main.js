futugram.service('main', function () {

    var chosenMonth = $("[data-month='" + getCurrentMonth() + "']")[0],
        day = getCurrentDay(),
        month = getCurrentMonth(),
        date = day + ' ' + month,
        days = 30,
        dayWidth = 720 / days;

    this.init = function () {

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
                settings.range = $el.data("slider-range").split(",");
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
        $("#slider-input").simpleSlider("setValue", day);
    };

    this.wrapFirstPhoto = function () {
        $('.weather-info')[0].style.display = 'block';
        $('#photo-1')[0].className = '';
        $($('#photo-1')[0]).appendTo('.weather-block-wrapper');
    }

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


    this.daysInSlider = function () {
        for (var i = 1; i <= days; i++) {
            $($('.days-list')[0]).append('<li class=\'days\' style=\'width:' + dayWidth + 'px;\'>' + i + '</li>');
        }
    }
});
