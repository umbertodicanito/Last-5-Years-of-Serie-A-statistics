var values_seasons = ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"];
var season_from = values_seasons.indexOf("2015/16");
var season_to = values_seasons.indexOf("2017/18");

var triggerChange = function(data){
    var homeTeam = $("#sel_teamA option:selected").text()
    var awayTeam = $("#sel_teamB option:selected").text()
    var fromValue = 5 - data.from
    var toValue = 5 - data.to
    if(homeTeam !== "Choose team A..." && awayTeam !== "Choose team B..."){
        var dateFrom = values_seasons[data.from]
        var dateTo = values_seasons[data.to]
        createTableFor(homeTeam,awayTeam,dateFrom,dateTo)
        /*changing points shown on MDS graph*/
        var seasons = []
        x = toValue
        while(x <= fromValue){
            seasons.push(x)
            x++
        }
        showMDSDataFromTo(toValue,fromValue)
        selectionMDS(seasons,homeTeam,awayTeam)
        
    }else{
        /*changing points shown on MDS graph*/
        showMDSDataFromTo(toValue,fromValue)
        
    }
    
    
}
$(".js-range-slider").ionRangeSlider({
    type: "double",
    grid: true,
    from: season_from,
    to: season_to,
    step: 1,
    values: values_seasons,
    onFinish: triggerChange
});