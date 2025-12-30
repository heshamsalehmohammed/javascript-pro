/* 

What is Next.js and why use it over plain React?

Answer: 
Next.js is a React framework that adds server-side rendering (SSR),
static site generation (SSG),
file-system routing,
API routes,
optimized image/fonts,
and many performance features out of the box —
letting you build production-ready React apps with better performance and developer ergonomics (routing, code splitting, built-in bundler).
It reduces boilerplate for SSR/SSG and integrates with platforms like Vercel for easy deployments.


What’s the difference between the App Router and the Pages Router? When should you use each?
Answer: 
The Pages Router (the pages/ folder) is the original model: file-based pages, getStaticProps/getServerSideProps, 
API routes, and conventional lifecycle.
----------------------------------
The App Router (the app/ folder) introduced React Server Components, nested layouts, streaming, 
and new data-fetching patterns (server functions, route handlers). 

Use App Router for finer control, nested UI, server components, and streaming; 
use Pages if you need mature edge cases or prefer legacy conventions. Both can coexist during migration;


What are Server Components and Client Components in Next.js?
Answer: Server Components run only on the server — they can fetch data directly (DB, filesystem) and send serialized HTML to the client. 
Client Components run in the browser and enable interactivity (hooks, event handlers). 

You mark a component as a Client Component with "use client" at the top. 
Server Components reduce client bundle size and improve performance by keeping non-interactive work server-side. 


How do you fetch data in the App Router vs Pages Router?
Answer:

App Router: fetch directly in server components (async/await), use fetch() with caching options, or use Route Handlers for custom APIs. Use revalidate (ISR) options in fetch/exported metadata.

Pages Router: use getStaticProps, getServerSideProps, or getStaticPaths. Client-side fetching still uses fetch/SWR/react-query. 


Explain getStaticProps, getServerSideProps, and getStaticPaths. When to use each?
Answer:

getStaticProps: Build-time data fetching for static generation (SSG). Use for content that doesn’t change per-request or can be regenerated via ISR.

getServerSideProps: Runs on every request — SSR. Use when content must be fresh and personalized per request.

getStaticPaths: Used with dynamic SSG to generate static pages for dynamic routes at build time. 


What is Incremental Static Regeneration (ISR) and how does it work?
Answer: 

ISR lets you statically generate pages at build time and update them after deployment without a full rebuild. 
You specify revalidation times (or on-demand revalidation) 
so Next.js regenerates pages in the background and serves updated static pages via CDN. 
Great for content that’s mostly static but updates occasionally. 


How do Route Handlers (API Routes) differ in the App Router?
Answer: In the App Router, Route Handlers live under app/ (e.g., app/api/route.ts) and behave like serverless/edge functions using the Web Fetch API (Request, Response). They replace/augment older pages/api routes and integrate with the App Router conventions. Use them for custom server logic, webhooks, or API endpoints. 


Explain nested layouts and the advantages they provide.
Answer: Nested layouts (App Router) let you define layouts at multiple folder levels: shared wrappers (header, sidebars) can persist across child navigations and avoid re-rendering. They improve UX by preserving state and reducing layout thrash; also support streaming and per-layout metadata. 
Next.js

How does Next.js optimize images? What’s next/image?
Answer: next/image automatically optimizes images (responsive sizes, lazy loading, modern formats), serves optimized variants via CDN, and helps LCP. You provide src, width, height (or fill layout) and Next handles reservoir of sizes and delivery. There have been API improvements across versions — check docs for latest props/behavior. 
Next.js
+1

What is Turbopack / the Next.js bundler story?
Answer: Turbopack is Vercel's next-gen bundler (fast dev-time incremental builds) intended to replace webpack for dev experience. Next.js integrates with different bundlers (webpack by default historically, Turbopack in newer releases for dev). Check your Next.js version and docs for default/opt-in bundler. (Docs & blog contain recent bundler guidance.) 
Next.js

How do you handle authentication and authorization in Next.js?
Answer: Multiple approaches: use server-side session cookies via middleware/route handlers, JWT stored in cookies or HttpOnly cookies, or use managed providers (Auth0, NextAuth.js). With App Router, you can verify auth in server components/route handlers and redirect before rendering. Use middleware for edge-level auth checks. Prefer HttpOnly cookies for security. (Implementation details depend on project needs.) 
Next.js

What are Middleware and their use-cases?
Answer: Middleware runs before a request is completed (edge), useful for authentication, redirects, A/B testing, and geo-routing. Middleware executes at the edge, so keep logic fast and avoid heavy operations. Implement in middleware.ts. 
Next.js

How does client-side navigation work in Next.js?
Answer: Next's <Link> and the router use client-side navigation via the Next.js router. When navigating, Next prefetches page code/data and swaps content without a full page reload — better UX and faster transitions. This relies on code splitting and dynamic imports to keep bundles small. 
Next.js

How do you implement dynamic routes and catch-all routes?
Answer: Use file conventions: [id].js for dynamic segments, [...slug].js for catch-all, and [[...slug]].js for optional catch-all. App Router uses folder segments like app/blog/[id]/page.tsx. getStaticPaths or dynamic rendering in App Router are used to pre-render or render at request time. 
Next.js
+1

Explain revalidation strategies and cache-control in Next.js.
Answer: In App Router you can set fetch() options (e.g., next: { revalidate: 60 }) to revalidate data every N seconds. In Pages Router you set revalidate in getStaticProps. You can also do on-demand revalidation via API calls to res.revalidate() to update specific pages. Proper cache-control headers help CDN behavior. 
Next.js
+1

How to do incremental adoption/migration from Pages to App Router?
Answer: Both routers can coexist. Migrate route-by-route: create app/ routes while keeping pages/ routes. Start using server components and nested layouts for new sections. Read the official migration guide as there are naming/layout conventions and differences in data fetching and lifecycle. 
Next.js

How does Next.js handle CSS and styling?
Answer: Options: global CSS, CSS Modules (*.module.css), styled-jsx (built-in), Tailwind, or CSS-in-JS libs (styled-components, Emotion). App Router and Server Components affect how styles are loaded — CSS modules remain a robust approach for component-scoped styles. Use head/metadata in App Router for global tags. 
Next.js

How to optimize Next.js performance (best practices)?
Answer: Use Server Components to reduce client JS, leverage SSG/ISR where suitable, use next/image, minimize client bundle size (code-splitting, dynamic imports), use caching/revalidation, enable compression and proper headers, and profile with Lighthouse. Avoid large client-only libraries and prefer server-side processing for heavy tasks. 
Next.js
+1

How to deploy Next.js — options and recommended platform?
Answer: Many hosts support Next.js, but Vercel is the originating (first-class) platform with features optimized for Next (ISR, serverless functions, edge middleware). Other hosts: Netlify, AWS, Cloudflare Pages/Workers, and custom Docker deployments. Choose based on needed infra (edge, serverless, region control). 
Vercel
+1

What is next.config.js for? Name a few common options.
Answer: next.config.js customizes webpack/Turbopack behavior, images domains, rewrites/redirects, environment variables, i18n, and experimental flags. Use it for build-time configuration like images.domains, experimental: { appDir: true } (older), or enabling specific features. 
Next.js

How does Next.js handle Internationalization (i18n)?
Answer: Next.js provides built-in i18n support in next.config.js for automatic locale routing, localized routing, and language detection. For content localization and translations, pair with libs like next-translate or react-i18next depending on needs. 
Next.js

How to set up TypeScript in a Next.js project?
Answer: Create a Next.js app and add a tsconfig.json; Next.js auto-configures TypeScript on first run if you add .ts/.tsx files. Install types for React/Node and update configs. Next handles many TS defaults for you. 
Next.js

Explain next/link and how to prefetch pages.
Answer: next/link enables client-side navigation; by default Next prefetches linked pages in production when they are in the viewport. Prefetching behavior can be controlled via prefetch prop. Prefetch helps speed perceived navigation. 
Next.js

What is Static Generation vs Server-side Rendering trade-offs?
Answer: Static generation (SSG) yields fastest responses via CDN but requires revalidation for fresh content. SSR always generates per-request (fresh) but has higher latency and server cost. Use SSG for stable content and SSR for per-request personalization or highly dynamic content. ISR gives a middle ground. 
Next.js
+1

How do you test Next.js applications?
Answer: Unit test components with Jest + React Testing Library, run end-to-end tests with Playwright or Cypress, and use integration tests to assert pages and API routes. For server components, mock server-side data; for edge functions, use platform-specific testing tools or local emulators. 
Next.js

How to handle environment variables in Next.js (client vs server)?
Answer: Put env vars in .env.*. By default, vars are server-only unless prefixed with NEXT_PUBLIC_, which exposes them to the client. Never expose secrets in client-side vars; use server-side route handlers or server components to keep secrets safe. 
Next.js

What is On-demand Revalidation and how do you use it?
Answer: On-demand revalidation lets you programmatically revalidate a previously statically generated page (via res.revalidate('/path') or Vercel API) after content changes (e.g., webhook from CMS). It's useful to keep SSG pages fresh without waiting for scheduled revalidation. 
Next.js
+1

How do you handle file uploads in Next.js?
Answer: Handle uploads in server-side route handlers (pages/api or app/api/route.ts) or via external services (S3 signed URLs). In the App Router, parse multipart or forward file streams to object storage; avoid processing large files in-memory in edge runtimes. Use streaming and background processing for heavy tasks. 
Next.js

Common pitfalls when upgrading Next.js versions (13→14→15+)?
Answer: Breaking changes around the App Router, changed defaults (bundler), experimental flags, and API modifications (image/link props) can cause issues. Migrate incrementally, read migration guides, and test app-specific features (middleware, ISR, image behavior). 
Next.js
+1

How to debug Next.js performance issues in production?
Answer: Use profiling (Lighthouse, Web Vitals), inspect server logs/metrics, trace SSR timings, analyze bundle size (webpack-bundle-analyzer / Turbopack tools), and check hydration times. Measure LCP, TTFB, and client JS execution. Use server components and reduce client JS where possible.

*/




/* 

Explain trade-offs (SSR vs SSG vs ISR)

SSR (Server-Side Rendering): fresh per-request content, higher latency and server cost — use for personalization or frequently changing pages.
SSG (Static Site Generation): fastest via CDN, ideal for stable content — needs rebuild or revalidation to update.
ISR (Incremental Static Regeneration): middle ground — static pages that can be revalidated periodically or on demand.

*/