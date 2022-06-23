const fs=require('fs')

function after(timer,cb){
    let school={}
    return function finish(key,value){
        school[key]=value
        if(Object.keys(school).length===timer){
            cb(school)
        }

    }
}

const finish=after(2,(school)=>{
    console.log(school)
})


fs.readFile('es6/name.txt','utf8',function(err,data){
    finish('name',data)
})

fs.readFile('es6/age.txt','utf8',function(err,data){
    finish('age',data)
})