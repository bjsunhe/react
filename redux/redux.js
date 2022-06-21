function counter(state=0,action){
    switch(action.type){
        case 'ADD':
            return state+1
        case 'REMOVE':
            return state-1
        default:
            return state
    }

}

function createStore(reducer){
    let currentState
    let listeners=[]
    function getState(){
        return currentState
    }
    function subscribe(listener){
        listeners.push(listener)
        return ()=>listeners.filter(l=>l!==listener)
    }
    function dispatch(action){
        currentState=reducer(currentState,action)
        listeners.forEach(l=>l())
    }
    dispatch({type:'@@@'})
    return {
        getState,
        subscribe,
        dispatch
    }
}