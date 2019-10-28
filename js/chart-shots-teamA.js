//infos on teams
var team_A = null


//taking element from list of squad A
function updateChartShotsA(team){
    team_A = team
    updateDatasChartShotsTeamA(team_A)
}

//declarations of traces that will display the datas
var trace1 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: 'tot. home shots',
    line: {
        width: 2,
        color: 'rgb(49,130,189)'
    }
};

var trace2 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: 'on target home shots',
    line: {
        width: 1,
        color: 'rgb(49,130,189)',
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
        color: 'rgb(158,202,225)'
    }
};

var trace4 = {
    x: ["2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
    y: [null,null,null,null,null],
    type: 'scatter',
    name: 'on target away shots',
    line: {
        width: 1,
        color: 'rgb(158,202,225)',
        dash: 'dot'
    }
};

//editing the style of graph
var layout = {
    title: 'Shots precision',
    width: 500,
    height: 410,
    xaxis: {
        title: 'Seasons',
        showgrid: true,
        zeroline:true,
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
    var dataForChartShot = getPrecisionShotsFor(team)
    if(team != null){
        console.log(team)
        //update of layout
        var update = {
            title: team_A + ' shots precision',
        }
        Plotly.relayout('chart-shots-teamA', update)

        //update of traces
        var update = {
            name: team_A+ ' tot. home shots',
            y: [dataForChartShot[0]]
        }
        Plotly.restyle('chart-shots-teamA', update, [0]);

        var update = {
            name: team_A+' on target home shots',
            y: [dataForChartShot[2]]
        }
        Plotly.restyle('chart-shots-teamA', update, [1]);

        var update = {
            name: team_A+' tot. away shots',
            y: [dataForChartShot[1]]
        }
        Plotly.restyle('chart-shots-teamA', update, [2]);

        var update = {
            name: team_A+' on target away shots',
            y: [dataForChartShot[3]]
        }
        Plotly.restyle('chart-shots-teamA', update, [3]);
    }else{
        //update of layout
        var update = {
            title: 'Shots precision'
        }
        Plotly.relayout('chart-shots-teamA', update)

        //update of traces
        var update = {
            name: 'tot. home shots',
            y: [dataForChartShot[0]]
        }
        Plotly.restyle('chart-shots-teamA', update, [0]);

        var update = {
            name: 'on target home shots',
            y:[dataForChartShot[2]]
        }
        Plotly.restyle('chart-shots-teamA', update, [1]);

        var update = {
            name: 'tot. away shots',
            y: [dataForChartShot[1]]
        }
        Plotly.restyle('chart-shots-teamA', update, [2]);

        var update = {
            name: 'on target away shots',
            y: [dataForChartShot[3]]
        }
        Plotly.restyle('chart-shots-teamA', update, [3]);
    }
}





