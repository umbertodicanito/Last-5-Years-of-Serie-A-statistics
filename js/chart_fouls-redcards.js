//infos on teams
var team_A = "(choose team A..)";
var team_B = "(choose team B..)";

//taking element from list of squad A
function updateChartFoulsRedCardsA_B(teamA, teamB){
    updateChartShotsA(teamA)
    updateChartShotsB(teamB)
    updateDatasChartShotsTeamA_B(team_A, team_B)
}

//declarations of traces that will display the datas
var trace1 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: team_A + ' fouls',
    line: {
        width: 2,
        color: 'rgb(0, 20, 220)'
    }
};

var trace2 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: team_A + ' red cards',
    line: {
        width: 1,
        color: 'rgb(0, 20, 220)',
        dash: 'dot'
    }
};

var trace3 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: team_B + ' fouls',
    line: {
        width: 2,
        color: 'rgb(255, 135, 25)'
    }
};

var trace4 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: team_B + ' red cards',
    line: {
        width: 1,
        color: 'rgb(255, 135, 25)',
        dash: 'dot'
    }
};

//editing the style of graph
var layout = {
    title: 'Fouls and red cards of ' +team_A + ' and ' + team_B,
    xaxis: {
        title: 'Seasons',
        showgrid: true,
        zeroline: false,
        fixedrange:true 
    },
    yaxis: {
        title: 'Numbers of Fouls / red cards',
        showline: false,
        showgrid: true,
        zeroline:true,
        rangemode: 'nonnegative',
        fixedrange:true
    },
    showlegend: true,
    legend: {
        xanchor:"center",
        yanchor:"top",
        y:-0.3,
        x:0.5,
        "orientation": "h"
    }
};

//launch of plot
var dataRedCardsPlot = [trace1, trace2, trace3, trace4];
Plotly.newPlot('chart-fouls-redcards', dataRedCardsPlot, layout, {displayModeBar: false}); //{modeBarButtonsToRemove: ['downloadImage', 'zoom2d', 'zoom3d', 'select2d', 'lasso2d', 'toggleSpikelines']}


function updateChartFoulsRedCardsA_B(teamA, teamB){

    var computedTitle = "Fouls and red cards"
    if(teamA !== "Choose team A..." && teamB !== "Choose team B...")
        computedTitle = computedTitle + " of " + teamA + " and " + teamB
    else if(teamA === "Choose team A..." && teamB !== "Choose team B...")
        computedTitle = computedTitle + " of " + teamB
    else if(teamB === "Choose team B..." && teamA !== "Choose team A...")
        computedTitle = computedTitle + " of " + teamA

    //update of layout
    var update = {
        title: computedTitle
    }
    Plotly.relayout('chart-fouls-redcards', update)

    var dataCharFoulsAndRedCardTeamA = getFoulsAndRedCardsForTeam(team_A)
    var dataCharFoulsAndRedCardTeamB = getFoulsAndRedCardsForTeam(team_B)
    //update of traces
    var update = {
        name: team_A + ' fouls',
        y:[dataCharFoulsAndRedCardTeamA[0]]
    }
    Plotly.restyle('chart-fouls-redcards', update, [0]);

    var update = {
        name: team_A + ' red cards',
        y: [dataCharFoulsAndRedCardTeamA[1]]

    }
    Plotly.restyle('chart-fouls-redcards', update, [1]);

    var update = {
        name: team_B + ' fouls',
        y: [dataCharFoulsAndRedCardTeamB[0]]
    }
    Plotly.restyle('chart-fouls-redcards', update, [2]);

    var update = {
        name: team_B + ' red cards',
        y:[dataCharFoulsAndRedCardTeamB[1]]
    }
    Plotly.restyle('chart-fouls-redcards', update, [3]);
}




