var currentViewChartGoalsTeamB = "grouped"

var dataGoalsTeamB = []
var n = 2, // number of layers
    m = 5, // number of samples per layer
    stack = d3.stack()

var margin = {top: 2, right: 10, bottom: 20, left: 130},
    width = 340 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var formatPercent_B = d3.format(".0%");
var formatNumber_B = d3.format("");

var yGroupMax_B = 94

/*variables needed to be global for the transition*/
var yy_B
var xx_B
var rect_goals_B
var yyAxis_B
var svg_goals_B

function transitionGroupedB() {
    yy_B.domain([0, yGroupMax_B]);

    rect_goals_B.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("x", function(d, i, j) { return xx_B(i) + xx_B.bandwidth() / n * parseInt(this.parentNode.id); })
        .attr("width", xx_B.bandwidth() / n)
        .transition()
        .attr("y", function(d) { return height - (yy_B(d[0]) - yy_B(d[1])); })
        .attr("height", function(d) { return yy_B(d[0]) - yy_B(d[1]); });

    yyAxis_B.tickFormat(formatNumber_B)
    svg_goals_B.selectAll(".y.axis").transition()
        .delay(500)
        .duration(500)
        .call(yyAxis_B)
}

function transitionPercentB() {
    yy_B.domain([0, 1]);

    rect_goals_B.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { 
        var total = d3.sum(d3.values(d.data)); 
        return yy_B(d[1] / total); })
        .attr("height", function(d) { 
        var total = d3.sum(d3.values(d.data));
        return yy_B(d[0] / total) - yy_B(d[1] / total); })
        .transition()
        .attr("x", function(d, i) { return xx_B(i); })
        .attr("width", xx_B.bandwidth());

    yyAxis_B.tickFormat(formatPercent_B)

    svg_goals_B.selectAll(".y.axis").transition()
        .delay(500)
        .duration(500)
        .call(yyAxis_B)

}

function updateChartGoalsForTeamB(team){
    /*tooltip showing precise info*/
    var tooltip = d3.select("#div_goals_teamB").append("div").attr("class", "tooltip").style("opacity", 0);
    /*retrieving data from data set*/
    if(team == null || team === "Choose team B..."){
        dataGoalsTeamB = [[0,0,0,0,0],[0,0,0,0,0]]
        $("#scored_B").text("■ scored goals")
        $("#suffered_B").text("■ suffered goals")
    }else{
        dataGoalsTeamB = getGoalsDoneBy(team)
        $("#scored_B").text("■ " + team + " scored goals")
        $("#suffered_B").text("■ " + team + " suffered goals")
    }

    /*removing old data*/
    d3.select("#svgChartGoalsTeamB").remove()

    // transpose data
    dataGoalsTeamB = dataGoalsTeamB[0].map(function(col, i) { 
        return dataGoalsTeamB.map(function(row) { 
            return row[i] 
        })
    });

    var layers_goals_B = stack.keys(d3.range(n))(dataGoalsTeamB)

    xx_B = d3.scaleBand()
        .domain(d3.range(m))
        .rangeRound([0, width])
        .padding(0.1)
        .align(0.1);

    yy_B = d3.scaleLinear()
        .domain([0, yGroupMax_B])
        .rangeRound([height, 0]);

    var color_goals_B = d3.scaleLinear()
    .domain([0, n - 1])
    .range(["rgb(230,85,13)", "rgb(253,174,107)"]);

    /*["14/15","15/16","16/17","17/18","18/19"] QUESTO dovrebbe essere mostrato sull'asse X ma non è possibile con questo tipo di scala (band) come riporta qui https://github.com/d3/d3-axis*/
    var xxAxis_B = d3.axisBottom().scale(xx_B);

    yyAxis_B = d3.axisLeft().scale(yy_B)

    svg_goals_B = d3.select("#div_goals_teamB").append("svg")
        .attr("id","svgChartGoalsTeamB")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer_goals_two_B = svg_goals_B.selectAll(".layer")
    .data(layers_goals_B)
    .enter().append("g")
    .attr("class", "layer")
    .attr("id", function(d) { return d.key; })
    .style("fill", function(d, i) { return color_goals_B(i); });

    rect_goals_B = layer_goals_two_B.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d, i) { return xx_B(i); })
        .attr("y", height)
        .attr("width", xx_B.bandwidth())
        .attr("height", 0)
        .attr("data-goals", function(d, i) {return "scored: <b>" + dataGoalsTeamB[i].toString().split(",")[0] + "</b><br>suffered: <b>" + dataGoalsTeamB[i].toString().split(",")[1] + "</b></br>" })
        .on("mousemove", function(d){
        tooltip.transition()
            .duration(50)
            .style("opacity", 1);
        tooltip
            .style("left", d3.mouse(this)[0]+50 + "px")
            .style("top", d3.mouse(this)[1]-30 + "px")
            .html(this.getAttribute("data-goals"));
        })
        .on("mouseout", function(d){ 
        tooltip.transition()
            .duration(50)
            .style("opacity", 0);});

    rect_goals_B.transition()
        .delay(function(d, i) {return i * 10; })
        .attr("y", function(d) { return yy_B(d[1]); })
        .attr("height", function(d) { return yy_B(d[0]) - yy_B(d[1]); });

    svg_goals_B.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xxAxis_B);

    svg_goals_B.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + 0 + ",0)")
        .style("font-size", "10px")
        .call(yyAxis_B);

    /*selecting input radio buttons to trigger at event*/
    d3.select("#percent").on("change", updateGoalsView);
    d3.select("#grouped").on("change", updateGoalsView);

    /*adjusting chart view to previous one*/
    updateGoalsViewWithSpecific(lastGoalsViewSelected)
}

/*called in order to show a void graph*/
updateChartGoalsForTeamB(null)