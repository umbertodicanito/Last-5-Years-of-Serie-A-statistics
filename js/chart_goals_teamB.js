var currentViewChartGoalsTeamB = "stacked_B"

function updateChartGoalsForTeamB(team){
    var dataGoalsTeamB = []
    var n = 2, // number of layers
        m = 5, // number of samples per layer
        stack = d3.stack()

    /*retrieving data from data set*/
    if(team == null || team === "Choose team A..."){
        dataGoalsTeamB = [[0,0,0,0,0],[0,0,0,0,0]]
    }else{
        dataGoalsTeamB = getGoalsDoneBy(team)
    }

    /*removing old data*/
    d3.select("#svgChartGoalsTeamB").remove()

    var formatPercent_B = d3.format(".0%");
    var formatNumber_B = d3.format("");

    // transpose data
    dataGoalsTeamB = dataGoalsTeamB[0].map(function(col, i) { 
        return dataGoalsTeamB.map(function(row) { 
            return row[i] 
        })
    });

    var layers_goals_B = stack.keys(d3.range(n))(dataGoalsTeamB),
        yStackMax = 94,
        yGroupMax = 50;
    //yStackMax = d3.max(layers_goals_B, function(layer) { return d3.max(layer, function(d) { return d[1]; }); }),
    //yGroupMax = d3.max(layers_goals_B, function(layer) { return d3.max(layer, function(d) { return d[1] - d[0]; }); });

    var margin = {top: 40, right: 10, bottom: 20, left: 35},
        width = 203 - margin.left - margin.right,
        height = 476 - margin.top - margin.bottom;
    
    //d3.range(m)
    var xx_B = d3.scaleBand()
    .domain(d3.range(m))
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.1);

    var yy_B = d3.scaleLinear()
    .domain([0, yStackMax])
    .rangeRound([height, 0]);

    var color_goals_B = d3.scaleLinear()
    .domain([0, n - 1])
    .range(["rgb(255, 135, 25)", "rgb(255, 215, 15)"]);
    
    /*["14/15","15/16","16/17","17/18","18/19"] QUESTO dovrebbe essere mostrato sull'asse X ma non è possibile con questo tipo di scala (band) come riporta qui https://github.com/d3/d3-axis*/
    var xxAxis_B = d3.axisBottom().scale(xx_B);

    var yyAxis_B = d3.axisLeft().scale(yy_B)

    var svg_goals_B = d3.select("#div_goals_teamB").append("svg")
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

    var rect_goals_B = layer_goals_two_B.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("x", function(d, i) { return xx_B(i); })
    .attr("y", height)
    .attr("width", xx_B.bandwidth())
    .attr("height", 0);

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
    d3.select("#percent_B").on("change", change);
    d3.select("#grouped_B").on("change", change);
    d3.select("#stacked_B").on("change", change);

    var timeout_goals_B = setTimeout(function() {
        d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
        setTimeout(function() {
            d3.select("input[value=\"percent\"]").property("checked", true).each(change);
        }, 2000);
    }, 2000);

    function change() {
        changeView(this.value)
    }

    function changeView(tag) {
        clearTimeout(timeout_goals_B)
        currentViewChartGoalsTeamB = tag
        if (tag === "grouped_B") transitionGrouped();
        else if (tag === "stacked_B") transitionStacked();
        else if (tag === "percent_B") transitionPercent();

    }

    function transitionGrouped() {
        yy_B.domain([0, yGroupMax]);

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

    function transitionStacked() {
        yy_B.domain([0, yStackMax]);

        rect_goals_B.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr("y", function(d) { return yy_B(d[1]); })
            .attr("height", function(d) { return yy_B(d[0]) - yy_B(d[1]); })
            .transition()
            .attr("x", function(d, i) { return xx_B(i); })
            .attr("width", xx_B.bandwidth());

        yyAxis_B.tickFormat(formatNumber_B)
        svg_goals_B.selectAll(".y.axis").transition()
            .delay(500)
            .duration(500)
            .call(yyAxis_B)

    }

    function transitionPercent() {
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

    /*adjusting chart view to previous one*/
    changeView(currentViewChartGoalsTeamB)
}

/*called in order to show a void graph*/
updateChartGoalsForTeamB(null)