// creating objects

// 1. Object literal - most common way
const o1 = {}

// 2. Object constructor
const o2 = new Object()

// 3. Object.create() - creates object with specified prototype
const o3 = Object.create({})  // the arg is the prototype of the new object

// 4. Using a class (ES6+)
class MyClass {
    constructor() {
        this.prop = 'value'
    }
}
const o4 = new MyClass()

// 5. Using a function constructor (pre-ES6)
function MyFunc() {
    this.prop = 'value'
}
const o5 = new MyFunc()

// 6. Using Object.assign() to clone or merge objects
const o6 = Object.assign({}, { a: 1, b: 2 })

// 7. Using JSON.parse() for deep cloning (from JSON string)
const o7 = JSON.parse('{"x":10,"y":20}')

// 8. Using Object.fromEntries() (ES2019+)
const o8 = Object.fromEntries([['key', 'value'], ['foo', 'bar']])


console.log(o1, o2, o3, o4, o5, o6, o7, o8)

// key of object is always a string or a symbol

o1[30] = 30 
o1["30"] = 50

console.log(o1) // { '30': 50 } - keys are always strings
