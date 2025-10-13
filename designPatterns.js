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
Proxy  -> DONE
Adapter  -> DONE
Decorator  -> DONE
Composite  -> DONE
Bridge  -> DONE
Flyweight  -> DONE
Facade  -> DONE
Mixin  -> DONE
Registry  -> DONE

🔹 Behavioral Patterns
Observer  -> DONE
Strategy  -> DONE
Command  -> DONE
Iterator  -> DONE
State  -> DONE
Memento  -> DONE
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




/* 

📖 Definition

👉 The Decorator Pattern allows you to add new behaviors or responsibilities to an object dynamically, without modifying its existing class.
You “wrap” an object inside another object that adds extra features — like gift wrapping 🎁.


🧠 Key Ideas

👉 Used to extend object behavior at runtime, not compile-time
👉 Follows the Open/Closed Principle — open for extension, closed for modification
👉 Avoids deep inheritance trees
👉 Multiple decorators can wrap the same object in layers
👉 Works great with composition over inheritance

🧠 Key Idea

Decorators extend behavior by wrapping an existing object.
Multiple decorators can be stacked (chained).
The original object doesn’t need to know it’s being decorated.

⚙️ Real-world Analogy

Think of a coffee shop order system ☕:
Base object → “Plain Coffee”
Decorators → “Add Milk”, “Add Sugar”, “Add Caramel”
Each decorator adds something new but keeps the same interface (getCost(), getDescription()).


--------------------------------------------------------------------------------------------

💡 Examples
Example 1 — Basic Coffee Example ☕
class Coffee {
  cost() {
    return 5;
  }
}

// Decorators
function withMilk(coffee) {
  const cost = coffee.cost();
  coffee.cost = () => cost + 2;
  return coffee;
}

function withSugar(coffee) {
  const cost = coffee.cost();
  coffee.cost = () => cost + 1;
  return coffee;
}

// Usage
let myCoffee = new Coffee();
myCoffee = withMilk(myCoffee);
myCoffee = withSugar(myCoffee);

console.log(myCoffee.cost()); // 8


✅ Adds milk and sugar dynamically without changing the Coffee class.

Example 2 — Logging Decorator 🧾
function logExecution(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn(...args);
    console.log(`Result:`, result);
    return result;
  };
}

function multiply(a, b) {
  return a * b;
}

const loggedMultiply = logExecution(multiply);
loggedMultiply(3, 4);


✅ Adds logging behavior to any function dynamically.

Example 3 — UI Component Decorator 🎨
class Component {
  render() {
    console.log("Rendering base component");
  }
}

class BorderDecorator {
  constructor(component) {
    this.component = component;
  }
  render() {
    this.component.render();
    console.log("Adding border");
  }
}

class ShadowDecorator {
  constructor(component) {
    this.component = component;
  }
  render() {
    this.component.render();
    console.log("Adding shadow");
  }
}

// Usage
let component = new Component();
component = new BorderDecorator(component);
component = new ShadowDecorator(component);

component.render();


✅ Decorators stack and extend behavior in layers.

Example 4 — Middleware Decorator in Express-Style 🛠️
function authMiddleware(handler) {
  return (req) => {
    if (!req.user) throw new Error("Unauthorized");
    return handler(req);
  };
}

function logMiddleware(handler) {
  return (req) => {
    console.log("Request received:", req.url);
    return handler(req);
  };
}

function baseHandler(req) {
  return `Hello ${req.user}`;
}

// Apply decorators
let handler = baseHandler;
handler = authMiddleware(handler);
handler = logMiddleware(handler);

// Test
const req = { url: "/home", user: "Hesham" };
console.log(handler(req));


✅ Similar to how Express middleware or Redux enhancers work.

Example 5 — Class Decorator (ESNext Proposal) 🧱
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Car {
  @readonly
  brand = "Tesla";
}

const myCar = new Car();
myCar.brand = "BMW"; // Error in strict mode


✅ Example using decorator syntax (still experimental in JS).

---------------------------------------------------------------------------------

🧩 Example 1 — Simple JS Example
// Base component
class Coffee {
  cost() {
    return 5
  }
  description() {
    return "Plain Coffee"
  }
}

// Decorators
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee
  }
  cost() {
    return this.coffee.cost() + 2
  }
  description() {
    return this.coffee.description() + ", Milk"
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee
  }
  cost() {
    return this.coffee.cost() + 1
  }
  description() {
    return this.coffee.description() + ", Sugar"
  }
}

// Usage
let myCoffee = new Coffee()
myCoffee = new MilkDecorator(myCoffee)
myCoffee = new SugarDecorator(myCoffee)

console.log(myCoffee.description()) // ☕ Plain Coffee, Milk, Sugar
console.log(myCoffee.cost())        // 💵 8


✅ We added functionality (milk, sugar) without changing the Coffee class.

🧩 Example 2 — React-style Example: Higher-Order Components (HOC)

In React, the Decorator Pattern appears naturally as HOCs — components that wrap others to add extra behavior.

Example: withLogger
function withLogger(Component) {
  return function (props) {
    console.log(`🔍 Rendering ${Component.name}`)
    return <Component {...props} />
  }
}

function Button({ label }) {
  return <button>{label}</button>
}

const LoggedButton = withLogger(Button)

// Usage
<LoggedButton label="Click Me" />


✅ withLogger decorates Button by adding logging.
✅ You didn’t modify Button — just wrapped it.

🧩 Example 3 — Redux Middleware as Decorators

Redux middlewares act as decorators around dispatch.
Each middleware wraps the dispatch function and enhances it (e.g., logging, async handling).

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("🚀 Dispatching:", action)
  const result = next(action)
  console.log("📦 Next state:", store.getState())
  return result
}


✅ Each middleware wraps the dispatch process → classic Decorator Pattern in functional form.

--------------------------------------------------------------------------------------------------

⚙️ Use Cases

👉 Add functionality like logging, validation, caching, or retrying to functions
👉 Enhance UI components (borders, colors, animations)
👉 Extend network requests (e.g., add auth headers, retry logic)
👉 Create middleware-like behaviors in frameworks
👉 Add analytics or metrics to existing APIs

| Use Case                    | Example                                                          |
| --------------------------- | ---------------------------------------------------------------- |
| **UI Enhancements**         | Wrap React components to add styles, animations, logging         |
| **Cross-cutting concerns**  | Add logging, caching, validation without touching core logic     |
| **Middleware systems**      | Redux, Express.js middlewares, etc.                              |
| **Dynamic feature toggles** | Wrap existing services or components with extra logic at runtime |
| **Performance monitoring**  | Decorate API calls or UI updates for analytics                   |


✅ Benefits

👉 Extends functionality without modifying original code
👉 Allows dynamic and flexible composition of behaviors
👉 Reusable, modular, and testable code
👉 Encourages cleaner, smaller core classes
👉 Adds functionality without subclassing.
👉 Keeps classes small and focused.
👉 Enables dynamic and composable behaviors.
👉 Promotes open/closed principle (open for extension, closed for modification).

⚠️ Cons

👉 Can lead to many small wrappers (layering confusion)
👉 Debugging call chains can be harder
👉 Requires discipline to avoid decorator “overload”

📘 Takeaways

👉 Decorator = “Wrapper” that adds features dynamically
👉 Perfect when you need conditional or pluggable behaviors
👉 Works great with functional programming and higher-order functions
👉 Keep decorators simple, pure, and composable


🧠 Summary

👉 Decorator Pattern = dynamically wrap an object to add or modify behavior.
👉 In React, this shows up as Higher-Order Components (HOCs) or middlewares.
👉 Promotes flexibility, reusability, and clean architecture.

*/


/* 

⚖️ Decorator vs Mixin Pattern

| 🔹 Aspect                | 🧩 **Decorator Pattern**                                          | 🧩 **Mixin Pattern**                                                                  |
| ------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 💡 **Goal**              | Add *extra behavior* to a **specific object instance** at runtime | Add *shared behavior* to **multiple classes or objects** at definition time           |
| 🕒 **When applied**      | At **runtime** (you wrap an existing instance)                    | At **class creation time** (you merge or extend functionality)                        |
| ⚙️ **How it works**      | Wraps an existing object and intercepts or extends its behavior   | Copies or merges properties/methods into a class prototype or object                  |
| 🧠 **Key Concept**       | *Object wrapping* (composition)                                   | *Property mixing* (augmentation)                                                      |
| 🧩 **Modification Type** | Non-intrusive — doesn’t change the class                          | Intrusive — changes the prototype or object directly                                  |
| 📦 **Use Case Example**  | Add logging, validation, caching, retry logic dynamically         | Add utility or shared methods like `serialize()`, `clone()`, etc. to multiple classes |
| 🧰 **Example Analogy**   | Putting extra layers of clothing on someone                       | Giving everyone in a group a new skill                                                |

Decorator 🧱
class User {
  save() {
    console.log("Saving user");
  }
}

// Decorator adds logging to one instance
function logDecorator(user) {
  const originalSave = user.save;
  user.save = function() {
    console.log("Before save");
    originalSave.call(this);
    console.log("After save");
  };
  return user;
}

const user1 = logDecorator(new User());
user1.save(); // logs before & after


✅ Decorator affects only that instance, not all Users.

Mixin 🧬
const LoggerMixin = {
  log(message) {
    console.log(`[LOG]: ${message}`);
  }
};

class User {}
Object.assign(User.prototype, LoggerMixin);

const user1 = new User();
const user2 = new User();

user1.log("Hello"); // Works for all users
user2.log("Hi");    // Shared behavior


✅ Mixin augments the class itself — every instance gets the new method.

*/




/* 

🧩 Definition

The Composite Pattern lets you treat individual objects and groups of objects uniformly.
It organizes objects into tree structures (like folders, menus, or UI components) where composite (container) objects hold leaf (single) objects, 
but both share the same interface.

It represents part-whole hierarchies, so that a single object (a “leaf”) and a group of objects (a “composite”) can be handled using the same interface.

🧠 Real-world Analogy

Think of a folder structure on your computer 💻:
A file is a leaf node — it can’t contain other files.
A folder is a composite node — it can contain files or other folders.
Yet, both have the same operations (e.g., open(), delete(), rename()).

⚙️ Key Points

👉 Treat single objects and collections the same way.
👉 Usually involves a base class (or interface) that both leaves and composites extend.
👉 The composite holds references to children.

🧠 Key Ideas

👉 Treat a single object (leaf) and a collection of objects (composite) the same way
👉 Commonly used for hierarchical structures (tree-like data)
👉 Follows the Recursive Composition principle
👉 Allows you to add, remove, or execute actions on both single items and groups in a unified way

💡 Examples
Example 1 — File System 📂
// Component
class FileSystemItem {
  constructor(name) {
    this.name = name;
  }
  display(indent = 0) {}
}

// Leaf
class File extends FileSystemItem {
  display(indent = 0) {
    console.log(`${' '.repeat(indent)}📄 ${this.name}`);
  }
}

// Composite
class Folder extends FileSystemItem {
  constructor(name) {
    super(name);
    this.children = [];
  }
  add(item) {
    this.children.push(item);
  }
  remove(item) {
    this.children = this.children.filter((child) => child !== item);
  }
  display(indent = 0) {
    console.log(`${' '.repeat(indent)}📁 ${this.name}`);
    this.children.forEach((child) => child.display(indent + 2));
  }
}

// Usage
const root = new Folder("Root");
const images = new Folder("Images");
const docs = new Folder("Docs");

images.add(new File("photo.png"));
docs.add(new File("cv.pdf"));
root.add(images);
root.add(docs);
root.display();


✅ Both files and folders share the same interface — you can display() either.

Example 2 — UI Components 🧱
class UIComponent {
  render() {}
}

class Button extends UIComponent {
  render() {
    console.log("Render Button");
  }
}

class Text extends UIComponent {
  render() {
    console.log("Render Text");
  }
}

class Container extends UIComponent {
  constructor() {
    super();
    this.children = [];
  }
  add(component) {
    this.children.push(component);
  }
  render() {
    console.log("Render Container");
    this.children.forEach((child) => child.render());
  }
}

// Usage
const page = new Container();
page.add(new Text());
page.add(new Button());
page.render();


✅ Perfect example for React-like component trees.

Example 3 — Menu System 🍔
class MenuItem {
  constructor(name, price = 0) {
    this.name = name;
    this.price = price;
  }
  getPrice() {
    return this.price;
  }
}

class Menu extends MenuItem {
  constructor(name) {
    super(name);
    this.items = [];
  }
  add(item) {
    this.items.push(item);
  }
  getPrice() {
    return this.items.reduce((sum, item) => sum + item.getPrice(), 0);
  }
}

// Usage
const burger = new MenuItem("Burger", 10);
const fries = new MenuItem("Fries", 5);
const lunchCombo = new Menu("Lunch Combo");
lunchCombo.add(burger);
lunchCombo.add(fries);

console.log(lunchCombo.getPrice()); // 15


✅ Combines multiple menu items into one composite meal.


🧩 Example 1 — Basic JS Example
// Component (base interface)
class Graphic {
  draw() {}
}

// Leaf
class Circle extends Graphic {
  draw() {
    console.log("⚪ Drawing a Circle")
  }
}

class Square extends Graphic {
  draw() {
    console.log("⬛ Drawing a Square")
  }
}

// Composite
class Drawing extends Graphic {
  constructor() {
    super()
    this.children = []
  }

  add(child) {
    this.children.push(child)
  }

  draw() {
    console.log("🖼️ Drawing composed elements:")
    this.children.forEach(child => child.draw())
  }
}

// Usage
const circle = new Circle()
const square = new Square()

const drawing = new Drawing()
drawing.add(circle)
drawing.add(square)

drawing.draw()


✅ You can call draw() on Circle, Square, or Drawing — they all respond the same way.

🧩 Example 2 — React Component Tree (Conceptual)

React’s component hierarchy is a real-life example of the Composite Pattern.
Each component can contain other components, yet both are rendered the same way via render().

function Leaf({ text }) {
  return <li>{text}</li>
}

function Group({ items }) {
  return (
    <ul>
      {items.map((item, i) =>
        typeof item === "string" ? <Leaf key={i} text={item} /> : <Group key={i} items={item} />
      )}
    </ul>
  )
}

// Usage
const data = ["Task 1", ["Subtask 1.1", "Subtask 1.2"], "Task 2"]
<Group items={data} />


✅ Leaf and Group both use the same interface (React component).
✅ React’s recursive render model is essentially a Composite Pattern in action.

🧩 Example 3 — File System Example
class FileSystemItem {
  constructor(name) {
    this.name = name
  }
  display(indent = 0) {}
}

class File extends FileSystemItem {
  display(indent = 0) {
    console.log(`${" ".repeat(indent)}📄 ${this.name}`)
  }
}

class Folder extends FileSystemItem {
  constructor(name) {
    super(name)
    this.children = []
  }

  add(item) {
    this.children.push(item)
  }

  display(indent = 0) {
    console.log(`${" ".repeat(indent)}📁 ${this.name}`)
    this.children.forEach(child => child.display(indent + 2))
  }
}

// Usage
const root = new Folder("root")
const docs = new Folder("docs")
const img = new Folder("images")

docs.add(new File("resume.pdf"))
docs.add(new File("notes.txt"))
img.add(new File("logo.png"))

root.add(docs)
root.add(img)

root.display()


✅ Output shows a full hierarchy with folders and files rendered identically using .display().




⚙️ Use Cases

👉 File/folder systems
👉 UI component trees
👉 Menu structures (menus, submenus, items)
👉 Organization hierarchies (manager → employees)
👉 Scene graphs (3D objects, game engines)
👉 DOM elements (each node can contain child nodes)

| Use Case                      | Example                                     |
| ----------------------------- | ------------------------------------------- |
| **UI components**             | React tree, menu systems, dashboards        |
| **File systems**              | Directory & file management                 |
| **Organization hierarchy**    | Departments, teams, employees               |
| **Scene graphs / 3D objects** | Nodes and sub-objects (e.g., in Three.js)   |
| **Game objects**              | Parent-child relationships between entities |


✅ Benefits

👉 Uniform treatment of simple and complex objects
👉 Simplifies client code — no need to check for object type
👉 Easy to extend (add new types of components)
👉 Enables powerful recursive operations
👉 Simplifies code that deals with hierarchies.
👉 Enables recursion naturally.
👉 Makes adding new node types easy.
👉 Promotes uniform treatment of single and composite objects.

⚠️ Cons

👉 Can make system overly general and complex
👉 Harder to restrict structure rules (e.g., prevent adding folders inside files)
👉 Can make debugging tree logic tricky

📘 Takeaways

👉 Think of Composite as a tree structure where everything behaves the same way
👉 Perfect for nested data or recursive rendering
👉 Follow the rule: “treat individual and composite objects uniformly”
👉 Often used internally in frameworks like React, DOM, and Scene Graphs

🧠 Summary

👉 Composite Pattern = treat single objects and groups the same way.
👉 Great for tree-like structures.
👉 Used in React component trees, file systems, and organizational hierarchies.

*/




/* 

The Composite Pattern and the Registry Pattern can look alike because both involve managing collections of objects — but their intent and behavior are quite different. Let’s break down the distinction clearly 👇

⚖️ Composite vs Registry Pattern
| 🔹 Aspect              | 🧩 **Composite Pattern**                                                                                    | 🧩 **Registry Pattern**                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 💡 **Purpose**         | Represent a **tree hierarchy** where individual (leaf) and grouped (composite) objects are treated the same | Maintain a **centralized lookup table** (like a dictionary or service container) for storing and retrieving objects by name or key |
| 🧠 **Core Idea**       | *Part–Whole Hierarchy* — objects can contain other objects of the same type                                 | *Global Directory* — a single access point for multiple instances                                                                  |
| 🏗️ **Structure**      | Recursive — each composite can have children that can themselves be composites                              | Flat — a simple collection or map of named objects                                                                                 |
| ⚙️ **Operations**      | Apply the same operation (e.g., render, execute) recursively to all children                                | Retrieve, register, or unregister instances (no recursive behavior)                                                                |
| 🧩 **Example Analogy** | A folder that contains files and subfolders                                                                 | A phonebook mapping names to numbers                                                                                               |
| 📦 **Typical Methods** | `add()`, `remove()`, `operation()` (recursive traversal)                                                    | `register()`, `get()`, `unregister()` (key-value management)                                                                       |


💡 Example Comparison
Composite Pattern 🧱 (Tree)
class Component {
  operation() {}
}

class Leaf extends Component {
  operation() {
    console.log("Leaf operation");
  }
}

class Composite extends Component {
  constructor() {
    super();
    this.children = [];
  }
  add(child) {
    this.children.push(child);
  }
  operation() {
    this.children.forEach(child => child.operation());
  }
}

const root = new Composite();
const branch = new Composite();
branch.add(new Leaf());
root.add(branch);
root.add(new Leaf());
root.operation();


✅ Recursive — calling operation() on root triggers it for all children.

Registry Pattern 🗃️ (Lookup)
class ServiceRegistry {
  constructor() {
    this.services = new Map();
  }
  register(name, instance) {
    this.services.set(name, instance);
  }
  get(name) {
    return this.services.get(name);
  }
  unregister(name) {
    this.services.delete(name);
  }
}

// Usage
const registry = new ServiceRegistry();
registry.register("logger", { log: msg => console.log(msg) });
registry.register("db", { connect: () => console.log("Connected") });

registry.get("logger").log("Hello");
registry.get("db").connect();


✅ Flat storage — no hierarchy, just key-based access.

🧩 Use Cases

👉 Composite Pattern
🖐 UI component trees
🖐 File/folder systems
🖐 Game entity hierarchies
🖐 Organization or scene graphs

👉 Registry Pattern
🖐 Dependency injection containers
🖐 Plugin or module registration
🖐 Singleton or factory managers
🖐 Service discovery and lookups

📘 Takeaways

👉 Composite = Structure (hierarchical organization of objects)
👉 Registry = Access (central lookup of existing objects)

👉 Composite solves “How do I treat parts and wholes the same?”
👉 Registry solves “How do I find or manage my objects globally?”

*/





/* 

🧩 Definition

The Bridge Pattern separates an object’s abstraction (the high-level control) from its implementation (the low-level work) so that both can evolve independently.
It’s like having a remote control (abstraction) that can work with different devices (implementations) — without either knowing each other’s details.


👉 The Bridge Pattern decouples abstraction (what the object does) from implementation (how it does it), so that both can vary independently.

It’s like having two separate hierarchies — one for the interface, and one for the implementation, linked together via a “bridge.”

🧠 Real-world Analogy

Think of a TV remote control and TV set 📺
The remote is the abstraction — it defines actions like turnOn(), changeChannel()
The TV brand (Samsung, LG) is the implementation — it defines how these actions actually work
You can create new remotes or new TV brands independently, and they’ll still work together.

⚙️ Key Points

👉 Separate an abstraction from its implementation.
👉 Allows you to change one without affecting the other.
👉 Useful when both abstraction and implementation have their own hierarchies.

🧠 Key Ideas

👉 Decouple abstraction from implementation
👉 Allow changing the abstraction or the implementation without modifying the other
👉 Promotes composition over inheritance
👉 Avoids a large number of subclasses created by combining variations of both sides

💡 Examples
Example 1 — Remote & Devices 🎮
// Implementation
class Device {
  turnOn() {}
  turnOff() {}
}

class TV extends Device {
  turnOn() { console.log("TV is ON"); }
  turnOff() { console.log("TV is OFF"); }
}

class Radio extends Device {
  turnOn() { console.log("Radio is ON"); }
  turnOff() { console.log("Radio is OFF"); }
}

// Abstraction
class Remote {
  constructor(device) {
    this.device = device;
  }
  togglePower() {
    console.log("Toggling power...");
    this.device.turnOn();
  }
}

// Extended Abstraction
class AdvancedRemote extends Remote {
  mute() {
    console.log("Muting...");
  }
}

// Usage
const tvRemote = new AdvancedRemote(new TV());
tvRemote.togglePower(); // works with TV

const radioRemote = new Remote(new Radio());
radioRemote.togglePower(); // works with Radio


✅ Remote (abstraction) and Device (implementation) evolve separately.

Example 2 — Shape & Color 🎨
// Implementor
class Color {
  applyColor() {}
}

class Red extends Color {
  applyColor() { return "red"; }
}

class Blue extends Color {
  applyColor() { return "blue"; }
}

// Abstraction
class Shape {
  constructor(color) {
    this.color = color;
  }
  draw() {}
}

// Refined Abstraction
class Circle extends Shape {
  draw() {
    console.log(`Drawing Circle in ${this.color.applyColor()} color`);
  }
}

class Square extends Shape {
  draw() {
    console.log(`Drawing Square in ${this.color.applyColor()} color`);
  }
}

// Usage
const redCircle = new Circle(new Red());
const blueSquare = new Square(new Blue());
redCircle.draw();
blueSquare.draw();


✅ You can combine shapes and colors freely without subclass explosion.

Example 3 — Notification System 🔔
// Implementor
class Notifier {
  send(message) {}
}

class EmailNotifier extends Notifier {
  send(message) {
    console.log(`📧 Email: ${message}`);
  }
}

class SMSNotifier extends Notifier {
  send(message) {
    console.log(`📱 SMS: ${message}`);
  }
}

// Abstraction
class Notification {
  constructor(notifier) {
    this.notifier = notifier;
  }
  notify(message) {
    this.notifier.send(message);
  }
}

// Refined Abstraction
class UrgentNotification extends Notification {
  notify(message) {
    console.log("⚠️ URGENT!");
    this.notifier.send(message);
  }
}

// Usage
const emailUrgent = new UrgentNotification(new EmailNotifier());
emailUrgent.notify("Server is down!");


✅ Bridge between notification type and delivery channel.



🧩 Example 1 — Simple JavaScript Example
🎛 Implementations
class SonyTV {
  on() { console.log("📺 Sony TV is now ON") }
  off() { console.log("📺 Sony TV is now OFF") }
  tuneChannel(channel) { console.log(`📡 Sony: channel set to ${channel}`) }
}

class LGTV {
  on() { console.log("📺 LG TV is now ON") }
  off() { console.log("📺 LG TV is now OFF") }
  tuneChannel(channel) { console.log(`📡 LG: channel set to ${channel}`) }
}

🎮 Abstraction
class RemoteControl {
  constructor(tv) {
    this.tv = tv  // the “bridge”
  }

  turnOn() { this.tv.on() }
  turnOff() { this.tv.off() }
  setChannel(channel) { this.tv.tuneChannel(channel) }
}

🧭 Usage
const sonyRemote = new RemoteControl(new SonyTV())
const lgRemote = new RemoteControl(new LGTV())

sonyRemote.turnOn()
lgRemote.setChannel(7)


✅ The RemoteControl (abstraction) works with any TV implementation.
✅ You can add new remotes or TV brands without changing each other.

🧩 Example 2 — Realistic React/Redux Example

Imagine a Redux-based app that sends notifications using different channels (Email, SMS, Push).
You want to keep the Notification abstraction separate from channel implementations.

💌 Implementations (bridged side)
class EmailService {
  send(message) { console.log("📧 Sending Email:", message) }
}

class SMSService {
  send(message) { console.log("📱 Sending SMS:", message) }
}

🧩 Abstraction
class Notification {
  constructor(channelService) {
    this.channel = channelService
  }

  notify(message) {
    this.channel.send(message)
  }
}

🧩 Usage in React
const emailNotification = new Notification(new EmailService())
const smsNotification = new Notification(new SMSService())

emailNotification.notify("Welcome to our platform!")
smsNotification.notify("Your OTP is 1234")


✅ The notification logic doesn’t care how it’s sent — new services (e.g., Push, WhatsApp) can be added without modifying the abstraction.

🧩 Example 3 — With Redux Toolkit Slice
// abstraction
class DataFetcher {
  constructor(strategy) {
    this.strategy = strategy
  }
  fetchData(endpoint) {
    return this.strategy.fetch(endpoint)
  }
}

// implementations
class RESTStrategy {
  async fetch(endpoint) {
    const res = await fetch(endpoint)
    return res.json()
  }
}

class GraphQLStrategy {
  async fetch(endpoint) {
    const res = await fetch("/graphql", {
      method: "POST",
      body: JSON.stringify({ query: `{ ${endpoint} }` }),
    })
    const data = await res.json()
    return data.data
  }
}

// usage in slice or thunk
const apiFetcher = new DataFetcher(new RESTStrategy())
const gqlFetcher = new DataFetcher(new GraphQLStrategy())

apiFetcher.fetchData("/api/users")
gqlFetcher.fetchData("users { id name }")


✅ You can switch between REST and GraphQL without changing how data is fetched in Redux.
That’s the Bridge Pattern in a real project scenario.

⚙️ Use Cases

👉 When you want to avoid subclass explosion (e.g., CircleWithRed, CircleWithBlue, SquareWithRed, SquareWithBlue)
👉 When abstraction and implementation should change independently
👉 When you want to switch implementations at runtime (e.g., switch from local to remote API)
👉 When working with cross-platform systems or multi-backend architectures

| Use Case                 | Example                                                                     |
| ------------------------ | --------------------------------------------------------------------------- |
| **Cross-platform apps**  | One abstraction (App) with multiple platform implementations (Web, Mobile)  |
| **Payment systems**      | Abstraction: `Payment`; Implementations: `PayPal`, `Stripe`, `CreditCard`   |
| **Data sources**         | Abstraction: `DataFetcher`; Implementations: `REST`, `GraphQL`, `WebSocket` |
| **Notification systems** | Abstraction: `Notification`; Implementations: `Email`, `SMS`, `Push`        |
| **UI themes**            | Abstraction: `Component`; Implementations: `LightTheme`, `DarkTheme`        |


✅ Benefits

👉 Reduces class explosion
👉 Promotes flexibility and scalability
👉 Clean separation of concerns
👉 Easier to maintain and test both sides independently
👉 Decouples abstraction from implementation.
👉 Both hierarchies can evolve independently.
👉 Reduces code duplication.
👉 Follows the Open/Closed Principle.

⚠️ Cons

👉 Adds an extra layer of abstraction (slightly more complex)
👉 Can be overkill for small systems
👉 Requires thoughtful interface design

📘 Takeaways

👉 Bridge = Abstraction + Implementation decoupled
👉 Use when you have two dimensions of change that should not depend on each other
👉 Think “plug different engines into the same car body”
👉 Common in frameworks like React (UI abstraction) vs. DOM renderers (implementation)


🧠 Summary

👉 Bridge Pattern = decouple abstraction from implementation.
👉 Allows you to swap “how things work” without changing “what things do.”
👉 Common in React for service layers, data sources, notifications, themes, and API adapters.


*/


/* 

Bridge Pattern and Dependency Injection (DI) are very closely related,
but they serve different scopes and intentions.

Let’s go deep and compare them clearly 👇

⚖️ Bridge Pattern vs Dependency Injection

| 🔹 Aspect                 | 🧩 **Bridge Pattern**                                                                                   | 🧩 **Dependency Injection (DI)**                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 💡 **Purpose**            | Decouple **abstraction from implementation** so both can evolve independently                           | Decouple **object creation from its usage**, so dependencies can be easily swapped or mocked                |
| 🧠 **Concept**            | *Structural pattern* that defines how two hierarchies interact                                          | *Design principle / technique* that defines how dependencies are supplied                                   |
| 🏗️ **Structure**         | Has two class hierarchies — one for **Abstraction**, one for **Implementation** (linked by composition) | Has one class depending on an interface, with dependencies injected (via constructor, setter, or framework) |
| 🔌 **Relationship**       | The abstraction **owns** an implementation object and delegates to it                                   | The client **receives** the implementation object from an external source                                   |
| ⚙️ **Focus**              | Architectural design: separation of responsibilities                                                    | Object lifecycle management: how dependencies are provided                                                  |
| 🧩 **Example Analogy**    | A *remote control* (abstraction) using different *devices* (implementations)                            | A *driver* receiving a *car* from the garage rather than creating it themselves                             |
| 🔄 **Change Flexibility** | You can extend both abstraction and implementation independently                                        | You can swap dependencies at runtime or testing without modifying the class                                 |



💡 Code Comparison
🧱 Bridge Example
// Implementor
class Engine {
  start() {}
}

class PetrolEngine extends Engine {
  start() { console.log("Starting petrol engine..."); }
}

class ElectricEngine extends Engine {
  start() { console.log("Starting electric engine..."); }
}

// Abstraction
class Car {
  constructor(engine) {
    this.engine = engine;
  }
  drive() {
    this.engine.start();
    console.log("Car is driving...");
  }
}

// Usage
const tesla = new Car(new ElectricEngine());
const bmw = new Car(new PetrolEngine());
tesla.drive();
bmw.drive();


✅ Bridge = abstraction (Car) + implementation (Engine) — both can evolve independently.

🧩 Dependency Injection Example
class Engine {
  start() {}
}

class PetrolEngine extends Engine {
  start() { console.log("Starting petrol engine..."); }
}

class Car {
  constructor(engine) {     // engine injected here
    this.engine = engine;
  }
  drive() {
    this.engine.start();
    console.log("Car is driving...");
  }
}

// Usage
const engine = new PetrolEngine();   // created externally
const car = new Car(engine);         // injected dependency
car.drive();


✅ DI = same concept of composition, but focused on injection instead of abstraction separation.

🧠 Relationship Between Them

👉 The Bridge pattern naturally uses Dependency Injection — the abstraction (e.g. Car) depends on an implementation (e.g. Engine), and you inject that dependency.
👉 But DI is broader — you can use DI in any pattern (Singleton, Strategy, Factory, etc.), not just Bridge.
👉 Bridge focuses on structural flexibility; DI focuses on object creation and loose coupling.

📘 Takeaways

👉 Bridge = architectural separation of two hierarchies
👉 Dependency Injection = mechanism to supply implementations at runtime

👉 Bridge defines the relationship
👉 DI defines the delivery method
*/



/* 

🧩 Definition

The Flyweight Pattern minimizes memory usage by sharing common data between many similar objects instead of duplicating it.
It’s about reusing immutable, intrinsic state so you can handle huge numbers of objects efficiently — think of it as an object cache for repeated data.

👉 The Flyweight Pattern is used to minimize memory usage by sharing as much data as possible between similar objects instead of duplicating it.

It separates the object’s state into:
Intrinsic state → shared, constant, stored inside the Flyweight (e.g., shape type, color)
Extrinsic state → unique, passed from outside when needed (e.g., position, size)

🧠 Real-world Analogy

Imagine a text editor 📝
Each character (A, B, C, …) is displayed many times, but all “A” characters share the same font, color, shape — only the position (x, y) is different.
So instead of 10,000 “A” objects, you have 1 shared A object reused many times with different coordinates.

⚙️ Key Idea

Avoid creating duplicate objects for identical data.
Store shared state in a central “flyweight factory.”
Pass unique details (extrinsic state) from outside when using the object.



🧠 Key Ideas

👉 Focuses on memory optimization
👉 Shares intrinsic (unchanging) data across multiple objects
👉 Keeps extrinsic (context-specific) data outside, supplied when needed
👉 Works best when many objects share similar internal data
👉 Often paired with a factory or registry that manages the shared instances

💡 Examples
Example 1 — Text Characters 🅰️

Imagine rendering millions of characters in a text editor.
Each character has its font, color, and style — but most of those are repeated.

// Flyweight
class Character {
  constructor(char, fontFamily, fontSize, color) {
    this.char = char;           // intrinsic
    this.fontFamily = fontFamily; // intrinsic
    this.fontSize = fontSize;     // intrinsic
    this.color = color;           // intrinsic
  }

  draw(x, y) {
    console.log(`Drawing '${this.char}' at (${x},${y}) with ${this.fontFamily}, ${this.fontSize}, ${this.color}`);
  }
}

// Flyweight Factory
class CharacterFactory {
  constructor() {
    this.characters = {};
  }

  getCharacter(char, fontFamily, fontSize, color) {
    const key = `${char}-${fontFamily}-${fontSize}-${color}`;
    if (!this.characters[key]) {
      this.characters[key] = new Character(char, fontFamily, fontSize, color);
    }
    return this.characters[key];
  }
}

// Usage
const factory = new CharacterFactory();
const c1 = factory.getCharacter("A", "Arial", 12, "black");
const c2 = factory.getCharacter("A", "Arial", 12, "black");
console.log(c1 === c2); // true → shared instance


✅ Both A characters share the same object instance → memory saved.

Example 2 — Tree Rendering in a Game 🌳
// Flyweight
class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }
  draw(x, y) {
    console.log(`🌲 Drawing ${this.name} at (${x},${y})`);
  }
}

// Factory
class TreeFactory {
  constructor() {
    this.types = {};
  }
  getTreeType(name, color, texture) {
    const key = `${name}-${color}-${texture}`;
    if (!this.types[key]) {
      this.types[key] = new TreeType(name, color, texture);
    }
    return this.types[key];
  }
}

// Context objects (extrinsic data)
class Tree {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // shared flyweight
  }
  draw() {
    this.type.draw(this.x, this.y);
  }
}

// Usage
const factory = new TreeFactory();
const oakType = factory.getTreeType("Oak", "green", "rough");

const forest = [];
for (let i = 0; i < 5; i++) {
  forest.push(new Tree(i, i * 10, oakType));
}

forest.forEach(tree => tree.draw());


✅ All trees share one TreeType — huge savings in memory for large forests.

Example 3 — Icon Caching in UI 🧭
class Icon {
  constructor(name) {
    this.name = name;
  }
}

class IconFactory {
  constructor() {
    this.icons = {};
  }
  getIcon(name) {
    if (!this.icons[name]) {
      this.icons[name] = new Icon(name);
    }
    return this.icons[name];
  }
}

// Usage
const factory = new IconFactory();
const deleteIcon1 = factory.getIcon("trash");
const deleteIcon2 = factory.getIcon("trash");
console.log(deleteIcon1 === deleteIcon2); // true


✅ Same icon reused across buttons, lists, etc.
--------------------------------------------------------------------

🧩 Example 1 — Basic JavaScript Example
🎨 Shape objects (shared state)
class Shape {
  constructor(type, color) {
    this.type = type      // intrinsic
    this.color = color    // intrinsic
  }

  draw(x, y) {            // extrinsic
    console.log(`🎨 Drawing ${this.color} ${this.type} at (${x}, ${y})`)
  }
}

🏭 Flyweight Factory
class ShapeFactory {
  constructor() {
    this.shapes = {} // cache
  }

  getShape(type, color) {
    const key = `${type}_${color}`
    if (!this.shapes[key]) {
      console.log(`🆕 Creating new ${type}_${color}`)
      this.shapes[key] = new Shape(type, color)
    }
    return this.shapes[key]
  }
}

🧭 Usage
const factory = new ShapeFactory()

const redCircle1 = factory.getShape("circle", "red")
redCircle1.draw(10, 20)

const redCircle2 = factory.getShape("circle", "red")
redCircle2.draw(50, 60)

console.log(redCircle1 === redCircle2) // true ✅ same shared object


✅ Only one red circle object exists — reused for multiple coordinates.

🧩 Example 2 — React/Frontend Context

Imagine rendering 10,000 map markers that share color and icon type, only differing by coordinates.

🏗️ Flyweight Marker
class MarkerFlyweight {
  constructor(icon, color) {
    this.icon = icon
    this.color = color
  }

  render(lat, lng) {
    console.log(`📍 Render ${this.color} ${this.icon} at (${lat}, ${lng})`)
  }
}

🏭 Marker Factory
class MarkerFactory {
  constructor() {
    this.cache = {}
  }

  getMarker(icon, color) {
    const key = `${icon}_${color}`
    if (!this.cache[key]) {
      this.cache[key] = new MarkerFlyweight(icon, color)
    }
    return this.cache[key]
  }
}

⚛️ In a React app
const factory = new MarkerFactory()
const locations = [
  { lat: 10, lng: 20 },
  { lat: 15, lng: 25 },
  { lat: 18, lng: 28 },
]

locations.forEach(loc => {
  const marker = factory.getMarker("pin", "red")
  marker.render(loc.lat, loc.lng)
})


✅ Only one "pin_red" marker is created — reused for all locations.

⚙️ Use Cases

👉 Rendering large amounts of repeated visual elements (game objects, text characters, icons)
👉 Large data grids or maps with repeated items
👉 Object pooling or caching systems
👉 Data compression through object sharing

| Use Case               | Example                                                        |
| ---------------------- | -------------------------------------------------------------- |
| **UI Rendering**       | Reuse similar components (icons, shapes, cards) in large lists |
| **Game development**   | Thousands of trees, rocks, or bullets sharing the same model   |
| **Maps & charts**      | Markers or points with shared icons                            |
| **Text editors**       | Shared glyph objects for each letter                           |
| **Document rendering** | Shared font metrics and formatting                             |


✅ Benefits

👉 Major memory and performance optimization
👉 Reduces object creation overhead
👉 Centralized management of shared states

⚠️ Cons

👉 Code complexity increases (managing intrinsic vs extrinsic state)
👉 Harder to debug since many instances share data
👉 Not effective if objects have little shared data

📘 Takeaways

👉 Flyweight = shared immutable core + external dynamic context
👉 Use it when many small objects repeat the same data
👉 Separate intrinsic (shared) from extrinsic (unique) properties
👉 Combine it with a factory or registry to manage caching

🧠 Summary

👉 Flyweight Pattern = share common parts of objects to save memory.
👉 Split state into:

Intrinsic → shared, constant
Extrinsic → unique, passed from outside
👉 Common in: games, maps, text rendering, data visualization, React lists


*/




/* 

Flyweight Pattern is basically object-level caching of shared data, but done in a structured and intentional design pattern way.

However, the key idea that separates it from plain caching is how the shared data is used and separated

Let’s unpack that:

⚙️ Core Concept

👉 Normal Caching
You just store full instances so you don’t recreate them — all data stays inside the cached object.

👉 Flyweight Pattern
You intentionally divide an object’s state into two parts:

🪶 Intrinsic State (shared) — immutable, identical data across many objects (e.g., font, color, shape type)
🧩 Extrinsic State (unique) — data that changes per instance (e.g., position, rotation, label)

You store and share the intrinsic part (the flyweight),
and you keep the extrinsic part outside and supply it on use.

🧩 Example That Makes It Click
❌ Without Flyweight (no separation)
class Bullet {
  constructor(image, speed, x, y) {
    this.image = image; // repeated
    this.speed = speed;
    this.x = x;
    this.y = y;
  }
}
const bullets = [];
for (let i = 0; i < 100000; i++) {
  bullets.push(new Bullet("bullet.png", 10, Math.random() * 100, Math.random() * 100));
}


⚠️ Every bullet carries its own copy of "bullet.png" → 100k copies of the same data.

✅ With Flyweight (shared intrinsic state)
class BulletType {
  constructor(image, speed) {
    this.image = image;
    this.speed = speed;
  }
}

class Bullet {
  constructor(x, y, type) {
    this.x = x; // extrinsic
    this.y = y; // extrinsic
    this.type = type; // intrinsic (shared)
  }

  draw() {
    console.log(`Drawing ${this.type.image} at (${this.x},${this.y})`);
  }
}

const bulletType = new BulletType("bullet.png", 10);
const bullets = [];
for (let i = 0; i < 100000; i++) {
  bullets.push(new Bullet(Math.random() * 100, Math.random() * 100, bulletType));
}


✅ All bullets share one BulletType instance (shared intrinsic data)
✅ Only x and y are unique per bullet (extrinsic data)
✅ Memory drastically reduced

🔍 So Yes, It’s Like Caching — But Smarter

| 🧩 Concept    | 💬 Explanation                                                                   |
| ------------- | -------------------------------------------------------------------------------- |
| **Caching**   | Avoids recomputing or recreating identical full objects                          |
| **Flyweight** | Avoids *storing duplicated data inside many objects* by splitting and sharing it |
| **Goal**      | Reduce memory footprint for huge object counts                                   |
| **Structure** | Usually uses a **Factory** or **Registry** to manage shared intrinsic objects    |

*/


/* 



/* 

🧩 Definition

The Facade Pattern provides a simplified, unified interface to a complex subsystem of classes, libraries, or APIs.
It hides the complexity behind a single, easy-to-use interface — like a front desk that handles everything for you.


Instead of dealing with many different modules or APIs directly, you interact with one single entry point — the facade — which internally coordinates everything.

🧠 Real-world Analogy

Think of a hotel concierge 🏨
Instead of calling housekeeping, room service, maintenance, or reception separately — you just call the concierge, who knows how to deal with all of them.

That’s a facade.

⚙️ Key Points

👉 Hides complexity of multiple subsystems behind one clean interface.
👉 Simplifies usage for clients (you call one method instead of many).
👉 Makes code cleaner and easier to maintain.


🧠 Key Ideas

👉 Simplify complex or messy subsystems behind one entry point
👉 Reduce coupling between clients and subsystem components
👉 Make APIs more readable and maintainable
👉 Clients don’t need to know the internal structure or dependencies

💡 Examples
Example 1 — Home Theater 🎬
class DVDPlayer {
  on() { console.log("DVD Player ON"); }
  play(movie) { console.log(`Playing "${movie}"`); }
}

class Amplifier {
  on() { console.log("Amplifier ON"); }
  setVolume(level) { console.log(`Volume set to ${level}`); }
}

class Lights {
  dim() { console.log("Lights dimmed"); }
}

class HomeTheaterFacade {
  constructor(dvd, amp, lights) {
    this.dvd = dvd;
    this.amp = amp;
    this.lights = lights;
  }

  watchMovie(movie) {
    console.log("Get ready to watch a movie...");
    this.lights.dim();
    this.amp.on();
    this.amp.setVolume(7);
    this.dvd.on();
    this.dvd.play(movie);
  }

  endMovie() {
    console.log("Shutting movie theater down...");
  }
}

// Usage
const theater = new HomeTheaterFacade(
  new DVDPlayer(),
  new Amplifier(),
  new Lights()
);
theater.watchMovie("Inception");


✅ You interact with one simple HomeTheaterFacade instead of 3 separate subsystems.

Example 2 — Browser API Wrapper 🌐
class NetworkService {
  get(url) { console.log(`GET ${url}`); }
}

class StorageService {
  save(key, data) { console.log(`Saved ${key}`); }
}

class UIService {
  showNotification(msg) { console.log(`🔔 ${msg}`); }
}

// Facade
class AppAPI {
  constructor() {
    this.network = new NetworkService();
    this.storage = new StorageService();
    this.ui = new UIService();
  }

  async fetchAndSave(url, key) {
    this.network.get(url);
    this.storage.save(key, "data");
    this.ui.showNotification("Data fetched and saved!");
  }
}

// Usage
const app = new AppAPI();
app.fetchAndSave("/users", "userCache");


✅ Hides multiple systems (network, storage, UI) behind a single simple API.

Example 3 — Database Facade 🗄️
class MySQL {
  connect() { console.log("Connected to MySQL"); }
  query(sql) { console.log(`Executing: ${sql}`); }
}

class Logger {
  log(message) { console.log(`LOG: ${message}`); }
}

// Facade
class DatabaseFacade {
  constructor() {
    this.db = new MySQL();
    this.logger = new Logger();
  }

  execute(sql) {
    this.db.connect();
    this.db.query(sql);
    this.logger.log(`Executed: ${sql}`);
  }
}

// Usage
const db = new DatabaseFacade();
db.execute("SELECT * FROM users");


✅ Instead of manually connecting, querying, and logging — just call one method.


-------------------------------------------------------------------------------

🧩 Example 1 — Basic JS Example

Imagine you have three separate classes for booking travel:

class FlightBooking {
  bookFlight(from, to) {
    console.log(`✈️ Flight booked from ${from} to ${to}`)
  }
}

class HotelBooking {
  bookHotel(location) {
    console.log(`🏨 Hotel booked in ${location}`)
  }
}

class CarRental {
  rentCar(location) {
    console.log(`🚗 Car rented in ${location}`)
  }
}


Without a facade, the client must use each one manually.

🧩 Facade
class TravelFacade {
  constructor() {
    this.flight = new FlightBooking()
    this.hotel = new HotelBooking()
    this.car = new CarRental()
  }

  bookCompleteTrip(from, to) {
    this.flight.bookFlight(from, to)
    this.hotel.bookHotel(to)
    this.car.rentCar(to)
    console.log("✅ Trip booked successfully!")
  }
}

🧩 Usage
const trip = new TravelFacade()
trip.bookCompleteTrip("Cairo", "Paris")


✅ You now have one simple interface (bookCompleteTrip) that internally orchestrates three different systems.

🧩 Example 2 — React + Redux Toolkit Example

You might have multiple utilities for APIs, logging, and error handling — the facade makes it simple for your components.

🎛️ Subsystems
const api = {
  fetchUsers: () => fetch("/api/users").then(res => res.json()),
  fetchOrders: () => fetch("/api/orders").then(res => res.json())
}

const logger = {
  info: (msg) => console.log("ℹ️", msg),
  error: (msg) => console.error("❌", msg)
}

const errorHandler = {
  handle: (e) => console.error("🚨 Error:", e.message)
}

🎯 Facade
export const AppService = {
  async loadDashboard() {
    try {
      logger.info("Loading dashboard...")
      const [users, orders] = await Promise.all([
        api.fetchUsers(),
        api.fetchOrders()
      ])
      logger.info("✅ Dashboard loaded successfully!")
      return { users, orders }
    } catch (e) {
      errorHandler.handle(e)
    }
  }
}

⚛️ Usage in Redux or React
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppService } from "../services/AppService"

export const fetchDashboard = createAsyncThunk("dashboard/fetch", async () => {
  return await AppService.loadDashboard()
})


✅ Components and thunks don’t need to know about api, logger, or errorHandler.
✅ The facade (AppService) provides a simple, unified interface to a complex backend.

🧩 Example 3 — Node.js Backend Example

Imagine multiple microservices or libraries for payment, user management, and analytics.

class PaymentService { process(amount) { console.log(`💳 Payment: $${amount}`) } }
class UserService { createUser(name) { console.log(`👤 Created user ${name}`) } }
class AnalyticsService { track(event) { console.log(`📈 Tracking: ${event}`) } }

class AppFacade {
  constructor() {
    this.payment = new PaymentService()
    this.user = new UserService()
    this.analytics = new AnalyticsService()
  }

  onboardUser(name, amount) {
    this.user.createUser(name)
    this.payment.process(amount)
    this.analytics.track("UserOnboarded")
    console.log("🎉 Onboarding complete!")
  }
}

// usage
const app = new AppFacade()
app.onboardUser("Hesham", 100)


✅ One simple entry point replaces three different service calls.

------------------------------------------------------------------------------

⚙️ Use Cases

👉 Simplifying integration with complex libraries or APIs
👉 Creating a single entry point for a group of subsystems (e.g., backend service wrappers)
👉 Simplifying cross-cutting operations (like logging, caching, validation)
👉 Building SDKs or API clients
👉 Providing a “clean public API” for internal messy code

| Use Case                      | Example                                                          |
| ----------------------------- | ---------------------------------------------------------------- |
| **API Gateway**               | One endpoint that coordinates multiple microservices             |
| **React service layers**      | One module that wraps all API, logging, and error-handling logic |
| **Complex libraries**         | Simplify usage of multiple subsystems (e.g., Firebase, AWS SDK)  |
| **Redux toolkit integration** | Combine API + validation + caching into one function             |
| **Payment or Auth services**  | Facade manages workflow between multiple systems                 |


✅ Benefits

👉 Simplifies client interaction with complex systems
👉 Reduces coupling between client and subsystem internals
👉 Improves readability and maintainability
👉 Encourages consistent usage patterns
👉 Central point for future changes or extensions.

⚠️ Cons

👉 Can become a God Object if it grows too big
👉 Might hide important subsystem features
👉 Overuse can lead to less flexibility for advanced users

📘 Takeaways

👉 Facade = simplified interface to a complex system
👉 Keeps client code clean and focused
👉 Internally may still use other patterns (Factory, Singleton, etc.)
👉 Commonly used in frameworks, SDKs, and APIs

🧠 Summary

👉 Facade Pattern = create a simple interface over a complex system.
👉 Keeps your code clean, hides low-level details.
👉 Very common in service layers, API clients, and Redux Toolkit integrations.
*/



/* 

🧩 Definition

The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.
It allows you to change the behavior (strategy) of an object without modifying its code.

It’s basically:

“Define what to do separately from how to do it.”

🧠 Key Ideas

👉 Encapsulate algorithms into separate classes or functions
👉 Allow switching between different strategies dynamically
👉 Avoid long if-else or switch blocks for selecting behavior
👉 Follows the Open/Closed Principle — open for extension, closed for modification


It allows you to change the behavior of an object dynamically, without modifying its code.

🧠 Real-world Analogy

Think of a payment checkout system 💳:

You might pay by credit card, PayPal, or Apple Pay.
Each payment method is a different strategy — but your checkout process stays the same.

⚙️ Key Points

👉 Defines a common interface for multiple strategies.
👉 The main class (context) delegates behavior to the selected strategy.
👉 You can swap strategies dynamically at runtime.

💡 Examples
Example 1 — Payment Strategies 💳
// Strategies
class CreditCardPayment {
  pay(amount) {
    console.log(`Paid ${amount} using Credit Card`);
  }
}

class PayPalPayment {
  pay(amount) {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class CryptoPayment {
  pay(amount) {
    console.log(`Paid ${amount} using Cryptocurrency`);
  }
}

// Context
class PaymentContext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  pay(amount) {
    this.strategy.pay(amount);
  }
}

// Usage
const payment = new PaymentContext();

payment.setStrategy(new CreditCardPayment());
payment.pay(100);

payment.setStrategy(new PayPalPayment());
payment.pay(200);


✅ The PaymentContext doesn’t care how payment happens — it just calls the strategy.

Example 2 — Sorting Algorithms 🧮
class BubbleSortStrategy {
  sort(data) {
    console.log("Sorting using Bubble Sort");
    return data.sort();
  }
}

class QuickSortStrategy {
  sort(data) {
    console.log("Sorting using Quick Sort");
    return data.sort();
  }
}

class SortContext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  sort(data) {
    return this.strategy.sort(data);
  }
}

// Usage
const context = new SortContext();
context.setStrategy(new QuickSortStrategy());
context.sort([3, 1, 4, 1, 5]);


✅ Same data, different sorting strategies — interchangeable at runtime.

Example 3 — Logger Strategy 🧾
class ConsoleLogger {
  log(message) {
    console.log(`Console: ${message}`);
  }
}

class FileLogger {
  log(message) {
    console.log(`File: ${message}`);
  }
}

class CloudLogger {
  log(message) {
    console.log(`Cloud: ${message}`);
  }
}

class LoggerContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  log(message) {
    this.strategy.log(message);
  }
}

// Usage
const logger = new LoggerContext(new ConsoleLogger());
logger.log("App started");
logger.setStrategy(new CloudLogger());
logger.log("App deployed");


✅ Swap logging destinations without touching business logic.

Example 4 — Functional JavaScript Version ⚡
const strategies = {
  credit: (amount) => console.log(`Paying ${amount} via credit card`),
  paypal: (amount) => console.log(`Paying ${amount} via PayPal`),
  crypto: (amount) => console.log(`Paying ${amount} via Crypto`),
};

function pay(strategy, amount) {
  strategies[strategy](amount);
}

pay("credit", 50);
pay("crypto", 200);


✅ Strategy pattern can be implemented with plain objects and functions too — no classes needed.

-----------------------------

🧩 Example 1 — Basic JS Example
// Strategy Interface
class PaymentStrategy {
  pay(amount) {}
}

// Concrete Strategies
class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`💳 Paid $${amount} using Credit Card`)
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`💰 Paid $${amount} using PayPal`)
  }
}

class BitcoinPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`₿ Paid $${amount} using Bitcoin`)
  }
}

// Context
class PaymentProcessor {
  setStrategy(strategy) {
    this.strategy = strategy
  }

  checkout(amount) {
    if (!this.strategy) throw new Error("No payment method selected!")
    this.strategy.pay(amount)
  }
}

// Usage
const payment = new PaymentProcessor()

payment.setStrategy(new CreditCardPayment())
payment.checkout(100)

payment.setStrategy(new BitcoinPayment())
payment.checkout(200)


✅ The PaymentProcessor doesn’t know or care how payments are made — it just uses the current strategy.

🧩 Example 2 — React + Redux Toolkit Example

Suppose your app can sort items differently (price, name, rating).
You can use the Strategy Pattern to handle dynamic sorting behavior.

🎯 Sorting Strategies
export const sortByPrice = (items) => [...items].sort((a, b) => a.price - b.price)
export const sortByName = (items) => [...items].sort((a, b) => a.name.localeCompare(b.name))
export const sortByRating = (items) => [...items].sort((a, b) => b.rating - a.rating)

🧩 Context Function (Strategy Selector)
const sortingStrategies = {
  price: sortByPrice,
  name: sortByName,
  rating: sortByRating
}

export const sortItems = (items, strategyKey) => {
  const strategy = sortingStrategies[strategyKey]
  if (!strategy) throw new Error("Invalid sorting strategy")
  return strategy(items)
}

⚛️ Usage in a React Component
import React, { useState } from "react"
import { sortItems } from "./sorting"

export default function ProductList({ products }) {
  const [sortType, setSortType] = useState("price")

  const sorted = sortItems(products, sortType)

  return (
    <>
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="price">Sort by Price</option>
        <option value="name">Sort by Name</option>
        <option value="rating">Sort by Rating</option>
      </select>

      <ul>
        {sorted.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} - ⭐{p.rating}
          </li>
        ))}
      </ul>
    </>
  )
}


✅ You can switch strategies at runtime just by changing the dropdown value.

🧩 Example 3 — Redux Toolkit Thunks
// strategies
const fetchFromREST = async () => (await fetch("/api/users")).json()
const fetchFromGraphQL = async () => (await fetch("/graphql", {
  method: "POST",
  body: JSON.stringify({ query: "{ users { id name } }" })
})).json()

// context
const fetchStrategies = {
  rest: fetchFromREST,
  gql: fetchFromGraphQL,
}

export const fetchUsers = createAsyncThunk("users/fetch", async (_, { getState }) => {
  const { apiType } = getState().config
  const fetcher = fetchStrategies[apiType]
  return await fetcher()
})


✅ You can switch between REST and GraphQL APIs dynamically — no code duplication.

⚙️ Use Cases

👉 Selecting algorithms dynamically (payment, compression, sorting, authentication)
👉 Handling multiple behaviors for the same process
👉 Replacing long conditional chains
👉 Implementing pluggable business rules (discounts, tax, etc.)
👉 Designing extensible AI or game logic

| Use Case               | Example                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Payment gateways**   | Switch between PayPal, Stripe, CreditCard strategies                  |
| **Sorting/filtering**  | Different sort types in product lists                                 |
| **AI/ML models**       | Choose between different algorithms dynamically                       |
| **Auth providers**     | Google, GitHub, Email sign-in strategies                              |
| **API integrations**   | REST vs GraphQL vs WebSocket                                          |
| **Caching or logging** | File-based, memory-based, or network-based caching/logging strategies |


✅ Benefits

👉 Clean, flexible, and easily extensible
👉 Reduces conditional complexity
👉 Promotes separation of concerns
👉 Makes testing and maintenance easier
👉 Open/Closed Principle: easy to add new strategies.
👉 Cleaner, modular code.
👉 Behavior can be changed at runtime.
👉 Removes large if/else or switch logic blocks.

⚠️ Cons

👉 Can lead to many small classes or files
👉 Slightly more complex structure for simple scenarios
👉 Clients must know which strategy to pick

📘 Takeaways

👉 Strategy = interchangeable behaviors
👉 Define multiple ways to do something and choose one at runtime
👉 Great for replacing giant switch statements
👉 Use class-based or function-based strategies depending on your project style


*/



/* 

🧩 Definition

The Command Pattern turns a request or action into a standalone object that contains all the information about the request —
so it can be executed, undone, queued, logged, or passed around.
This allows actions to be:
executed later
queued
logged
undone or redone


In short:

“Encapsulate a request as an object.”


🧠 Real-world Analogy

Think of a remote control 🕹️:
Each button doesn’t execute a specific function directly — it sends a command object to the device (TV, AC, etc.).
The device interprets the command and performs the operation.

⚙️ Key Points

👉 Encapsulate actions as command objects.
👉 Separate invoker (who triggers the action) from receiver (who performs it).
👉 Commands can be queued, undone, or stored for history.

🧠 Key Ideas

👉 Encapsulate actions (commands) as objects
👉 Decouple the invoker (the caller) from the receiver (the actual executor)
👉 Allow queuing, undoing, or redoing operations
👉 Enable macro commands (batch actions)

💡 Examples
Example 1 — Light Switch 💡
// Receiver
class Light {
  on() { console.log("Light is ON"); }
  off() { console.log("Light is OFF"); }
}

// Command Interface
class Command {
  execute() {}
  undo() {}
}

// Concrete Commands
class TurnOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() { this.light.on(); }
  undo() { this.light.off(); }
}

class TurnOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() { this.light.off(); }
  undo() { this.light.on(); }
}

// Invoker
class RemoteControl {
  submit(command) {
    command.execute();
  }
}

// Usage
const light = new Light();
const remote = new RemoteControl();

const turnOn = new TurnOnCommand(light);
const turnOff = new TurnOffCommand(light);

remote.submit(turnOn);  // Light ON
remote.submit(turnOff); // Light OFF


✅ Each action is encapsulated and can be queued, logged, or undone later.

Example 2 — Undo/Redo System 🔁
class TextEditor {
  constructor() {
    this.content = "";
  }
  write(text) {
    this.content += text;
  }
  erase(count) {
    this.content = this.content.slice(0, -count);
  }
  getContent() {
    return this.content;
  }
}

class WriteCommand {
  constructor(editor, text) {
    this.editor = editor;
    this.text = text;
  }
  execute() {
    this.editor.write(this.text);
  }
  undo() {
    this.editor.erase(this.text.length);
  }
}

class CommandManager {
  constructor() {
    this.history = [];
  }
  execute(command) {
    command.execute();
    this.history.push(command);
  }
  undo() {
    const command = this.history.pop();
    if (command) command.undo();
  }
}

// Usage
const editor = new TextEditor();
const manager = new CommandManager();

manager.execute(new WriteCommand(editor, "Hello "));
manager.execute(new WriteCommand(editor, "World!"));
console.log(editor.getContent()); // Hello World!

manager.undo();
console.log(editor.getContent()); // Hello 


✅ Command objects allow undo functionality easily.

Example 3 — Batch (Macro) Commands ⚙️
class MacroCommand {
  constructor(commands = []) {
    this.commands = commands;
  }
  execute() {
    this.commands.forEach(cmd => cmd.execute());
  }
  undo() {
    [...this.commands].reverse().forEach(cmd => cmd.undo());
  }
}

// Usage
const light = new Light();
const macro = new MacroCommand([
  new TurnOnCommand(light),
  new TurnOffCommand(light),
]);

macro.execute();
macro.undo();


✅ Combines multiple commands into a single executable unit.

------------------------------------------------------------------------
🧩 Example 2 — React + Redux Toolkit Example (Undo/Redo)

Suppose you have a text editor or drawing app, and you want undo/redo actions.

🧠 Command Functions
class AddTextCommand {
  constructor(editor, text) {
    this.editor = editor
    this.text = text
  }
  execute() {
    this.prevText = this.editor.content
    this.editor.content += this.text
  }
  undo() {
    this.editor.content = this.prevText
  }
}

⚙️ Command Manager
class CommandManager {
  constructor() {
    this.history = []
  }
  executeCommand(command) {
    command.execute()
    this.history.push(command)
  }
  undo() {
    const command = this.history.pop()
    command?.undo()
  }
}

⚛️ Usage in React Component
import React, { useState } from "react"

export default function Editor() {
  const [content, setContent] = useState("")
  const editor = { content }
  const manager = new CommandManager()

  const handleAdd = () => {
    const command = new AddTextCommand(editor, "Hello ")
    manager.executeCommand(command)
    setContent(editor.content)
  }

  const handleUndo = () => {
    manager.undo()
    setContent(editor.content)
  }

  return (
    <div>
      <p>{content}</p>
      <button onClick={handleAdd}>Add Text</button>
      <button onClick={handleUndo}>Undo</button>
    </div>
  )
}


✅ Each text addition is a command.
✅ Undo reverts the last action.
✅ No hard-coded logic inside the React component — everything is encapsulated.


⚙️ Use Cases

👉 GUI buttons (undo, redo, copy, paste, delete)
👉 Queued or scheduled jobs
👉 Macro or batch operations
👉 Transaction systems
👉 Game moves history
👉 Logging and replaying actions

| Use Case                  | Example                                      |
| ------------------------- | -------------------------------------------- |
| **Undo/Redo systems**     | Text editors, drawing apps, dashboards       |
| **Transaction queues**    | Banking operations or messaging systems      |
| **Macro recording**       | Game engines, automation tools               |
| **Redux middleware**      | Recordable or replayable actions             |
| **CLI or DevOps scripts** | Commands that can be executed or rolled back |


✅ Benefits

👉 Decouples sender and receiver
👉 Allows undo/redo operations
👉 Supports batching and logging
👉 Makes actions reusable and composable
👉 Encapsulates all logic in independent command objects.
👉 Makes actions undoable, repeatable, or loggable.
👉 Promotes decoupling between sender (UI) and receiver (logic).
👉 Simplifies macro execution (multiple commands in sequence).

⚠️ Cons

👉 Can increase the number of small classes
👉 Adds boilerplate for simple actions
👉 May require extra care for command history memory usage

📘 Takeaways

👉 Command = action wrapped in an object
👉 Enables undo, redo, queue, or replay easily
👉 Used everywhere — from UI buttons to task queues
👉 Encourages clean and decoupled design

🧠 Summary

👉 Command Pattern = encapsulate actions as objects.
👉 Allows undo, redo, queueing, macros, and decoupling between UI and logic.
👉 Perfect for React apps with complex user interactions, Redux state history, or automation pipelines in Node.js.

*/


/* 


🧩 Definition

The Iterator Pattern provides a way to sequentially access elements of a collection (like an array, object, or custom data structure) without exposing its internal structure.
It abstracts how you traverse a collection so the client doesn’t need to know how it’s stored.
In simpler terms — it’s a standardized way to loop through data while keeping the collection’s internal details hidden.

🧠 Real-world Analogy

Think of a TV remote 🔁:
You can press Next and Previous to navigate channels.
You don’t need to know how the TV stores those channels internally.
That’s exactly what an iterator does — it gives you a clean interface (next()) to move through a collection.

⚙️ Key Points

👉 Separates traversal logic from the data structure itself.
👉 Standardized interface:

iterator.next() → { value, done }


👉 done indicates when iteration ends.
👉 ES6 added iterable protocols in JavaScript (for...of, spread ..., etc.).


🧠 Key Ideas

👉 Encapsulate iteration logic in a separate object (the iterator)
👉 Provide a common interface (next(), hasNext()) for traversal
👉 Decouple data structure (collection) from traversal algorithm
👉 Enables multiple independent iterators over the same collection




💡 Examples
Example 1 — Manual Iterator for a Collection 🔁
class Iterator {
  constructor(items) {
    this.index = 0;
    this.items = items;
  }

  hasNext() {
    return this.index < this.items.length;
  }

  next() {
    return this.hasNext() ? this.items[this.index++] : null;
  }
}

// Usage
const items = ["apple", "banana", "cherry"];
const iterator = new Iterator(items);

while (iterator.hasNext()) {
  console.log(iterator.next());
}


✅ Client doesn’t need to know if items are in an array, linked list, or other structure — just how to iterate.

Example 2 — Iterable Object in Modern JavaScript 🔄

JavaScript natively supports the Iterator Pattern via the Symbol.iterator protocol.

const fruits = {
  items: ["apple", "banana", "cherry"],
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;
    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

// Usage
for (const fruit of fruits) {
  console.log(fruit);
}


✅ for...of uses the built-in iterator interface automatically.

Example 3 — Custom Iterator for a Tree Structure 🌲
class TreeNode {
  constructor(value, children = []) {
    this.value = value;
    this.children = children;
  }

  *[Symbol.iterator]() {
    yield this.value;
    for (const child of this.children) {
      yield* child; // recursive generator iteration
    }
  }
}

// Usage
const tree = new TreeNode("root", [
  new TreeNode("child1"),
  new TreeNode("child2", [new TreeNode("grandchild1")])
]);

for (const node of tree) {
  console.log(node);
}


✅ Recursive iteration without exposing the tree structure — elegant and clean.

################################################################################################33

THE ABOVE EXAMPLE 

🧩 Why [Symbol.iterator] Instead of a Normal Method Name

Because [Symbol.iterator] is a special built-in key in JavaScript that marks an object as iterable.

When you write:

for (const x of something) { ... }


or use:

[...something]


JavaScript looks for a method named [Symbol.iterator] on that object.

If it exists and returns an iterator (an object with .next()),
then the object can be looped with for...of.

🧠 Think of It Like This
You do this	JS engine looks for this method
for (const item of obj)	obj[Symbol.iterator]()
[...obj]	obj[Symbol.iterator]()
Array.from(obj)	obj[Symbol.iterator]()

So if you want your custom class (like a TreeNode) to work with for...of,
you must define [Symbol.iterator]().

⚙️ Why It’s a Generator Method

You use a generator (function*) because:

It automatically returns an iterator object

It simplifies state tracking (no need to manually store index or implement .next())

You can use yield and yield* for easy iteration

So this line:

*[Symbol.iterator]() { ... }


literally means

“Define the special iterator method using a generator.”

💡 Equivalent Without Generator

If you didn’t use a generator, you’d have to write all this manually:

class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

for (const n of new Range(1, 3)) console.log(n);


✅ Works, but verbose.

💎 With Generator — Much Simpler
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

for (const n of new Range(1, 3)) console.log(n);


✅ Exactly the same behavior — but cleaner and automatic.

🧘‍♂️ Summary

👉 [Symbol.iterator]() = the special method that defines how your object is looped with for...of
👉 function* = generator that makes writing iterators effortless
👉 Combine them → your object becomes natively iterable

💡 So when you write:

*[Symbol.iterator]() { ... }


You’re telling JS:

“This object is iterable, and here’s how to iterate it — one yield at a time.”

#############################################################################################3333333#

Example 4 — Pagination Iterator (Real-World Example) 📄
class Paginator {
  constructor(items, pageSize) {
    this.items = items;
    this.pageSize = pageSize;
    this.currentPage = 0;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.currentPage * this.pageSize >= this.items.length) {
          return { done: true };
        }
        const start = this.currentPage * this.pageSize;
        const end = start + this.pageSize;
        const page = this.items.slice(start, end);
        this.currentPage++;
        return { value: page, done: false };
      }
    };
  }
}

// Usage
const paginator = new Paginator([1, 2, 3, 4, 5, 6, 7, 8], 3);
for (const page of paginator) {
  console.log("Page:", page);
}


✅ Useful for lazy loading or pagination in UIs.

-----------------------------------------------------------------

🧩 Example 1 — Manual Implementation
function createIterator(collection) {
  let index = 0
  return {
    next() {
      if (index < collection.length) {
        return { value: collection[index++], done: false }
      }
      return { value: undefined, done: true }
    }
  }
}

const iterator = createIterator(["🍎", "🍌", "🍇"])

console.log(iterator.next()) // { value: "🍎", done: false }
console.log(iterator.next()) // { value: "🍌", done: false }
console.log(iterator.next()) // { value: "🍇", done: false }
console.log(iterator.next()) // { value: undefined, done: true }


✅ The createIterator hides how data is stored — it only provides controlled sequential access.

🧩 Example 2 — Using ES6 Iterable Protocol

Every object that implements [Symbol.iterator]() is iterable.

const fruits = ["🍎", "🍌", "🍇"]

const iterator = fruits[Symbol.iterator]()
console.log(iterator.next()) // { value: "🍎", done: false }
console.log(iterator.next()) // { value: "🍌", done: false }
console.log(iterator.next()) // { value: "🍇", done: false }
console.log(iterator.next()) // { value: undefined, done: true }


✅ Arrays, Maps, Sets, and Strings are all iterable in JS by default.

🧩 Example 3 — Custom Iterable Object
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from
    const end = this.to
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false }
        }
        return { done: true }
      }
    }
  }
}

for (const num of range) {
  console.log(num)
}


✅ Output:

1
2
3
4
5


✅ You can now use for...of, spread syntax, etc.
✅ Internal logic is hidden — perfect encapsulation.

🧩 Example 4 — Real React/Redux Use Case

Imagine iterating through paginated API responses until all pages are fetched.

async function* fetchAllPages(api, endpoint) {
  let page = 1
  while (true) {
    const data = await api.fetch(`${endpoint}?page=${page}`)
    if (data.length === 0) break
    yield data
    page++
  }
}

// Usage
for await (const page of fetchAllPages(api, "/users")) {
  console.log("Loaded page:", page)
}


✅ Here, a generator acts as an iterator — great for async iteration (streaming data, pagination, etc.).


⚙️ Use Cases

👉 Traversing collections without exposing their internals
👉 Implementing custom iteration logic (pagination, filtering, trees)
👉 Allowing multiple traversal strategies (forward, backward, depth-first)
👉 Supporting lazy or generator-based data flows

| Use Case                  | Example                                     |
| ------------------------- | ------------------------------------------- |
| **Collections traversal** | Arrays, Maps, Sets, Trees                   |
| **Generators**            | Stream large datasets efficiently           |
| **Pagination**            | Iterate over pages of API results           |
| **State machines**        | Move step-by-step through states            |
| **Custom data readers**   | File line iterators, socket message streams |


✅ Benefits

👉 Hides collection’s internal representation
👉 Provides uniform access to different collections
👉 Enables flexible iteration logic (custom order, conditions)
👉 Works naturally with generators and for...of loops
👉 Uniform way to loop through collections.
👉 Hides internal data structure.
👉 Supports lazy evaluation (load only what’s needed).
👉 Works perfectly with for...of, spread, destructuring.

⚠️ Cons

👉 Slight overhead for simple collections (where plain loops suffice)
👉 Adds complexity if overused for trivial data structures

📘 Takeaways

👉 Iterator = decoupled traversal logic
👉 You don’t need to know how a collection stores data — just how to walk through it
👉 Native JavaScript already uses it (Map, Set, Array, String, etc.)
👉 Generators (function*) are the modern JS implementation of iterators


🧠 Summary

👉 Iterator Pattern = standard interface to access collection items sequentially without exposing structure.
👉 Implemented via next() and [Symbol.iterator]() in JavaScript.
👉 Powers for...of, spread syntax, and generators.
👉 Essential for streams, pagination, custom data readers, and React async loops.

*/




/* 


The State Pattern lets an object change its behavior dynamically when its internal state changes — as if the object changes its class at runtime.
It encapsulates each possible state in its own class (or object) and delegates behavior to the current state.

“Instead of writing if...else for every state —
give each state its own class and let the object switch between them.”

🧠 Key Ideas

👉 Encapsulate state-specific behavior into separate classes
👉 The main object (context) delegates to its current state object
👉 Changing state = swapping the object that handles the behavior
👉 Avoids large conditionals checking the current state everywhere

Instead of writing large if...else or switch statements to handle states, you encapsulate each state in its own class and let the context delegate behavior to the current state.

🧠 Real-world Analogy

Think of a traffic light 🚦:
When it’s red, it tells cars to stop.
When it’s green, it tells cars to go.
When it’s yellow, it warns to slow down.
The behavior changes depending on the current state, but it’s still the same object — the traffic light.

⚙️ Key Points

👉 Each state is an independent object implementing a common interface.
👉 The context holds a reference to the current state.
👉 The context delegates behavior to the current state object.
👉 State transitions can happen dynamically at runtime.




💡 Examples
Example 1 — Traffic Light 🚦
class RedLight {
  constructor(light) { this.light = light; }
  next() {
    console.log("Red → Green");
    this.light.setState(this.light.green);
  }
}

class GreenLight {
  constructor(light) { this.light = light; }
  next() {
    console.log("Green → Yellow");
    this.light.setState(this.light.yellow);
  }
}

class YellowLight {
  constructor(light) { this.light = light; }
  next() {
    console.log("Yellow → Red");
    this.light.setState(this.light.red);
  }
}

class TrafficLight {
  constructor() {
    this.red = new RedLight(this);
    this.green = new GreenLight(this);
    this.yellow = new YellowLight(this);
    this.state = this.red; // initial
  }
  setState(state) {
    this.state = state;
  }
  change() {
    this.state.next();
  }
}

// Usage
const light = new TrafficLight();
light.change(); // Red → Green
light.change(); // Green → Yellow
light.change(); // Yellow → Red


✅ No if-else chains — behavior depends on current state object.

Example 2 — Media Player ▶️
class PlayingState {
  constructor(player) { this.player = player; }
  clickPlay() {
    console.log("Pausing playback...");
    this.player.setState(this.player.pausedState);
  }
}

class PausedState {
  constructor(player) { this.player = player; }
  clickPlay() {
    console.log("Resuming playback...");
    this.player.setState(this.player.playingState);
  }
}

class StoppedState {
  constructor(player) { this.player = player; }
  clickPlay() {
    console.log("Starting playback...");
    this.player.setState(this.player.playingState);
  }
}

class MediaPlayer {
  constructor() {
    this.playingState = new PlayingState(this);
    this.pausedState = new PausedState(this);
    this.stoppedState = new StoppedState(this);
    this.state = this.stoppedState;
  }
  setState(state) {
    this.state = state;
  }
  clickPlay() {
    this.state.clickPlay();
  }
}

// Usage
const player = new MediaPlayer();
player.clickPlay(); // Starting playback...
player.clickPlay(); // Pausing playback...
player.clickPlay(); // Resuming playback...


✅ Each state defines its own version of clickPlay().

Example 3 — Order Status (E-Commerce) 📦
class NewOrder {
  constructor(order) { this.order = order; }
  next() {
    console.log("Order confirmed");
    this.order.setState(this.order.confirmed);
  }
}

class ConfirmedOrder {
  constructor(order) { this.order = order; }
  next() {
    console.log("Order shipped");
    this.order.setState(this.order.shipped);
  }
}

class ShippedOrder {
  constructor(order) { this.order = order; }
  next() {
    console.log("Order delivered");
    this.order.setState(this.order.delivered);
  }
}

class DeliveredOrder {
  next() {
    console.log("Order completed ✅");
  }
}

class Order {
  constructor() {
    this.new = new NewOrder(this);
    this.confirmed = new ConfirmedOrder(this);
    this.shipped = new ShippedOrder(this);
    this.delivered = new DeliveredOrder(this);
    this.state = this.new;
  }
  setState(state) {
    this.state = state;
  }
  next() {
    this.state.next();
  }
}

// Usage
const order = new Order();
order.next(); // confirmed
order.next(); // shipped
order.next(); // delivered
order.next(); // completed


✅ Clean, extendable, and no nested conditions.

---------------------------------------------------------------------------------------------

🧩 Example 1 — Simple JavaScript Example
// State Interface
class State {
  handle(context) {}
}

// Concrete States
class RedLight extends State {
  handle(context) {
    console.log("🔴 Stop! Light is RED.")
    context.setState(new GreenLight()) // transition
  }
}

class GreenLight extends State {
  handle(context) {
    console.log("🟢 Go! Light is GREEN.")
    context.setState(new YellowLight()) // transition
  }
}

class YellowLight extends State {
  handle(context) {
    console.log("🟡 Slow down! Light is YELLOW.")
    context.setState(new RedLight()) // transition
  }
}

// Context
class TrafficLight {
  constructor() {
    this.state = new RedLight()
  }

  setState(state) {
    this.state = state
  }

  request() {
    this.state.handle(this)
  }
}

// Usage
const light = new TrafficLight()
light.request() // 🔴 Stop!
light.request() // 🟢 Go!
light.request() // 🟡 Slow down!
light.request() // 🔴 Stop! (loop continues)


✅ Each state encapsulates its behavior and decides the next state.
✅ No if/else chains — transitions are handled cleanly.

🧩 Example 2 — React + Redux Toolkit Example (Authentication Flow)

You can model login flow states (unauthenticated, authenticating, authenticated) using the State Pattern.

class AuthState {
  login() {}
  logout() {}
}

// Concrete States
class UnauthenticatedState extends AuthState {
  login(context) {
    console.log("🔐 Logging in...")
    context.setState(new AuthenticatingState())
  }
}

class AuthenticatingState extends AuthState {
  login(context) {
    console.log("⏳ Already authenticating...")
  }
  onSuccess(context) {
    console.log("✅ Authenticated successfully!")
    context.setState(new AuthenticatedState())
  }
}

class AuthenticatedState extends AuthState {
  logout(context) {
    console.log("🚪 Logging out...")
    context.setState(new UnauthenticatedState())
  }
}

// Context
class AuthContext {
  constructor() {
    this.state = new UnauthenticatedState()
  }

  setState(state) {
    this.state = state
  }

  login() { this.state.login(this) }
  logout() { this.state.logout?.(this) }
  onSuccess() { this.state.onSuccess?.(this) }
}

// Usage
const auth = new AuthContext()
auth.login()     // 🔐 Logging in...
auth.onSuccess() // ✅ Authenticated successfully!
auth.logout()    // 🚪 Logging out...


✅ Each authentication phase behaves differently — but your app interacts through one unified API.

🧩 Example 3 — React UI Component Example

A button can behave differently depending on its current state (loading, success, disabled).

class ButtonState {
  render() {}
}

class LoadingState extends ButtonState {
  render() { return <button disabled>⏳ Loading...</button> }
}

class SuccessState extends ButtonState {
  render() { return <button className="success">✅ Done</button> }
}

class DisabledState extends ButtonState {
  render() { return <button disabled>🚫 Disabled</button> }
}

class ButtonContext extends React.Component {
  constructor() {
    super()
    this.state = { buttonState: new LoadingState() }
  }

  setButtonState(buttonState) {
    this.setState({ buttonState })
  }

  render() {
    return this.state.buttonState.render()
  }
}


✅ Each UI state encapsulates its rendering and logic separately — clean, extendable, testable.

⚙️ Use Cases

👉 Finite State Machines (traffic lights, media players, orders)
👉 Game characters with multiple modes (idle, attack, defend)
👉 Workflow processes (draft → review → published)
👉 UI components that change interaction modes (edit, read-only)

| Use Case             | Example                                                    |
| -------------------- | ---------------------------------------------------------- |
| **UI components**    | Buttons, modals, or forms that change behavior dynamically |
| **Authentication**   | Login → Loading → Authenticated states                     |
| **Games**            | Player states: idle, running, attacking                    |
| **Workflow engines** | Order: pending → confirmed → shipped → delivered           |
| **IoT / devices**    | State machines for lights, alarms, sensors                 |
| **Media players**    | Play, Pause, Stop states                                   |


✅ Benefits

👉 Replaces large if-else or switch statements
👉 Makes states self-contained and easy to extend
👉 Simplifies maintenance and testing
👉 Makes adding new states non-destructive
👉 Removes complex if/else and switch statements.
👉 Adds new states easily without touching old code.
👉 Promotes Single Responsibility — each state handles one behavior.
👉 Easy to reason about transitions and flows.

⚠️ Cons

👉 Slightly increases number of classes/files
👉 Requires careful management of transitions
👉 Overkill for simple state logic

📘 Takeaways

👉 State = Strategy for behavior + memory of current condition
👉 Behavior changes without conditionals — just by swapping state object
👉 Perfect for objects with modes or lifecycles
👉 Often used with Context + State classes combo

🧠 Summary

👉 State Pattern = encapsulate behavior changes into separate state classes.
👉 The context delegates behavior to its current state.
👉 Great for managing UI workflows, game states, device states, and authentication flows.
👉 Common in React, Redux, and finite state machines (XState, Zustand, etc.)

*/


/* 

⚖️ State vs Iterator Pattern

| 🔹 Aspect                   | 🧩 **State Pattern**                                                           | 🧩 **Iterator Pattern**                                                            |
| --------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| 💡 **Purpose**              | Allow an object to **change its behavior** when its **internal state** changes | Provide a **way to traverse** a collection without exposing its internal structure |
| 🧠 **Core Concept**         | “Behavior depends on current state.”                                           | “Traversal depends on current position.”                                           |
| 🔁 **Transition Logic**     | Object **changes state** internally (like a mode switch)                       | Object **advances position** externally (like moving through a list)               |
| 🏗️ **Participants**        | - Context (main object) <br> - State objects (each with different behavior)    | - Collection (aggregate) <br> - Iterator object (controls iteration)               |
| ⚙️ **Delegation**           | Context delegates requests to its current `state` object                       | Client delegates traversal logic to the iterator                                   |
| 📦 **Changes Over Time**    | The *context’s internal logic* changes (different methods triggered)           | The *iterator’s current index* changes (different data returned)                   |
| 💬 **Analogy**              | A TV that changes channels/modes — same remote, different behavior             | A playlist — you just ask for the next song                                        |
| 🔄 **Direction of Control** | Controlled **by the object itself**                                            | Controlled **by the external user** calling `next()`                               |

💡 Simple Parallel Example
🟢 State Pattern
class Door {
  constructor() {
    this.state = new ClosedState(this);
  }
  setState(state) {
    this.state = state;
  }
  click() {
    this.state.click();
  }
}

class ClosedState {
  constructor(door) { this.door = door; }
  click() {
    console.log("Opening door...");
    this.door.setState(new OpenState(this.door));
  }
}

class OpenState {
  constructor(door) { this.door = door; }
  click() {
    console.log("Closing door...");
    this.door.setState(new ClosedState(this.door));
  }
}

const door = new Door();
door.click(); // Opening door...
door.click(); // Closing door...


✅ The door changes its behavior based on its internal state.
You don’t control which logic runs — the state controls it.

🔵 Iterator Pattern
class Iterator {
  constructor(items) {
    this.items = items;
    this.index = 0;
  }
  next() {
    if (this.index < this.items.length) {
      return this.items[this.index++];
    }
    return null;
  }
}

const it = new Iterator(["A", "B", "C"]);
console.log(it.next()); // A
console.log(it.next()); // B
console.log(it.next()); // C


✅ Here, you control the flow by calling next().
It exposes a consistent way to move through a collection, but doesn’t change behavior.

🧠 The Common Feel

Both patterns:
🖐 use encapsulation + delegation
🖐 store a reference to a sub-object that determines current behavior
🖐 manage transitions internally (state → new state, iterator → next index)

So visually they seem similar — but philosophically:

Iterator is about progression through data
State is about progression through behavior

📘 Takeaways

👉 State Pattern — The context’s behavior changes dynamically
👉 Iterator Pattern — The client’s position changes dynamically
👉 Both rely on composition and delegation, but solve different categories of problems
👉 You could say:

“Iterator changes what data you’re working on,
State changes how you’re working.”


*/




/* 

The Memento Pattern lets you capture and store an object’s internal state so that it can be restored later, without exposing its internal implementation details.

In short:
“Take a snapshot of an object so you can roll back later.”

🧠 Key Ideas

👉 Used to implement undo/redo or version history
👉 Keeps the originator’s encapsulation intact — the caretaker never touches internal data directly
👉 Consists of three main roles:
Originator → the object whose state you want to save/restore
Memento → a snapshot of the originator’s state (opaque to outsiders)
Caretaker → stores and manages the history of mementos




It’s like taking a snapshot 📸 of an object’s state — you can go back to that snapshot anytime.

🧠 Real-world Analogy

Think of a text editor with an undo button 📝
Every time you make a change, the app saves a snapshot (memento).
If you hit Undo, the editor restores the previous snapshot — no need to know how text is stored internally.

⚙️ Key Points

👉 The Originator is the object whose state we want to save.
👉 The Memento stores that state (usually privately).
👉 The Caretaker keeps track of mementos (like an undo stack).



💡 Examples
Example 1 — Text Editor Undo 📝
// Memento
class Memento {
  constructor(state) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
}

// Originator
class Editor {
  constructor() {
    this.content = "";
  }
  type(words) {
    this.content += words;
  }
  save() {
    return new Memento(this.content);
  }
  restore(memento) {
    this.content = memento.getState();
  }
  getContent() {
    return this.content;
  }
}

// Caretaker
class History {
  constructor() {
    this.stack = [];
  }
  push(memento) {
    this.stack.push(memento);
  }
  pop() {
    return this.stack.pop();
  }
}

// Usage
const editor = new Editor();
const history = new History();

editor.type("Hello ");
history.push(editor.save());

editor.type("World!");
history.push(editor.save());

editor.type(" Goodbye!");
console.log(editor.getContent()); // Hello World! Goodbye!

editor.restore(history.pop());
console.log(editor.getContent()); // Hello World!

editor.restore(history.pop());
console.log(editor.getContent()); // Hello


✅ Each saved state acts like a checkpoint — easy rollback.

Example 2 — Game Save System 🎮
class Game {
  constructor() {
    this.level = 1;
    this.hp = 100;
  }

  save() {
    return new Memento({ level: this.level, hp: this.hp });
  }

  restore(memento) {
    const { level, hp } = memento.getState();
    this.level = level;
    this.hp = hp;
  }

  play() {
    this.level++;
    this.hp -= 10;
    console.log(`Level: ${this.level}, HP: ${this.hp}`);
  }
}

class GameHistory {
  constructor() {
    this.saves = [];
  }
  add(memento) { this.saves.push(memento); }
  get(index) { return this.saves[index]; }
}

// Usage
const game = new Game();
const history = new GameHistory();

game.play(); // L2 HP90
history.add(game.save());

game.play(); // L3 HP80
history.add(game.save());

game.play(); // L4 HP70

game.restore(history.get(1));
console.log(`Restored → Level ${game.level}, HP ${game.hp}`);


✅ Commonly used in games for checkpoints and “save game” systems.

Example 3 — Redux-Style Time Travel 🕰️
class Store {
  constructor(state) {
    this.state = state;
    this.history = [JSON.parse(JSON.stringify(state))];
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.history.push(JSON.parse(JSON.stringify(this.state)));
  }

  undo() {
    if (this.history.length > 1) {
      this.history.pop();
      this.state = this.history[this.history.length - 1];
    }
  }

  getState() {
    return this.state;
  }
}

// Usage
const store = new Store({ count: 0 });
store.setState({ count: 1 });
store.setState({ count: 2 });
store.setState({ count: 3 });
console.log(store.getState()); // {count: 3}
store.undo();
console.log(store.getState()); // {count: 2}


✅ Same idea — snapshots of state stored over time, enabling undo.

---------------------------------------------------------------------------------

🧩 Example 1 — Basic JavaScript Example
// Originator
class Editor {
  constructor() {
    this.content = ""
  }

  type(words) {
    this.content += " " + words
  }

  save() {
    return new Memento(this.content)
  }

  restore(memento) {
    this.content = memento.getContent()
  }

  getContent() {
    return this.content
  }
}

// Memento
class Memento {
  constructor(content) {
    this._content = content
  }

  getContent() {
    return this._content
  }
}

// Caretaker
class History {
  constructor() {
    this.stack = []
  }

  push(memento) {
    this.stack.push(memento)
  }

  pop() {
    return this.stack.pop()
  }
}

// Usage
const editor = new Editor()
const history = new History()

editor.type("Hello")
history.push(editor.save())

editor.type("World")
history.push(editor.save())

editor.type("Again")

console.log(editor.getContent()) // "Hello World Again"

editor.restore(history.pop()) // Undo
console.log(editor.getContent()) // "Hello World"

editor.restore(history.pop()) // Undo again
console.log(editor.getContent()) // "Hello"


✅ Each snapshot (memento) preserves the editor state.
✅ You can undo changes without exposing internal editor logic.

🧩 Example 2 — React + Redux Toolkit Example (Undo Feature)

Redux state history is a real-world Memento system.

🧠 Simplified Memento Logic
const history = {
  past: [],
  present: null,
  future: [],
}

function saveState(state) {
  history.past.push(structuredClone(state))
  history.present = state
}

function undo() {
  const prev = history.past.pop()
  if (prev) history.present = prev
}

⚛️ In React/Redux
import { createSlice } from "@reduxjs/toolkit"

const initialState = { text: "", history: [] }

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    type: (state, action) => {
      state.history.push(state.text)
      state.text += " " + action.payload
    },
    undo: (state) => {
      if (state.history.length > 0) {
        state.text = state.history.pop()
      }
    },
  },
})

export const { type, undo } = editorSlice.actions
export default editorSlice.reducer


✅ Each change saves a “memento” in the history array.
✅ Undo restores the last saved state — identical to the Memento Pattern behavior.

🧩 Example 3 — Node.js API Example (Configuration Snapshots)

Imagine you have a system that allows rolling back config updates.

class Config {
  constructor() {
    this.settings = {}
  }

  update(key, value) {
    this.settings[key] = value
  }

  save() {
    return JSON.parse(JSON.stringify(this.settings)) // snapshot
  }

  restore(snapshot) {
    this.settings = snapshot
  }
}

const history = []
const config = new Config()

config.update("theme", "dark")
history.push(config.save())

config.update("theme", "light")
console.log(config.settings) // { theme: "light" }

config.restore(history.pop())
console.log(config.settings) // { theme: "dark" }


✅ Useful for systems that need rollback or audit-trail support.

⚙️ Use Cases

👉 Undo / Redo systems (text editors, drawing tools, IDEs)
👉 Game checkpoints or save/load functionality
👉 Versioning and rollback (configuration or documents)
👉 Browser session restore or state history management

| Use Case                   | Example                                    |
| -------------------------- | ------------------------------------------ |
| **Undo/Redo systems**      | Text editors, graphics tools, spreadsheets |
| **Form editing**           | Save snapshots before user edits           |
| **Configuration rollback** | Revert to previous app or DB config        |
| **Version control**        | Store object snapshots (like commits)      |
| **Redux state history**    | Time-travel debugging (Redux DevTools)     |


✅ Benefits

👉 Restores previous state easily
👉 Preserves encapsulation — internal details remain private
👉 Simplifies undo/redo or rollback logic
👉 Works naturally with other patterns (Command, State)
👉 Provides undo/redo functionality easily.
👉 Keeps object state encapsulated.
👉 Makes rollback and snapshot recovery clean and testable.

⚠️ Cons

👉 Can consume a lot of memory for large states
👉 Managing and pruning old snapshots may be necessary
👉 Complex when states are deeply interconnected

📘 Takeaways

👉 Memento = snapshot + restore ability
👉 Great for undo/redo or history tracking
👉 Keeps originator self-contained — no external code peeks inside
👉 Combine with Command pattern for full undoable actions

💡 Think of it like:
“A save point for an object’s internal state — a time machine in OOP form.”


🧠 Summary

👉 Memento Pattern = take and restore snapshots of an object’s state.
👉 Core components:
Originator → object whose state is saved
Memento → snapshot of state
Caretaker → manages memento storage

👉 Perfect for undo/redo, state history, and rollback systems in React, Redux, or Node.js.



#####################################################################################

⚖️ Command vs Memento Pattern
| 🔹 Aspect              | 🧩 **Command Pattern**                                | 🧩 **Memento Pattern**                             |
| ---------------------- | ----------------------------------------------------- | -------------------------------------------------- |
| 💡 **Purpose**         | Encapsulates an **action (behavior)** as an object    | Captures an **object’s state (data)** as an object |
| 🧠 **Focus**           | *What to do* (execute, undo, redo)                    | *What the state was* before or after doing it      |
| ⚙️ **Encapsulates**    | A **method call** and its parameters                  | A **snapshot of data/state**                       |
| 🔁 **Undo Mechanism**  | Reverses an action (calls `undo()` logic)             | Restores a previous snapshot (reverts state)       |
| 🧩 **Participants**    | - Command <br> - Receiver <br> - Invoker              | - Originator <br> - Memento <br> - Caretaker       |
| 💬 **Analogy**         | A remote control button (“Do this action”)            | A photo album (“Restore me to that moment”)        |
| 🔄 **Reversing Logic** | Each command defines how to undo itself               | State is simply replaced with a previous snapshot  |
| 🧰 **Usage Together**  | Commands may store Mementos to implement undo history | Mementos are often created by Commands             |


💡 Example — Undo with Command + Memento Together
Step 1 — Command pattern alone
class TextEditor {
  constructor() {
    this.content = "";
  }
  type(words) {
    this.content += words;
  }
  erase(count) {
    this.content = this.content.slice(0, -count);
  }
  getContent() {
    return this.content;
  }
}

class WriteCommand {
  constructor(editor, text) {
    this.editor = editor;
    this.text = text;
  }
  execute() {
    this.editor.type(this.text);
  }
  undo() {
    this.editor.erase(this.text.length);
  }
}


✅ This works for specific actions — you can undo “type” because you know what you did.

But what if you want to undo any kind of change (not just type)? That’s where Memento comes in.

Step 2 — Add Memento for Generic Undo
class Memento {
  constructor(state) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
}

class Editor {
  constructor() {
    this.content = "";
  }
  type(words) {
    this.content += words;
  }
  save() {
    return new Memento(this.content);
  }
  restore(memento) {
    this.content = memento.getState();
  }
  getContent() {
    return this.content;
  }
}

class CommandManager {
  constructor(editor) {
    this.editor = editor;
    this.history = [];
  }
  execute(action) {
    this.history.push(this.editor.save()); // 📸 save memento before action
    action();
  }
  undo() {
    const memento = this.history.pop();
    if (memento) this.editor.restore(memento);
  }
}

// Usage
const editor = new Editor();
const manager = new CommandManager(editor);

manager.execute(() => editor.type("Hello "));
manager.execute(() => editor.type("World!"));
console.log(editor.getContent()); // Hello World!

manager.undo();
console.log(editor.getContent()); // Hello


✅ The Command controls when actions happen,
✅ The Memento captures what state existed before or after.


| Concept                        | Description                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| **Command**                    | “Do this operation.” Encapsulates behavior.                                            |
| **Memento**                    | “Remember this moment.” Encapsulates state.                                            |
| **Command + Memento together** | “Do this operation — but remember what it looked like before, so I can undo it later.” |

🧠 Relationship

You can implement undo with Command only (if each command knows how to reverse itself).

You can implement undo with Memento only (by saving snapshots).

But the best systems use both — Commands handle behavior, Mementos store data snapshots.

📘 Takeaways

👉 Command = behavior
👉 Memento = snapshot
👉 Both often coexist in editors, games, and workflow systems
👉 Command calls = “change the world”
👉 Memento = “time travel back”

*/