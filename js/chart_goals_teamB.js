var n = 2, // number of layers
    m = 5, // number of samples per layer
    stack = d3.stack(),
    data = d3.range(n).map(function() { return bumpLayer(m, .1); });

var formatPercent_B = d3.format(".0%");
var formatNumber_B = d3.format("");

// transpose data
data = data[0].map(function(col, i) { 
    return data.map(function(row) { 
        return row[i] 
    })
});

var layers_goals_B = stack.keys(d3.range(n))(data),
    yStackMax = d3.max(layers_goals_B, function(layer) { return d3.max(layer, function(d) { return d[1]; }); }),
    yGroupMax = d3.max(layers_goals_B, function(layer) { return d3.max(layer, function(d) { return d[1] - d[0]; }); });

var margin = {top: 40, right: 10, bottom: 20, left: 35},
    width = 203 - margin.left - margin.right,
    height = 476 - margin.top - margin.bottom;

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

var xxAxis_B = d3.axisBottom()
.scale(xx_B)
.tickSize(0)
.tickPadding(6);

var yyAxis_B = d3.axisLeft()
.scale(yy_B)
.tickSize(2)
.tickPadding(6);

var svg_goals_B = d3.select("#div_goals_teamB").append("svg")
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

d3.selectAll("input").on("change", change);

var timeout_goals_B = setTimeout(function() {
    d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
    setTimeout(function() {
        d3.select("input[value=\"percent\"]").property("checked", true).each(change);
    }, 2000);
}, 2000);

function change() {
    clearTimeout(timeout_goals_B);
    if (this.value === "grouped_B") transitionGrouped();
    else if (this.value === "stacked_B") transitionStacked();
    else if (this.value === "percent_B") transitionPercent();

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

// Inspired by Lee Byron's test data generator.
function bumpLayer(n, o) {

    function bump(a) {
        var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
        for (var i = 0; i < n; i++) {
            var w = (i / n - y) * z;
            a[i] += x * Math.exp(-w * w);
        }
    }

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
    for (i = 0; i < 5; ++i) bump(a);

    return a.map(function(d, i) { return Math.max(0, d); });
}