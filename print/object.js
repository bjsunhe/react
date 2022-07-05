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



//class
class Person{
    constructor(){
        this.name='jack'
        this.sayName=()=>console.log(this.name)
        this.nickNames=['jake','jd']
    }
}

let p1=new Person()


// prototype methods

class Person{
    constructor(){
        this.locate=()=>console.log('instance')
    }

    locate(){
        console.log('prototype')
    }
}

let p=new Person()
p.locate() //instance
p.prototype.locate() //prototype

// getter and setter accessors
class Person{
    set name(newName){
        this.name_=newName
    }
    get name(){
        return this.name_
    }
}

let p=new Person()
p.name='jack'


// static methods
class Person{
    constructor(){
        this.locate=()=>console.log('instance',this)
    }
    locate(){
        console.log('prototype',this)
    }
    static locate(){
        console.log('class',this)
    }
}

let p=new Person()
p.locate()
Person.prototype.locate()
Person.locate()

// instance factory
class Person{
    constructor(age){
        this.age_=age
    }
    sayAge(){
        console.log(this.age_)
    }
    static create(){
        return new Person(33)
    }
}

Person.create()

// iterator and generator methods
class Person{
    *createNicknameIterator(){
        yield 'jack'
        yield 'jake'
        yield 'jd'
    }
    static *createJobIterator(){
        yield 'butcher'
        yield 'baker'
        yield 'maker'
    }

}
let jobIter=Person.createJobIterator()
jobIter.next().value


let p = new Person()
let nicknameIter=p.createNicknameIterator()
nicknameIter.next().value

//default iterator
class Person{
    constructor(){
        this.nicknames=['jack','jake','jd']
    }
    *[Symbol.iterator](){
        yield *this.nicknames.entries()
    }
}
let p=new Person()
for (let [idx, nickname] of p){
    console.log(nickname)
}

// iterator instance
class Person{
    constructor(){
        this.nicknames=['jack','jake','jd']
    }
    [Symbol.iterator](){
        return this.nicknames.entries()
    }
}

let p=new Person()


// inheritance

class Vehicle{
    identifyPrototype(id){
        console.log(id,this)
    }
    static identifyClass(id){
        console.log(id,this)
    }
}

class Bus extends Vehicle{

}


// super
class Vehicle{
    constructor(){
        this.hasEngine=true
    }
}
class Bus extends Vehicle{
    constructor(){
        super()
        console.log(this instanceof Vehicle)
        console.log(this)
    }
}

new Bus()


// constructor
class Vehicle{
    constructor(licensePlate){
        this.licensePlate=licensePlate
    }
}

class Bus extends Vehicle{
    constructor(licensePlate){
        super(licensePlate)
    }
}

new Bus('111')


// Abstract base class 

class Vehicle{
    constructor(){
        console.log(new.target)
        if(new.target===Vehicle){
            throw new Error('cannot be instantiated')
        }
    }
}

class Bus extends Vehicle{

}


//abstract base class
class Vehicle{
    constructor(){
        if(new.target===Vehicle){
            throw new Error('cannot be instantiated')
        }
        if(!this.foo){
            throw new Error('inheriting class must define foo()')
        }
        console.log('success')
    }
}

class Bus extends Vehicle{
    foo(){}
}


//mixin
class Vehicle{

}

let FooMixin=(Superclass)=>class extends Superclass{
    foo(){
        console.log('foo')
    }
}

let BarMixin=(Superclass)=>class extends Superclass{
    bar(){
        console.log('bar')
    }
}

let BazMixin=(Superclass)=>class extends Superclass{
    baz(){
        console.log('baz')
    }
}

class Bus extends FooMixin(BarMixin(BazMixin(Vehicle))){

}

let b=new Bus()
b.foo()
b.bar()
b.baz()

//mixin
function mix(BaseClass,...Mixins){
    return Mixins.reduce((accumulator,current)=>current(accumulator),BaseClass)
}

class Bus extends mix(Vehicle,FooMixin,BarMixin,BazMixin){

}
let b=new Bus()
b.foo()
b.bar()
b.baz()
