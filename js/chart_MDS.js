var margin = {top:5, right:10, bottom:40, left:40},width = 761 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
var allTeamsInDataset = ["Atalanta","Benevento","Bologna","Cagliari","Carpi","Cesena","Chievo","Crotone","Empoli","Fiorentina","Frosinone","Genoa",
                        "Inter","Juventus","Lazio","Milan","Napoli","Palermo","Parma","Pescara","Roma","Sampdoria","Sassuolo","Spal","Torino",
                        "Udinese","Verona"]
/*variables used to memorized selected data*/
var currentTeamA = ""
var currentTeamB = ""
var currentSeason = [2,3,4]
var highlightDots = []

//load data
var url = "https://jsonstorage.net/api/items/e3c00004-c5da-449a-b7de-4ca7a63e845f"
var pointsData = []
d3.json(url).then(function(data){
    pointsData = data
    console.log("MDS data retrieved")
    drawGraph()
    showMDSDataFromTo(2,4)
})

//setup x
var xValue = function(d){ return d["x"];},
    xScale = d3.scaleLinear().range([0,width]),
    xMap = function(d){ return xScale(xValue(d));},
    xAxis = d3.axisBottom().scale(xScale);

//setup y
var yValue = function(d) {return d["y"];},
    yScale = d3.scaleLinear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.axisLeft().scale(yScale);

//add the graph canvas to the body of the webpage
var svg = d3.select("#div_quotes").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("id", function(){return "MDSPointContainer"})
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("#div_quotes").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

//color palette
var color = d3.scaleOrdinal()
.domain(["no","neutral","noBalance","softlyBalance","balance"])
.range(["#b6b6b6","#C0C0C0","#ff0000","#ebb800","#10bf00"])

//used in order to highlight only certain points
function highlight(arrayId){
    for (var i = 0; i < arrayId.length; i++){
        var id = arrayId[i]
        var distanceFromCenter = 0
        d3.select('#'+id)
            .transition()
            .duration(500)
            .style("fill", function(){
            /*setting color based on distance of center*/
            var pos = $("#"+id).attr("data-positionInStorage")
            var X = dataToShow[pos]["x"]
            var Y = dataToShow[pos]["y"]
            distanceFromCenter = X*X + Y*Y
            if(distanceFromCenter >= 0.005625)
                return  color("noBalance")
            if(distanceFromCenter > 0.0016)
                return color("softlyBalance")
            return color("balance")
        })
            .attr("r", 4.5)
            .style("opacity",1)

        /*append the points as first child in order to highlight them*/
        var singleDot = $("#"+id)
        $("#"+id).remove()
        $("#MDSPointContainer").append(singleDot)
    }
}

//used to set everything to normal (eg. when just one team is selected)
function doNotHighlight(){
    d3.selectAll(".dot")
        .transition()
        .duration(200)
        .style("fill", color("neutral"))
        .attr("r", 3)
        .style("opacity",0.3)
}

//drawing the axis of the graph
function drawGraph(){
    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(pointsData, xValue)-0.05, d3.max(pointsData, xValue)+0.05]);
    yScale.domain([d3.min(pointsData, yValue)-0.05, d3.max(pointsData, yValue)+0.05]);

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("X");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Y");
}

//used to show data for just one or more seasons
function showMDSDataFromTo(fromSeason,toSeason){
    //removing old data
    d3.selectAll(".dot").remove()

    //get only the selected part, from-to
    dataToShow = []
    for(var j = 0; j<pointsData.length; j++){
        if(pointsData[j].Season >= fromSeason && pointsData[j].Season <= toSeason)
            dataToShow.push(pointsData[j])

    }

    //drawing dots + label events
    svg.selectAll(".dot").data(dataToShow).enter()
        .append("circle")
        .attr("id", function(index, currentAttribute){
        //var matchString = index["Match"]
        //var firstTeam = matchString.split("-")[0]
        //var secondTeam = matchString.split("-")[1]
        //var finalString = firstTeam + " - " + secondTeam
        return '_' + index["Season"] + index["Match"]
    })	
        .attr("class", "dot")
        .attr("data-positionInStorage", function(index, currentAttribute){return currentAttribute})
        .attr("r", 3)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill","#C0C0C0")
        .style("opacity",0.3)
        .on("mouseover", function(d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", 1);
        tooltip.html(d["Match"])
            .style("left", (d3.select(this).attr("cx") + 50) + "px")
            .style("top", (d3.select(this).attr("cy") +10) + "px");

            /* Al fine di mostrare in maniera più netta a quale partita in tabella il punto faccia
            * riferimento, potremmo fare in modo che, quando il puntatore del mouse passa su un punto
            * rappresentante una partita in tabella, la riga di quella partita viene evidenziata (cam-
            * biando colore).
            */
        var thisId = this.getAttribute("id")
        if(highlightDots.includes(thisId))
            highlightRowTable(this.getAttribute("id"), this.style["fill"], true)
    })
        .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        var thisId = this.getAttribute("id")
        if(highlightDots.includes(thisId))
            highlightRowTable(this.getAttribute("id"), this.style["fill"], false)
    });
}

/*find the dots to highlight based on their ids*/
function selectionMDS(seasons, teamA, teamB){

    currentSeason = seasons
    currentTeamA = teamA
    currentTeamB = teamB

    highlightDots = []
    var dot
    if(teamB != null && teamA != null){
        //selecting points of 2 differents teams
        for (var i = 0; i < seasons.length; i++) {
            id = '_' + seasons[i]  + teamA + "-" + teamB
            dot = document.getElementById(id)
            if(dot != null){
                highlightDots.push(id)
                id = '_' + seasons[i] + teamB + "-" + teamA
                highlightDots.push(id)
            }
        }
    }else{
        //selecting points of only one team
        var theOnlyTeam
        if(teamA == null)
            theOnlyTeam = teamB
        else
            theOnlyTeam = teamA
        for(var j = 0; j < seasons.length; j++) {
            for(var h = 0; h < allTeamsInDataset.length; h++){
                id = '_' + seasons[j] + theOnlyTeam + "-" + allTeamsInDataset[h]
                dot = document.getElementById(id)
                if(dot != null){
                    highlightDots.push(id)
                    id = '_' + seasons[j] + allTeamsInDataset[h] + "-" + theOnlyTeam
                    highlightDots.push(id)
                }
            }
        }
    }

    if(highlightDots.length != 0)
        highlight(highlightDots)	
}

/*used to change memorized team for choice A*/
function setTeamAMDS(newTeamA){
    if(currentTeamB !== ""){
        showMDSDataFromTo(currentSeason[0], currentSeason[currentSeason.length - 1])
        if(newTeamA === "Choose team A..."){
            currentTeamA = ""
            selectionMDS(currentSeason, null, currentTeamB)
        }
        else{
            selectionMDS(currentSeason, newTeamA, currentTeamB)   
        }
    }else{
        currentTeamA = newTeamA
        selectionMDS(currentSeason, currentTeamA, null)
    }

}

/*used to change memorized team for choice B*/
function setTeamBMDS(newTeamB){
    if(currentTeamA !== ""){
        showMDSDataFromTo(currentSeason[0], currentSeason[currentSeason.length - 1])
        if(newTeamB === "Choose team B..."){
            currentTeamB = ""
            selectionMDS(currentSeason, currentTeamA, null)
        }else{
            selectionMDS(currentSeason, currentTeamA, newTeamB)
        }
    }else{
        currentTeamB = newTeamB
        selectionMDS(currentSeason, null, currentTeamB)
    }
}