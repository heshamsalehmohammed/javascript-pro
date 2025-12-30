/* 

What is NestJS and why use it over plain Express or Koa?
Answer: NestJS is a progressive Node.js framework for building scalable, testable server-side applications. It uses TypeScript, embraces modular architecture, and sits on top of Express (or Fastify) while adding strong patterns: dependency injection (DI), decorators, modules, and opinionated structure. Use Nest when you need maintainability, clear structure, enterprise features (microservices, GraphQL, CQRS), and better testability. It reduces boilerplate for large apps and enforces consistency.
Why it matters: shows you understand trade-offs: extra abstraction vs faster development and scaling.

Explain Modules, Controllers, and Providers in NestJS.
Answer:

Module: A logical grouping (file with @Module) that declares controllers, providers, imports, and exports. It defines the application boundary and dependency graph.

Controller: Handles incoming requests and returns responses (decorated with @Controller, methods use @Get, @Post, etc.). Keep controllers thin: delegate business logic to services.

Provider: Any injectable class (usually @Injectable() services, repositories) that contains business logic. Providers are registered in modules and injected via DI.
Example:

@Module({ controllers: [UsersController], providers: [UsersService] })
export class UsersModule {}


Why it matters: Modules promote separation of concerns and testability.

How does Dependency Injection (DI) work in NestJS?
Answer: Nest uses an IoC container. Mark classes with @Injectable() and register them in a module's providers. Nest resolves dependencies via constructor injection. Tokens (class constructors, strings, symbols) identify providers. You can scope providers (DEFAULT, REQUEST, TRANSIENT) and provide custom providers via useClass, useValue, useFactory, or useExisting.
Example:

constructor(private readonly usersService: UsersService) {}


Why it matters: DI enables test doubles, modular design, and easier refactoring.

What are middleware, guards, interceptors, pipes, and filters? When to use each?
Answer: These are Nest request lifecycle primitives:

Middleware: Low-level, run before route handlers — ideal for logging, body parsing (global/route-level).

Guards: Authorization/authentication checks that decide whether a request can proceed (CanActivate). Use for role checks, JWT auth.

Interceptors: Wrap method execution — used for logging, transformation (map responses), caching, timing, or modifying outgoing response.

Pipes: Transform/validate incoming data before handlers. (e.g., ValidationPipe, DTO validation)

Exception Filters: Catch and format exceptions thrown in the request lifecycle. Use to centralize error responses.
Why it matters: Knowing where to place cross-cutting concerns shows architecture sense.

How do you implement validation in NestJS?
Answer: Use class-validator + class-transformer with DTOs and enable ValidationPipe (global or per-route). Define DTO classes with decorators (@IsString(), @IsEmail(), etc.). ValidationPipe can auto-transform payloads into DTO instances and strip unknown properties.
Example:

@UsePipes(new ValidationPipe({ whitelist: true }))
@Post()
create(@Body() dto: CreateUserDto) { ... }


Why it matters: prevents invalid data and centralizes validation logic.

Explain how Guards work and give an example (e.g., JWT guard).
Answer: Guards implement CanActivate and return true/false or a Promise/Observable. They receive ExecutionContext to inspect request/user and can throw UnauthorizedException. For JWT, a guard extracts token from headers, verifies it, and attaches user to request.user. Nest integrates with Passport (@nestjs/passport) to simplify strategies (AuthGuard('jwt')).
Why it matters: authentication/authorization is critical in backend apps.

What are Interceptors and how would you implement caching or response transformation?
Answer: Interceptors implement NestInterceptor and use call$ to intercept ExecutionContext and next.handle() observable. You can map the response to transform shape or store responses in a cache (Redis) keyed by request attributes. Interceptors are good for cross-cutting response concerns.
Example skeleton:

intercept(context, next) {
  const start = Date.now();
  return next.handle().pipe(map(data => ({ data, took: Date.now()-start })));
}


Why it matters: centralizes response behavior and performance improvements.

How to handle file uploads in NestJS?
Answer: Use @nestjs/platform-express with multer integration. Apply @UseInterceptors(FileInterceptor('file')) to controller routes and access file via @UploadedFile(). For streaming/large uploads, consider streaming to object storage (S3) using signed URLs to avoid server memory overhead. For microservices/edge, be mindful of runtime limits.
Why it matters: shows ability to handle real-world file handling and performance trade-offs.

Explain Exception Filters and how to create a global filter.
Answer: Exception filters implement ExceptionFilter with catch(exception, host). They format and send responses (status codes, messages). Create a class with @Catch() and register globally in main.ts with app.useGlobalFilters(new AllExceptionsFilter()). Useful for consistent API error shape.
Why it matters: uniform error handling improves client experience and debugging.

How does NestJS support WebSockets and real-time features?
Answer: Nest provides a WebSockets module (@WebSocketGateway, @SubscribeMessage) built on socket.io by default, and supports other adapters (e.g., ws). Gateways manage real-time events; you can inject services in gateways just like controllers. Also supports broadcasting, namespaces, and rooms. For scale, integrate with Redis adapter for socket clustering.
Why it matters: real-time systems are common in modern apps.

What are lifecycle hooks in Nest (e.g., OnModuleInit, OnModuleDestroy)? Give examples.
Answer: Implement lifecycle interfaces for hooks: OnModuleInit, OnModuleDestroy, OnApplicationBootstrap, BeforeApplicationShutdown. Use them to initialize connections, seed caches, gracefully close database connections, or register background tasks.
Example:

async onModuleInit() { await this.cache.init(); }
async onModuleDestroy() { await this.db.close(); }


Why it matters: helps manage resource lifecycle and graceful shutdown.

How to structure a large NestJS application — modularization best practices?
Answer: Organize by feature/domain (e.g., users/, orders/) with each feature as a module exposing controllers and providers. Use shared modules for cross-cutting services (logging, config). Avoid huge monolithic modules; prefer small focussed modules, explicit exports, and lazy imports. For very large systems, consider microservices or bounded contexts.
Why it matters: demonstrates thinking about maintainability and team collaboration.

How to test NestJS apps (unit and e2e)?
Answer: Use Jest (default). For unit tests, mock providers (use Test.createTestingModule and overrideProvider). For e2e tests, start the Nest app in a test environment and use supertest to make HTTP calls. Use in-memory DBs or test containers for integration tests. Keep tests deterministic and isolated.
Example:

const moduleRef = await Test.createTestingModule({ imports: [UsersModule] }).compile();
const service = moduleRef.get(UsersService);


Why it matters: testing is essential for reliability and CI.

Explain NestJS microservices and transporters (e.g., TCP, Redis, NATS).
Answer: Nest has a microservices package allowing apps to communicate via different transport layers: TCP, Redis, NATS, MQTT, gRPC, Kafka. Use a microservice pattern (ClientProxy, MessagePattern) for event-driven or distributed systems. Choose transport based on latency, guarantees, throughput, and operational complexity. gRPC is great for typed contracts; Kafka for high-throughput streaming.
Why it matters: shows distributed-system design awareness.

How to integrate databases: TypeORM vs Prisma vs Mongoose in Nest?
Answer:

TypeORM: integrates via @nestjs/typeorm, entity-based ORM, decorators, migrations. Good if you prefer Active Record/Repository patterns.

Prisma: modern DB toolkit with generated client, type-safety, migrations. Use prisma/nestjs wrappers or inject Prisma client.

Mongoose: for MongoDB documents, use @nestjs/mongoose.
Choose based on DB type, team familiarity, and desired query style. Prisma often gives excellent DX and type-safety for SQL DBs.
Why it matters: databases are core; you should justify choices.

What is NestJS middleware and how does it differ from Interceptors?
Answer: Middleware runs before route handlers and is similar to Express middleware — used for request parsing, logging, CORS pre-checks. Interceptors wrap the request/response execution and can act after the handler resolves (transform response, measure time). Middleware is lower-level and unaware of Nest's execution context (no DI by default), while interceptors are Nest primitives with DI and richer context.
Why it matters: shows correct placement of concerns.

How to secure a NestJS application (best practices)?
Answer: Use HTTPS; validate & sanitize inputs; use helmet and rate limiting; store secrets in env or secret managers; HttpOnly cookies for sessions; use CSRF protections where needed; implement proper CORS; limit payload sizes; use role-based authorization and least privilege; keep dependencies updated and scan for vulnerabilities. Use secure coding patterns and logging/monitoring for incidents.
Why it matters: security is non-negotiable in production.

Explain custom decorators and use-cases in NestJS.
Answer: Custom decorators (method or parameter decorators) encapsulate common logic — e.g., @CurrentUser() extracts user from request. Use createParamDecorator for parameter decorators and @SetMetadata for role metadata. They improve readability and reuse.
Example:

export const CurrentUser = createParamDecorator((data, ctx) => ctx.switchToHttp().getRequest().user);


Why it matters: shows you can make readable and maintainable APIs.

What is CQRS pattern and how does NestJS support it?
Answer: CQRS (Command Query Responsibility Segregation) separates commands (state changes) from queries (reads). Nest has @nestjs/cqrs that provides commands, queries, handlers, and event buses. Use when complex business logic demands clear separation, or event sourcing is needed. It increases complexity so use judiciously.
Why it matters: advanced architecture knowledge often discussed in senior interviews.

How to integrate GraphQL with NestJS?
Answer: Use @nestjs/graphql which supports Apollo Server or Mercurius. You can use code-first (decorators generate schema from classes using @ObjectType, @Field) or schema-first (provide .graphql schema). GraphQL resolvers map to services; use @ResolveField, and benefit from built-in guards, interceptors, and schema generation. For subscriptions, use WebSocket adapters.
Why it matters: GraphQL is common; interviewer may probe subscription or schema design.

*/