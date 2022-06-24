// const STATE={
//     FULFILLED:'fulfilled',
//     REJECTED:'rejected',
//     PENDING:'pending'
// }


// class MyPromise{
//     constructor(){

//     }

//     #runCallbacks(){

//     }

//     #onSuccess(){

//     }
//     #onFail(){

//     }
//     then(){

//     }
//     catch(){

//     }
//     finally(){

//     }
//     static resolve(){

//     }
//     static reject(){

//     }
//     static all(){

//     }
//     static allSettled(){

//     }
//     static race(){

//     }
//     static any(){

//     }

// }

// class UncaughtPromiseError extends Error{

// }


// let promise=new Promise((fn1,fn2)=>{
//     // fn1('haha')
//     fn2('fail')
// })

// promise.then((data)=>{
//     console.log(data)
// },(error)=>{
//     console.log(error)
// })



const PENDING='PENDING'
const FULFILLED='FULFILLED'
const REJECT='REJECT'


class MyPromise{
    constructor(executor){
        this.state=PENDING
        this.successData=undefined
        this.errorData=undefined
        this.resolveList=[]
        this.rejectList=[]

        try{
            executor(this.resolve.bind(this),this.reject.bind(this))


        }catch(e){
            this.reject.bind(this)(e)
        }

    }


    resolve(value){
        console.log(this)
        if(this.state===PENDING){
            this.successData=value
            this.state=FULFILLED
            this.resolveList.forEach(fn=>fn())
        }

    }
    reject(error){
        if(this.state===PENDING){
            this.errorData=error
            this.state=REJECT
            this.rejectList.forEach(fn=>fn())
        }

    }

    then(ResolveFn,RejectFn){
        if(this.state===PENDING){
            this.resolveList.push(()=>{
                ResolveFn(this.successData)
            })
            this.rejectList.push(()=>{
                RejectFn(this.errorData)
            })
        }
        if(this.state===FULFILLED){
            ResolveFn(this.successData)
        }
        if(this.state===REJECT){
            RejectFn(this.errorData)
        }
    }


}


// let promise=new MyPromise((fn1,fn2)=>{
//     // setTimeout(()=>{
//     //     fn1('haha')
//     //     // fn2('fail')
//     // },500)

//     throw new Error('reject')

// })

// promise.then((data)=>{
//     console.log(data)
// },(error)=>{
//     console.log(error)
// })



// let promise=new Promise(()=>{
//     console.log(2)
// })

// console.log(1)


const fs=require('fs')

function readFile(...args){
    return new Promise((resolve,reject)=>{
        fs.readFile(...args,(err,data)=>{
            if(err) return reject(err)
            resolve(data)
        })
    })
}

// readFile('es6/first.txt','utf8').then((data)=>{
//     console.log(data)
//     readFile(data,'utf8').then((data)=>{
//         console.log(data)
//     })
// },(err)=>{
//     console.log(err)
// })


readFile('es6/first.txt','utf8').then((data)=>{
    console.log(data)
    return readFile(data,'utf8')
},(err)=>{
    console.log(err)
}).then((data)=>{
    console.log(data)
},(err)=>{
    console.log(err)
})