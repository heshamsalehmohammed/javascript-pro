/* 
Design patterns are usually grouped into 3 categories:


🔹 Creational Patterns
Singleton  -> DONE
Factory Method  -> DONE
Abstract Factory  -> DONE
Builder  -> DONE
Prototype  -> DONE
Module  -> DONE

🔹 Structural Patterns
Proxy -> DONE
Adapter
Decorator
Composite
Bridge
Flyweight
Facade
Mixin  -> DONE
Registry  -> DONE

🔹 Behavioral Patterns
Observer  -> DONE
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

👉 The Abstract Factory Pattern is a creational design pattern that provides an interface (a factory of factories) 
for creating families of related objects, without specifying their concrete classes.

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




/* 

Prototype Pattern in JavaScript.

📖 Definition

👉 The Prototype Pattern is a creational design pattern where new objects are created by cloning an existing object (the prototype) 
instead of creating them from scratch.
👉 JavaScript is particularly suited for this pattern because its inheritance model is prototype-based by default.

🔑 Key Ideas

Avoids expensive object creation by reusing an existing instance.
Provides a base (prototype) object → clones create new variations.
JavaScript’s Object.create() is the direct implementation of this pattern.

🧩 Example 1: Basic Prototype with Object.create
const carPrototype = {
  drive() { console.log(`Driving a ${this.make} ${this.model}`) }
}

const car1 = Object.create(carPrototype)
car1.make = "Toyota"
car1.model = "Corolla"

const car2 = Object.create(carPrototype)
car2.make = "Tesla"
car2.model = "Model 3"

car1.drive() // Driving a Toyota Corolla
car2.drive() // Driving a Tesla Model 3


👉 Both car1 and car2 inherit from the same prototype.

🧩 Example 2: Prototype with Classes (Cloning)
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  clone() {
    return new Person(this.name, this.age)
  }
}

const p1 = new Person("Alice", 25)
const p2 = p1.clone()

console.log(p1, p2)
console.log(p1 === p2) // false (different objects)


👉 The clone() method lets you duplicate objects easily.

🧩 Example 3: Real-World → Shape Prototypes
class Shape {
  constructor(type) {
    this.type = type
  }
  clone() {
    return new Shape(this.type)
  }
}

const circle = new Shape("Circle")
const newCircle = circle.clone()

console.log(newCircle.type) // Circle


👉 Instead of constructing a new shape from scratch, just clone an existing one.

💡 Use Cases

When object creation is costly (e.g., parsing configs, database records, images).
Game development → clone enemies/objects instead of recreating.
Prototypical inheritance in JS (every object has a prototype chain).
Config templates → clone a base config and modify only what’s needed.

✅ Benefits

Efficient object creation (reuse instead of reconstruct).
Simplifies creating families of similar objects.
Natural fit in JavaScript since it’s prototype-based.

⚠️ Cons

Cloning may cause shallow copy issues (nested objects still reference the same data).
Requires careful handling of deep clones when needed.
Not as intuitive for developers from strictly class-based languages.

📝 Takeaway

👉 Prototype Pattern = create new objects by cloning existing ones
👉 In JS, Object.create() and class.clone() are the typical ways to implement it
👉 Great when object creation is expensive or repetitive



*/



/* 

bserver Pattern is one of the most important and widely used behavioral design patterns — 
especially in JavaScript (it’s the foundation for event systems, RxJS, Redux subscriptions, etc).

📖 Definition

👉 The Observer Pattern defines a one-to-many relationship between objects so that 
when one object (the subject) changes state, all its dependents (observers) are automatically notified and updated.
In simple words:
One object emits updates → many others react to those updates.


📖 Simplified Definition
“The Observer Pattern enables a subscription model where objects (observers) listen to events and get notified when those events occur.”

🔑 Key Concepts
Role	Description
Subject (Observable)	The object being observed. Maintains a list of observers and notifies them of any changes.
Observer (Subscriber)	The object that wants to be notified when the subject’s state changes.
Event / Update	The data or signal sent from subject to observers.
🧩 Example 1: Classic Implementation in JavaScript
// Subject (Observable)
class Subject {
  constructor() {
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer)
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(sub => sub !== observer)
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data))
  }
}

// Observer
class Observer {
  constructor(name) {
    this.name = name
  }

  update(data) {
    console.log(`${this.name} received update:`, data)
  }
}

// Usage
const subject = new Subject()

const obs1 = new Observer("Observer 1")
const obs2 = new Observer("Observer 2")

subject.subscribe(obs1)
subject.subscribe(obs2)

subject.notify("Hello Observers!") // both get notified

subject.unsubscribe(obs1)

subject.notify("Another update!") // only Observer 2 gets this


✅ The Subject maintains a list of observers
✅ All observers get notified when the Subject updates

🧩 Example 2: Real-World — Weather Station
class WeatherStation {
  constructor() {
    this.temperature = 0
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer)
  }

  setTemperature(temp) {
    console.log(`🌡️ New temperature: ${temp}°C`)
    this.temperature = temp
    this.notifyAll()
  }

  notifyAll() {
    this.observers.forEach(o => o.update(this.temperature))
  }
}

class Display {
  constructor(id) {
    this.id = id
  }

  update(temp) {
    console.log(`📺 Display ${this.id}: temperature updated to ${temp}°C`)
  }
}

// Usage
const weatherStation = new WeatherStation()
const display1 = new Display(1)
const display2 = new Display(2)

weatherStation.subscribe(display1)
weatherStation.subscribe(display2)

weatherStation.setTemperature(25)
weatherStation.setTemperature(30)


👉 WeatherStation = Subject
👉 Display = Observers
👉 When the temperature changes → all displays update automatically.



🧩 Example in Modern JS Terms
class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  // subscribe
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(callback)
  }

  // unsubscribe
  off(event, callback) {
    this.listeners[event] = this.listeners[event].filter(fn => fn !== callback)
  }

  // notify (emit event)
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(fn => fn(data))
    }
  }
}

// Usage
const emitter = new EventEmitter()

function logger(data) {
  console.log("🔔 Logger received:", data)
}

function notifier(data) {
  console.log("📩 Notifier received:", data)
}

emitter.on("message", logger)
emitter.on("message", notifier)

emitter.emit("message", "User joined the chat!") // both get notified




💡 Use Cases

UI frameworks (React, Vue, Angular → components subscribe to state changes)
Redux store .subscribe()
EventEmitter / Pub-Sub systems
Chat / notification systems
Live data dashboards

✅ Benefits

Decouples subjects and observers (loose coupling)
Easy to add/remove observers dynamically
Encourages reactive, event-driven design

⚠️ Cons

Can lead to unexpected update chains if not managed carefully
Harder to debug (many listeners updating at once)
Memory leaks if observers aren’t unsubscribed properly

📝 Takeaway

👉 Observer Pattern = one-to-many communication
👉 Subject broadcasts → observers react
👉 Foundation for event-driven and reactive programming



*/



/* 

RXJS


👉 RxJS (Reactive Extensions for JavaScript) is a library for reactive programming that uses Observables to handle asynchronous data streams.

🧠 Core Concept: Observable & Observer

Observable → the data source (like a stream).

Observer / Subscriber → listens to the stream and reacts to emitted values.

Operators → functions that let you transform or combine streams (map, filter, merge, etc.).

Subscription → connects the observer to the observable (like .subscribe()).

🧩 Basic Example
import { Observable } from "rxjs"

const observable = new Observable(subscriber => {
  subscriber.next("👋 Hello")
  subscriber.next("🌍 World")
  subscriber.complete()
})

// Subscribe (observer)
observable.subscribe({
  next: value => console.log("Received:", value),
  complete: () => console.log("✅ Done")
})


👉 Output:

Received: 👋 Hello
Received: 🌍 World
✅ Done


Here:

observable emits data (next)

subscriber receives those emissions

complete() signals the stream has finished

🧩 Example 2: With Operators
import { from } from "rxjs"
import { filter, map } from "rxjs/operators"

from([1, 2, 3, 4, 5])
  .pipe(
    filter(num => num % 2 === 0),
    map(num => num * 10)
  )
  .subscribe(result => console.log(result))


👉 Output:

20
40


👉 Here, data flows like a stream pipeline through operators (filter, map).

🧩 Example 3: Event Streams (like Observers)
import { fromEvent } from "rxjs"

const clicks = fromEvent(document, "click")

clicks.subscribe(event => console.log("🖱️ Click at:", event.clientX, event.clientY))


👉 Every click event becomes a stream value, handled reactively — no manual event listeners or removals.

------------------------------------------------------------------------------------------------------------------------------------------

RxJS with React

✅ RxJS works great with React, especially for handling:

Async operations (HTTP, WebSockets)
Debounced user input (e.g., live search)
Complex state streams (e.g., combining multiple async sources)
Event-based logic (e.g., data from APIs + user actions)


💡 Use Cases for RxJS (Alone or with React)
🔸 Alone (Node.js or Vanilla JS)

Handle real-time data (WebSockets, EventSources)
Complex async workflows (e.g., retries, throttling, error handling)
Reactive systems (IoT sensors, chat servers)
Stream transformations (log pipelines, analytics)

🔸 With React

Replacing or enhancing Redux (RxJS can manage streams of state)
Form control + debounce + validation
Polling / auto-refreshing data
Reactive composition of events (e.g., combine clicks, keypress, API updates)

✅ Benefits

Handles async complexity easily (multiple sources, parallel streams)
Composable operators (map, filter, merge, combineLatest, etc.)
Reactive, declarative style — less manual state handling
Works with everything: React, Node.js, Angular, Vue, etc.

⚠️ Cons

Steep learning curve initially
Overkill for simple apps
Debugging async streams can be tricky

📝 Takeaway

👉 RxJS = advanced Observer pattern + powerful data stream operators
👉 Perfect for real-time or reactive apps
👉 Plays nicely with React, Redux, and other modern frameworks


------------------------------------------------------------------------------------------------------------------------------------------

⚛️ What Does RxJS Add to Redux Toolkit?

Redux manages state changes, while RxJS manages asynchronous event streams.
Combining both gives you reactive Redux — state updates driven by streams (actions, APIs, websockets, etc.).

👉 Think of Redux as “what the app is right now”
👉 and RxJS as “how the app reacts to data changes over time”

🧩 Common Integration Pattern → Redux Observable (Epics)

The standard bridge between Redux and RxJS is redux-observable, which uses Epics.
An Epic is a function that takes a stream of actions and returns a stream of new actions.

// epic.js
import { ofType } from "redux-observable"
import { map, mergeMap, catchError } from "rxjs/operators"
import { of } from "rxjs"
import { fetchUserSuccess, fetchUserError } from "./userSlice"

const fetchUserEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType("user/fetchUser"),
    mergeMap(action =>
      api.getUser(action.payload).pipe(
        map(response => fetchUserSuccess(response)),
        catchError(err => of(fetchUserError(err.message)))
      )
    )
  )

export default fetchUserEpic


👉 action$ is an observable stream of Redux actions
👉 You listen to certain actions (via ofType)
👉 You perform async work (like calling APIs)
👉 You emit new actions (fetchUserSuccess, fetchUserError) back to Redux

⚙️ Store Setup Example
import { configureStore } from "@reduxjs/toolkit"
import { createEpicMiddleware } from "redux-observable"
import rootReducer from "./rootReducer"
import rootEpic from "./rootEpic"

const epicMiddleware = createEpicMiddleware({
  dependencies: { api: yourApiInstance }
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefault => getDefault().concat(epicMiddleware)
})

epicMiddleware.run(rootEpic)


✅ Middleware connects RxJS to Redux Toolkit
✅ Epics handle async logic outside reducers

🔥 Real Use Cases (Many)
1️⃣ Debounced API calls

Perfect for search bars, form validation, etc.
Instead of dispatching a fetch on every keystroke, you debounce user input in RxJS before dispatching.

action$.pipe(
  ofType("search/inputChanged"),
  debounceTime(400),
  distinctUntilChanged(),
  mergeMap(action => api.search(action.payload).pipe(
    map(result => searchSuccess(result))
  ))
)

2️⃣ WebSocket / SSE Streams

Listen to live data streams and push them as Redux actions.

const socketEpic = action$ =>
  action$.pipe(
    ofType("socket/connect"),
    mergeMap(() =>
      webSocket("wss://example.com/data").pipe(
        map(msg => socketMessageReceived(msg))
      )
    )
  )


👉 Every message received becomes a Redux action that updates state in real time.

3️⃣ Polling / Interval Refresh

Fetch updated data every X seconds until a condition is met.

import { interval, of } from "rxjs"
import { takeUntil, switchMap } from "rxjs/operators"

const pollEpic = (action$) =>
  action$.pipe(
    ofType("poll/start"),
    switchMap(() =>
      interval(5000).pipe(
        switchMap(() => api.getStatus().pipe(map(res => pollSuccess(res)))),
        takeUntil(action$.pipe(ofType("poll/stop")))
      )
    )
  )


👉 Ideal for dashboards or progress trackers.

4️⃣ Complex Async Chaining

Easily handle dependent async calls (fetch A → fetch B → merge results).
RxJS’s concatMap, mergeMap, switchMap make this seamless.

5️⃣ Global Side-Effects

React to multiple action types from different slices (like logging, analytics, cleanup).
Epics can combine or merge different action streams globally.

6️⃣ Race Conditions & Cancellation

RxJS lets you cancel previous API requests when new ones start — something normal thunks can’t handle easily.
switchMap(action => api.fetch(action.payload)) 
// cancels the previous request when a new one comes

| Benefit                      | Description                                                 |
| ---------------------------- | ----------------------------------------------------------- |
| **Reactive async logic**     | Replace nested thunks with elegant observable streams       |
| **Declarative flow control** | Combine, debounce, retry, or cancel async operations easily |
| **Better performance**       | Avoid redundant API calls (debounce, distinctUntilChanged)  |
| **Centralized side-effects** | All async work lives in epics, away from components         |
| **Easier testing**           | Epics are pure functions returning observables              |
| **Live & streaming data**    | Handle WebSockets, SSE, or continuous events natively       |
| **Extremely composable**     | Combine multiple streams (UI events + API data + timers)    |
| **Less boilerplate**         | Epics + slices often replace complex middleware setups      |


📝 Takeaway

👉 RxJS + Redux Toolkit turns Redux into a reactive data engine
👉 Handle real-time streams, cancellations, and async workflows elegantly
👉 Excellent for:

Live dashboards
Chat & notifications
Stock tickers / IoT feeds
Multi-source data merging
Debounced, cancelable searches

------------------------------------------------------------------------------------------------------------------------------------------


| Use Case                                                   | Redux Toolkit Alone                    | RxJS + Redux Toolkit                       |
| ---------------------------------------------------------- | -------------------------------------- | ------------------------------------------ |
| Simple API fetch                                           | ✅ `createAsyncThunk` is perfect        | 🚫 Overkill                                |
| Debounced search (like Google search bar)                  | ❌ Hard (you’d manually debounce input) | ✅ Natural with `debounceTime()`            |
| Live WebSocket data (stock prices, chat messages)          | ❌ Requires custom middleware           | ✅ Built-in with `fromEvent`, `webSocket()` |
| Retry failed requests with backoff                         | 😖 Needs custom retry logic            | ✅ `retryWhen()` operator                   |
| Combine multiple async sources (API + timer + user action) | 😖 Manual orchestration                | ✅ `combineLatest()` or `merge()`           |
| Cancel previous requests (race conditions)                 | 😖 Complex cleanup logic               | ✅ `switchMap()` cancels automatically      |


Redux Toolkit is great for managing application state and simple async flows like one-off API calls.

But once I need to handle continuous or concurrent streams of actions or events—such as live updates, polling, cancelable requests, or combined user + network events—RxJS becomes valuable.

It gives me operators like debounceTime, switchMap, merge, combineLatest, etc., so I can describe how these streams interact in a reactive way instead of imperatively managing timers or side-effects.


*/






/* 


Registry Pattern — a simple but powerful design pattern often used alongside others (like Factory or Singleton).

📖 Definition

👉 The Registry Pattern provides a centralized place (a registry) to store, manage, and retrieve shared objects or instances by a key or name.
It acts like a “directory” where you can register, look up, and reuse objects across the app — 
instead of creating new ones or passing them everywhere manually.

🔑 Key Points

Maintains a map/dictionary of key–object pairs.
Provides register, get, and unregister methods.
Prevents duplicate creation of shared resources.
Useful for global configurations, shared services, or factory lookups.

🧩 Example 1 — Simple Object Registry
class ServiceRegistry {
  constructor() {
    this.services = {}
  }

  register(name, instance) {
    this.services[name] = instance
  }

  get(name) {
    return this.services[name]
  }

  unregister(name) {
    delete this.services[name]
  }
}

// Usage
const registry = new ServiceRegistry()

registry.register("logger", { log: msg => console.log("🪵", msg) })
registry.register("authService", { login: user => console.log("🔐", user) })

const logger = registry.get("logger")
logger.log("System started!") // 🪵 System started!


👉 Centralized management — any part of the app can request a service by name.

🧩 Example 2 — Combined with Factory Pattern

You can use the Registry to store factory functions, not just instances.

class FactoryRegistry {
  constructor() {
    this.factories = {}
  }

  register(name, factoryFn) {
    this.factories[name] = factoryFn
  }

  create(name, ...args) {
    const factoryFn = this.factories[name]
    if (!factoryFn) throw new Error(`Factory ${name} not found`)
    return factoryFn(...args)
  }
}

// Usage
const registry = new FactoryRegistry()

registry.register("car", (brand) => ({ type: "car", brand }))
registry.register("bike", (brand) => ({ type: "bike", brand }))

const myCar = registry.create("car", "Tesla")
const myBike = registry.create("bike", "Yamaha")

console.log(myCar, myBike)


👉 This is often called a Factory Registry Pattern — it keeps all object builders organized in one place.

🧩 Example 3 — Singleton Service Registry
class Registry {
  static #instance = null
  constructor() {
    if (Registry.#instance) return Registry.#instance
    this.items = {}
    Registry.#instance = this
  }

  register(key, value) {
    this.items[key] = value
  }

  get(key) {
    return this.items[key]
  }
}

const reg1 = new Registry()
const reg2 = new Registry()
reg1.register("theme", "dark")

console.log(reg2.get("theme")) // dark (same instance)


👉 Using Singleton ensures there’s always one global registry.

💡 Common Use Cases

Dependency container for shared services (logger, API client, auth).
Plugin system where each plugin registers itself.
Global configuration store for app-wide settings.
Dynamic module loading (register factories, commands, or routes).
Testing / mocking — easily replace registered instances.

✅ Benefits

Centralized control of dependencies.
Easy to retrieve or swap implementations.
Reduces hard-coded imports and coupling.
Supports modular and pluggable architecture.

⚠️ Cons

Can hide dependencies (global state smell).
Harder to trace where things come from.
Misuse can lead to implicit coupling and debugging difficulty.

📝 Takeaway

👉 Registry Pattern = global dictionary for managing shared instances or factories.
👉 Often used with Singleton or Factory Pattern.
👉 Great for modular architectures or dependency management (but use sparingly).


MORE EXAMPLES


⚙️ 1️⃣ Backend (Node.js) – Service Registry

Imagine you have different services (logger, mailer, DB client).
Instead of importing them everywhere, you register them once and retrieve them when needed.

🧩 registry.js
// src/registry.js
class ServiceRegistry {
  constructor() {
    this.services = {}
  }

  register(name, instance) {
    this.services[name] = instance
  }

  get(name) {
    const service = this.services[name]
    if (!service) throw new Error(`Service '${name}' not found`)
    return service
  }
}

export const registry = new ServiceRegistry()

🧩 registerServices.js
// src/registerServices.js
import { registry } from './registry.js'
import { createLogger } from './services/logger.js'
import { createMailer } from './services/mailer.js'
import { createDatabase } from './services/database.js'

export const initRegistry = () => {
  registry.register('logger', createLogger())
  registry.register('mailer', createMailer())
  registry.register('db', createDatabase())
}

🧩 index.js
import express from 'express'
import { registry } from './registry.js'
import { initRegistry } from './registerServices.js'

initRegistry()

const app = express()

app.get('/users', async (req, res) => {
  const db = registry.get('db')
  const users = await db.query('SELECT * FROM users')
  res.json(users)
})

app.listen(3000, () => {
  registry.get('logger').info('🚀 Server started on port 3000')
})


✅ Benefits

All dependencies are registered once.

Any module can request them without circular imports.

Perfect for plugins or dynamic services (swap mailer with SMS easily).

⚛️ 2️⃣ Frontend (React + Redux Toolkit) – UI Registry

Sometimes you need dynamic registration of UI modules or components (plugins, widgets, feature cards).

🧩 uiRegistry.js
class UIRegistry {
  constructor() {
    this.components = {}
  }

  register(name, component) {
    this.components[name] = component
  }

  get(name) {
    return this.components[name]
  }
}

export const uiRegistry = new UIRegistry()

🧩 registerUI.js
import { uiRegistry } from './uiRegistry'
import ChartCard from './components/ChartCard'
import StatsCard from './components/StatsCard'
import TodoWidget from './components/TodoWidget'

export const initUIRegistry = () => {
  uiRegistry.register('chart', ChartCard)
  uiRegistry.register('stats', StatsCard)
  uiRegistry.register('todo', TodoWidget)
}

🧩 DynamicRenderer.jsx
import React from 'react'
import { uiRegistry } from '../uiRegistry'

export default function DynamicRenderer({ type, props }) {
  const Component = uiRegistry.get(type)
  if (!Component) return <div>⚠ Unknown component: {type}</div>
  return <Component {...props} />
}


👉 Now you can render components dynamically:

<DynamicRenderer type="stats" props={{ value: 42 }} />


✅ Benefits

Dynamically load new modules or plugins.
Avoids giant switch statements.
Enables extensible dashboards or plugin systems.

🧠 3️⃣ When to Use the Registry Pattern

Use it when:

You need a central directory for shared instances (backend) or components (frontend).
You want to dynamically register and resolve services/plugins.
You need swappable implementations (test mocks, environment-specific versions).

Avoid it when:

Simple dependency injection or context is enough.
Global state makes testing/debugging harder.


*/





/* 


both Registry and Singleton patterns deal with managing object instances and centralized access.
They both can give you a globally accessible object without passing it through constructors or props.
That’s why at first glance, they look almost identical.



| Pattern       | Scope                                                                    | Example                                                       |
| ------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| **Singleton** | Only one instance for a specific class (global unique)                   | One database connection shared everywhere                     |
| **Registry**  | Can hold *multiple* instances (even of the same class) identified by key | Multiple DB connections: `db_main`, `db_reporting`, `db_test` |


👉 So:

Singleton → “only one object allowed”

Registry → “many objects allowed, all stored and retrieved by name or ID”

🔍 In Practice

Singleton Example

class DBConnection {
  static instance
  constructor() {
    if (DBConnection.instance) return DBConnection.instance
    this.id = Math.random()
    DBConnection.instance = this
  }
}

const db1 = new DBConnection()
const db2 = new DBConnection()
console.log(db1 === db2) // true ✅ only one instance


Registry Example

class DBRegistry {
  static registry = {}
  static register(name, instance) {
    DBRegistry.registry[name] = instance
  }
  static get(name) {
    return DBRegistry.registry[name]
  }
}

DBRegistry.register("main", new DBConnection())
DBRegistry.register("analytics", new DBConnection())
console.log(DBRegistry.get("main") === DBRegistry.get("analytics")) // false ✅ different instances

📝 Takeaway

👉 Singleton → controls how many instances exist (enforces one).
👉 Registry → controls where instances are stored and retrieved (manages many).

You can even combine them —
each object in a Registry could be a Singleton, and the Registry becomes your global directory for all singletons in the system.



let’s clarify how each object in a registry can be a singleton, and how the registry itself acts as a global directory for those singletons.

⚙️ Step 1: Each Object Implements Singleton Behavior

Each service ensures only one instance of itself is ever created.
You can do that with a static field inside the class.

class Logger {
  static instance
  constructor() {
    if (Logger.instance) return Logger.instance
    Logger.instance = this
  }
  log(msg) { console.log("🪵", msg) }
}

class Database {
  static instance
  constructor() {
    if (Database.instance) return Database.instance
    Database.instance = this
  }
  connect() { console.log("🧩 Connected!") }
}


👉 Each of these classes guarantees it will only have one instance no matter how many times you call new.

⚙️ Step 2: The Registry Manages Them Globally

The registry just stores references to those singleton instances.

class ServiceRegistry {
  constructor() {
    this.services = {}
  }

  register(name, instance) {
    this.services[name] = instance
  }

  get(name) {
    return this.services[name]
  }
}

export const registry = new ServiceRegistry()

⚙️ Step 3: Combine Them Together
const logger = new Logger()
const db = new Database()

registry.register("logger", logger)
registry.register("database", db)

// Anywhere in your app:
const log = registry.get("logger")
const database = registry.get("database")

log.log("🚀 App started")
database.connect()


✅ Each object (Logger, Database) is a singleton
✅ The registry provides global access to them by key
✅ Together they form a Service Locator pattern, but powered by Singleton logic inside


┌─────────────────────┐
│     Registry        │
│ ─────────────────── │
│ "logger" → Logger() │  ← Singleton instance
│ "db"     → Database()│  ← Singleton instance
│ "mailer" → Mailer() │  ← Singleton instance
└─────────────────────┘
           ▲
           │  get("logger")
           │
        App Code


🔍 Why Combine Them

Because:
Each service enforces single-instance behavior internally (Singleton)
The Registry provides a lookup layer to access those services by name
It scales better — you can add new singletons without changing the global access pattern

| Concept       | Role                                           |
| ------------- | ---------------------------------------------- |
| **Singleton** | Guarantees only one instance of each service   |
| **Registry**  | Stores and retrieves those singletons globally |
| **Together**  | Global directory of unique shared objects      |



Registry Pattern even smarter by adding lazy-loading (on-demand initialization).

This means:
👉 Services are not created until first time you request them, which saves startup time and memory — especially for large Node.js apps.

⚙️ Step 1: Lazy-Loaded Registry
// registry.js
class LazyRegistry {
  constructor() {
    this.factories = {}  // functions to create services
    this.instances = {}  // cached singletons
  }

  // Register a factory instead of a ready instance
  register(name, factoryFn) {
    this.factories[name] = factoryFn
  }

  // Get or lazily create the service
  get(name) {
    if (this.instances[name]) return this.instances[name]

    const factory = this.factories[name]
    if (!factory) throw new Error(`No factory registered for '${name}'`)

    const instance = factory()
    this.instances[name] = instance
    return instance
  }
}

export const registry = new LazyRegistry()


✅ Keeps two maps:

factories → how to build the service

instances → built services (cached after first use)

⚙️ Step 2: Register Factories (Not Instances)
// registerServices.js
import { registry } from './registry.js'
import { createLogger } from './services/logger.js'
import { createDatabase } from './services/database.js'
import { createMailer } from './services/mailer.js'

export const initRegistry = () => {
  registry.register('logger', createLogger)
  registry.register('database', createDatabase)
  registry.register('mailer', createMailer)
}


👉 Each createXYZ returns the instance when called — but we don’t call it yet.

⚙️ Step 3: Use Services on Demand
// index.js
import express from 'express'
import { registry } from './registry.js'
import { initRegistry } from './registerServices.js'

initRegistry()

const app = express()

app.get('/', async (req, res) => {
  const logger = registry.get('logger')    // created now
  const db = registry.get('database')      // created now
  const mailer = registry.get('mailer')    // maybe later

  logger.info('Root route accessed')
  const users = await db.query('SELECT * FROM users')
  res.json(users)
})

app.listen(3000, () => {
  registry.get('logger').info('🚀 Server started on port 3000')
})


👉 First time .get('logger') is called → factory runs → instance stored.
Next time you call .get('logger') → it reuses the cached singleton.

⚙️ Step 4: Example Service Factories
// services/logger.js
export const createLogger = () => ({
  info: msg => console.log("ℹ️", msg),
  error: msg => console.error("❌", msg),
})

// services/database.js
export const createDatabase = () => {
  console.log("🧩 Database connected!")
  return {
    query: async (q) => {
      console.log("Running:", q)
      return [{ id: 1, name: "Alice" }]
    }
  }
}


✅ Each service initializes only when first requested.

┌────────────────────────┐
│       LazyRegistry     │
│────────────────────────│
│ factories: {           │
│   db → createDatabase  │
│   log → createLogger   │
│ }                      │
│ instances: {}          │
└────────────────────────┘
       │
       ▼
   get("db")  → builds → caches → returns instance

🧩 Bonus – Lazy Registry with Async Factories

If some factories are async (like connecting to DB), support Promises:

async get(name) {
  if (this.instances[name]) return this.instances[name]

  const factory = this.factories[name]
  if (!factory) throw new Error(`No factory for '${name}'`)

  const instance = await factory()
  this.instances[name] = instance
  return instance
}

📝 Takeaway

👉 The Lazy Registry Pattern lets you:

Register factory functions, not instances
Initialize services only when needed
Cache them for future access (Singleton behavior per service)
Keep your startup fast and modular
*/





/* 


Mixin Pattern — one of the most useful and flexible patterns in JavaScript and TypeScript.

📖 Definition

👉 A Mixin Pattern is a design pattern where you define reusable chunks of behavior (methods or properties) 
and “mix” them into other classes or objects, without using traditional inheritance.
usually using Object.assign or higher-order functions to copy/merge properties.
It allows composition over inheritance — you can share logic across classes without forming deep inheritance chains.


🔑 Key Concepts

A mixin is simply an object or function containing reusable behavior.
Classes or objects can “mixin” that behavior by copying or merging its properties.
Multiple mixins can be combined into one class — no single-inheritance limitation.

Commonly implemented using Object.assign() or higher-order functions.

🧩 Example 1 — Basic Object Mixin
const canEat = {
  eat() { console.log("🍎 Eating...") }
}

const canWalk = {
  walk() { console.log("🚶 Walking...") }
}

const person = {}
Object.assign(person, canEat, canWalk)

person.eat()   // 🍎 Eating...
person.walk()  // 🚶 Walking...


👉 We combined behaviors (canEat, canWalk) into one object (person).
👉 No inheritance — just composition.

🧩 Example 2 — Class Mixin with Object.assign
const canFly = {
  fly() { console.log("🕊️ Flying...") }
}

const canSing = {
  sing() { console.log("🎵 Singing...") }
}

class Bird {
  constructor(name) {
    this.name = name
  }
}

Object.assign(Bird.prototype, canFly, canSing)

const parrot = new Bird("Parrot")
parrot.fly()
parrot.sing()


✅ The Bird class gains fly and sing without extending multiple classes.

🧩 Example 3 — Functional Mixin (More Powerful)

You can create mixins as functions that enhance classes dynamically.

const canSwim = (Base) => class extends Base {
  swim() { console.log(`${this.name} is swimming 🏊`) }
}

➡ It’s a function that takes a class (the Base) and returns a new class that extends it with extra methods.

const canDive = (Base) => class extends Base {
  dive() { console.log(`${this.name} dives deep 🤿`) }
}

➡ It’s a function that takes a class (the Base) and returns a new class that extends it with extra methods.

class Animal {
  constructor(name) {
    this.name = name
  }
}

class Fish extends canDive(canSwim(Animal)) {}

const shark = new Fish("Shark")
shark.swim()
shark.dive()


✅ This is called a functional mixin chain — wrapping behaviors around a base class.
✅ Each mixin returns a new class extending the previous one.

💡 Use Cases

Shared behaviors across unrelated classes (e.g., logging, event emitting, validation).
React / Vue / Angular: old-style reusable logic before hooks and composition APIs.
Node.js: common behaviors across services (e.g., retry logic, config loader).
Games / simulations: multiple capabilities (Flyable, Runnable, Swimmable, etc.)

✅ Benefits

Encourages composition over inheritance.
Easy to reuse and combine behaviors.
Avoids deep inheritance hierarchies.
Allows multiple inheritance-like behavior safely.

⚠️ Cons

Can lead to naming conflicts (if two mixins define the same method).
Harder to trace origin of methods (especially with many mixins).
May complicate debugging if overused.

📝 Takeaway

👉 Mixin Pattern = add reusable features to classes/objects without inheritance.
👉 Achieved via Object.assign() or functional wrappers.
👉 Encourages flexible composition and modularity.



Mixin Pattern in a React app to add reusable behaviors like logging, validation, or event handling — without creating deep inheritance hierarchies or duplicating logic.

We’ll use functional mixins that enhance either classes or custom hooks.

⚙️ 1️⃣ Reusable Logger Mixin
🧩 withLogger.js
// Higher-order function that adds logging behavior
export const withLogger = (Base) =>
  class extends Base {
    log(message) {
      console.log(`🪵 [${this.constructor.name}] ${message}`)
    }
  }

🧩 usage with a React class component
import React from 'react'
import { withLogger } from './withLogger'

class UserProfile extends React.Component {
  componentDidMount() {
    this.log('Component mounted!')
  }

  render() {
    return <div>Hello {this.props.name}</div>
  }
}

// Apply mixin
export default withLogger(UserProfile)


✅ Any component wrapped by withLogger can call this.log() and automatically prefix logs with its class name.

⚙️ 2️⃣ Validation Mixin for Forms
🧩 withValidation.js
export const withValidation = (Base) =>
  class extends Base {
    validateField(name, value) {
      if (!value) return `${name} is required`
      if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'Invalid email'
      return null
    }
  }

🧩 Apply both Logger + Validation
import { withLogger } from './withLogger'
import { withValidation } from './withValidation'

class FormBase {
  constructor(form) {
    this.form = form
  }
}

class LoginForm extends withLogger(withValidation(FormBase)) {
  submit() {
    const err = this.validateField('email', this.form.email)
    if (err) this.log(`❌ Validation failed: ${err}`)
    else this.log('✅ Form submitted successfully!')
  }
}

const form = new LoginForm({ email: '' })
form.submit()


✅ Combines multiple behaviors — logging + validation — without inheritance hell.

⚛️ 3️⃣ Functional Mixins for React Hooks

If you’re using functional components, you can apply mixins as custom hooks.

🧩 useLogger.js
import { useCallback } from 'react'

export const useLogger = (name) => {
  return useCallback((msg) => {
    console.log(`🪵 [${name}] ${msg}`)
  }, [name])
}

🧩 useValidation.js
export const useValidation = () => {
  const validateField = (name, value) => {
    if (!value) return `${name} is required`
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Invalid email'
    return null
  }
  return { validateField }
}

🧩 Combine Them in a Component
import React, { useState } from 'react'
import { useLogger } from './useLogger'
import { useValidation } from './useValidation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const log = useLogger('LoginForm')
  const { validateField } = useValidation()

  const handleSubmit = () => {
    const err = validateField('email', email)
    if (err) log(`❌ ${err}`)
    else log('✅ Form submitted!')
  }

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}


✅ Functional mixins via hooks = modern equivalent of classical mixins.
✅ You can reuse useLogger, useValidation, or useEventBus in any component easily.


| Concept     | React Class                                       | React Function                 |
| ----------- | ------------------------------------------------- | ------------------------------ |
| **Mixin**   | HOC or function that extends a base class         | Custom Hook that adds behavior |
| **Example** | `withLogger(MyComponent)`                         | `useLogger('ComponentName')`   |
| **Goal**    | Reuse logic across components without inheritance | Reuse logic via hooks          |


📝 Takeaway

👉 Mixins in React = composable behaviors.
👉 For modern React, prefer custom hooks (functional mixins).
👉 For class-based components or shared utilities, use higher-order mixin functions.


*/




/* 

Proxy Pattern, one of the most powerful and modern patterns in JavaScript, especially since JS has a built-in Proxy object natively.

📖 Definition

👉 The Proxy Pattern provides a substitute or placeholder for another object to control access to it.

You don’t interact with the real object directly — you interact with the proxy, which can:

Control access

Add behavior before/after actions

Lazily load resources

Perform validation, logging, or caching

🧠 In Simple Terms

A proxy is like a middleman between the client and the real object.
It decides what happens when you try to read, write, or call methods on that object.

⚙️ Syntax (built-in Proxy in JS)
const proxy = new Proxy(target, handler)


target: the real object being proxied

handler: an object with “traps” — special methods that intercept operations like get, set, apply, etc.

🧩 Example 1 — Logging Access
const user = { name: "Hesham", age: 33 }

const userProxy = new Proxy(user, {
  get(target, prop) {
    console.log(`🔍 Accessing ${prop}`)
    return target[prop]
  },
  set(target, prop, value) {
    console.log(`✏️ Setting ${prop} = ${value}`)
    target[prop] = value
    return true
  }
})

console.log(userProxy.name) // 🔍 Accessing name
userProxy.age = 34          // ✏️ Setting age = 34


✅ Used for logging, debugging, and property validation.

🧩 Example 2 — Validation Proxy
const person = { age: 0 }

const validator = new Proxy(person, {
  set(target, prop, value) {
    if (prop === "age" && value < 0) {
      throw new Error("🚫 Age cannot be negative!")
    }
    target[prop] = value
    return true
  }
})

validator.age = 20  // ✅ works
validator.age = -5  // ❌ throws error


✅ Useful in form handling, schema validation, or safe data APIs.

🧩 Example 3 — Lazy Loading (Virtual Proxy)
const heavyData = {
  load() {
    console.log("🧩 Loading heavy data...")
    return { data: [1, 2, 3, 4] }
  }
}

const dataProxy = new Proxy(heavyData, {
  get(target, prop) {
    if (!target._cached) {
      target._cached = target.load()
    }
    return target._cached[prop]
  }
})

console.log(dataProxy.data) // 🧩 Loading heavy data...
console.log(dataProxy.data) // Cached


✅ Loads expensive data only when needed, not at startup.

🧩 Example 4 — Function Proxy (Intercept Calls)
function multiply(a, b) {
  return a * b
}

const proxyFn = new Proxy(multiply, {
  apply(target, thisArg, args) {
    console.log(`⚙️ Called with args: ${args}`)
    return target(...args)
  }
})

proxyFn(2, 3) // ⚙️ Called with args: 2,3 → 6


✅ Useful for profiling, caching, or enforcing rate limits on function calls.



| Use Case                | Description                                        |
| ----------------------- | -------------------------------------------------- |
| **Access Control**      | Limit who can modify or read sensitive data        |
| **Validation**          | Enforce constraints on property assignments        |
| **Virtual Proxy**       | Delay expensive operations (lazy loading)          |
| **Caching Proxy**       | Cache API results or computations                  |
| **Logging / Debugging** | Monitor usage of objects                           |
| **Data Binding**        | Detect changes to re-render UI (used by Vue.js)    |
| **API Gateways**        | Wrap remote service calls with retry or auth logic |


✅ Benefits

Transparent way to intercept behavior
No modification to original class or function
Works for both objects and functions
Great for reactive systems or AOP-like logic

⚠️ Cons

Adds complexity if overused
Can impact performance with many traps
Harder debugging if proxies wrap many layers

🧠 Summary

👉 Proxy Pattern = an intermediary object that controls access to another.
👉 Built into JS natively with the Proxy constructor.
👉 Used for logging, validation, caching, access control, data binding, etc.

MORE USE CASES  


A Proxy wraps an object (state, API, or config) and intercepts interactions with it (get, set, apply, etc.).
In React, this is valuable for state tracking, debugging, performance, or access control without mutating existing logic.

⚛️ 1️⃣ Use Case — Proxy for Logging Redux State Mutations

If you want to log when state changes (without touching reducers):

import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"

const stateProxyHandler = {
  set(target, prop, value) {
    console.log(`🔍 State changed: ${prop} =`, value)
    target[prop] = value
    return true
  }
}

const store = configureStore({
  reducer: (state = {}, action) => {
    const newState = {
      user: userReducer(state.user, action),
    }
    return new Proxy(newState, stateProxyHandler)
  },
})

export default store


✅ Every time Redux produces new state, the Proxy intercepts property updates for debugging or metrics.

⚙️ 2️⃣ Use Case — Proxy for Smart API Clients (Redux Thunk or RTK Query)

You can wrap your API client in a proxy to automatically add headers, retry, or log calls:

const apiClient = {
  get: (url) => fetch(url).then(res => res.json()),
  post: (url, body) => fetch(url, { method: "POST", body: JSON.stringify(body) })
}

const apiProxy = new Proxy(apiClient, {
  get(target, prop) {
    if (prop in target) {
      return (...args) => {
        console.log(`📡 Calling API: ${prop}(${args.join(", ")})`)
        return target[prop](...args)
      }
    }
  }
})

// in Redux thunk or RTK Query baseQuery
export const fetchUser = () => async (dispatch) => {
  const user = await apiProxy.get("/api/user")
  dispatch(setUser(user))
}


✅ Automatically logs or modifies API calls globally without touching each thunk or slice.

⚛️ 3️⃣ Use Case — Proxy for Form State Validation in React

Instead of writing separate validation hooks, use a Proxy to auto-validate inputs:

import React, { useState } from "react"

export default function ProfileForm() {
  const [form, setForm] = useState({ name: "", age: 0 })
  const [error, setError] = useState("")

  const formProxy = new Proxy(form, {
    set(target, prop, value) {
      if (prop === "age" && value < 0) {
        setError("🚫 Age cannot be negative")
        return false
      }
      setError("")
      target[prop] = value
      setForm({ ...target })
      return true
    },
  })

  return (
    <div>
      <input onChange={(e) => (formProxy.name = e.target.value)} placeholder="Name" />
      <input type="number" onChange={(e) => (formProxy.age = +e.target.value)} placeholder="Age" />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}


✅ The proxy automatically validates input before updating state.

⚙️ 4️⃣ Use Case — Proxy for Selective State Access in Redux Toolkit

You can expose only certain parts of the state safely to components:

const secureState = (state) =>
  new Proxy(state, {
    get(target, prop) {
      if (prop === "token") throw new Error("⛔ Direct token access is forbidden")
      return target[prop]
    },
  })

// usage in component
const user = useSelector((state) => secureState(state.user))


✅ Prevents accidental sensitive data exposure (e.g., token).

🧩 5️⃣ Use Case — Proxy for Auto-dispatching Redux Actions

Wrap the store’s dispatch with a Proxy to automatically log or conditionally block actions.

const dispatchProxy = new Proxy(store.dispatch, {
  apply(target, thisArg, args) {
    const [action] = args
    if (action.type.includes("delete")) {
      console.warn("⚠️ Deletion action detected:", action)
    }
    return Reflect.apply(target, thisArg, args)
  }
})

// use dispatchProxy instead of store.dispatch
dispatchProxy({ type: "user/delete", payload: 3 })


✅ Intercepts every Redux dispatch for logging, monitoring, or permission checks.


| Use Case               | Proxy Target    | Purpose                   |
| ---------------------- | --------------- | ------------------------- |
| State Mutation Logging | Redux state     | Debug changes             |
| API Client Wrapper     | Fetch / Axios   | Logging, retries, auth    |
| Form Validation        | Form object     | Auto validation           |
| Secure State Access    | Redux selectors | Protect sensitive data    |
| Dispatch Wrapper       | store.dispatch  | Audit and monitor actions |



Why Use Proxy with Redux Toolkit
You can inject side effects safely without mutating reducers.
Centralized logic — less boilerplate across slices.
Useful for cross-cutting concerns (logging, caching, permissions).
Perfect for building custom middleware-like layers without using Redux middleware directly.

*/



/* 

The Adapter Pattern allows objects with incompatible interfaces to work together.
It acts as a translator or bridge between two objects so they can collaborate without changing their existing code.

🧠 Key Ideas

👉 Used when two classes or modules can’t work together because of different method names or data formats
👉 The adapter wraps one object and presents a new interface that the client expects
👉 Follows the composition over inheritance principle (adapter contains the adaptee, doesn’t extend it)
👉 Often used in legacy system integrations, API conversions, and third-party library wrapping
👉 Sits between two incompatible systems.
👉 Converts input/output or method formats.
👉 Keeps the original implementation untouched (no modification).


💡 Examples
Example 1 — Basic Interface Adapter
class OldLogger {
  logMessage(message) {
    console.log(`Old Logger: ${message}`);
  }
}

class NewLogger {
  write(message) {
    console.log(`New Logger: ${message}`);
  }
}

// Adapter
class LoggerAdapter {
  constructor(newLogger) {
    this.newLogger = newLogger;
  }
  logMessage(message) {
    this.newLogger.write(message);
  }
}

// Usage
const logger = new LoggerAdapter(new NewLogger());
logger.logMessage("Adapter pattern in action!");


✅ Old system expects logMessage but new one has write. The adapter fixes that.

Example 2 — API Response Adapter
// API V1 returns user like:
const userV1 = { name: "Alice", age: 30 };

// API V2 returns user differently:
const userV2 = { fullName: "Alice", yearsOld: 30 };

// Adapter
function userAdapter(v2User) {
  return {
    name: v2User.fullName,
    age: v2User.yearsOld
  };
}

console.log(userAdapter(userV2)); // Works like V1 now


✅ Helps migrate between API versions without breaking old code.

Example 3 — Integrating Third-Party Libraries
class StripePayment {
  makePayment(amount) {
    console.log(`Paid ${amount} via Stripe`);
  }
}

class PayPalPayment {
  sendPayment(amount) {
    console.log(`Paid ${amount} via PayPal`);
  }
}

// Adapter to unify payment interfaces
class PayPalAdapter {
  constructor(paypal) {
    this.paypal = paypal;
  }
  makePayment(amount) {
    this.paypal.sendPayment(amount);
  }
}

// Usage
function processPayment(paymentProcessor, amount) {
  paymentProcessor.makePayment(amount);
}

processPayment(new StripePayment(), 100);
processPayment(new PayPalAdapter(new PayPalPayment()), 200);


✅ You can swap payment gateways seamlessly.

Example 4 — DOM / Framework Compatibility
// Old code using jQuery
const jQueryService = {
  getText: (selector) => $(selector).text()
};

// Modern replacement using plain JS
const VanillaService = {
  getContent: (selector) => document.querySelector(selector).textContent
};

// Adapter for jQuery interface
class jQueryAdapter {
  constructor(vanilla) {
    this.vanilla = vanilla;
  }
  getText(selector) {
    return this.vanilla.getContent(selector);
  }
}


✅ Smooth migration from jQuery to vanilla JS or React-like DOM access.

More Examples

🧩 — React + API Adapter

Imagine your Redux state expects data in this format:

{ id, name, phone }


but the backend returns this:

{ userId, fullName, contactNumber }

Adapter Function
const userAdapter = (apiUser) => ({
  id: apiUser.userId,
  name: apiUser.fullName,
  phone: apiUser.contactNumber,
})

Usage in Redux Thunk or RTK Query
export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const res = await fetch("/api/user")
  const data = await res.json()
  return userAdapter(data)
})


✅ You isolate the transformation logic inside a clean adapter, not inside your reducers or components.

🧩 — Backend: Integrating Legacy and New API
// Legacy system returns data differently
class LegacyPaymentSystem {
  makePayment(amount) {
    return `Legacy payment of ${amount}`
  }
}

// New system expects this interface:
class ModernPaymentSystem {
  pay(amount) {}
}

// Adapter
class PaymentAdapter extends ModernPaymentSystem {
  constructor(legacySystem) {
    super()
    this.legacySystem = legacySystem
  }

  pay(amount) {
    return this.legacySystem.makePayment(amount)
  }
}

// Usage
const legacy = new LegacyPaymentSystem()
const modernPayment = new PaymentAdapter(legacy)
console.log(modernPayment.pay(100)) // Legacy payment of 100



⚙️ Use Cases

👉 Integrating old and new APIs
👉 Bridging third-party libraries with custom code
👉 Data format conversion between systems
👉 Implementing multi-provider interfaces (like multiple payment, map, or logging systems)
👉 Simplifying testing by mocking incompatible interfaces


| Scenario                      | Example                                                           |
| ----------------------------- | ----------------------------------------------------------------- |
| **API response mapping**      | Convert backend API shape → frontend model shape                  |
| **Library bridging**          | Wrap a legacy library with a modern interface                     |
| **Cross-service integration** | Make two microservices communicate with different message formats |
| **Adapter in React**          | Map props or context from one format to another                   |
| **Database migration**        | Wrap old DB API into new ORM-style API                            |


✅ Benefits

👉 Enables reuse of existing code without modification
👉 Decouples code from specific implementations
👉 Makes it easy to replace or upgrade dependencies
👉 Reduces risk when migrating legacy systems
👉 Simplifies integration of incompatible interfaces.
👉 Encapsulates translation logic cleanly.
👉 Increases flexibility and decoupling.

⚠️ Cons

👉 Adds an extra layer of abstraction (slightly more complexity)
👉 If overused, can make code harder to trace or debug
👉 May mask deeper design issues that should be refactored instead

📘 Takeaways

👉 Think of Adapter as a translator between two worlds
👉 Use when you can’t or shouldn’t modify the existing incompatible class
👉 Keep adapters thin and simple — just translate the interface, not the logic
👉 Combine well with patterns like Facade (to simplify interfaces) and Decorator (to extend behavior)


*/