var team_A_table = ""
var team_B_table = ""
var date_From = "2015/16"
var date_To = "2017/18"

function setTeamATable(name){
    if(name === "Choose team A..." || name === "(choose team A..)")
        team_A_table = ""
    else
        team_A_table = name
    updateTable()
}

function setTeamBTable(name){
    if(name === "Choose team B..." || name === "(choose team B..)")
        team_B_table = ""
    else
        team_B_table = name
    updateTable()
}

function createTableFor(teamA, teamB, dateFrom, dateTo){
    if(teamA == null && teamB == null && dateFrom == null && dateTo == null){
        //removing old data
        $('#matches_table').find("tr:gt(0)").remove();
    }else{
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
                if(teamB != null && teamB !== "" && teamA != null && teamA !== ""){
                    if(row.HomeTeam === teamA || row.AwayTeam === teamA){
                        if(row.HomeTeam === teamB || row.AwayTeam === teamB){
                            var obj = {"Date":row.Date,"HomeTeam":row.HomeTeam,"AwayTeam":row.AwayTeam,"FTHG":row.FTHG,"FTAG":row.FTAG}
                            result.push(obj)
                        }
                    }
                }
                else if (teamB == null || teamB === ""){
                    //we are looking for only one team matches
                    if(row.HomeTeam === teamA || row.AwayTeam === teamA){
                        var obj = {"Date":row.Date,"HomeTeam":row.HomeTeam,"AwayTeam":row.AwayTeam,"FTHG":row.FTHG,"FTAG":row.FTAG}
                        result.push(obj)
                    }
                }
                else {
                    //teamA is null
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

        /*if one team is selected there are junk data at the start of the list*/
        var toRemove = []
        if((team_A_table !== "" && team_B_table === "")||(team_B_table !== "" && team_A_table === "")){
            var dateToRemove = result[0].Date.split("/")[2]
            for(var i = 0; i < result.length; i++){
                if(result[i].Date.split("/")[2] === dateToRemove)
                    toRemove.push(i)
                else
                    break
            }
            
            for(var j = 0; j < toRemove.length; j++){
                result.shift()
            }
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
            //creating <tr> element with id and then adding it
            /*parsing date to get id of the season. Notice: month 5 (may) is the end of each season*/
            var yy = parseInt(realDate.substr(6,8),10)
            var mm = parseInt(realDate.substr(3,5),10)
            var indexSeason = 0
            if(yy == 19)
                indexSeason = 1
            else if (yy == 18){
                if(mm > 5)
                    indexSeason = 1
                else
                    indexSeason = 2
            }
            else if (yy == 17){
                if(mm > 5)
                    indexSeason = 2
                else
                    indexSeason = 3
            }
            else if (yy == 16){
                if(mm > 5)
                    indexSeason = 3
                else
                    indexSeason = 4
            }
            else if (yy == 15){
                if(mm > 5)
                    indexSeason = 4
                else
                    indexSeason = 5
            }
            else
                indexSeason = 5
            /*index is used to highligh row when point on MDS graph is focused*/
            var rowId = "_rowTable" + indexSeason + result[j].HomeTeam + "-" + result[j].AwayTeam
            elementsToAdd = elementsToAdd + "<tr id=" + rowId + ' class="table_row"><td>' + realDate + " </td><td>" + result[j].HomeTeam + "-" 
                + result[j].AwayTeam + "</td><td>" + result[j].FTHG + "-" + result[j].FTAG + "</td></tr>"
        }
        $('#matches_table tr:last').after(elementsToAdd);

        if(elementsToAdd.length != 0){
            team_A_table = teamA
            team_B_table = teamB
            date_From = dateFrom
            date_To = dateTo
        }
    }
}

function updateTable(){
    if(team_A_table === "" && team_B_table === "")
        createTableFor(null, null, null, null)
    else if(team_A_table === "")
        createTableFor(null, team_B_table, date_From, date_To)
    else if (team_B === "")
        createTableFor(team_A_table, null, date_From, date_To)
    else
        createTableFor(team_A_table, team_B_table, date_From, date_To)
}

function highlightRowTable(idPoint, color, toHighlight){
    var rowId = "_rowTable" + idPoint.substr(1)
    if(toHighlight){
        document.getElementById(rowId).style["background-color"] = color
        document.getElementById(rowId).style["color"] = "white"
        var elem = document.getElementById(rowId);  
        elem.scrollIntoView(true); 
    }else{
        document.getElementById(rowId).style["background-color"] = "transparent"
        document.getElementById(rowId).style["color"] = "black"
    }
}