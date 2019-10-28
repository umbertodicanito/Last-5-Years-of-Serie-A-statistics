var lastGoalsViewSelected = "grouped"

function updateGoalsViewWithSpecific(view){
    var tag = view
    lastGoalsViewSelected = tag
    if (tag === "grouped"){
        transitionGroupedA()
        try{
            transitionGroupedB()
        }catch(err){}
    }
    else if (tag === "percent"){
        transitionPercentA()
        transitionPercentB()
    }
}

function updateGoalsView(){
    updateGoalsViewWithSpecific(this.value)
}