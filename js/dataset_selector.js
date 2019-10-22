function getFoulsAndRedCardsForTeam(team){
    var fouls = []
    var redCards = []
    var idSeason = 1
    var seasonYear = 18
    var foulsForThisYear = 0
    var redCardsForThisYear = 0
    //scorre tutto il dataset
    for(var r = 0; r < data.length; r++){
        var lastYear = data[r].Date
        lastYear = lastYear.substr(lastYear.length-2)
        var lastYearInteger = parseInt(lastYear,10)
        //if the year of the row is lower than the reference, than we switched season
        if(lastYearInteger < seasonYear){
            if(foulsForThisYear != 0){
                fouls.push(foulsForThisYear)
                redCards.push(redCardsForThisYear)
            }
            else{
                //better put null reference. In this way, the data will not show up
                fouls.push(null)
                redCards.push(null)
            }
            //resetting counters
            foulsForThisYear = 0
            redCardsForThisYear = 0
            idSeason++
            seasonYear--
        }
        //adding info when team appears in row
        if(data[r].HomeTeam === team){
            foulsForThisYear = foulsForThisYear + data[r].HF
            redCardsForThisYear = redCardsForThisYear + data[r].HR
        }
        else if(data[r].AwayTeam === team){
            foulsForThisYear = foulsForThisYear + data[r].AF
            redCardsForThisYear = redCardsForThisYear + data[r].AR
        }
    }
    //appending last info not catched by the for loop
    if(foulsForThisYear != 0){
        fouls[4] = foulsForThisYear
        redCards[4] = redCardsForThisYear
    }
    else{
        fouls[4] = null
        redCards[4] = null
    }

    //reverting since database start from 2018 and goes to 2014
    fouls = fouls.reverse()
    redCards = redCards.reverse()

    /*filter based on slider of years*/
    for(var i = 0; i < 5; i++){
        if(i < season_from || i > season_to){
            fouls[i] = null
            redCards[i] = null
        }
    }
    return [fouls,redCards]
}

function getPrecisionShotsFor(team){
    var homeShots = []
    var homeShotsOnTarget = []
    var awayShots = []
    var awayShotsOnTarget = []

    var idSeason = 1
    var seasonYear = 18
    var homeShotsForThisYear = 0
    var homeShotsOnTargetForThisYear = 0
    var awayShotsForThisYear = 0
    var awayShotsOnTargetForThisYear = 0

    //scorre tutto il dataset
    for(var r = 0; r < data.length; r++){
        var lastYear = data[r].Date
        lastYear = lastYear.substr(lastYear.length-2)
        var lastYearInteger = parseInt(lastYear,10)

        //if the year of the row is lower than the reference, than we switched season
        if(lastYearInteger < seasonYear){
            if(homeShotsForThisYear != 0){
                homeShots.push(homeShotsForThisYear)
                homeShotsOnTarget.push(homeShotsOnTargetForThisYear)
                awayShots.push(awayShotsForThisYear)
                awayShotsOnTarget.push(awayShotsOnTargetForThisYear)
            }
            else{
                //better put null reference. In this way, the data will not show up
                homeShots.push(null)
                homeShotsOnTarget.push(null)
                awayShots.push(null)
                awayShotsOnTarget.push(null)
            }
            //resetting counters
            homeShotsForThisYear = 0
            homeShotsOnTargetForThisYear = 0
            awayShotsForThisYear = 0
            awayShotsOnTargetForThisYear = 0
            idSeason++
            seasonYear--
        }

        //adding info when team appears in row
        if(data[r].HomeTeam === team){
            homeShotsForThisYear = homeShotsForThisYear + data[r].HS
            homeShotsOnTargetForThisYear = homeShotsOnTargetForThisYear + data[r].HST
        }
        else if(data[r].AwayTeam === team){
            awayShotsForThisYear = awayShotsForThisYear + data[r].AS
            awayShotsOnTargetForThisYear = awayShotsOnTargetForThisYear + data[r].AST
        }
    }

    //appending last info not catched by the for loop
    if(homeShots != 0){
        homeShots.push(homeShotsForThisYear)
        homeShotsOnTarget.push(homeShotsOnTargetForThisYear)
        awayShots.push(awayShotsForThisYear)
        awayShotsOnTarget.push(awayShotsOnTargetForThisYear)
    }
    else{
        homeShots.push(null)
        homeShotsOnTarget.push(null)
        awayShots.push(null)
        awayShotsOnTarget.push(null)
    }
    
    /*reverting order since dataset has another way to order matches*/
    homeShots = homeShots.reverse()
    homeShotsOnTarget = homeShotsOnTarget.reverse()
    awayShots = awayShots.reverse()
    awayShotsOnTarget = awayShotsOnTarget.reverse()
    
    /*filter based on slider of years*/
    for(var i = 0; i < 5; i++){
        if(i < season_from || i > season_to){
            homeShots[i] = null
            homeShotsOnTarget[i] = null
            awayShots[i] = null
            awayShotsOnTarget[i] = null
        }
    }
    
    return [homeShots,awayShots,homeShotsOnTarget,awayShotsOnTarget]

}