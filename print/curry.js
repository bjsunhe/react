function currying(fn,arr=[]){
    
    return function(...args){
        arr=[...arr,...args]
        if(arr.length<fn.length){
            return currying(fn,arr)
        }else{
            return fn(...arr)
        }
    }
}


function currying(fn){
    let args=[]
    const inner=(arr=[])=>{
        args.push(...arr)
        return args.length>=fn.length?fn(...args):(...args)=>inner(args)
    }
    return inner()
}
function add(a,b,c,d){
    return a+b+c+d
}

let curriedAdd=currying(add)(1)(2)(3)(4)