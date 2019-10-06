var values_seasons = ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"];
var season_from = values_seasons.indexOf("2015/16");
var season_to = values_seasons.indexOf("2017/18");

$(".js-range-slider").ionRangeSlider({
    type: "double",
    grid: true,
    from: season_from,
    to: season_to,
    step: 1,
    values: values_seasons,
    onFinish: function(data){
        var element = document.getElementById("notificationRangeSelected")
        var text = "Range from " + values_seasons[data.from] + " to " + values_seasons[data.to]
        element.textContent = text
    }
});