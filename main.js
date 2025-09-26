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





/* 

getter
A special method that lets you access a property value like it were a normal field but the value is actually computed or returned from a function It is defined with the keyword get

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const p = new Person("Ali", "Saleh");
console.log(p.fullName); // Ali Saleh (getter is called like a property)


setter
A special method that lets you assign a property value like it were a normal field but behind the scenes the function runs and handles the assignment or validation It is defined with the keyword set

class Person {
  constructor(name) {
    this._name = name; // use _ to avoid recursion with the setter
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (newName.length < 3) {
      throw new Error("Name too short");
    }
    this._name = newName;
  }
}

const p = new Person("Ali");
console.log(p.name); // Ali (getter called)
p.name = "Omar";     // setter called
console.log(p.name); // Omar

*/





/* 


Public fields and methods

Definition
Public fields and methods can be accessed from anywhere (inside the class, outside the class, or by instances).

Syntax
They are written normally without any special prefix.

Example

class Person {
  name; // public field

  constructor(name) {
    this.name = name;
  }

  greet() { // public method
    console.log(`Hello, I am ${this.name}`);
  }
}

const p = new Person("Ali");
console.log(p.name); // Ali (accessible)
p.greet();           // Hello, I am Ali

Private fields and methods

Definition
Private fields and methods are only accessible inside the class where they are defined. They cannot be accessed directly from outside.

Syntax
They are prefixed with #.

Example

class BankAccount {
  #balance = 0; // private field

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) { // public method
    this.#increaseBalance(amount);
  }

  #increaseBalance(amount) { // private method
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Omar");
account.deposit(100);
console.log(account.getBalance()); // 100
console.log(account.#balance);     // ❌ SyntaxError (cannot access private field)

*/




/* 

static initialization blocks 


class MyClass {
  static myStaticProperty;
  
  static {
    // This block runs once when the class is defined
    MyClass.myStaticProperty = "Initialized Value";
    console.log("Static block executed");
  }
}


the block runs once when the class is first evaluated, allowing you to set up static properties or perform one-time setup tasks for the class
it doesnt run when instances are created



a static block is a special block inside a class marked with static { ... }

it runs once when the class is evaluated (loaded)
it can initialize or compute values for static properties
it can contain any code (loops, if statements, function calls, etc)
it has access to this (refers to the class itself)

multiple blocks

you can declare more than one static block in the same class
they run in order of appearance



*/

 /* 



 
 
 the left of the dot rule in JavaScript is a simple way to remember what this refers to

👉 rule:
whatever is left of the dot . when you call a function determines the value of this inside that function

examples
const person = {
  name: "Ali",
  greet() {
    console.log(this.name);
  }
};

person.greet(); // "Ali"
// left of the dot is `person` → so `this = person`

const greetFn = person.greet;
greetFn(); 
// left of the dot is nothing (just a normal function call) → `this = undefined` (in strict mode) or `window` (in sloppy mode)

const other = { name: "Omar", greet: person.greet };
other.greet(); // "Omar"
// left of the dot is `other` → so `this = other`

special cases

Arrow functions ignore the left of the dot rule
they don’t have their own this, instead they use the this of the surrounding scope

const obj = {
  name: "Ali",
  greet: () => {
    console.log(this.name);
  }
};

obj.greet(); // undefined (arrow uses outer scope `this`, not `obj`)


Call / Apply / Bind override the rule explicitly

person.greet.call({ name: "Sara" }); // "Sara"
 
 
 */




/* 

key difference
normal function → this is decided every time you call it (who is left of the dot)
arrow function → this is locked to whatever it was in the place the arrow was created

*/


/* 

function Outer() {
  this.value = "I am from Outer";

  // normal function
  this.normal = function () {
    console.log("normal:", this.value);
  };

  // arrow function
  this.arrow = () => {
    console.log("arrow:", this.value);
  };
}

const outer = new Outer();

// call both normally
outer.normal(); // normal: I am from Outer
outer.arrow();  // arrow: I am from Outer

// extract the methods into variables
const n = outer.normal;
const a = outer.arrow;

n(); // normal: undefined  (lost its "this")
a(); // arrow: I am from Outer (still remembers outer's this!)

*/




/* 
why the value of this of isolated(detached) method defined in class differ from isolated method defined in object?

Classes automatically run in strict mode, so this in a detached class method is always undefined
Objects are not strict by default, so in sloppy mode a detached object method will use the global object (window) instead of undefined
That’s why you might see a difference



*/



/* 

ways to force setting "this" in a method (call, apply, bind)

call → runs now, arguments listed normally
apply → runs now, arguments given in an array
bind → does not run now, makes a new function with this locked forever

function show() {
  console.log(this.name);
}

const obj1 = { name: "Ali" };
const obj2 = { name: "Sara" };

const bound1 = show.bind(obj1);
const bound2 = show.bind(obj2);

show.call(obj2);   // Sara   (original can still be rebound)
bound1.call(obj2); // Ali    (ignored, bound1 is locked to obj1)
bound2.call(obj1); // Sara   (ignored, bound2 is locked to obj2)

----------------------------

function show() {
  console.log(this.name);
}

const obj1 = { name: "Ali" };
const obj2 = { name: "Sara" };

const result = show.bind(obj1).bind(obj2);

result(); // ??? // Ali - still bound to obj1, second bind is ignored




*/


/* 

Event listeners handlers or callback and "this"
In event listeners, this refers to the element that received the event  

Timers and "this"
In timer callbacks (setTimeout, setInterval), this is undefined in strict mode or the global object in sloppy mode. To preserve this, use an arrow function or bind.

Callback (map, filter, etc) functions and "this"
When passing methods as callbacks, this can be lost. Use bind or arrow functions to maintain the correct this context.


*/

/* 

new Array()
new Object()
new Dog("kiki",1.5)


the new keyword
When you use new with a function, it does the following:

1.Creates a blank object in memory
2.Links the new object’s internal prototype (__proto__) to the constructor’s .prototype property
3.Binds "this" inside the constructor to that new object
4.Executes the constructor function (passing any arguments you supplied)
5.Returns the newly created object (unless the constructor explicitly returns another object)



constructor function => function is used to create object in JS
function Dog(name, age){
   this.name = name;
   this.age = age;
}

Dog("kiki",1.5) => gets undefined , this refers to window or global object
new Dog("kiki",1.5) => creates a new object with name and age properties {name: "kiki", age: 1.5} and this refers to the object 


then the keyword this 
create new blank object in the memory 
(create link to the object's prototype)
links the new objects __proto__ to the constructors .prototype property 
bind this to the new object 
execute the constructor function 
returns the newly created object 

*/




/* 

1 Method on the prototype
function Dog(name, age) {
  this.name = name
  this.age = age
}
Dog.prototype.bark = function() {
  return `${this.name} says woof`
}

const d1 = new Dog("kiki", 1.5)
const d2 = new Dog("koko", 2)


bark lives once on Dog.prototype

Every instance (d1, d2) shares the same single function object

More memory efficient, better for performance when many instances are created

Typical OOP pattern in JS

2 Method inside constructor
function Dog(name, age) {
  this.name = name
  this.age = age
  this.bark = function() {
    return `${this.name} says woof`
  }
}

const d1 = new Dog("kiki", 1.5)
const d2 = new Dog("koko", 2)


bark is recreated separately for each new instance

Each dog has its own copy of the function in memory

Less efficient if you create many objects

But lets you have per-instance variations (you could change one dog’s bark without affecting others)


---------------------------

When you write a class like this

class Dog {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  bark() {
    return `${this.name} says woof`
  }
}


What JavaScript does under the hood is very similar to this constructor-function style

function Dog(name, age) {
  this.name = name
  this.age = age
}
Dog.prototype.bark = function() {
  return `${this.name} says woof`
}

Key points

Class methods (like bark) are automatically placed on Dog.prototype, not copied into each instance

They are also non-enumerable by default (won’t show in for...in loops)

The constructor inside the class is just a special method that becomes the function body of the class constructor

So classes are really syntactic sugar over constructor functions plus prototype assignments

*/





/* 

In “old JS” (before class syntax in ES2015) you had to wire inheritance manually with constructor functions and prototypes

Here’s the common pattern

1 Base constructor
function Animal(name) {
  this.name = name
}

Animal.prototype.eat = function() {
  return `${this.name} is eating`
}

2 Child constructor
function Dog(name, breed) {
  // call parent constructor to initialize properties
  Animal.call(this, name) 
  this.breed = breed
}

3 Link prototypes
Dog.prototype = Object.create(Animal.prototype) // inherit methods
Dog.prototype.constructor = Dog // fix constructor reference

//////////////////////////

NOTE

If you do
Dog.prototype = Animal.prototype


Both Dog and Animal now share the exact same prototype object
Any change you make to Dog.prototype also changes Animal.prototype (because they’re the same reference)
That breaks the idea of inheritance — you don’t want the child class polluting the parent

Correct way
Dog.prototype = Object.create(Animal.prototype)


Creates a new empty object whose internal [[Prototype]] points to Animal.prototype
So Dog.prototype inherits from Animal.prototype instead of being the same object
You can safely add dog-specific methods without touching the parent




/////////////////////

4 Add child-specific methods
Dog.prototype.bark = function() {
  return `${this.name} says woof`
}

5 Usage
const d1 = new Dog("kiki", "husky")
console.log(d1.eat())  // kiki is eating  (from Animal)
console.log(d1.bark()) // kiki says woof  (from Dog)




*/





/* 

You can set the prototype of a plain object literal in a couple of ways

1 Using Object.setPrototypeOf
const animal = {
  eat() { return "eating" }
}

const dog = {
  bark() { return "woof" }
}

Object.setPrototypeOf(dog, animal)

console.log(dog.bark()) // woof
console.log(dog.eat())  // eating (inherited)

2 Using __proto__ inside an object literal (old but still works)
const animal = {
  eat() { return "eating" }
}

const dog = {
  __proto__: animal,
  bark() { return "woof" }
}

console.log(dog.eat()) // eating

3 Using Object.create directly
const animal = {
  eat() { return "eating" }
}

const dog = Object.create(animal, {
  bark: {
    value: function() { return "woof" }
  }
})

console.log(dog.eat()) // eating




*/





/* 

The prototype chain is how JavaScript resolves properties and methods when you access them on an object

How it works
When you try to read a property (obj.prop)
JS first looks for prop directly on obj
If not found, it looks at obj.__proto__ (same as Object.getPrototypeOf(obj))
If still not found, it keeps walking “up” the chain to the prototype’s prototype
This continues until it reaches Object.prototype
If not found there, result is undefined

*/


/* 

?? prototypes are just objects where shared functionality lives 


*/





/* 

prototype

A property that exists only on constructor functions / classes
It’s an object used as a template for new instances created with new
Any methods you want all instances to share should be placed on prototype

function Dog(name) {
  this.name = name
}

Dog.prototype.bark = function() {
  return `${this.name} says woof`
}

const d1 = new Dog("kiki")
console.log(d1.bark()) // woof


Here Dog.prototype is where bark lives

__proto__

A property that exists on every object instance
It’s a reference to the object’s internal prototype (i.e. the constructor’s prototype)
Used for lookup when you access properties

const d1 = new Dog("kiki")

console.log(d1.__proto__ === Dog.prototype) // true


So __proto__ connects an object to the prototype chain

Quick analogy
prototype = blueprint (defined on constructor)
__proto__ = actual link that each object carries to its blueprint


*/




/* 

useful methods handling prototypes 

Object.create(prototype1,initialObj1)
Object.getPrototypeOf(obj)
Object.setPrototypeOf(obj1,prototype1)
obj1.isPrototypeOf(obj2)


*/


/* 
callback is simply a function that you pass into another function 
so that it can be called later when some work is finished
- functional programming patterns (filter, map, reducer)
- event driven programming (events handlers)
- asynchronous programming (timers, promises, async/await)


*/


/* 
javascript itself is single threaded because it runs on the event loop model

but it achieves concurrency through
async callbacks / promises / async await → non blocking code on the same thread
web apis (like setTimeout fetch etc) handled by the browser or nodejs runtime
web workers → allow true multithreading by running code in separate background threads with message passing
*/


/* 
single thread concurrency
js has one call stack (the main thread)
when you do setTimeout, fetch, or async i/o the heavy work is passed to browser or node runtime apis (not js itself)
when that finishes it pushes the callback back into the event queue
the event loop checks if the call stack is free and executes the callback
so all js code still runs on the single main thread




real multithreading

this is when multiple threads of execution run truly in parallel on different cpu cores
js cannot do this with callbacks alone
only web workers (browser) or worker_threads (node) give real multithreading
each worker has its own isolated js engine instance and runs on another os thread

so

callbacks promises async/await → concurrency on one thread (non-blocking)
web workers / worker_threads → true multithreading


*/



/* 

Callback hell (also called the pyramid of doom) happens in JavaScript when you have many nested callbacks, 
making the code deeply indented, messy, and hard to maintain or debug.


Each async function depends on the result of the previous one.
The nesting creates a pyramid shape with many }) at the end.
Hard to read, test, and handle errors.

Callback hell = too many nested callbacks
Solutions: named functions, Promises, or best → async/await  

// NOTE>> await keyword pauses the surrounding async function, not the whole JS engine

*/




/* 
PROMISES

Promises are the modern way to handle asynchronous operations
a Promise in JavaScript is an object that represents the eventual result of an asynchronous operation

definition
it acts like a placeholder for a value that will be available later (success or failure)
[[one time guarantee for a future value]]
it can be in one of three states

pending → the async work has not finished yet
fulfilled → the work finished successfully, a value is available
rejected → the work failed, an error reason is available


*/