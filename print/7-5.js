// prototype chaining

function SuperType(){
    this.property=true
}

SuperType.prototype.getSuperValue=function(){
    return this.property
}


function SubType(){
    this.subproperty=false
}

SubType.prototype=new SuperType()
SubType.prototype.getSubValue=function(){
    return this.subproperty
}

let instance = new SubType()
instance.getSuperValue() //true

// Constructor Stealing

function SuperType(){
    this.colors=['red','blue','green']
}

function SubType(){
    SuperType.call(this)
}

let instance1=new SubType()
instance1.colors.push('black')
instance1.colors

let instance2=new SubType()
instance2.colors

// passing arguments
function SuperType(name){
    this.name=name
}
function SubType(){
    SuperType.call(this,'nicholas')
    this.age=29
}

let instance =new SubType()
instance.name


// combination inheritance

function SuperType(name){
    this.name=name
    this.colors=['red','blue','green']
}

SuperType.prototype.sayName=function(){
    console.log(this.name)
}

function SubType(name,age){
    SuperType.call(this,name)
    this.age=age
}

SubType.prototype=new SuperType()
SubType.prototype.sayAge=function(){
    console.log(this.age)
}

let instance1=new SubType('nicholas',29)
instance1.colors.push('black')
instance1.colors
instance1.sayName()
instance1.sayAge()

let instance2=new SubType('greg',27)
instance2.colors
instance2.sayName()
instance2.sayAge()


// prototypal inheritance

function object(o){
    function F(){}
    F.prototype=o
    return new F()
}

let person={
    name:'nicholas',
    friends:['shelby','court','van']
}
let anotherPerson=object(person)
anotherPerson.name='greg'
anotherPerson.friends.push('rob')

let yetAnotherPerson=object(person)
yetAnotherPerson.name='linda'
yetAnotherPerson.friends.push('barbie')

person.friends

//Object.create()

let person={
    name:'nicholas',
    friends:['shelby','court','van']
}
let anotherPerson=Object.create(person)
anotherPerson.name='greg'
anotherPerson.friends.push('rob')

let yetAnotherPerson=Object.create(person)
yetAnotherPerson.name='linda'
yetAnotherPerson.friends.push('barbie')

person.friends

// parasitic inheritance
function createAnother(original){
    let clone=object(original)
    clone.sayHi=function(){
        console.log('hi')
    }
    return clone
}

let person={
    name:'nicholas',
    friends:['shelby','court','van']
}
let anotherPerson=createAnother(person)
anotherPerson.sayHi()


// parasitic combination inheritance

function SuperType(name){
    this.name=name
    this.colors=['red','blue','green']
}
SuperType.prototype.sayName=function(){
    console.log(this.name)
}
function SubType(name,age){
    SuperType.call(this,name)
    this.age=age
}

SubType.prototype=new SuperType()
SubType.prototype.constructor=SubType
SubType.prototype.sayAge=function(){
    console.log(this.age)
}


let instance=new SubType('nicholas',29)

// inherit prototype
function inheritPrototype(subType,superType){
    let prototype=object(superType.prototype)
    prototype.constructor=subType
    subType.prototype=prototype
}


function SuperType(name){
    this.name=name
    this.colors=['red','blue','green']
}
SuperType.prototype.sayName=function(){
    console.log(this.name)
}
function SubType(name,age){
    SuperType.call(this,name)
    this.age=age
}
inheritPrototype(SubType,SuperType)
SubType.prototype.sayAge=function(){
    console.log(this.age)
}