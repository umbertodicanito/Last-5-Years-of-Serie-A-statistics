var teamADeleted = ""
var teamBDeleted = ""
var index = 0

function retrieveIndex(param){
    for(var i = 0; i<teamNames.length; i++){
        if(param === teamNames[i])
            index = i + 1
    }
}

function removeAndUpdate(){
    var value = this.value
    var id = this.id
    if(value == null)
        alert("Null value")
    else{
        var idSelectToAdjust = ""
        if(id === "sel_teamA"){
            idSelectToAdjust = "sel_teamB"
        }
        else{
            idSelectToAdjust = "sel_teamA"
        }

        //put back what is been before before
        //alert(idSelectToAdjust + " is going to remove " + value)
        if(idSelectToAdjust === "sel_teamB" ){
            if(teamBDeleted !== ""){
                //reinserire elemento tolto in precedenza
                var option = document.createElement('option')
                option.value = teamBDeleted
                option.innerHTML = teamBDeleted
                retrieveIndex(teamBDeleted)
                document.getElementById(idSelectToAdjust).add(option, index)
            }
            teamBDeleted = value
        }
        else{
            if(teamADeleted !== ""){
                //reinserire elemento tolto in precedenza
                var option = document.createElement('option')
                option.value = teamADeleted
                option.innerHTML = teamADeleted
                retrieveIndex(teamADeleted)
                document.getElementById(idSelectToAdjust).add(option, index)
            }
            teamADeleted = value
        }
        try{
            $("#"+idSelectToAdjust + " option[value = " + value + "]").remove()
        }catch(err){
        }
        $('#'+idSelectToAdjust).trigger('chosen:updated')

        /*UPDATING VISUALIZATIONS*/
        /*update table and MDS*/
        var t = ""
        if(id === "sel_teamA"){
            t = $( "#sel_teamA option:selected" ).text()
            setTeamATable(t)
            setTeamAMDS(t)
            updateChartShotsA($( "#sel_teamA option:selected" ).text())
        }else{
            t = $( "#sel_teamB option:selected" ).text()
            setTeamBTable(t)
            setTeamBMDS(t)
            updateChartShotsB(t)
        }
        updateChartFoulsRedCardsA_B($( "#sel_teamA option:selected" ).text(), $( "#sel_teamB option:selected" ).text())
    }

}

function populateGenericSelect(teamTag){
    var select = document.createElement('select')
    //populate select element
    var optionNotSelectable = document.createElement('option')
    optionNotSelectable.value = ""
    optionNotSelectable.optSelected = true
    //optionNotSelectable.disabled = true
    optionNotSelectable.innerHTML = "Choose team " + teamTag + "..."
    select.appendChild(optionNotSelectable)
    for(var i = 0; i<teamNames.length; i++){
        var option = document.createElement('option')
        option.value = teamNames[i]
        option.innerHTML = teamNames[i]
        select.appendChild(option)
    }
    //deleting old select element
    $("#div_team_" + teamTag).empty()
    //giving select element new info
    select.id = "sel_team" + teamTag
    select.className = "chosen"
    select.onchange = removeAndUpdate
    //styling select element
    select.style.float = "left"
    select.style.marginLeft = "60px"
    select.style.marginTop = "27px"
    select.style.color = "black"
    select.style.fontSize = "19px"
    select.style.width = "180px"
    //appending
    $('#div_team_' + teamTag).append(select)
    $('#sel_team' + teamTag).chosen({no_results_text: "Team not presented in the dataset.",})
}

//populate "teamNames" variable
setTimeout(function(){
    getTeamNames()
    if(teamNames.length == 0){
        alert("ATTENZIONE: dati non ricevuti")
    }else{
        //sorting data
        teamNames.sort()
        populateGenericSelect("A")
        populateGenericSelect("B")
    }
}, 2400)
