var currentViewChartGoalsTeamA = "stacked_A"

function updateChartGoalsForTeamA(team){
    var dataGoalsTeamA = []
    var n = 2, // number of layers
        m = 5, // number of samples per layer
        stack = d3.stack()

    /*retrieving data from data set*/
    if(team == null || team === "Choose team A..."){
        dataGoalsTeamA = [[0,0,0,0,0],[0,0,0,0,0]]
    }else{
        dataGoalsTeamA = getGoalsDoneBy(team)
    }

    /*removing old data*/
    d3.select("#svgChartGoalsTeamA").remove()

    var formatPercent_A = d3.format(".0%");
    var formatNumber_A = d3.format("");

    // transpose data
    dataGoalsTeamA = dataGoalsTeamA[0].map(function(col, i) { 
        return dataGoalsTeamA.map(function(row) { 
            return row[i] 
        })
    });

    var layers_goals_A = stack.keys(d3.range(n))(dataGoalsTeamA),
        yStackMax = 94,
        yGroupMax = 50;
    //yStackMax = d3.max(layers_goals_A, function(layer) { return d3.max(layer, function(d) { return d[1]; }); }),
    //yGroupMax = d3.max(layers_goals_A, function(layer) { return d3.max(layer, function(d) { return d[1] - d[0]; }); });

    var margin = {top: 40, right: 10, bottom: 20, left: 35},
        width = 203 - margin.left - margin.right,
        height = 476 - margin.top - margin.bottom;

    var xx_A = d3.scaleBand()
    .domain(d3.range(m))
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.1);

    var yy_A = d3.scaleLinear()
    .domain([0, yStackMax])
    .rangeRound([height, 0]);

    var color_goals_A = d3.scaleLinear()
    .domain([0, n - 1])
    .range(["rgb(0, 20, 220)", "rgb(225, 5, 235)"]);

    var xxAxis_A = d3.axisBottom()
    .scale(xx_A)
    .tickSize(0)
    .tickPadding(6);

    var yyAxis_A = d3.axisLeft()
    .scale(yy_A)
    .tickSize(2)
    .tickPadding(6);

    var svg_goals_A = d3.select("#div_goals_teamA").append("svg")
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

    var rect_goals_A = layer_goals_two_A.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("x", function(d, i) { return xx_A(i); })
    .attr("y", height)
    .attr("width", xx_A.bandwidth())
    .attr("height", 0);

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
    d3.select("#percent_A").on("change", change);
    d3.select("#grouped_A").on("change", change);
    d3.select("#stacked_A").on("change", change);

    var timeout_goals_A = setTimeout(function() {
        d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
        setTimeout(function() {
            d3.select("input[value=\"percent\"]").property("checked", true).each(change);
        }, 2000);
    }, 2000);

    function change() {
        changeView(this.value)
    }

    function changeView(tag){
        clearTimeout(timeout_goals_A);
        console.log("ChangeViewA called with " + currentViewChartGoalsTeamA)
        currentViewChartGoalsTeamA = tag
        if (tag === "grouped_A") transitionGrouped();
        else if (tag === "stacked_A") transitionStacked();
        else if (tag === "percent_A") transitionPercent();

    }

    function transitionGrouped() {
        yy_A.domain([0, yGroupMax]);

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

    function transitionStacked() {
        yy_A.domain([0, yStackMax]);

        rect_goals_A.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr("y", function(d) { return yy_A(d[1]); })
            .attr("height", function(d) { return yy_A(d[0]) - yy_A(d[1]); })
            .transition()
            .attr("x", function(d, i) { return xx_A(i); })
            .attr("width", xx_A.bandwidth());

        yyAxis_A.tickFormat(formatNumber_A)
        svg_goals_A.selectAll(".y.axis").transition()
            .delay(500)
            .duration(500)
            .call(yyAxis_A)

    }

    function transitionPercent() {
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

    /*adjusting chart view to previous one*/
    changeView(currentViewChartGoalsTeamA)
}

/*called in order to show a void graph*/
updateChartGoalsForTeamA(null)