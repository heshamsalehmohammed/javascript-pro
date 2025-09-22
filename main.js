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



//---------------------

/*

class
A blueprint for creating objects It groups data (properties) and behavior (methods) together Example

class Person {
  constructor(name) {
    this.name = name;
  }
}


constructor
A special method inside a class that runs when a new object is created with new It initializes the object’s properties

class Person {
  constructor(name) {
    this.name = name;
  }
}
const p = new Person("Ali"); // constructor is called


super
A keyword used to call the constructor or methods of a parent class

class Animal {
  constructor(type) {
    this.type = type;
  }
}
class Dog extends Animal {
  constructor(name) {
    super("dog"); // calls Animal constructor
    this.name = name;
  }
}


static methods and properties
are individual pieces of data and methods that belongs to the class itself and called on it, not on instances of the class.

class MathHelper {
  static pi = 3.14;             // static property
  static add(a, b) { return a + b; } // static method
}
console.log(MathHelper.pi);
console.log(MathHelper.add(2, 3));


instance methods
Functions defined inside a class that belong to the objects created from it

class Car {
  drive() {
    console.log("Driving...");
  }
}
const c = new Car();
c.drive(); // instance method call


inheritance
The mechanism that allows one class to extend another and reuse its properties and methods Done with the extends keyword

class Animal {
  speak() {
    console.log("Animal sound");
  }
}
class Cat extends Animal {
  speak() {
    console.log("Meow");
  }
}
const kitty = new Cat();
kitty.speak(); // Meow

*/





/*  instance methods are methods that belongs to the object (instance) created from the class
 static method methods belong to the class not the instances (objects) created from the class



 "this" in static refers to the class itself
 "this" in instance methods refers to the instance (object) created from the class */