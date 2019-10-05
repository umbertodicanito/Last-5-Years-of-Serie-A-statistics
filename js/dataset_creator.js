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
$.get("https://jsonstorage.net/api/items/ebec3571-fab6-4e83-8ff2-4e83834fb49d", 
      function(dataOnline, textStatus, jqXHR){
    data = dataOnline
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