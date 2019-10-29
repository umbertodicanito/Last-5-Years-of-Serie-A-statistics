/*Questo semplice script carica i dati da internet. 
Negli script successivi si può accedere ai dati semplicemente
richiamando "data". Tuttavia, per fare in modo che questo accada,
è necessario che questo script sia chiamato prima di qualsiasi altro
script che faccia uso di "data". Considerare inoltre che la richiesta
http impiega qualche secondo ad essere portata a termine.
*/

var data = []
var teamNames = []

/*cambiare link quando si ricaricano i dati online*/
$.get("https://jsonstorage.net/api/items/881a4adb-14b5-47b2-907f-f5ca2f0a1366", 
      function(dataOnline, textStatus, jqXHR){
    data = dataOnline
    console.log("data received")
    getTeamNames()
    console.log(teamNames.length + " teams selected (should be 27)")
    teamNames.sort()
    console.log("updated select elements")
    populateGenericSelect("A")
    populateGenericSelect("B")
});

function getTeamNames(){
    var teams = []
    for(var i = 0; i < data.length; i++){
        var name = data[i].HomeTeam
        if(!teams.includes(name)){
            teams.push(name)
        }
    }
    teamNames = teams
}