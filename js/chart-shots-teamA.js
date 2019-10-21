//infos on teams
var team_A = "(choose team A..)";


//taking element from list of squad A
function updateChartShotsA(team){
    team_A = team
    updateDatasChartShotsTeamA(team_A)
}

//declarations of traces that will display the datas
var trace1 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [10, 15, 13, 17, 4],
    type: 'scatter',
    name: team_A+' tot. home shots',
    line: {
        width: 2,
        color: 'rgb(0, 20, 220)'
    }
};

var trace2 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [26, 5, 11, 9, 8],
    type: 'scatter',
    name: team_A+' on target home shots',
    line: {
        width: 1,
        color: 'rgb(0, 20, 220)',
        dash: 'dot'
    }
};

var trace3 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [2, 6, 12, 5, 9],
    type: 'scatter',
    name: team_A+' tot. away shots',
    line: {
        width: 2,
        color: 'rgb(225, 5, 235)'
    }
};

var trace4 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [4, 5, 4, 5, 5],
    type: 'scatter',
    name: team_A+' on target away shots',
    line: {
        width: 1,
        color: 'rgb(225, 5, 235)',
        dash: 'dot'
    }
};

//editing the style of graph
var layout = {
    title: 'Shots precision of '+ team_A,
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
Plotly.newPlot('chart-shots-teamA', data, layout, {displayModeBar: false}); //{modeBarButtonsToRemove: ['downloadImage', 'zoom2d', 'zoom3d', 'select2d', 'lasso2d', 'toggleSpikelines']}


function updateDatasChartShotsTeamA(team){
    
    //update of layout
    var update = {
        title: 'Shots precision of '+ team_A,
    }
    Plotly.relayout('chart-shots-teamA', update)
    
    //update of traces
    var update = {
        name: team_A+ ' tot. home shots'
    }
    Plotly.restyle('chart-shots-teamA', update, [0]);
    
    var update = {
        name: team_A+' on target home shots'
    }
    Plotly.restyle('chart-shots-teamA', update, [1]);
    
    var update = {
        name: team_A+' tot. away shots'
    }
    Plotly.restyle('chart-shots-teamA', update, [2]);
    
    var update = {
        name: team_A+' on target away shots'
    }
    Plotly.restyle('chart-shots-teamA', update, [3]);
}





