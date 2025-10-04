
/* Programming Paradigms
│
├── Imperative
│   ├─ Procedural
│   └─ Object-Oriented
│
└── Declarative
    ├─ Functional
    └─ Logic (e.g., Prolog, SQL)
*/


/* 

Imperative programming
a style of programming where you write explicit instructions that describe how the computer should perform tasks step by step and manage state

Declarative programming
a style of programming where you describe what outcome you want and the underlying system figures out how to achieve it





Imperative Programming

A programming style where you write explicit instructions that describe how the computer should perform tasks step by step, 
while managing and maipulating program state directly.

Procedural Programming (PP): Organizes code into procedures/functions that execute in sequence (e.g., C, Pascal).
Object-Oriented Programming (OOP): Encapsulates state and behavior into objects and uses concepts 
like encapsulation, inheritance, and polymorphism (e.g., Java, C#, Python classes).

👉 Imperative = How to do it (focus on control flow and state changes).



Declarative Programming

A programming style where you describe what outcome you want, and the underlying system determines how to achieve it.

Functional Programming (FP): Uses pure functions, immutability, and composition to express computations 
(e.g., Haskell, Elixir, JavaScript with map/filter/reduce).

Logic Programming: Uses facts and rules to let the system infer solutions via logical reasoning (e.g., Prolog, Datalog).
Other examples: SQL for querying data, HTML for describing structure.

👉 Declarative = What you want, not how to get it.

*/




/* 

OOP (Object-Oriented Programming)

OOP is an Imperative programming paradigm that structures software around objects—self-contained units
encapsulating both state (data/properties) and behavior (methods/functions).
It promotes modularity, reusability, and clarity by modeling programs closer to real-world entities.





Four Main Pillars of OOP
1. Encapsulation

Encapsulation is about bundling data and methods that operate on that data into one unit (the object), while restricting direct external access to the internal state. Only the necessary details are exposed through controlled interfaces.

JavaScript Example:

class BankAccount {
  #balance = 0; // private field

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100






2. Inheritance

Inheritance allows new classes to reuse, extend, and specialize the behavior of existing classes. This promotes code reusability and logical hierarchy.

JavaScript Example:

class Animal {
  speak() {
    console.log("sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("woof");
  }
}

const a = new Animal();
const d = new Dog();
a.speak(); // sound
d.speak(); // woof






3. Polymorphism

Polymorphism enables the same method name to exhibit different behavior depending on the object invoking it. It makes code flexible and extensible.

Method Overriding (common in JS)

Method Overloading (not natively supported in JS but can be simulated)

JavaScript Example:

const a = new Animal();
const d = new Dog();

a.speak(); // sound
d.speak(); // woof






4. Abstraction

Abstraction focuses on hiding complex implementation details and exposing only essential functionality. It helps reduce complexity and increases clarity.

In JavaScript, true abstract classes don’t exist, but you can simulate them with base classes that enforce contracts.

JavaScript Example:

class Shape {
  area() {
    throw new Error("Subclass must implement area()");
  }
}

class Circle extends Shape {
  constructor(r) {
    super();
    this.r = r;
  }
  area() {
    return Math.PI * this.r * this.r;
  }
}

const c = new Circle(5);
console.log(c.area()); // 78.5398...


🔑 Key Points

👉 Objects are the core units (instances)
👉 Classes are blueprints for creating objects
👉 Inheritance allows one class/object to extend another
👉 Encapsulation hides implementation details and exposes only necessary parts
👉 Polymorphism lets objects share interfaces but provide different implementations
👉 Abstraction focuses on what an object does, not how it does it




💡 Use Cases

👉 Modeling real-world entities (Users, Orders, Products)
👉 Organizing large applications into manageable modules
👉 GUI components in frontend frameworks (React classes, though now hooks are common)
👉 Game development (Player, Enemy, Weapon objects)
👉 Backend services (Controllers, Models in MVC)

✅ Benefits

👉 Easier to model complex systems with real-world mapping
👉 Code reuse via inheritance and polymorphism
👉 Encapsulation improves maintainability and reduces bugs
👉 Abstraction makes APIs cleaner and easier to use

⚠️ Cons

👉 Can become overly complex (deep inheritance trees)
👉 Not always the most performant (indirection overhead)
👉 Sometimes less flexible than functional programming
👉 JavaScript OOP is prototype-based under the hood, which can confuse beginners

📝 Takeaways

👉 OOP = thinking in terms of objects, classes, and relationships
👉 Use encapsulation to hide details, inheritance to reuse, polymorphism to extend behavior, abstraction to design clean interfaces
👉 JavaScript gives you both prototype-based OOP and class-based OOP (ES6 syntax)








👉 Short Interview-Ready Definition

OOP is a declarative paradigm where programs are structured around objects that encapsulate state and behavior, 
following the four principles: encapsulation, inheritance, polymorphism, and abstraction.


*/



// creating objects

// 1. Object literal - most common way
const o1 = {};

// 2. Object constructor
const o2 = new Object();

// 3. Object.create() - creates object with specified prototype
const o3 = Object.create({}); // the arg is the prototype of the new object

// 4. Using a class (ES6+)
class MyClass {
  constructor() {
    this.prop = "value";
  }
}
const o4 = new MyClass();

// 5. Using a function constructor (pre-ES6)
function MyFunc() {
  this.prop = "value";
}
const o5 = new MyFunc();

// 6. Using Object.assign() to clone or merge objects
const o6 = Object.assign({}, { a: 1, b: 2 });

// 7. Using JSON.parse() for deep cloning (from JSON string)
const o7 = JSON.parse('{"x":10,"y":20}');

// 8. Using Object.fromEntries() (ES2019+)
const o8 = Object.fromEntries([
  ["key", "value"],
  ["foo", "bar"],
]);

console.log(o1, o2, o3, o4, o5, o6, o7, o8);

// key of object is always a string or a symbol

o1[30] = 30;
o1["30"] = 50;

console.log(o1); // { '30': 50 } - keys are always strings

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


we use private fields and methods to encapsulate internal details of a class, hiding them from outside access. 
This helps prevent unintended interference and keeps the public interface clean and easy to use.
old days we used naming conventions like _privateField to indicate something is private 
but it was just a convention and not enforced by the language
also we used closures to create private variables but that made it hard to use inheritance and prototypes


const counter = (function () {
  let count = 0;
  return {
    increment: function () {
      return count++;
    },
    decrement: function () {
      return count--;
    },
    getCount: function () {
      return count;
    },
  };
})();

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

keyword this is a special identifier that refers to the context in which the current code is executed

this can refer to in js

global object
normal function in global scope (non-strict mode → window in browser, global in node)

undefined
normal function in strict mode

instance of a class
inside constructor
inside non-static methods

class itself
inside static methods this refers to the class constructor

any object you choose
using .call() .apply() .bind() you can fix this manually

dom element
in a normal event handler function this is the element that fired the event

lexical outer scope
in arrow functions this is inherited from where the arrow was defined

*/



/* 

👉 this is a special keyword in JavaScript that refers to the context in which a function is executed
👉 Its value is determined at runtime, not at definition time

🔑 Key Points

👉 In global scope, this refers to the global object (window in browsers, global in Node)
👉 Inside an object method, this refers to the object that called the method
👉 In a class, this refers to the instance
👉 In regular functions, this depends on how the function is called
👉 In arrow functions, this is lexically bound (it uses the surrounding scope’s this)
👉 this can be changed with call, apply, bind

🧩 Examples
1. Global context
console.log(this) 
// In browser → Window
// In Node → {}

2. Inside an object method
const user = {
  name: "Alice",
  greet() {
    console.log(`Hello, I’m ${this.name}`)
  }
}

user.greet() // Hello, I’m Alice

3. Standalone function
function show() {
  console.log(this)
}
show() 
// In strict mode → undefined
// Otherwise → global object

4. In a class
class Person {
  constructor(name) {
    this.name = name
  }
  greet() {
    console.log(`Hi, I’m ${this.name}`)
  }
}
const p = new Person("Bob")
p.greet() // Hi, I’m Bob

5. Arrow function (lexical this)
const obj = {
  name: "Carol",
  regular: function() { console.log(this.name) },
  arrow: () => console.log(this.name)
}

obj.regular() // "Carol"
obj.arrow()   // undefined (uses outer/global `this`)

6. In event listeners
document.getElementById("btn").addEventListener("click", function() {
  console.log(this) // the element itself
})

document.getElementById("btn").addEventListener("click", () => {
  console.log(this) // lexical scope (likely window)
})

7. call, apply, bind
function greet(msg) {
  console.log(`${msg}, I’m ${this.name}`)
}

const person = { name: "Dana" }

greet.call(person, "Hello")   // Hello, I’m Dana
greet.apply(person, ["Hi"])   // Hi, I’m Dana
const bound = greet.bind(person)
bound("Hey")                  // Hey, I’m Dana

💡 Use Cases

👉 Access object’s properties inside methods
👉 Maintain correct context in event handlers or callbacks
👉 Use .bind for passing functions with the right this
👉 Use arrow functions when you want to inherit parent scope’s this

✅ Benefits

👉 Makes methods naturally aware of their owning object
👉 Allows flexible function reuse with .call / .apply / .bind

⚠️ Cons

👉 Behavior of this can be confusing
👉 In callbacks and event handlers, this may not be what you expect
👉 Arrow functions don’t bind their own this, which can be helpful or harmful depending on context

📝 Takeaway

👉 this in JavaScript is dynamic and depends on how a function is called
👉 Use arrow functions to lock into the outer context
👉 Use bind/call/apply to explicitly control this


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

---------------------------
.bind() Does
Creates a new function with its this context fixed to the first argument.
Optionally, pre-fills (partially applies) arguments.
Does not call the function immediately (unlike .call and .apply).

NOTE bind cannot lock the second argument and leave the first one unlocked
to do this 
A custom partial function with placeholders (like lodash does with _).
Or rewrite a wrapper manually.




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


then the keyword new 
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

Memory Management in JavaScript 👇

📖 Definition

👉 Memory management is the process of allocating, using, and freeing memory resources during the lifecycle of a program
👉 In JavaScript, memory is managed automatically by the Garbage Collector (GC)

🔑 Key Points

👉 JavaScript uses automatic memory management (developers don’t manually allocate/free memory like in C/C++)
👉 Memory lifecycle: allocate → use → release
👉 Most memory leaks happen when objects remain referenced even if no longer needed
👉 Common areas of concern: closures, event listeners, global variables, caches

🧩 Examples
Allocation

👉 When you create variables, objects, arrays, functions, memory is allocated

let num = 42
let obj = { name: "Alice" }
let arr = [1, 2, 3]

Use

👉 Accessing and modifying values

console.log(obj.name) // "Alice"
arr.push(4)

Release (Garbage Collection)

👉 If there are no more references to a value, GC will clean it up

let user = { name: "Bob" }
user = null // old object becomes unreachable → GC can collect it

🧠 Garbage Collection

👉 JavaScript engines (like V8 in Chrome/Node.js) use reachability-based garbage collection
👉 If an object is reachable from root objects (like window in browsers or global in Node), it won’t be collected
👉 Algorithm: Mark-and-Sweep

Mark all reachable objects

Sweep unreachable ones → free memory

💡 Common Use Cases & Issues
1. Closures
function outer() {
  let bigArray = new Array(1000000).fill('*')
  return function inner() {
    console.log(bigArray.length) // still referenced!
  }
}
const leak = outer() // bigArray stays in memory


👉 Avoid keeping unnecessary references in closures

2. Event Listeners
const btn = document.getElementById("click")
btn.addEventListener("click", () => console.log("clicked"))

// if btn is removed from DOM but listener not removed → memory leak


👉 Always removeEventListener when cleaning up

3. Globals

👉 Variables defined globally stay in memory for entire app lifecycle

window.bigCache = new Array(1000000).fill('*') // stays forever

4. Timers & Intervals

👉 Unstopped timers hold references

setInterval(() => console.log("running"), 1000)
// if never cleared → memory leak


👉 Use clearInterval or clearTimeout

✅ Benefits of Automatic Memory Management

👉 Developer doesn’t worry about manual allocation/freeing
👉 Safer than low-level languages (avoids dangling pointers)
👉 Mark-and-Sweep GC reduces fragmentation

⚠️ Cons & Pitfalls

👉 GC is not predictable (you can’t force when it runs)
👉 Still possible to create memory leaks via references
👉 Large unused structures (arrays, objects) can clog memory
👉 Debugging leaks can be hard without tools

🛠️ Best Practices

👉 Use let/const with proper scope (avoid var)
👉 Nullify references if you no longer need them
👉 Clean up event listeners, DOM nodes, timers
👉 Prefer local variables over globals
👉 Use WeakMap / WeakSet for caches (they allow GC on keys)
👉 Monitor with Chrome DevTools → Memory tab

*/




/* 
callback is simply a function that you pass into another function 
so that it can be called later when some work is finished
- functional programming patterns (filter, map, reducer)
- event driven programming (events handlers)
- asynchronous programming (timers, promises, async/await)


*/




/* 

Concurrency in JavaScript refers to how JS can manage multiple tasks without running them all at the same exact time (since it has one main thread).


JS achieves this with the event loop, async callbacks, promises, and APIs.

While one task runs in the call stack, other tasks (I/O, timers, network requests) 
can progress in the background (handled by the browser or Node.js runtime).

*/


/* 

Example of Concurrency
function task1() {
  console.log("Task 1 done");
}
function task2() {
  setTimeout(() => console.log("Task 2 done"), 1000);
}
function task3() {
  console.log("Task 3 done");
}

task1();
task2();
task3();


Output:

Task 1 done
Task 3 done
Task 2 done   // after ~1 second


Even though JS is single-threaded, it looks concurrent because while waiting for task2’s timer, JS continues with task3.

Key Points

JS is single-threaded (one call stack).
The event loop enables non-blocking async behavior.
Concurrency is achieved by delegating tasks to the environment (Web APIs / Node.js libuv), then handling callbacks via the queue.
Promises and async/await use the microtask queue, which has higher priority than the normal task queue.

✅ memory trick:

Event loop = traffic controller 🚦
Concurrency = illusion of doing multiple things at once with async tasks.



Concurrency means the system is able to make progress on multiple tasks during the same period of time, even if not literally at the exact same instant.
In JavaScript:

The engine runs one piece of code at a time (single-threaded).
But while waiting for I/O (network, timers, events), other code can run.
Tasks interleave, so it looks like multiple things are happening at once.



Parallelism

Parallelism means code is literally executed at the exact same time (on different CPU cores or threads).
JS in the browser does not do parallel execution on the main thread.
But browsers/Node.js can use parallelism in background threads (e.g., Web Workers, libuv thread pool).



👉 memory trick:

Concurrency = dealing with many things at once (interleaving).
Parallelism = doing many things at the exact same time.

*/




/* 

Analogy

Interleaving (concurrency):
One chef cooking soup → stirs pot for 1 min, chops vegetables for 1 min, goes back to stirring, then chopping. Both tasks progress, 
but only one action at a time.

Parallelism:
Two chefs → one stirs soup continuously, the other chops vegetables at the same time.


In JavaScript

Because JS is single-threaded, async tasks are interleaved by the event loop:
It runs some synchronous code
Pauses when it hits an async operation (like setTimeout or fetch)
Picks up another task
When the async operation finishes, its callback is queued and run later
So tasks are not “parallel,” but interleaved in time slices.


*/




/* 

The event loop is a concept in the JavaScript runtime that defines how asynchronous operations are executed and managed.

The JS engine starts with synchronous code → pushes functions into the call stack.

If it encounters asynchronous code (like setTimeout, fetch, events), those are handed off to Web APIs / Node.js APIs (the background).

When those async tasks finish, their callbacks are placed into queues:
  Microtask queue → promise callbacks, queueMicrotask, MutationObserver.
  Macrotask (task) queue → setTimeout, setInterval, DOM events, network callbacks.

The event loop continuously checks:

If the call stack is empty → process microtasks (until empty).
Then → take the next macrotask, put it on the stack.
Repeat.


👉 microtasks always have higher priority than macrotasks.



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

/* 

Promise chaining means linking multiple asynchronous operations one after the other using .then() 
so that the output of one promise becomes the input for the next.


each .then() returns a new promise
if you return a value → it is passed to the next .then()
if you return another promise → the next .then() waits for it to resolve

promise chaining = sequential async flow


*/

/* 

async/await is modern JavaScript syntax (introduced in ES2017) built on top of Promises.
It makes asynchronous code look and behave more like synchronous code, improving readability.

definition
async before a function means the function will always return a Promise
await pauses execution inside an async function until the awaited Promise resolves (or rejects)

pros
Code looks sequential and easier to read
Error handling uses normal try/catch
Still non-blocking (event loop runs while waiting)

async/await = syntactic sugar over Promises
async makes a function return a Promise
await pauses only the async function until the Promise settles

*/

/* 

if the function is marked async, it always returns a Promise
If you return a normal value, it gets wrapped in a resolved Promise
async function fetchData() {
  return "data"
} 
// equivalent to
async function fetchData() {
  return Promise.resolve("data")
}


*/

/* 
ways to return a Promise



async function → auto promise
new Promise → manual
Promise.resolve / Promise.reject → quick
return from built-in APIs like fetch, fs.promises, etc
combinators (Promise.all, race, etc)
.then() → always returns a promise
async generators


*/

/* 

what Promise.resolve(p) does
if p is already a promise → it returns the same promise untouched
if p is just a plain value → it wraps it in a resolved promise

*/

/* 

you can chain three fetches in two main styles async/await and promise chaining with .then().catch()


with async/await
async function fetchSequential() {
  try {
    const res1 = await fetch("https://api.example.com/step1");
    const data1 = await res1.json();
    console.log("first:", data1);

    const res2 = await fetch("https://api.example.com/step2");
    const data2 = await res2.json();
    console.log("second:", data2);

    const res3 = await fetch("https://api.example.com/step3");
    const data3 = await res3.json();
    console.log("third:", data3);

  } catch (err) {
    console.error("error:", err);
  }
}

fetchSequential();


the await keyword pauses each step until the fetch is done
the try/catch handles any error along the way



with .then().catch()
fetch("https://api.example.com/step1")
  .then(res => res.json())
  .then(data1 => {
    console.log("first:", data1);
    return fetch("https://api.example.com/step2");
  })
  .then(res => res.json())
  .then(data2 => {
    console.log("second:", data2);
    return fetch("https://api.example.com/step3");
  })
  .then(res => res.json())
  .then(data3 => {
    console.log("third:", data3);
  })
  .catch(err => {
    console.error("error:", err);
  });


each .then returns a new promise so the next .then waits for it
the .catch at the end will capture any error from the whole chain



by default a single .catch() at the end of the chain will handle errors from anywhere in the chain but you can also handle errors step by step if you want more control
add .catch() after each fetch


fetch("https://api.example.com/step1")
  .then(res => res.json())
  .then(data1 => {
    console.log("first:", data1);
    return fetch("https://api.example.com/step2");
  })
  .catch(err => {
    console.error("error in step1:", err);
    // rethrow if you want to stop further steps
    throw err;
  })
  .then(res => res.json())
  .then(data2 => {
    console.log("second:", data2);
    return fetch("https://api.example.com/step3");
  })
  .catch(err => {
    console.error("error in step2:", err);
    throw err;
  })
  .then(res => res.json())
  .then(data3 => {
    console.log("third:", data3);
  })
  .catch(err => {
    console.error("error in step3:", err);
  });
*/

/* 

Promise combinator methods





Promise.all()
Definition: runs multiple promises in parallel and waits for all to fulfill

Behavior:
if all succeed → resolves to an array of results in order
if any one fails → rejects immediately (fail-fast)

Example
Promise.all([
  fetch("/a"),
  fetch("/b"),
  fetch("/c"),
])
  .then(([resA, resB, resC]) => console.log("all done"))
  .catch(err => console.error("one failed:", err));





Promise.allSettled()
Definition: runs multiple promises in parallel and waits for all to settle

Behavior:
never fail fast
returns an array of objects { status: "fulfilled", value } or { status: "rejected", reason }

Example
Promise.allSettled([
  fetch("/a"),
  fetch("/b"),
  fetch("/bad-url"),
])
  .then(results => {
    results.forEach(r => {
      if (r.status === "fulfilled") {
        console.log("ok:", r.value);
      } else {
        console.error("error:", r.reason);
      }
    });
  });





Promise.any()
Definition: runs multiple promises in parallel and waits for the first one that fulfills

Behavior:
resolves with the value of the first fulfilled promise
ignores rejections unless all reject → then rejects with AggregateError

Example
Promise.any([
  fetch("/bad-url"),
  fetch("/another-bad-url"),
  fetch("/good"),
])
  .then(result => console.log("first success:", result))
  .catch(err => console.error("all failed:", err)); // AggregateError




Promise.race()
Definition: runs multiple promises in parallel and settles as soon as the first one settles
Behavior:
if the first to finish fulfills → resolves with that value
if the first to finish rejects → rejects with that error

Example
Promise.race([
  fetch("/slow"),
  fetch("/fast"),
])
  .then(result => console.log("winner:", result))
  .catch(err => console.error("failed fast:", err));




quick comparison
all → wait for all, fail fast if any rejects
allSettled → wait for all, always gives you all states
any → succeed fast, only needs one fulfillment (AggregateError if all fail)
race → first to settle wins, whether success or error */

const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    let results = Array(promises.length);
    let completed = 0;

    promises.forEach((p, index) =>
      Promise.resolve(p)
        .then((result) => {
          results[index] = result;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        })
    );
  });
};

const promiseAllSetteled = (promises) => {
  return new Promise((resolve, reject) => {
    let results = Array(promises.length);
    let setteled = 0;

    const checkSettling = () => {
      setteled++;
      if (setteled === promises.length) {
        resolve(results);
      }
    };

    promises.forEach((p, index) =>
      Promise.resolve(p)
        .then((result) => {
          results[index] = { status: "fulilled", result };
          checkSettling();
        })
        .catch((reason) => {
          results[index] = { status: " rejected", reason };
          checkSettling();
        })
    );
  });
};

const promiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) =>
      Promise.resolve(p)
        .then((result) => {
          resolve(result);
        })
        .catch((reason) => {
          reject(reason);
        })
    );
  });
};

const promiseAny = (promises) => {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    const errors = new Array(len);
    let rejectedCount = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, (err) => {
        errors[i] = err;
        rejectedCount += 1;
        if (rejectedCount === len) {
          reject(new AggregateError(errors, "All promises were rejected"));
        }
      });
    });
  });
};

/* 

isNaN → loose check, coerces values to number first (can mislead)
Number.isNaN → strict check, only true if the value is literally NaN

isNaN(NaN);        // true
isNaN("hello");    // true   (string → NaN)
isNaN(undefined);  // true   (undefined → NaN)
isNaN("123");      // false  ("123" → 123)
isNaN(true);       // false  (true → 1)

Number.isNaN(NaN);        // true
Number.isNaN("hello");    // false (no coercion, just a string)
Number.isNaN(undefined);  // false
Number.isNaN("123");      // false
Number.isNaN(true);       // false

*/

/* 


👉 A generator is a special type of function that can be paused at yield expressions and resumed
    allowing you to produce a sequence of values over time instead of computing them all at once
👉 Declared with function* (asterisk after function)
👉 Uses the yield keyword to pause execution and return values one by one

🔑 Key Points

👉 Generator functions return an iterator object
👉 lazy evaluation: values are generated only when requested
👉 pause/resume: execution “pauses” at yield and continues when .next() is called again
👉 Calling .next() resumes execution until the next yield
👉 Each .next() call returns an object { value, done }
👉 done flag: tells you when the generator is finished
👉 Generators make it easy to create iterators, infinite sequences, and handle asynchronous flows
👉 Different from normal functions (which run top-to-bottom and can’t pause)

🧩 Examples
1. Basic Generator
function* simpleGen() {
  yield 1
  yield 2
  yield 3
}

const gen = simpleGen()
console.log(gen.next()) // { value: 1, done: false }
console.log(gen.next()) // { value: 2, done: false }
console.log(gen.next()) // { value: 3, done: false }
console.log(gen.next()) // { value: undefined, done: true }

2. Iterating with for...of
function* fruits() {
  yield "🍎"
  yield "🍌"
  yield "🍇"
}

for (const f of fruits()) {
  console.log(f)
}
// 🍎
// 🍌
// 🍇

3. Infinite Generator
function* naturalNumbers() {
  let n = 1
  while (true) {
    yield n++
  }
}

const nums = naturalNumbers()
console.log(nums.next().value) // 1
console.log(nums.next().value) // 2
console.log(nums.next().value) // 3


👉 Useful for streams or endless sequences

4. Passing values into Generators
function* conversation() {
  const name = yield "What is your name?"
  yield `Hello, ${name}!`
}

const chat = conversation()
console.log(chat.next())           // { value: "What is your name?", done: false }
console.log(chat.next("Alice"))    // { value: "Hello, Alice!", done: false }

5. Delegating with yield*
function* genA() {
  yield 1
  yield 2
}
function* genB() {
  yield* genA()
  yield 3
}

for (const v of genB()) {
  console.log(v)
}
// 1, 2, 3

6. Async with Generators (before async/await)

👉 Generators were often used with Promises for async flow control (libraries like co)

function* asyncFlow() {
  const data = yield fetch('/api/data').then(res => res.json())
  console.log(data)
}

7. Throwing Errors into Generators
function* errorGen() {
  try {
    yield "Start"
    yield "Middle"
  } catch (e) {
    console.log("Caught inside generator:", e)
  }
  yield "End"
}
const eg = errorGen()
console.log(eg.next()) // { value: "Start", done: false }
console.log(eg.next()) // { value: "Middle", done: false }
console.log(eg.throw(new Error("Oops"))) // Caught inside generator: Error: Oops

8. Returning from Generators
function* returnGen() {
  yield 1
  return 42
  yield 3 // never reached
}
const rg = returnGen()  

console.log(rg.next()) // { value: 1, done: false }
console.log(rg.next()) // { value: 42, done: true }
console.log(rg.next()) // { value: undefined, done: true }

9. Using Generators with Arrays
function* arrayGen(arr) {
  for (const item of arr) {
    yield item
  }
}

const ag = arrayGen(["a", "b", "c"])
console.log(ag.next()) // { value: "a", done: false }
console.log(ag.next()) // { value: "b", done: false }
console.log(ag.next()) // { value: "c", done: false }
console.log(ag.next()) // { value: undefined, done: true }

10. Spread into an Array
console.log([...arrayGen([1, 2, 3])]) // [1, 2, 3]
// Uses the iterator protocol to expand all yielded values into an array

11. Destructuring
const [first, second] = arrayGen(["x", "y", "z"])
console.log(first, second) // x y
// Destructures the first two yielded values from the generator

12. Manual Loop
const it = arrayGen([10, 20, 30])
let result = it.next()
while (!result.done) {
  console.log(result.value)
  result = it.next()
} 
// Manually iterates through the generator using .next()  
// Outputs: 10, 20, 30




💡 Use Cases

👉 Creating custom iterators
👉 Generating infinite sequences lazily
👉 Handling async flows (pre-async/await)
👉 Pausing/resuming logic in games or simulations
👉 Streaming or chunk processing

✅ Benefits

👉 Lazily compute values on demand
👉 Memory efficient (don’t need to store huge arrays)
👉 More control over function execution
👉 Good for async workflows

⚠️ Cons

👉 Syntax can be confusing for beginners (function*, yield)
👉 Less common in modern code since async/await
👉 Misuse can lead to hard-to-debug state machines

📝 Takeaway

👉 Generator functions (function*) let you pause with yield and resume with .next()
👉 Perfect for lazy sequences, custom iterators, and certain async flows
👉 Modern JS uses async/await, but generators are still powerful for iterables and advanced control flows



💡  More Examples
example 1


function* fetchUserFlow() {
  const user = yield fetch("/api/user").then(res => res.json());
  console.log("user:", user);

  const posts = yield fetch(`/api/posts?user=${user.id}`).then(res => res.json());
  console.log("posts:", posts);
}

// simple runner
function run(gen) {
  const iterator = gen();

  function step(nextValue) {
    const result = iterator.next(nextValue);
    if (result.done) return;
    result.value.then(step);
  }

  step();
}

run(fetchUserFlow);


example 2

function* fibonacci(a = 0, b = 1) {
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// helper to consume only k values from an infinite generator
function take(iter, k) {
  const out = [];
  for (const v of iter) {
    out.push(v);
    if (out.length === k) break;
  }
  return out;
}

console.log(take(fibonacci(), 10)); // [0,1,1,2,3,5,8,13,21,34]




*/

/* 


Iterator is an object that defines a sequence and allows you to step through it one item at a time.
An iterator must implement a method called next(), which returns an object with two properties:
value → the current item in the sequence
done → a boolean (false if there are more items, true if the sequence is finished)


Iterable is an object that implements the @@iterator method, available as [Symbol.iterator]().
Calling this method must return an iterator object. 
Iterables can be consumed by language constructs such as 
for...of, spread syntax (...), array destructuring, and other APIs expecting sequences.
Examples of built-in iterables: Array, String, Set, Map, TypedArray, and generator objects.



Example: Custom Iterator
function createIterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return { value: arr[index++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    }
  };
}
--------------------------
just an iterator
the object returned has a .next() method → that makes it an iterator
but it does not implement [Symbol.iterator] → so it’s not iterable
you can call it.next() manually, but you cannot do for...of it
--------------------------


const it = createIterator(["a", "b", "c"]);

console.log(it.next()); // { value: "a", done: false }
console.log(it.next()); // { value: "b", done: false }
console.log(it.next()); // { value: "c", done: false }
console.log(it.next()); // { value: undefined, done: true }

Example: Using [Symbol.iterator]

Any object can be made iterable by implementing the [Symbol.iterator] method that returns an iterator.

const myIterable = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i < this.data.length) {
          return { value: this.data[i++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};


-----------------------------
an iterable (that produces iterators)
here the object defines [Symbol.iterator]
that means it’s an iterable → it can be used with for...of, spread syntax ([...myIterable]), destructuring, etc.
every time you call [Symbol.iterator]() you get a fresh iterator

myIterable is iterable (because it has [Symbol.iterator])
but it does not itself have a .next() method
instead, when you call myIterable[Symbol.iterator](), you get an iterator object that does have .next()
const iterator = myIterable[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
-----------------------------

for (const val of myIterable) {
  console.log(val); // 10, 20, 30
}

Key Points

An iterator is an object with a .next() method returning { value, done }.
An iterable is an object that implements [Symbol.iterator] to return an iterator.
All built-in collections (Array, String, Map, Set, arguments, TypedArrays) are iterable.
Generators (function*) automatically create iterators.
Iterators allow lazy evaluation (compute values only when needed).

Use Cases

Looping with for...of
for (const x of ["x", "y", "z"]) {
  console.log(x);
}

Spread syntax
console.log([...new Set([1, 2, 2, 3])]); // [1, 2, 3]

Custom data structures
Define your own iteration logic, like looping through a tree or graph.

Lazy sequences
Infinite sequences (like Fibonacci) or streams of data that aren’t computed until you ask for them.

Integration with Generators
Generators automatically return iterators, making them perfect for building complex sequences.

*/

/* 

An iterator is an object with .next() that produces a sequence.
An iterable is an object that can give you an iterator via [Symbol.iterator].
In JS, some objects (like generators) are both iterators and iterables.


*/

/* 

1. Iterable

an iterable is an object that has a method [Symbol.iterator].
calling [Symbol.iterator]() gives you an iterator.
examples: arrays, strings, sets, maps, generators.
const arr = [1, 2, 3];
console.log(typeof arr[Symbol.iterator]); // "function"

2. Iterator

an iterator is an object with a .next() method.
.next() returns { value, done }.
examples: arr[Symbol.iterator]() or a generator object.
const it = arr[Symbol.iterator]();
console.log(it.next()); // { value: 1, done: false }

3. Relationship

All iterables can produce iterators.
Not all iterators are iterables → because an iterator doesn’t have to implement [Symbol.iterator].
BUT in practice, most built-in iterators in JS are also iterables (they return themselves from [Symbol.iterator]).
Example: generator objects, array iterators.

*/

/* 

iterable is any object that implements the special method [Symbol.iterator].
examples of built-in iterables:

Arrays
Strings
Sets
Maps
Typed arrays
The arguments object in functions
Generator objects


----------------------------

special things about generator objects
why you can call .next() directly on a generator
when you call a generator function (function*) you get back a generator object
that object has:
a .next() method (so it’s an iterator)
a [Symbol.iterator]() method that returns this (so it’s also an iterable)


when you call a generator function like gen(), the object you get back is a generator object.
that object is both:

an iterator → because it has a .next() method (and also .return() and .throw()), so you can step manually through its sequence.
an iterable → because it has a [Symbol.iterator]() method that just returns itself. This is why you can use it in for...of, spread ([...gen()]), destructuring, etc.

*/

/* 

to make an object act like a generator object (both iterable and iterator at the same time), you need to give it:
a .next() method → so it can be used as an iterator.
a [Symbol.iterator]() method that returns this → so it can be used as an iterable.

example
const myIterableIterator = {
  data: [1, 2, 3],
  index: 0,

  next() {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    } else {
      return { value: undefined, done: true };
    }
  },

  [Symbol.iterator]() {
    return this; // returning itself makes it iterable
  }
};

// manual iteration (iterator style)
console.log(myIterableIterator.next()); // { value: 1, done: false }
console.log(myIterableIterator.next()); // { value: 2, done: false }

// reset index if you want to iterate again
myIterableIterator.index = 0;

// for...of (iterable style)
for (const val of myIterableIterator) {
  console.log(val); // 1, 2, 3
}


*/

/*

var 

scope: function & global scope 
initialization: not required 
hoisting: yes (initialized with undefined)
redeclaration: yes
reassignment: yes

let 
scope: block scope
initialization: required 
hoisting: yes (not initialized, temporal dead zone TDZ)
redeclaration: no
reassignment: yes

const 

scope: block scope
initialization: required 
hoisting: yes (not initialized, temporal dead zone TDZ)
redeclaration: no
reassignment: no (but object properties can be changed)

*/

/* 

The Temporal Dead Zone (TDZ) means the time between when a variable is hoisted and when it is actually declared/initialized in your code
Variables declared with let and const are hoisted (JavaScript knows they exist before execution)
But unlike var, they are not automatically initialized with undefined
So if you try to access them before the actual line of declaration, you get a ReferenceError 

TDZ = the "forbidden time window" where a variable exists in memory but you cannot use it yet


console.log(a)   var a = 10
console.log(b)   let b = 20
console.log(c)   const c = 30

|---------- Hoisting ----------|
|   a = undefined              |
|   b = (TDZ)                  |
|   c = (TDZ)                  |
|------------------------------- Execution ----------------------------|
| console.log(a) → undefined    |
| console.log(b) → ReferenceErr |
| console.log(c) → ReferenceErr |
| a = 10   | b = 20   | c = 30  |




*/

/* 

Closures is an ability of a function to remember the variables and functions that are declared in its outer scope 
— even after that outer scope has finished executing.


Key Points

Functions carry scope with them
Inner functions have access to variables of their outer functions.

Persistent state
Even if the outer function has returned, the inner function keeps a reference to the outer variables, not a copy.

Private variables
You can use closures to emulate private state because outside code cannot directly access the enclosed variables.

Memory
Because closures keep variables “alive,” they can sometimes cause memory leaks if not managed carefully.




Examples



1. Basic Closure
function outer() {
  let counter = 0;
  function inner() {
    counter++;
    return counter;
  }
  return inner;
}

const fn = outer(); 
console.log(fn()); // 1
console.log(fn()); // 2
console.log(fn()); // 3


Here, fn is a closure: it remembers counter even though outer has finished executing.

2. Private State
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50));   // 150
console.log(account.withdraw(30));  // 120
console.log(account.getBalance());  // 120


balance is not accessible directly → it’s private inside the closure.

3. Closures with Event Handlers
function setupButton() {
  let count = 0;
  document.getElementById("myBtn").addEventListener("click", () => {
    count++;
    console.log(`Button clicked ${count} times`);
  });
}
setupButton();


Even after setupButton finishes, the event handler keeps count alive.

4. Factory Functions
function multiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15


Each closure “remembers” its own factor.





Use Cases

Data privacy → emulate private variables.
Function factories → generate functions with preconfigured behavior.
Callbacks / event handlers → closures capture variables from the environment.
Memoization → store computed values across calls.
Module pattern → organize code with encapsulated state.-

*/

/* 


Hoisting in JavaScript is the behavior where variable and function declarations are moved (“hoisted”) to the top of their scope
(either global scope or function scope) during the compilation phase, before the code is executed.

Key Points

Only declarations are hoisted
Initializations/assignments are not hoisted.
Function declarations are fully hoisted
You can call a function declared with function before it appears in the code.

var is hoisted
Variables declared with var are hoisted to the top and initialized with undefined.

let and const are hoisted too
But they are put into the temporal dead zone (TDZ) until the declaration is executed → accessing them before declaration causes a ReferenceError.

Scope matters
Hoisting works within each function scope and block scope, not across everything globally.

Examples
1. Function Declaration Hoisting
sayHi(); // works, prints "Hi!"

function sayHi() {
  console.log("Hi!");
}

2. var Hoisting
console.log(x); // undefined (declaration hoisted, not assignment)
var x = 5;

3. let / const Hoisting
console.log(y); // ReferenceError (TDZ)
let y = 10;

console.log(z); // ReferenceError (TDZ)
const z = 20;

4. Function Expressions (not hoisted fully)
greet(); // TypeError: greet is not a function
var greet = function() {
  console.log("Hello");
};


*/

/* 

Special Add Exercise
Write a function called specialAdd. If you give this function a number, it
returns a new function to you. If you give this function no arguments, it
returns the total of all the numbers you've passed to it so far.

Examples:
specialAdd(); // 0
specialAdd(1)(2)(); // 3
specialAdd(2)(8)(5)(1)(); // 16

*/

function specialAdd(init) {
  if (init === undefined) return 0;
  return function innerSum(num) {
    if (num === undefined) return init;
    init += num;
    return innerSum;
  };
}

/* 
 
👉 Debouncing is a programming technique used to limit how often a function is executed.
It ensures that a function runs only after a certain period of time has passed since the last time it was invoked.
👉 It’s commonly used to limit high-frequency events (scrolling, resizing, typing)

🔑 Key Points

👉 Prevents a function from running too often
👉 Delays execution until user “stops” doing the action
👉 Helps improve performance and resource usage
👉 Often confused with throttling (but throttling runs at intervals, debouncing runs once after inactivity)

🧩 Example: Basic Debounce
function debounce(func, delay) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)                // reset timer
    timeout = setTimeout(() => {
      func.apply(this, args)             // run after delay
    }, delay)
  }
}


Usage:

window.addEventListener("resize", debounce(() => {
  console.log("Resize event after user stopped resizing")
}, 500))


👉 Here, the function runs only once after resizing stops for 500ms

🧩 Example: Input Search
const search = debounce((query) => {
  console.log("Searching for:", query)
}, 300)

document.getElementById("input").addEventListener("input", e => {
  search(e.target.value)
})


👉 Even if the user types quickly, the search function only fires 300ms after typing stops

💡 Use Cases

👉 Search boxes with API calls (prevent spamming the server)
👉 Window resize/scroll handlers (prevent constant re-rendering)
👉 Button clicks (avoid double submissions)
👉 Form validations while typing

✅ Benefits

👉 Improves performance for high-frequency events
👉 Reduces unnecessary API calls or DOM updates
👉 Enhances user experience by avoiding laggy behavior

⚠️ Cons

👉 Adds slight delay in response (user must stop interacting before function runs)
👉 If delay is too long, UI may feel unresponsive
👉 Requires careful tuning of the debounce interval

📝 Takeaway

👉 Debounce = wait until the user stops doing something, then run the function once
👉 Use it when you want to reduce the number of executions of a function caused by repetitive events
*/


/* 

A Higher-Order Function (HOF) in JavaScript is a function that either 
Takes one or more functions as arguments, or Returns a function as its result, or both.



Key Points

Functions are first-class citizens in JavaScript → they can be passed around just like values.
HOFs allow more abstraction and reusability.
Very common in functional programming style.
Built-in methods like map, filter, reduce, forEach are HOFs.




Examples



1. Function passed as an argument
function greet(name) {
  return "Hello, " + name;
}

function processUserInput(fn) {
  const name = "Hesham";
  return fn(name);
}

console.log(processUserInput(greet)); 
// "Hello, Hesham"




2. Function returning another function
function multiplier(factor) {
  return function (x) {
    return x * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10



3. Built-in Array HOFs
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2); 
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15




Use Cases

Code reusability (abstracting repetitive logic).
Function composition (building bigger logic from small pieces).
Asynchronous control (e.g., passing callbacks to setTimeout, promises).
Event handling (pass handler functions).
Currying/partial application.
Callbacks: e.g. setTimeout(() => {...}, 1000)
Event listeners: button.addEventListener("click", () => {...})
Function factories: returning functions preconfigured with certain behavior
Data transformations: arrays and streams
Middleware & pipelines: composing many functions together

*/

/* 

🔥 closures and higher-order functions (HOFs) are deeply connected in JavaScript

Relation

A higher-order function either takes a function as an argument or returns a function.
When a higher-order function returns a function, that returned function usually closes over (remembers) variables from the outer scope.
That’s where closures come in — they give the returned function access to the outer function’s variables even after the outer function has finished running.

So:
👉 Closures are the mechanism.
👉 Higher-order functions are the design pattern that often relies on closures.

*/

function debounce(func, delay) {
  let timeoutid = null;
  return function (...args) {
    clearTimeout(timeoutid);
    timeoutid = setTimeout(function () {
      func.apply(this, args);
    }, delay);
  };
}








/* 


👉 Throttling is a technique used to control how often a function is executed.
    It ensures that a function runs at most once within a specified time interval, no matter how many times it’s triggered.
👉 Unlike debouncing (which waits for inactivity), throttling guarantees regular execution at fixed intervals


👉 memory trick:
Debounce = run after calm.
Throttle = run at intervals.



🔑 Key Points

👉 Opposite of debounce:
    Debounce → wait until the activity stops.
    Throttle → run regularly at fixed intervals.
👉 Controls function execution frequency
👉 Useful for events that fire very often (scroll, resize, mousemove)
👉 Keeps performance smooth by limiting workload
👉 Common implementation uses timestamps or setTimeout



🧩 Example: Basic Throttle
function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}


Usage:

window.addEventListener("scroll", throttle(() => {
  console.log("Scroll event fired")
}, 1000))


👉 Here, the function will run at most once every 1000ms, even if the user keeps scrolling

🧩 Example: Using Timestamps
function throttle(func, limit) {
  let lastCall = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastCall >= limit) {
      func.apply(this, args)
      lastCall = now
    }
  }
}

💡 Use Cases

👉 Handling scroll or resize events
👉 Tracking mouse movement without flooding updates
👉 Limiting button clicks to prevent spam actions
👉 APIs that should not be called too frequently (e.g., rate limits)

✅ Benefits

👉 Ensures function executes at consistent intervals
👉 Prevents performance bottlenecks on high-frequency events
👉 Keeps UI responsive while controlling workload

⚠️ Cons

👉 May skip some events between intervals
👉 Less precise than debouncing for “run after stop” scenarios
👉 Needs careful tuning of interval (too short = heavy load, too long = laggy)

📝 Takeaway

👉 Throttle = run the function at regular intervals, no matter how many times the event fires
👉 Use it when you want steady, periodic execution (e.g., scroll, resize, mousemove)
👉 Use debounce when you want only the final action after a pause (e.g., search input)



*/





/* 

throtlling issue with scroll 

pick a small enough throttle interval

if you throttle to ~100–200 ms, the UI is still responsive (5–10 updates per second)
the user doesn’t perceive lag, because the eye can’t catch gaps shorter than ~100 ms

combine throttle with a final call (trailing edge)

many implementations allow “leading” (run immediately) and “trailing” (run after the last event)
so when the user finishes scrolling, your function fires one last time and fills the screen



example using lodash:
window.addEventListener("scroll", _.throttle(loadMore, 200, { leading: true, trailing: true }));


*/





function throttle(func, delay, { leading = false, trailing = false } = {}) {
  let timer = null;
  let lastArgs = null;

  return function (...args) {
    const context = this;

    if (!timer) {
      if (leading) func.apply(context, args);

      timer = setTimeout(() => {
        if (trailing && lastArgs) {
          func.apply(context, lastArgs);
          lastArgs = null;
        }
        timer = null;
      }, delay);
    } else {
      // save latest args for trailing call
      lastArgs = args;
    }
  };
}







/* 
Functional Programming (FP)

Functional Programming is a declarative programming paradigm where software is built by composing pure functions 
and avoiding shared state, mutable data, and side effects.
It emphasizes what to do rather than how to do it—in contrast with imperative programming, which describes step-by-step instructions.





🔑 Key Principles
1. Pure Functions

Always return the same output for the same input.

Have no side effects (do not modify external state).

function add(a, b) {
  return a + b; // pure, no side effects
}





2. Immutability

Data is never modified in place.

Instead, new copies are created when changes are needed.

const arr = [1, 2, 3];

// ❌ Imperative (mutates original)
arr.push(4);

// ✅ Functional (returns new array)
const newArr = [...arr, 4];





3. First-Class & Higher-Order Functions

Functions are treated like values.

They can be stored in variables, passed as arguments, or returned from other functions.

const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2);         // [2, 4, 6, 8]
const evens   = numbers.filter(n => n % 2 === 0); // [2, 4]
const sum     = numbers.reduce((a, b) => a + b, 0); // 10





4. Function Composition

Combine small, reusable functions to build more complex behavior.

const multiplyBy2 = x => x * 2;
const add3 = x => x + 3;

const composed = x => add3(multiplyBy2(x));
console.log(composed(5)); // 13





5. Declarative Style

Express what you want instead of how to achieve it.

Example: using map, filter, reduce instead of explicit for loops.





📌 Use Cases

Data transformations (filtering, mapping, reducing lists).
UI frameworks (e.g., React) use FP concepts (pure components, immutability).
Concurrency and parallelism (no shared mutable state = fewer bugs).
Writing safer, more predictable, and testable code.

✅ Pros

Predictable: same input → same output.
Easier testing and debugging.
Safer with async/parallel code.
Encourages modular, reusable design.


❌ Cons

Potentially less performant (extra object/array copies).
Can feel abstract and harder for those used to imperative loops.

👉 Short Interview-Ready Definition

Functional Programming is a declarative paradigm that builds software 
by composing pure, immutable functions and avoiding side effects, focusing on what to do rather than how to do it.


*/







/* 

Functional Programming (FP) vs Object-Oriented Programming (OOP):

🔹 Functional Programming (FP)
Core Idea: Build programs by composing pure functions.
Focus: What to do (declarative).
State/Data: Immutable (never changes).
Behavior: Functions transform data and return new values.
Reusability: Achieved through function composition.
Examples in JS: map, filter, reduce, pure helper functions.

// FP example: double all numbers
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // [2, 4, 6]




🔹 Object-Oriented Programming (OOP)
Core Idea: Build programs by modeling objects with state + behavior.
Focus: How to do it (imperative).
State/Data: Mutable (objects hold state that can change).
Behavior: Methods act on the object’s internal state.
Reusability: Achieved through inheritance and polymorphism.
Examples in JS: Classes, objects with methods.




// OOP example: double all numbers
class Doubler {
  constructor(nums) {
    this.nums = nums;
  }
  double() {
    return this.nums.map(n => n * 2);
  }
}

const d = new Doubler([1, 2, 3]);
console.log(d.double()); // [2, 4, 6]


*/



/* 

| Aspect          | Functional Programming (FP) | Object-Oriented Programming (OOP) |
| --------------- | --------------------------- | --------------------------------- |
| Building blocks | Pure functions              | Classes & objects                 |
| Data            | Immutable                   | Mutable state inside objects      |
| Style           | Declarative (“what”)        | Imperative (“how”)                |
| Reuse           | Function composition        | Inheritance & polymorphism        |
| Side effects    | Avoided                     | Common (methods can mutate state) |



*/



/* 

🔹 React with OOP (Class Components)

Before React 16.8, the main way to handle state & lifecycle was with classes.
Fits OOP → each component is an object with state (mutable) and methods (lifecycle functions).


OOP traits:

Encapsulation (this.state is internal).
Methods (render, increment).
Mutable state (this.setState changes it).



🔹 React with FP (Functional Components + Hooks)

Modern React favors functions.
Functions + hooks make components stateless by default, adding state via closures (useState).
functional programming style → pure functions, immutable updates.


FP traits:

Counter is just a pure function of props → UI.
useState uses closures to manage state.
Updates are immutable (setCount(c => c + 1)).
Hooks (useEffect, useMemo) encourage composition, not inheritance.





| Aspect       | Class Components (OOP) | Functional Components (FP)     |
| ------------ | ---------------------- | ------------------------------ |
| Style        | Imperative (methods)   | Declarative (functions)        |
| State        | `this.state` (mutable) | `useState` (immutable updates) |
| Reuse        | Inheritance, HOCs      | Hooks (composition)            |
| Readability  | Verbose                | Concise                        |
| Modern Trend | Legacy support         | Standard way since React 16.8  |


*/






/* 


⚔️ OOP vs FP


| Aspect                | Object-Oriented Programming (OOP)                                                 | Functional Programming (FP)                                                      |
| --------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Paradigm Type**     | **Imperative**                                                                    | **Declarative**                                                                  |
| **Core Idea**         | Model real-world entities as **objects** (data + behavior together)               | Model problems using **pure functions** and immutable data                       |
| **State Handling**    | Encapsulates and mutates state inside objects                                     | Avoids shared state; uses immutable values                                       |
| **Code Reuse**        | Inheritance and polymorphism                                                      | Function composition and higher-order functions                                  |
| **Ease of Reasoning** | Sometimes harder due to hidden state mutations                                    | Easier (same input → same output)                                                |
| **Side Effects**      | Common and allowed (but ideally encapsulated in objects)                          | Avoided or explicitly handled                                                    |
| **Common Use Cases**  | Large systems with interacting entities (banking, ERP, simulations, game engines) | Data transformations, analytics, concurrent/async systems, UI frameworks (React) |
| **Strengths**         | Clear modeling of real-world entities, widely taught, common in enterprise        | Predictable, testable, cleaner async logic, modular                              |
| **Weaknesses**        | State mutations can cause bugs, inheritance trees can get complex                 | Performance overhead (extra copies), can feel abstract at first                  |





⚡ Quick Rule of Thumb

Use OOP when:

Modeling domains with clear entities (Users, Accounts, Products).
Working in OOP-heavy ecosystems (Java, C#, C++).
You need extensible hierarchies and polymorphism.

Use FP when:

Transforming and processing data (streams, lists, analytics).
You need predictable, testable logic.
You’re dealing with concurrency/async-heavy systems.
Working in FP-friendly environments (JavaScript, Scala, Haskell, Elixir, F#).

*/



/* 


Imperative Programming

is all about discribing how programs operate step by step using statements
that change a program's state


*/


let sum = 0 // state

for (let i = 1; i <= 5; i++) {
  sum += i // step by step instructions that change state
  // mutated & updated 
}


// functional programming
// its all about focusing wat need to be solved rather than how to solve it
// using expressions that evaluate to values
// avoiding shared state, mutable data, and side effects


[1, 2, 3, 4, 5].reduce((acc, n) => acc + n, 0) 
// no state mutation, no side effects


// ANOTHER EXAMPLE


// imperative programming
const nums = [1, 2, 3, 4, 5]
const evens = [];

for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) {
    evens.push(nums[i])
  } 
}// imperative, step by step instructions, mutable state (evens array is changed)

// functional programming
const evensFP = nums.filter(n => n % 2 === 0) 
// declarative, what to do, no state mutation, no side effects


// pure vs impure functions

// pure functions

/* 


Pure Functions

A pure function is a function that:
Given the same input, always produces the same output
Has no side effects (doesn’t modify external state, doesn’t depend on external mutable state)

Key Properties
Deterministic → same input → same output
No side effects → doesn’t change variables outside its scope, 
doesn’t do I/O like writing to a file or updating the DOM
Testable → easy to test because output only depends on input
Composable → can be combined with other pure functions safely




Examples


✅ Pure
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // always 5



❌ Impure (side effect: changing external variable)
let counter = 0;

function increment() {
  counter++;   // modifies external state
  return counter;
}

console.log(increment()); // depends on external state

❌ Impure (non-deterministic: uses Date)
function getCurrentTime() {
  return new Date().toISOString(); // depends on system time
}

Use Cases

Functional programming (building blocks are pure functions)
Predictable state updates (e.g., Redux reducers in React must be pure)
Easier testing (just check inputs/outputs)
Safer concurrency (no shared state mutation)


*/
// additional pure vs impure function example
const baselineCart = Object.freeze([
  { id: 1, qty: 1 },
  { id: 2, qty: 2 }
])

function addItemPure(cart, item) {
  return [...cart, item] // pure: returns new array, leaves input untouched
}

let sharedCart = [...baselineCart]

function addItemImpure(item) {
  sharedCart.push(item) // impure: mutates external state
  return sharedCart
}

const newCart = addItemPure(baselineCart, { id: 3, qty: 1 })
console.log(newCart)
console.log(baselineCart) // unchanged

console.log(addItemImpure({ id: 3, qty: 1 }))
console.log(addItemImpure({ id: 4, qty: 1 })) // result depends on sharedCart


/* 

✅ When to Use Pure Functions

Use pure functions when you want:

Predictability
Pure functions always return the same result for the same inputs.
Example: sum(a,b) → easy to reason about.

Testability
Since they don’t depend on external state, they’re easy to test in isolation.

Reusability & Composition
Pure functions can be combined to form more complex logic without side effects.

Immutability / Functional style
In state management (e.g., React reducers, Redux), pure functions ensure predictable state updates




✅ When to Use Impure Functions

Sometimes impure functions are necessary because programs must interact with the outside world:


I/O Operations
Reading from/writing to a database, file, or network.
Logging to console.

User Interaction
Updating the DOM in a browser.
Handling clicks, keypresses, etc.

Randomness / Time
Math.random() or Date.now() are inherently impure because they depend on external state (system clock, RNG).

Side Effects by Design
If your program must cause a visible effect (UI update, API call), you have to use impure functions

*/




/* 

Referential Transparency means: an expression can be replaced by its value (or result)
 without changing the behavior of the program.

If a function is pure, then calling it with the same arguments always gives the same result.
Therefore, any call to that function can be swapped with its result → that’s referential transparency.

Key Points

Depends on purity
Only pure functions are referentially transparent.
Impure functions (with side effects) are not referentially transparent.

Substitutability
If f(2,3) always returns 5, you can replace f(2,3) with 5 anywhere in your program, and nothing breaks.

Predictability
Code is easier to reason about because expressions are consistent and interchangeable with their values.





Use Cases / Why Important

Makes code easier to test → replace function calls with expected values.
Helps in reasoning about correctness of programs.
Enables compiler optimizations (e.g., memoization, lazy evaluation).
Foundation of functional programming languages like Haskell.

✅ Quick Memory Trick

Pure functions ⇒ Referential Transparency.
Impure functions ⇒ No Referential Transparency.
If you can “replace with the result” safely, you have referential transparency.

*/



// first class functions
// functions are treated like any other value
// can be assigned to variables, passed as arguments, returned from other functions


/* 
// First-Class Functions
functions are treated like any other value.
That means in JavaScript:

Functions can be assigned to variables
Functions can be passed as arguments
Functions can be returned from other functions
Functions can be stored in data structures (arrays, objects)


>> This is why higher-order functions, closures, and functional programming are natural in JS.

Key Points

Functions are objects in JS → they can have properties, be referenced, and manipulated.
This makes higher-order functions possible (functions that take/return functions).
Enables powerful patterns like callbacks, closures, currying, and functional programming.




Examples
1. Assigning to variables
const greet = function(name) {
  return "Hello, " + name;
};

console.log(greet("Hesham")); // "Hello, Hesham"

2. Passing as arguments
function processUserInput(fn) {
  const name = "Hesham";
  console.log(fn(name));
}

processUserInput(greet); // "Hello, Hesham"

3. Returning functions
function multiplier(factor) {
  return function(num) {
    return num * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10

4. Storing in data structures
const operations = [
  x => x + 1,
  x => x * 2,
  x => x - 3
];

let value = 5;
for (const op of operations) {
  value = op(value);
}
console.log(value); // ((5+1)*2)-3 = 9

*/



const greet = function (name) {
  return "Hello, " + name;
}

console.log(greet("Hesham")); // "Hello, Hesham"

function processUserInput(fn) {
  const name = "Hesham";
  return fn(name);
} 
console.log(processUserInput(greet)); // "Hello, Hesham"


/* 

👉 A Higher-Order Function (HOF) in JavaScript is a function that either 
Takes one or more functions as arguments, or Returns a function as its result, or both.
👉 They are a core feature of functional programming and make code more composable, reusable, and expressive


🔑 Key Points

👉 Treat functions as first-class citizens (functions can be passed around like variables)
👉 Enable callbacks, function factories, and composition
👉 Common in array methods (map, filter, reduce)
👉 Can wrap, decorate, or enhance other functions

🧩 Examples
1. Function as Argument (Callback)
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i)
  }
}

repeat(3, console.log)
// 0
// 1
// 2

2. Function Returning Another Function
function multiplier(factor) {
  return function(x) {
    return x * factor
  }
}

const double = multiplier(2)
console.log(double(5)) // 10

3. Array Methods (map, filter, reduce)
const numbers = [1, 2, 3, 4]

const squares = numbers.map(n => n * n)   // [1,4,9,16]
const evens   = numbers.filter(n => n % 2 === 0) // [2,4]
const sum     = numbers.reduce((a, b) => a + b, 0) // 10

4. Custom Higher-Order Function (Decorator)
function once(fn) {
  let called = false
  return (...args) => {
    if (!called) {
      called = true
      return fn(...args)
    }
  }
}

const sayHiOnce = once(() => console.log("Hi"))
sayHiOnce() // "Hi"
sayHiOnce() // nothing

5. Composition Helper (HOF creating new function)
const compose = (f, g) => x => f(g(x))

const toUpper = s => s.toUpperCase()
const exclaim = s => s + "!"

const shout = compose(exclaim, toUpper)
console.log(shout("hello")) // "HELLO!"

💡 Use Cases

👉 Event handlers and callbacks (e.g., DOM events)
👉 Function decorators (once, debounce, throttle)
👉 Array transformations (map, filter, reduce)
👉 Middleware systems (Express, Redux)
👉 Function composition and pipelines

✅ Benefits

👉 More reusable and abstract code
👉 Cleaner, declarative style
👉 Great for handling async tasks and events
👉 Encourages functional programming practices

⚠️ Cons

👉 May confuse beginners (functions returning functions)
👉 Debugging is harder inside deep chains
👉 Over-abstracting can reduce readability

📝 Takeaway

👉 A higher-order function is simply a function that accepts or returns another function
👉 They’re everywhere in JS: array methods, event listeners, decorators, middleware, composition helpers
👉 They are the foundation of functional programming in JavaScript

*/

function multiplier(factor) {
  return function (x) {
    return x * factor;
  };  
}
const double = multiplier(2);
console.log(double(5)); // 10
const triple = multiplier(3);
console.log(triple(5)); // 15 





/* 

👉 A combinator is a higher-order function that takes one or more functions as input and returns a new function
👉 In JavaScript, combinators are often used for function composition and data transformation
👉 They come from lambda calculus and functional programming

🔑 Key Points

👉 Combinators = “glue” functions
👉 No external state → everything comes from arguments
👉 Useful for composition, transformation pipelines, FP utilities
👉 Common in Ramda, Lodash/fp, Redux, RxJS


🧩 Combinator Examples
1. Identity (I)
const I = x => x
console.log(I(42)) // 42

2. Constant (K)
const K = x => _ => x
console.log(K("hello")("ignored")) // hello

3. Compose (right → left)
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

const trim = s => s.trim()
const upper = s => s.toUpperCase()
const exclaim = s => s + '!'

const shout = compose(exclaim, upper, trim)
console.log(shout("  hi  ")) // HI!

4. Pipe (left → right)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const shout2 = pipe(trim, upper, exclaim)
console.log(shout2("  hi  ")) // HI!

5. Flip

👉 Reverses the order of arguments for a function

const flip = f => (a, b, ...rest) => f(b, a, ...rest)

const subtract = (a, b) => a - b
console.log(subtract(10, 5))     // 5
console.log(flip(subtract)(10, 5)) // -5

6. On

👉 Runs a projection on inputs before applying a binary function

const on = (op, proj) => (a, b) => op(proj(a), proj(b))

const compareLength = on((a, b) => a - b, s => s.length)
console.log(compareLength("cat", "horse")) // -2 (3 - 5)

7. Sort by Length (using on)
const sortByLength = arr =>
  [...arr].sort(on((a, b) => a - b, s => s.length))

console.log(sortByLength(["banana", "fig", "apple"])) 
// [ 'fig', 'apple', 'banana' ]

8. Fork / Converge

👉 Apply two functions to the same input, then combine the results

const fork = (join, f, g) => x => join(f(x), g(x))

const average = fork((a, b) => a / b, arr => arr.reduce((s, n) => s + n, 0), arr => arr.length)

console.log(average([10, 20, 30, 40])) // 25

9. Until

👉 Repeatedly apply a function until a condition is met

const until = (pred, fn) => x => {
  let v = x
  while (!pred(v)) {
    v = fn(v)
  }
  return v
}

const doubleUntil100 = until(x => x > 100, x => x * 2)
console.log(doubleUntil100(3)) // 192

10. Once

👉 Wraps a function so it can only run once

const once = fn => {
  let done = false, result
  return (...args) => {
    if (!done) {
      result = fn(...args)
      done = true
    }
    return result
  }
}

const init = once(() => console.log("Init only once"))
init() // "Init only once"
init() // nothing

11. Tap

👉 Run a side effect without breaking the chain

const tap = f => x => (f(x), x)

pipe(
  x => x * 2,
  tap(v => console.log("after double:", v)),
  x => x + 1
)(5) // logs 10 → returns 11

💡 Use Cases

👉 Function pipelines (compose, pipe)
👉 Reordering / transforming arguments (flip, on)
👉 Sorting & comparison helpers (sortByLength)
👉 Combining results (fork / converge)
👉 Controlled execution (until, once)
👉 Debugging inside chains (tap)

✅ Benefits

👉 Encourages small, composable functions
👉 Clear declarative data flow
👉 Reusable across projects

⚠️ Cons

👉 Can be abstract for beginners
👉 Too much functional jargon (I, K, S, etc.) may reduce readability
👉 Debugging inside deep combinator chains can be harder

📝 Takeaway

👉 Combinators = higher-order functions for combining and controlling other functions
👉 Core ones: compose, pipe, flip, on, fork/converge, until, once, tap, map
👉 They provide the building blocks for functional programming in JavaScript



*/

/* 

Immutability means that once a data structure (object, array, variable) is created, it cannot be changed.
If you want to “modify” it, you create a new copy with the updated values, leaving the original unchanged.


Key Points

Primitives are immutable
Numbers, strings, booleans → cannot be changed.
Example: "hello"[0] = "H" does nothing; string stays "hello".

Objects and arrays are mutable by default in JS
But you can choose to treat them immutably by creating copies.

Functional programming prefers immutability
Easier to reason about (no hidden changes).
Prevents bugs caused by shared mutable state.

React & Redux rely on immutability
State updates must create new objects, not mutate old ones.




Examples

✅ Immutable Update
const arr = [1, 2, 3];

// Instead of mutating with push
const newArr = [...arr, 4];

console.log(arr);    // [1, 2, 3]
console.log(newArr); // [1, 2, 3, 4]

❌ Mutable Update
const arr = [1, 2, 3];
arr.push(4); // modifies the original
console.log(arr); // [1, 2, 3, 4]



Objects
const person = { name: "Hesham", age: 25 };

// immutable update with spread
const updated = { ...person, age: 26 };

console.log(person); // { name: "Hesham", age: 25 }
console.log(updated); // { name: "Hesham", age: 26 }






Why Immutability Matters

Predictability → no hidden changes to objects.
Debugging → easier to track where data changes.
Concurrency → safe when multiple parts of a program access the same data.
React → detects changes via shallow comparison of old vs new state.



Tools for Immutability
Spread operator (...)
Array methods that return new arrays (map, filter, slice, concat)
Libraries: Immer.js, Immutable.js



✅ Memory trick:
Immutability = “don’t change the thing, make a new thing.”

*/




/* 

Recursion is when a function calls itself (directly or indirectly) in order to solve a problem by breaking it into smaller subproblems.

Key Points


Base Case
A condition that stops the recursion, preventing infinite calls.

Recursive Case
The part of the function where it calls itself with a smaller/simpler input.

Stack
Each recursive call is pushed onto the call stack.
Too many recursive calls without a base case → stack overflow error.




Examples
1. Factorial (classic recursion)
function factorial(n) {
  if (n === 0) return 1;   // base case
  return n * factorial(n - 1); // recursive case
}

console.log(factorial(5)); // 120

2. Fibonacci Sequence
function fibonacci(n) {
  if (n <= 1) return n;   // base cases: 0 or 1
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(5)); // 5

3. Recursion vs Iteration
// iteration
function sumIterative(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

// recursion
function sumRecursive(n) {
  if (n === 0) return 0; // base case
  return n + sumRecursive(n - 1); // recursive case
}

console.log(sumIterative(5)); // 15
console.log(sumRecursive(5)); // 15






Use Cases

Tree and graph traversal (DOM tree, file systems).
Divide and conquer algorithms (merge sort, quicksort).
Problems naturally defined in recursive terms (factorials, Fibonacci).
Backtracking (solving mazes, Sudoku).




✅ Memory Trick

Recursion =

Base case → when to stop
Recursive case → keep breaking problem down
Think: “solve small piece + delegate the rest to myself”

*/



/* 


Recursion is considered a functional programming (FP) approach because:

Functional programming avoids loops
Many functional languages (like Haskell) don’t even have traditional for or while loops.
They use recursion as the main way to repeat actions.

Immutability fits recursion
Loops often mutate counters (i++) or accumulators.
Recursion can work without mutating variables → it just returns new values.

Declarative style
Recursion expresses what the solution looks like, not how to iterate step by step.
That matches FP’s declarative mindset.

*/




/* 

🔹 Recursion (normal)

Recursion = a function calls itself.
Example → factorial:

function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);  // recursive call
}


Problem: after the recursive call factorial(n - 1) finishes, the function still has to multiply by n.
This means the current function frame must stay alive in memory → stack grows.
For very large n, you’ll get a stack overflow error.



🔹 Tail Recursion

A function is tail-recursive if the recursive call is the last thing the function does.
Nothing is left to do after the recursive call returns.

Example → factorial rewritten as tail-recursive
function factorial(n, acc = 1) {
  if (n === 0) return acc;
  return factorial(n - 1, acc * n); // recursive call is the last operation
}


Notice: no extra multiplication after the recursive call returns.
All the work is passed into the acc (accumulator).
This makes it eligible for tail-call optimization (TCO), if the engine supports it.




🔹 Why Tail Recursion is Better

In languages with TCO (like Scheme, Haskell), the engine reuses the current stack frame → no stack growth.
That means you can recurse millions of times without stack overflow.

In JavaScript (except Safari):
Tail recursion works logically, but still grows the stack → still unsafe for very deep recursion.


*/



/* 

Why Tail Recursion Can Be Worse in JS

A tail-recursive function carries an extra accumulator parameter, which means each recursive call adds more data onto the stack.
Since JS doesn’t optimize tail calls, every call still consumes stack space.
For very large inputs, the tail-recursive version can blow the stack faster than a compact normal recursive version.



Example:

Normal factorial

function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}


Tail-recursive factorial

function factorial(n, acc = 1) {
  if (n === 0) return acc;
  return factorial(n - 1, acc * n);
}

#####################################
Try with a large n (e.g., 100000):
Both will crash with RangeError: Maximum call stack size exceeded
But the tail-recursive one often crashes sooner, because each frame has a bit more work (extra parameter passing).
#####################################



4. Best practice in JS
For large numbers or deep recursion → don’t rely on recursion in JS
Use iteration (for, while) or simulate TCO manually with a trampoline

✅ Summary

Tail recursion is only better if the engine supports TCO (not true in JS, except Safari).
In JS, both normal recursion and tail recursion will overflow the stack for large inputs.
Tail recursion can even be worse because of the extra accumulator parameter overhead.

*/




/* 

Trampolining is a technique to convert recursive function calls into an iterative process so you can avoid stack overflow.

Instead of recursion going deeper and deeper on the call stack, each recursive step returns a thunk (a function describing the next step).
A special function (the “trampoline”) repeatedly executes those thunks in a loop until a final value is produced.


🔹 Why Do We Need It?

In most languages with tail-call optimization (TCO) → tail recursion is safe.
In JavaScript → most engines (V8, SpiderMonkey) don’t support TCO → recursion still overflows for large inputs.
Trampolining is a workaround: you implement your own stack using thunks and a loop.

🔹 How It Works

Write your recursive function so it returns a function (thunk) instead of calling itself directly.
A trampoline function takes that initial function and keeps evaluating until the result is a value, not a function.

🔹 Trampoline Utility
function trampoline(fn) {
  return function (...args) {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();  // call the thunk
    }
    return result;
  };
}

🔹 Example 1: Factorial
function factorial(n, acc = 1) {
  if (n === 0) return acc;
  return () => factorial(n - 1, acc * n); // return thunk
}

const safeFactorial = trampoline(factorial);

console.log(safeFactorial(5));       // 120
console.log(safeFactorial(100000));  // ✅ works, no stack overflow

🔹 Example 2: Fibonacci (Tail Recursive)
function fibonacci(n, a = 0, b = 1) {
  if (n === 0) return a;
  if (n === 1) return b;
  return () => fibonacci(n - 1, b, a + b);
}

const safeFibonacci = trampoline(fibonacci);

console.log(safeFibonacci(10));     // 55
console.log(safeFibonacci(100000)); // ✅ no stack overflow

🔹 When Trampolining is Best

Works best with tail-recursive functions → each step is easy to turn into a thunk.
Can be applied to non-tail recursion, but it’s messy.



Benefits

Prevents stack overflow in deep recursion.
Lets you keep the elegance of recursion in JavaScript (where TCO isn’t available).
Keeps function logic clean (no manual loop writing).

🔹 Limitations

Overhead: each step creates a thunk (extra function). Slightly slower than a simple loop.
Not built-in: you must implement trampoline logic yourself.
Messy with non-tail recursion: not as clean as tail recursion.

✅ Summary

Trampolining = “bounce” recursive calls into a loop.
Use it in JavaScript when recursion is natural but risks stack overflow.
Best with tail recursion, possible (but messy) with normal recursion.
It simulates tail-call optimization (TCO) manually.

*/


/* 

Two separate recursion problems:

Stack overflow → solved by Tail Call Optimization (in some langs) or Trampolining (in JS manually)
Overlapping subproblems (repeated branches) → solved by Memoization / Dynamic Programming

*/



/* 


🔹 Trampolining vs Overlapping Subproblems

Trampolining only fixes the stack overflow problem (space complexity).
Overlapping subproblems is about time complexity (too many duplicate calls).
They’re independent problems:
Trampolining makes recursion safe for large depths.
Memoization/dynamic programming makes recursion efficient for overlapping calls.

✅ Summary

Overlapping subproblems = time complexity issue (too slow).
Stack overflow = space complexity issue (too deep recursion).
Memoization fixes time.
Trampolining (or TCO) fixes space.



Trampolining only affects space complexity (stack usage), not time complexity

Before trampolining:

Every recursive call consumes a new stack frame.
For n recursive calls, stack depth = O(n)
Deep recursion → stack overflow

After trampolining:

Recursion is converted into iteration using thunks + loop.
Stack depth = O(1), constant space.
No stack overflow.


*/





/* 

📖 Definition

👉 Partial Application — one of the key techniques in functional programming
👉 Partial application is the process of taking a function with multiple arguments and fixing (pre-filling) (locking) some of its arguments, 
returning a new function that takes the remaining arguments.
👉 It’s like “pre-filling” a function’s parameters
👉 It’s like saying: “I’ll give you some inputs now, and I’ll finish the rest later.”


🔑 Key Points

👉 Partial application ≠ currying (though they are related)
👉 Currying transforms a function of many args into a sequence of unary functions
👉 Partial application just fixes some args now and lets you supply the rest later
👉 Turns a function of n arguments → into a function of m arguments (m < n).
👉 Makes functions more reusable and composable.
👉 Often used to create specialized versions of generic functions





1. Simple Partial Application
1. Normal Function
function multiply(a, b, c) {
  return a * b * c;
}

2. Partial Application
function partialMultiply(a) {
  return function(b, c) {
    return multiply(a, b, c);
  };
}

const doubleAndX = partialMultiply(2);
console.log(doubleAndX(3, 4)); // 24  (2 * 3 * 4)


Here we fixed a = 2 and created a new function.


2. Using bind for Partial Application

JS already supports partial application with bind:

function multiply(a, b, c) {
  return a * b * c;
}

const doubleAndX = multiply.bind(null, 2);
console.log(doubleAndX(3, 4)); // 24


3. Real-World Example (DOM Event)
function addEvent(el, event, handler) {
  el.addEventListener(event, handler)
}

const onClick = partial(addEvent, document.getElementById("btn"), "click")
onClick(() => console.log("Button clicked!"))


# More Realistic Example

Suppose you have a logging function:

function log(level, message) {
  console.log(`[${level}] ${message}`);
}


You can create partials:

const info = log.bind(null, "INFO");
const error = log.bind(null, "ERROR");

info("App started");   // [INFO] App started
error("Something failed"); // [ERROR] Something failed



💡 Use Cases

👉 Creating specialized functions from generic ones
👉 Reusing utility functions with preconfigured arguments
👉 Configuring event handlers
👉 Building APIs and middleware (e.g., Express route handlers)
👉 Readability (clearer intent with fixed parameters)

✅ Benefits

👉 Reduces repetition by “preloading” common args
👉 Improves readability with more descriptive functions
👉 Encourages reusability and modularity

⚠️ Cons

👉 Can be confused with currying
👉 Overuse may make code harder to follow
👉 Native bind is limited (only fixes leading args)

📝 Takeaway

👉 Partial application = pre-filling some arguments of a function
👉 It returns a new function waiting for the rest of the args
👉 You can implement it manually, use bind, or libraries like Lodash (_.partial)

*/




/* 

// Simple Partial Application

function partial(func, ...fixedArgs) {
  return function (...remainingArgs) {
    return func(...fixedArgs, ...remainingArgs);
  };
}




// Custom Partial Application with Placeholders

const _ = Symbol("placeholder");

function partial(func, ...presetArgs) {
  return function(...laterArgs) {
    let position = 0;
    const finalArgs = presetArgs.map(arg =>
      arg === _ ? laterArgs[position++] : arg
    );
    return func(...finalArgs, ...laterArgs.slice(position));
  };
}

// Example
function sum(a, b, c) {
  return a + b + c;
}

const bindSecond = partial(sum, _, 2, _);
console.log(bindSecond(5, 10)); // 17 (5 + 2 + 10)






*/


/* 

Partial Application relies on three FP fundamentals:

1. First-Class Functions

Functions can be passed around like data.

Without this, you couldn’t return a new function after fixing some arguments.

Example:

function partialMultiply(a) {
  return function(b, c) {   // returning a new function
    return a * b * c;
  };
}


Here, partialMultiply returns a function — possible only because functions are first-class citizens in JS.

2. Higher-Order Functions (HOFs)

A HOF is a function that takes or returns another function.

Partial application is implemented as a HOF because it returns a new function with some arguments pre-filled.

function partial(fn, fixedA) {
  return function(b, c) {    // HOF returns another function
    return fn(fixedA, b, c);
  };
}

3. Closures

A closure lets the inner function “remember” the fixed arguments even after the outer function has finished executing.

This is what makes the pre-filled values stay alive.

function partial(fn, fixedA) {
  return function(b, c) {
    // inner function "remembers" fixedA via closure
    return fn(fixedA, b, c);
  };
}

const doubleAndX = partial((a,b,c) => a*b*c, 2);
console.log(doubleAndX(3, 4)); // 24


Even though partial has finished, the inner function still has access to fixedA.

✅ Summary

First-class functions → functions can be treated as data (return, pass, assign).
HOFs → partial application is a higher-order function.
Closures → preserve the fixed arguments for later calls.

*/





/* 


📖 Definition

👉 Currying is the process of transforming a function that takes multiple arguments into a sequence of functions, 
each taking exactly one argument, and returning another function until all arguments are provided.
👉 Instead of calling f(a, b, c), you call f(a)(b)(c)



🔑 Key Points


👉 Always returns a new function until all arguments are supplied
Always unary functions
Each function takes only one argument and returns another function.

👉 Makes functions more reusable & composable

👉 Enables partial application naturally
Because you can stop after supplying some arguments.
currying is one of the ways to get partial application

👉 Pure FP technique
Originated in functional languages like Haskell, but usable in JavaScript.

👉 Different from partial application:
Partial Application → fix some arguments now, pass the rest later
Currying → transform a multi-arg function into chained single-arg calls
👉 Common in functional programming libraries (Ramda, Lodash/fp)



Currying: forces you to provide args one at a time.

🔹 Examples
1. Normal function
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // 6

2. Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

3. With Arrow Functions
const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6

4. Use Case: Specializing Functions
const multiply = a => b => a * b;

const double = multiply(2);  // function that multiplies by 2
console.log(double(5)); // 10

const triple = multiply(3);
console.log(triple(5)); // 15

5. Functional Programming Example (Filtering)
const greaterThan = x => y => y > x;

const greaterThan10 = greaterThan(10);
console.log([5, 12, 20].filter(greaterThan10)); // [12, 20]


💡 Use Cases

👉 Creating reusable, specialized functions (like pre-filled config)
👉 Function composition (compose/pipe works best with curried functions)
👉 Point-free style → writing code without explicitly passing args everywhere.
👉 React/Redux → often used in middleware, selectors, and hooks.
👉 Declarative code style in functional programming
👉 Partially applying arguments step by step

✅ Benefits

👉 Cleaner code when reusing functions with fewer arguments
👉 Works naturally with compose/pipe pipelines
👉 Encourages declarative, functional style
👉 Enables powerful abstractions in libraries (Ramda, Redux, RxJS)

⚠️ Cons

👉 Can confuse beginners (f(a)(b)(c) vs f(a, b, c))
👉 Extra function calls may slightly impact performance in hot paths
👉 Not always needed in simpler imperative code

📝 Takeaway

👉 Currying = breaking a multi-arg function into a chain of single-arg functions
👉 Example: sum(1, 2, 3) → sum(1)(2)(3)
👉 Works great with function composition and FP libraries


*/




/* 

1. Basic Currying
const add = a => b => c => a + b + c;

console.log(add(1)(2)(3)); // 6


2.enhanced currying
function add3(x, y, z) {
  return x + y + z;
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const curriedAdd = curry(add3);


3. Enhanced Currying with Placeholders
// Allows skipping arguments and filling them later (like lodash curry)
const _ = Symbol("placeholder");

function curryWithPlaceholder(fn) {
  return function curried(...args) {
    const complete = args.length >= fn.length && !args.includes(_);
    if (complete) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        // Replace placeholders with new arguments
        const mergedArgs = args.map(arg => (arg === _ && args2.length ? args2.shift() : arg)).concat(args2);
        return curried.apply(this, mergedArgs);
      };
    } 
  };
}

const curriedAddPH = curryWithPlaceholder(add3);
console.log(curriedAddPH(_, 2, 3)(1)); // 6
console.log(curriedAddPH(1, _, 3)(2)); // 6
console.log(curriedAddPH(1, 2, _)(3)); // 6

// Pros: Very flexible, supports out-of-order argument application



3. Dynamic Currying (variadic style)

Here’s the pattern you asked about:

function add(a) {
  let sum = a;

  function inner(b) {
    if (b === undefined) return sum; // stop when no args
    sum += b;
    return inner; // return itself for chaining
  }

  return inner;
}

console.log(add(1)(5)(5)()); // 11
console.log(add(5)(3)());    // 8


👉 This works because of closures:

sum is remembered inside inner.
Each call updates sum.
Calling with () and no argument ends the chain and returns the accumulated result.

3. Use Cases

Create fluent APIs (like jQuery’s chainable syntax).
Handle unknown number of inputs elegantly.
Useful in FP libraries for building reusable data pipelines.

🔹 Summary

Currying: break a multi-arg function into a chain of 1-arg functions (f(a)(b)(c)).
Partial application: fix some args, call later with the rest (f(a, _, c)).
Dynamic/variadic currying (what you showed): keep chaining until a stop condition (like empty ()) → then return the accumulated result.


*/




/* 

Both currying and partial application involve “supplying fewer arguments than the original function expects.”
Both produce a new function that remembers some arguments.
In everyday JavaScript, the syntax can look very similar → so people mix them up.



🔹 The Actual Difference


Currying

Always transforms a function of n arguments into a chain of n unary (1-arg) functions.
Forces you to call functions one argument at a time.

Example:

const add = a => b => c => a + b + c;
console.log(add(1)(2)(3)); // 6



Partial Application

Takes a function of n arguments and pre-fills some of them, returning a function that takes the rest.
You can pass the remaining arguments all at once.

Example:

function add(a, b, c) {
  return a + b + c;
}

const add1 = add.bind(null, 1);  // fix first arg = 1
console.log(add1(2, 3)); // 6


| Aspect         | Currying                          | Partial Application                            |
| -------------- | --------------------------------- | ---------------------------------------------- |
| Function arity | Always split into unary functions | Keeps arity flexible                           |
| Calling style  | `f(a)(b)(c)`                      | `f(a)(b, c)`                                   |
| Purpose        | Formal FP transformation          | Practical reusability (specializing functions) |
| Implementation | Usually by hand or FP libs        | Often uses `.bind()` in JS                     |


🔹 Why the Confusion?

Syntax overlap

curriedAdd(1)(2)(3) looks a lot like partial(add, 1)(2, 3).
Both rely on closures
Both use closures to “remember” arguments already given.
Both allow “delayed argument supply”
Which makes them feel the same until you look closely at arity.

✅ Memory Trick

Currying = break into a chain of one-arg functions.
Partial application = pre-fill some args, call later with the rest.
👉 “Currying is a transformation; partial application is a use case.”


*/




/* 

Function Composition

👉 Function composition is the process of combining multiple functions into a single function, 
where the output of one function becomes the input of the next
👉 It enables building complex logic from small, reusable functions



🔑 Key Points

👉 Small pure functions compose best
👉 Order matters (compose = right-to-left, pipe = left-to-right)
👉 Works best with unary (single argument) functions
👉 Encourages immutability and declarative style
👉 Needs different helpers for sync vs async
👉 Contracts or types reduce runtime bugs

🧩 Examples
⚙️ Compose & Pipe Helpers
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

same as above
// or more verbosely

function pipe(...fns) {
  return function (x) {
    return fns.reduce(function (v, f) {
      return f(v)
    }, x)
  }
}

✂️ Basic String Transformation
const trim = s => s.trim()
const toLower = s => s.toLowerCase()
const slug = s => s.replace(/\s+/g, '-')

const makeSlug1 = compose(slug, toLower, trim)
const makeSlug2 = pipe(trim, toLower, slug)

makeSlug1("  Hello World  ") // "hello-world"

📦 Object Example
const pick = key => obj => obj[key]
const toPercent = n => `${Math.round(n * 100)}%`

const ratingToPercent = pipe(
  pick('rating'),
  n => Math.max(0, Math.min(1, n)),
  toPercent
)

ratingToPercent({ rating: 0.87 }) // "87%"

🔢 Arrays Point-Free
const map = f => xs => xs.map(f)
const filter = p => xs => xs.filter(p)

const isEven = n => n % 2 === 0
const square = n => n * n

const evenSquares = pipe(
  filter(isEven),
  map(square)
)

evenSquares([1, 2, 3, 4]) // [4, 16]

🌐 Async Composition
const pipeAsync = (...fns) => x =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(x))

const fetchUser = id => fetch(`/api/users/${id}`).then(r => r.json())
const pickName = u => u.name
const shout = s => s.toUpperCase()

const getUserNameShout = pipeAsync(fetchUser, pickName, shout)

💡 Use Cases

👉 Input validation & sanitization
👉 Data transformation pipelines
👉 UI state mapping (e.g., Redux selectors)
👉 Middleware chains (Express, Koa)
👉 Business rule checks (auth, logging)
👉 Reusable array/object utilities

✅ Benefits

👉 Reuse of small functions
👉 Readable left-to-right flow with pipe
👉 Easy unit testing of small pieces
👉 Encourages immutability & purity
👉 Declarative style (focus on what not how)

⚠️ Cons

👉 Too many tiny functions reduce clarity
👉 Harder to debug in long chains
👉 Slight performance overhead in hot paths
👉 Type mismatches only caught at runtime
👉 Async error handling can be tricky

📝 Takeaways

👉 Prefer pipe for readability
👉 Keep functions unary and pure
👉 Use tap for logging without breaking flow
👉 Guard with contracts or TypeScript
👉 Separate sync vs async composition helpers



*/





/* 


VERY IMPORTANT RESOURCES 


Professor Fisby's Mostly Adequate Guide to Functional Programming
https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/


medium article on functional programming
https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0

*/

/*
  Functional Programming = declarative programming 
  + immutability 
  + pure functions 
  + first class functions 
  + higher order functions 
  + recursion
  + function composition 
  + currying 
  + partial application 
  + closures 
  + referential transparency 
  + avoiding side effects 
  + avoiding shared mutable state
  + using expressions instead of statements 
  + using functions as the main building blocks
  + avoiding loops 
  + using built-in FP methods (map, filter, reduce) 
  + using libraries (Ramda, Lodash FP) 
  + understanding monads and functors (advanced)
  + using lazy evaluation (e.g., generators) 
  + using tail call optimization (TCO) or trampolining for deep recursion 
  + using memoization for performance 
  + using point-free style (tacit programming) 
  + using algebraic data types (ADTs) like Maybe, Either (advanced) 
  + using lenses for immutable data access and updates (advanced)
  + using type systems (TypeScript, Flow) for safer code 
  + using functional reactive programming (FRP) for async data streams (advanced)
  + using category theory concepts (functors, monads, applicatives) for advanced abstractions (very advanced)
  + using combinators for building complex functions from simpler ones 
  + using zippers for navigating and updating immutable data structures (advanced) 
  + using optics for composable data access and manipulation (advanced) 
  + using algebraic effects for handling side effects in a controlled manner (very advanced) 
  + using dependent types for more expressive type systems (very advanced) 
  + using homotopy type theory (HoTT) concepts for reasoning about programs (very advanced) 
  + using functional design patterns (e.g., functor pattern, monad pattern) 
  + using functional programming paradigms in different languages (Haskell, Scala, F#, Elm, Clojure, etc.) 
  + understanding the trade-offs of functional programming vs other paradigms (OOP, procedural) 
  + applying functional programming principles in real-world applications and projects
  + continuously learning and exploring new FP concepts and techniques
*/