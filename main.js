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