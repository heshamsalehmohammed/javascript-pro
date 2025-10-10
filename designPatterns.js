/* 
Design patterns are usually grouped into 3 categories:


🔹 Creational Patterns
Singleton 
Factory Method
Abstract Factory
Builder
Prototype
Module 

🔹 Structural Patterns
Proxy 
Adapter
Decorator
Composite
Bridge
Flyweight
Facade
Mixin 
Registry

🔹 Behavioral Patterns
Observer 
Strategy
Command
Iterator
State
Memento
Template Method
Chain of Responsibility
Mediator
Visitor
Interpreter

*/





/* 

Module Pattern in JavaScript — one of the most common and foundational design patterns.

📖 Definition

👉 The Module Pattern is a way to encapsulate private data and behavior while exposing only the parts you want to be public.
👉 It’s built on closures — functions that “remember” their lexical scope.

It helps simulate private variables and methods (since JS doesn’t have true privacy in older versions).

🔑 Key Ideas

Uses an IIFE (Immediately Invoked Function Expression) or ES6 modules
Keeps some variables/methods private
Returns an object exposing only the public API
Prevents polluting the global scope

🧩 Classic Example (IIFE-based)
const UserModule = (function() {
  // private variables
  let users = []

  // private method
  function validate(user) {
    return user && user.name
  }

  // public API
  return {
    add(user) {
      if (validate(user)) {
        users.push(user)
        console.log("User added:", user.name)
      }
    },
    getAll() {
      return [...users] // return copy
    }
  }
})()

UserModule.add({ name: "Alice" })   // ✅ works
console.log(UserModule.getAll())    // ✅ [{ name: "Alice" }]
console.log(UserModule.users)       // ❌ undefined (private)


👉 Here, users and validate are hidden, only add and getAll are public.

🧩 ES6 Module Example (modern way)

With ES6, we now have native modules.

// userModule.js
let users = []

function validate(user) {
  return user && user.name
}

export function add(user) {
  if (validate(user)) {
    users.push(user)
    console.log("User added:", user.name)
  }
}

export function getAll() {
  return [...users]
}

// main.js
import { add, getAll } from "./userModule.js"

add({ name: "Alice" })
console.log(getAll())


👉 Everything not exported is private by default.

💡 Use Cases

Encapsulating logic (user management, API services, utilities)
Creating reusable libraries
Avoiding name collisions in global scope
Providing controlled access to state

✅ Benefits

Encapsulation (private vs public)
Avoids global scope pollution
Clear separation of concerns
Easy to organize related functionality

⚠️ Cons

IIFE-based modules can be harder to test/mutate
Overuse can lead to too many singletons
ES6 modules are preferred today (IIFE feels legacy)

📝 Takeaway

👉 Module Pattern = bundle of related code with private + public parts
👉 Older JS → IIFE-based modules
👉 Modern JS → ES6 import/export



*/



/* 

📖 Definition

👉 A Singleton ensures that a class (or module) has only one instance during the lifetime of the application, 
and provides a global access point to it.

Think of it like: “There should be only one database connection manager, one config object, one logger, etc.”

🔑 Key Ideas

Guarantees only one instance exists.

Provides a single global point of access.

Often implemented with closures or modules in JavaScript.

Very similar to the Module pattern, but the focus is on one instance rather than encapsulation.

🧩 Example 1: Basic Singleton with Object Literal
const Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  getConfig() {
    return `API: ${this.apiUrl}, Timeout: ${this.timeout}`
  }
}

console.log(Config.getConfig())
// Always the same instance


👉 Config object is a singleton by nature — there’s only one.

🧩 Example 2: Singleton with Closure
const Singleton = (function() {
  let instance

  function createInstance() {
    return { message: "I am the instance" }
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()

const a = Singleton.getInstance()
const b = Singleton.getInstance()

console.log(a === b) // true (same instance)


👉 Even if you call getInstance multiple times, you always get the same object.

🧩 Example 3: Singleton with Class (ES6)
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance
    }
    this.connection = "DB Connected"
    Database.instance = this
  }
}

const db1 = new Database()
const db2 = new Database()

console.log(db1 === db2) // true


👉 By caching Database.instance, every new Database() returns the same instance.

💡 Use Cases

Config management (global settings)
Logger (single log manager)
Database connection pool (don’t create multiple connections)
Caching (one cache store used everywhere)

✅ Benefits

Controlled access to shared resources
Ensures a single point of truth
Saves memory/resources (don’t create multiple copies)

⚠️ Cons

Global state → can introduce hidden dependencies
Harder to test (mocking singletons can be tricky)
May lead to tight coupling if overused

📝 Takeaway

👉 Singleton = only one instance allowed
👉 In JavaScript, modules (import/export) often act as natural singletons, since an imported module is cached and reused across the app.


*/



/* 

📖 Definition

👉 The Factory Pattern is a creational design pattern that provides a way to create objects without exposing the creation logic to the client.
👉 Instead of calling new directly, you use a factory method to generate objects.

🔑 Key Ideas

Encapsulates object creation logic in one place.

Client only asks the factory → it doesn’t care about which class/object is returned.

Promotes loose coupling by hiding concrete implementations.

🧩 Example 1: Simple Factory Function
function createUser(type) {
  if (type === "admin") {
    return { role: "admin", permissions: ["read", "write", "delete"] }
  }
  if (type === "editor") {
    return { role: "editor", permissions: ["read", "write"] }
  }
  return { role: "viewer", permissions: ["read"] }
}

const admin = createUser("admin")
const editor = createUser("editor")
console.log(admin, editor)


👉 The client just calls createUser("admin"), not new AdminUser().

🧩 Example 2: Factory Class with Polymorphism
class Dog {
  speak() { return "Woof!" }
}

class Cat {
  speak() { return "Meow!" }
}

class AnimalFactory {
  static createAnimal(type) {
    if (type === "dog") return new Dog()
    if (type === "cat") return new Cat()
    throw new Error("Unknown animal type")
  }
}

const dog = AnimalFactory.createAnimal("dog")
console.log(dog.speak()) // Woof!


👉 AnimalFactory decides which concrete class to instantiate.

🧩 Example 3: Real-World — Database Factory
class MySQL {
  connect() { console.log("Connected to MySQL") }
}
class MongoDB {
  connect() { console.log("Connected to MongoDB") }
}

class DatabaseFactory {
  static getDatabase(type) {
    if (type === "mysql") return new MySQL()
    if (type === "mongo") return new MongoDB()
    throw new Error("Invalid database type")
  }
}

const db = DatabaseFactory.getDatabase("mysql")
db.connect() // Connected to MySQL


👉 Easy to switch databases — client doesn’t know or care which one is created.

💡 Use Cases

When object creation is complex (e.g., needs config or multiple steps).
When you need to decide the type of object at runtime.
When you want to centralize creation logic (cleaner code).
Examples: Database drivers, UI component factories, parsers.

✅ Benefits

Encapsulates object creation logic
Decouples client from specific classes
Centralized place for controlling object creation

⚠️ Cons

Adds extra layer of abstraction
Can hide details too much, making debugging harder
If overused, can create unnecessary complexity

📝 Takeaway

👉 Factory Pattern = central place to create objects
👉 Client doesn’t know which class is used — it just gets an object that works
👉 Very common in frameworks, DB connectors, and libraries


*/