/*
//infos on teams
var team_A = ""
var team_B = ""


//starting creating the chart, setted with no values
createChartFoulsRedCards()


function setTeamATable(name){
    team_A = name
    updateChartFoulsRedCards()
}

function setTeamBTable(name){
    team_B = name
    updateChartFoulsRedCards()
}
*/



//declarations of traces that will display the datas
var trace1 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [10, 15, 13, 17, 4],
    type: 'scatter',
    name:'tot. home shots',
    line: {
        width: 2,
        color: 'rgb(255, 135, 25)'
    }
};

var trace2 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [26, 5, 11, 9, 8],
    type: 'scatter',
    name:'on target home shots',
    line: {
        width: 1,
        color: 'rgb(255, 135, 25)',
        dash: 'dot'
    }
};

var trace3 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [2, 6, 12, 5, 9],
    type: 'scatter',
    name: 'tot. away shots',
    line: {
        width: 2,
        color: 'rgb(255, 215, 15)'
    }
};

var trace4 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [4, 5, 4, 5, 5],
    type: 'scatter',
    name: 'on target away shots',
    line: {
        width: 1,
        color: 'rgb(255, 215, 15)',
        dash: 'dot'
    }
};

//editing the style of graph
var layout = {
    title: 'Shots precision of '+ team_B,
    width: 380,
    xaxis: {
        title: 'Seasons',
        showgrid: true,
        zeroline: false,
        fixedrange:true 
    },
    yaxis: {
        title: 'Numbers of shots',
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
var data = [trace1, trace2, trace3, trace4];
Plotly.newPlot('chart-shots-teamB', data, layout, {displayModeBar: false}); //{modeBarButtonsToRemove: ['downloadImage', 'zoom2d', 'zoom3d', 'select2d', 'lasso2d', 'toggleSpikelines']}







