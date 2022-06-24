const fs=require('fs')
let event={
    data:{},
    _arr:[],
    on: function(fn){
        this._arr.push(fn)
    },
    emit:function(key,value){
        this.data[key]=value
        this._arr.forEach(fn=>fn(this.data))
    }
}

event.on((data)=>{
    console.log('first',data)
})

event.on((data)=>{
    if(Object.keys(data).length===2){
        console.log('second',data)
    }
    
})

fs.readFile('es6/name.txt','utf8',function(err,data){
    event.emit('name',data)
})

fs.readFile('es6/age.txt','utf8',function(err,data){
    event.emit('age',data)
})