class Subject{
    constructor(name){
        this.name=name
        this.observer=[]
        this.state='happy'
    }

    attach(o){
        this.observer.push(o)
    }

    setState(value){
       this.state=value
       this.observer.forEach(o=>{
            console.log(this)
            o.update(this.state)
       })     
    }
}

class Observer{
    constructor(name){
        this.name=name
    }

    update(state){
        console.log(this.name+'hi'+state)
    }   
}

const v=new Subject('girlfriend')
const o=new Observer('boyfriend')
const o1=new Observer('boyfriend1')

v.attach(o)
v.attach(o1)

v.setState('unhappy')