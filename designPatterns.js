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

-----------------------------------
REAL WORLD EXAMPLE

Notification Factory that can send notifications via Email, SMS, or Push — but the client doesn’t need to know how each one works.

🔹 Step 1 – Define Notification Types
class EmailNotification {
  send(message) {
    console.log(`📧 Sending Email: ${message}`)
  }
}

class SMSNotification {
  send(message) {
    console.log(`📱 Sending SMS: ${message}`)
  }
}

class PushNotification {
  send(message) {
    console.log(`🔔 Sending Push: ${message}`)
  }
}

🔹 Step 2 – Create the Factory
class NotificationFactory {
  static createNotification(type) {
    if (type === "email") return new EmailNotification()
    if (type === "sms") return new SMSNotification()
    if (type === "push") return new PushNotification()
    throw new Error("Unknown notification type")
  }
}

🔹 Step 3 – Use the Factory in Client Code
// Client code doesn’t care which class is used
const notification1 = NotificationFactory.createNotification("email")
notification1.send("Welcome to our platform!")

const notification2 = NotificationFactory.createNotification("sms")
notification2.send("Your OTP is 123456")

const notification3 = NotificationFactory.createNotification("push")
notification3.send("You have a new friend request")

✅ Output
📧 Sending Email: Welcome to our platform!
📱 Sending SMS: Your OTP is 123456
🔔 Sending Push: You have a new friend request

📊 Why This Works Well

The client code (notification1.send(...)) doesn’t need to know the concrete class.
You can add a new type (e.g., SlackNotification) without changing client code — only extend the factory.
Centralizes object creation.

📝 Takeaway

👉 Factory Pattern = central point for object creation.
👉 Client asks “give me an object of type X” and doesn’t care about new EmailNotification() or new SMSNotification().


*/




/* 

Abstract Factory Pattern — it builds on top of the Factory pattern you just saw.

📖 Definition

👉 The Abstract Factory Pattern is a creational design pattern that provides an interface (a factory of factories) for creating families of related objects, without specifying their concrete classes.

Think of it like:

Factory Pattern = one factory creates one type of object.
Abstract Factory = one super-factory that can create multiple related objects depending on the family/type you choose.

🔑 Key Ideas

Encapsulates a group of individual factories.

Useful when you want to switch between families of objects easily.

Client code is completely decoupled from concrete implementations.

🧩 Example: UI Components (Light Theme vs Dark Theme)
Step 1 – Define Product Interfaces
class Button {
  render() { throw new Error("Not implemented") }
}

class Checkbox {
  render() { throw new Error("Not implemented") }
}

Step 2 – Concrete Product Families
// Light theme components
class LightButton extends Button {
  render() { console.log("Rendering light button") }
}
class LightCheckbox extends Checkbox {
  render() { console.log("Rendering light checkbox") }
}

// Dark theme components
class DarkButton extends Button {
  render() { console.log("Rendering dark button") }
}
class DarkCheckbox extends Checkbox {
  render() { console.log("Rendering dark checkbox") }
}

Step 3 – Abstract Factory Interface
class UIAbstractFactory {
  createButton() { throw new Error("Not implemented") }
  createCheckbox() { throw new Error("Not implemented") }
}

Step 4 – Concrete Factories
class LightUIFactory extends UIAbstractFactory {
  createButton() { return new LightButton() }
  createCheckbox() { return new LightCheckbox() }
}

class DarkUIFactory extends UIAbstractFactory {
  createButton() { return new DarkButton() }
  createCheckbox() { return new DarkCheckbox() }
}

Step 5 – Client Code
function renderUI(factory) {
  const button = factory.createButton()
  const checkbox = factory.createCheckbox()
  button.render()
  checkbox.render()
}

// Choose factory at runtime
const theme = "dark"
const factory = theme === "dark" ? new DarkUIFactory() : new LightUIFactory()

renderUI(factory)

✅ Output
Rendering dark button
Rendering dark checkbox

💡 Use Cases

Cross-platform UI (Windows/Mac/Linux, Light/Dark theme)
Database drivers (MySQL/Mongo/Postgres families)
Cloud service providers (AWS/GCP/Azure object families)
Payment gateways (Stripe/PayPal families of services)


| Pattern              | Scope                       | Example                                                                                |
| -------------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| **Factory Method**   | One type of object          | A factory that creates animals (Dog, Cat)                                              |
| **Abstract Factory** | A family of related objects | A factory that creates **all UI elements** (Button + Checkbox) for Dark or Light theme |




📝 Takeaway

👉 Factory Method = one factory → one product
👉 Abstract Factory = one factory → many related products (a whole family)
👉 It’s about consistency across families (all Light or all Dark, not mixed).

*/



/* 

📖 Definition

👉 The Builder Pattern is a creational design pattern used to construct complex objects step by step.
👉 Instead of calling a constructor with a ton of parameters, you use a builder object that lets you configure the product gradually.

It’s especially useful when:
An object has many optional parameters.
You want different representations of the same type of object.

🔑 Key Ideas

Separate the construction of an object from its representation.
Use a builder to construct the object step by step.
At the end, call build() (or equivalent) to get the final object.

🧩 Example 1: Basic Builder (Fluent API)
class User {
  constructor(name, age, email) {
    this.name = name
    this.age = age
    this.email = email
  }
}

class UserBuilder {
  constructor() {
    this.name = ""
    this.age = 0
    this.email = ""
  }

  setName(name) {
    this.name = name
    return this // for chaining
  }

  setAge(age) {
    this.age = age
    return this
  }

  setEmail(email) {
    this.email = email
    return this
  }

  build() {
    return new User(this.name, this.age, this.email)
  }
}

// Usage
const user = new UserBuilder()
  .setName("Alice")
  .setAge(25)
  .setEmail("alice@example.com")
  .build()

console.log(user)


👉 Instead of a constructor like new User("Alice", 25, "alice@example.com"), you use a step-by-step builder.

🧩 Example 2: Real-World → Building a Query Object
class Query {
  constructor(select, from, where, orderBy) {
    this.select = select
    this.from = from
    this.where = where
    this.orderBy = orderBy
  }
}

class QueryBuilder {
  constructor() {
    this.select = "*"
    this.from = ""
    this.where = ""
    this.orderBy = ""
  }

  setSelect(fields) {
    this.select = fields
    return this
  }

  setFrom(table) {
    this.from = table
    return this
  }

  setWhere(condition) {
    this.where = condition
    return this
  }

  setOrderBy(order) {
    this.orderBy = order
    return this
  }

  build() {
    return new Query(this.select, this.from, this.where, this.orderBy)
  }
}

// Usage
const query = new QueryBuilder()
  .setSelect("name, age")
  .setFrom("users")
  .setWhere("age > 18")
  .setOrderBy("age DESC")
  .build()

console.log(query)


👉 This way, you can create SQL-like queries step by step, without a constructor with 10+ arguments.

💡 Use Cases

Building UI components with lots of optional properties (e.g., ModalBuilder)
Building database queries (SQL, MongoDB)
Constructing HTTP requests (headers, params, body)
Creating configuration objects (logger, API clients, etc.)

✅ Benefits

Handles complex object creation neatly
Makes code readable (fluent API)
Easier to manage optional/mandatory parameters
Promotes immutability (final object built once)

⚠️ Cons

More boilerplate (extra Builder class)
Can be overkill for simple objects

📝 Takeaway

👉 Builder Pattern = construct objects step by step with a fluent API
👉 Great for objects with lots of optional params
👉 Produces cleaner, more maintainable code than long constructors


*/


/* 


📖 Fluent Interface Pattern

👉 A Fluent Interface is a style of designing APIs where methods return this so that calls can be chained together.
👉 It makes code more readable and “sentence-like.”

Example (Fluent Interface only):

class FluentUser {
  setName(name) { this.name = name; return this }
  setAge(age) { this.age = age; return this }
  setEmail(email) { this.email = email; return this }
}

const user = new FluentUser()
  .setName("Alice")
  .setAge(25)
  .setEmail("alice@example.com")

console.log(user)


👉 The goal here is readability + chaining.
👉 It doesn’t necessarily mean “complex object construction.”

📖 Builder Pattern

👉 The Builder Pattern is about step-by-step object construction, especially when there are many optional parameters or variations.
👉 It often uses a Fluent Interface to make the builder easier to use, but that’s optional.

Example (Builder + Fluent Interface together):

class User {
  constructor(name, age, email) {
    this.name = name
    this.age = age
    this.email = email
  }
}

class UserBuilder {
  setName(name) { this.name = name; return this }
  setAge(age) { this.age = age; return this }
  setEmail(email) { this.email = email; return this }
  build() { return new User(this.name, this.age, this.email) }
}

const user = new UserBuilder()
  .setName("Alice")
  .setAge(25)
  .setEmail("alice@example.com")
  .build()

console.log(user)


👉 Here the Fluent Interface (method chaining) is used inside the Builder Pattern.
👉 But the pattern’s intent is safe construction of complex objects.


| Pattern              | Focus / Intent                                              | Example Use Case                          |
| -------------------- | ----------------------------------------------------------- | ----------------------------------------- |
| **Fluent Interface** | Method chaining for readability                             | `jQuery`, `Chai` assertions, Lodash chain |
| **Builder Pattern**  | Step-by-step object construction (often with fluent syntax) | Building complex objects, query builders  |



📝 Takeaway

👉 Fluent Interface = style of writing APIs (method chaining).
👉 Builder Pattern = creational pattern to build complex objects step-by-step.
👉 Builder may use Fluent Interface as its syntax, but they’re not the same.

*/