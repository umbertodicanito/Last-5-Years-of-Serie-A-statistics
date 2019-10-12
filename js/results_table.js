 var team_A = ""
 var team_B = ""
 var date_From = "2015/16"
 var date_To = "2017/18"

function setTeamATable(name){
    team_A = name
    updateTable()
}

function setTeamBTable(name){
    team_B = name
    updateTable()
}

function createTableFor(teamA, teamB, dateFrom, dateTo)
{
    var yearRange = [2]
    //getting the start of the range
    if(dateFrom === "2018/19"){
        /*This is due to the fact that the dataset data are not equal for all the rows.
        In particular, the last season data report the date as x/y/2018 or 2019, whereas
        the others seasons report them as x/y/18 or 17 etc.*/
        yearRange[0] = 18
        yearRange[1] = 19
    }
    else
    {
        yearRange[0] = parseInt((dateFrom.split("/")[0]).split("0")[1])
        yearRange[1] = parseInt(dateTo.split("/")[1])
    }

    var result = []
    for(var i = 0; i<data.length; i++){
        var row = data[i]
        var currentYearSting = row.Date.split("/")[2]
        var currentYear = 0
        if(currentYearSting.length == 4){
            //then it is 2018 or 2019
            currentYearSting = currentYearSting.split("0")[1]
        }
        currentYear = parseInt(currentYearSting)
        if(currentYear>=yearRange[0] && currentYear<=yearRange[1]){
            //it is in the right range date
            if((row.HomeTeam === teamA || row.AwayTeam === teamA)){
                if(row.HomeTeam === teamB || row.AwayTeam === teamB){
                    var obj = {"Date":row.Date,"HomeTeam":row.HomeTeam,"AwayTeam":row.AwayTeam,"FTHG":row.FTHG,"FTAG":row.FTAG}
                    result.push(obj)
                }
            }
        }else if (currentYear < yearRange[1]){
            //it is gone too far and it is needed to stop the loop
            break
        }
    }
    
    //there are always an even number of matches, if this didn't happent to be, i have picked a wrong match, due to date number
    if(result.length % 2 != 0){
        result.shift()
    }
    
    //removing old data
    $('#matches_table').find("tr:gt(0)").remove();
    //adding data to table
    var elementsToAdd = ""
    for(var j = 0; j<result.length; j++){
        //adjusting long date
        var dateString = result[j].Date
        var realDate
        if(dateString.length != 8){
            realDate = dateString.substr(0,6) + dateString.substr(8)
        }
        else{
            realDate = dateString
        }
        //creating <tr> element and then adding it
        elementsToAdd = elementsToAdd + "<tr><td>" + realDate + " </td><td>" + result[j].HomeTeam + "-" 
            + result[j].AwayTeam + "</td><td>" + result[j].FTHG + "-" + result[j].FTAG + "</td></tr>"
    }
    $('#matches_table tr:last').after(elementsToAdd);
    
    if(elementsToAdd.length != 0){
        team_A = teamA
        teamB = teamB
        date_From = dateFrom
        date_To = dateTo
    }
}

function updateTable(){
    createTableFor(team_A, team_B, date_From, date_To)
}