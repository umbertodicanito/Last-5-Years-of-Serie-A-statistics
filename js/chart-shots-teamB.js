//infos on teams
var team_B = null

//taking element from list of squad A
function updateChartShotsB(team){
    team_B = team
    updateDatasChartShotsTeamB(team_B)
}

//declarations of traces that will display the datas
var trace1 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: 'tot. home shots',
    line: {
        width: 2,
        color: 'rgb(230,85,13)'
    }
};

var trace2 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: 'on target home shots',
    line: {
        width: 1,
        color: 'rgb(230,85,13)',
        dash: 'dot'
    }
};

var trace3 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: 'tot. away shots',
    line: {
        width: 2,
        color: 'rgb(253,174,107)'
    }
};

var trace4 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: 'on target away shots',
    line: {
        width: 1,
        color: 'rgb(253,174,107)',
        dash: 'dot'
    }
};

//editing the style of graph
var layout = {
    title: 'Shots precision',
    width: 380,
    height: 410,
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


function updateDatasChartShotsTeamB(team){
    console.log("chartB: " + team)
    if(team != null){
        var dataForChartShot = getPrecisionShotsFor(team)
        console.log("Raw data: " + dataForChartShot)
        console.log("")
        console.log("data for chart B: " + team + "\n Tot Home S: " + dataForChartShot[0] + "\n On target home shots: " + dataForChartShot[2] + "\n Tot Away S: " + dataForChartShot[1] + "\n On target away shots: " + dataForChartShot[3])
        //update of layout
        var update = {
            title: 'Shots precision of '+ team_B,
        }
        Plotly.relayout('chart-shots-teamB', update)

        //update of traces
        var update = {
            name: team_B+ ' tot. home shots',
            y: [dataForChartShot[0]]
        }
        Plotly.restyle('chart-shots-teamB', update, [0]);

        var update = {
            name: team_B+' on target home shots',
            y: [dataForChartShot[2]]
        }
        Plotly.restyle('chart-shots-teamB', update, [1]);

        var update = {
            name: team_B+' tot. away shots',
            y: [dataForChartShot[1]]
        }
        Plotly.restyle('chart-shots-teamB', update, [2]);

        var update = {
            name: team_B+' on target away shots',
            y: [dataForChartShot[3]]
        }
        Plotly.restyle('chart-shots-teamB', update, [3]);
    }else if (team_B != null){
        //update of layout
        var update = {
            title: 'Shots precision'
        }
        Plotly.relayout('chart-shots-teamB', update)

        //update of traces
        var update = {
            name: 'tot. home shots',
            y: [null,null,null,null,null]
        }
        Plotly.restyle('chart-shots-teamB', update, [0]);

        var update = {
            name: 'on target home shots',
            y: [null,null,null,null,null]
        }
        Plotly.restyle('chart-shots-teamB', update, [1]);

        var update = {
            name: 'tot. away shots',
            y: [null,null,null,null,null]
        }
        Plotly.restyle('chart-shots-teamB', update, [2]);

        var update = {
            name: 'on target away shots',
            y: [null,null,null,null,null]
        }
        Plotly.restyle('chart-shots-teamB', update, [3]);
    }

}





