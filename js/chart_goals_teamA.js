var currentViewChartGoalsTeamA = "grouped" 

var dataGoalsTeamA = []
var n = 2, // number of layers
    m = 5, // number of samples per layer
    stack = d3.stack()

var margin = {top: 2, right: 10, bottom: 20, left: 100},
    width = 340 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var formatPercent_A = d3.format(".0%");
var formatNumber_A = d3.format("");

var yGroupMax_A = 94

/*variables needed to be global for the transition*/
var yy_A
var xx_A

var rect_goals_A
var yyAxis_A
var svg_goals_A

function transitionGroupedA() {
    yy_A.domain([0, yGroupMax_A]);

    rect_goals_A.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("x", function(d, i, j) { return xx_A(i) + xx_A.bandwidth() / n * parseInt(this.parentNode.id); })
        .attr("width", xx_A.bandwidth() / n)
        .transition()
        .attr("y", function(d) { return height - (yy_A(d[0]) - yy_A(d[1])); })
        .attr("height", function(d) { return yy_A(d[0]) - yy_A(d[1]); });

    yyAxis_A.tickFormat(formatNumber_A)
    svg_goals_A.selectAll(".y.axis").transition()
        .delay(500)
        .duration(500)
        .call(yyAxis_A)
}

function transitionPercentA() {
    yy_A.domain([0, 1]);

    rect_goals_A.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { 
        var total = d3.sum(d3.values(d.data)); 
        return yy_A(d[1] / total); })
        .attr("height", function(d) { 
        var total = d3.sum(d3.values(d.data));
        return yy_A(d[0] / total) - yy_A(d[1] / total); })
        .transition()
        .attr("x", function(d, i) { return xx_A(i); })
        .attr("width", xx_A.bandwidth());

    yyAxis_A.tickFormat(formatPercent_A)

    svg_goals_A.selectAll(".y.axis").transition()
        .delay(500)
        .duration(500)
        .call(yyAxis_A)

}

function updateChartGoalsForTeamA(team){
    /*tooltip showing precise info*/
    var tooltip = d3.select("#div_goals_teamA").append("div").attr("class", "tooltip").style("opacity", 0);

    /*retrieving data from data set*/
    if(team == null || team === "Choose team A..."){
        dataGoalsTeamA = [[0,0,0,0,0],[0,0,0,0,0]]
        $("#scored_A").text("■ scored goals")
        $("#suffered_A").text("■ suffered goals")

    }else{
        dataGoalsTeamA = getGoalsDoneBy(team)
        $("#scored_A").text("■ " + team + " scored goals")
        $("#suffered_A").text("■ " + team + " suffered goals")
    }

    /*removing old data*/
    d3.select("#svgChartGoalsTeamA").remove()

    // transpose data
    dataGoalsTeamA = dataGoalsTeamA[0].map(function(col, i) { 
        return dataGoalsTeamA.map(function(row) { 
            return row[i] 
        })
    });

    var layers_goals_A = stack.keys(d3.range(n))(dataGoalsTeamA)

    xx_A = d3.scaleBand()
        .domain(d3.range(m))
        .rangeRound([0, width])
        .padding(0.1)
        .align(0.1);

    yy_A = d3.scaleLinear()
        .domain([0, yGroupMax_A])
        .rangeRound([height, 0]);

    var color_goals_A = d3.scaleLinear()
    .domain([0, n - 1])
    .range(["rgb(49,130,189)", "rgb(158,202,225)"]);

    var xxAxis_A = d3.axisBottom()
    .scale(xx_A)
    .tickSize(0)
    .tickPadding(6);

    yyAxis_A = d3.axisLeft()
        .scale(yy_A)
        .tickSize(2)
        .tickPadding(6);

    svg_goals_A = d3.select("#div_goals_teamA").append("svg")
        .attr("id","svgChartGoalsTeamA")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer_goals_two_A = svg_goals_A.selectAll(".layer")
    .data(layers_goals_A)
    .enter().append("g")
    .attr("class", "layer")
    .attr("id", function(d) { return d.key; })
    .style("fill", function(d, i) { return color_goals_A(i); });

    rect_goals_A = layer_goals_two_A.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d, i) {return xx_A(i); })
        .attr("y", height)
        .attr("width", xx_A.bandwidth())
        .attr("height", 0)
        .attr("data-goals", function(d, i) {return "scored: <b>" + dataGoalsTeamA[i].toString().split(",")[0] + "</b><br>suffered: <b>" + dataGoalsTeamA[i].toString().split(",")[1] + "</b></br>" })
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

    rect_goals_A.transition()
        .delay(function(d, i) {return i * 10; })
        .attr("y", function(d) { return yy_A(d[1]); })
        .attr("height", function(d) { return yy_A(d[0]) - yy_A(d[1]); });

    svg_goals_A.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xxAxis_A);

    svg_goals_A.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + 0 + ",0)")
        .style("font-size", "10px")
        .call(yyAxis_A);

    /*selecting input radio buttons to trigger at event*/
    d3.select("#percent").on("change", updateGoalsView);
    d3.select("#grouped").on("change", updateGoalsView);

    /*adjusting chart view to previous one*/
    updateGoalsViewWithSpecific(lastGoalsViewSelected)
}

/*called in order to show a void graph*/
updateChartGoalsForTeamA(null)