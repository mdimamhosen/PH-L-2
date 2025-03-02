## What is Next.js

Next.js is a React framework that enables several extra features, including server-side rendering and generating static websites. It is built on top of Node.js and can be used to create web applications with React.

## Why we use it instead of React

While React is a library for building user interfaces, Next.js provides a framework that includes all the tools and best practices needed to build a complete web application. This includes routing, server-side rendering, static site generation, and more.

## Difference between library and framework

A library is a collection of pre-written code that developers can use to optimize tasks. A framework, on the other hand, provides a structure and set of rules for building applications. React is a library, while Next.js is a framework.

## What is rendering in Next.js

Rendering in Next.js refers to how the HTML for a page is generated. Next.js supports multiple rendering methods, including server-side rendering (SSR), static site generation (SSG), and client-side rendering (CSR).

## What is pre-rendering in React.js

Pre-rendering in React.js involves generating the HTML for a page at build time, rather than at runtime. This can improve performance and SEO, as the HTML is ready to be served to the client without additional processing.

## What is client-side rendering

Client-side rendering (CSR) is when the HTML for a page is generated on the client side, typically using JavaScript. This can lead to faster initial load times, but may be less optimal for SEO.

## What is SSR and SSG in pre-rendering

- **SSR (Server-Side Rendering)**: The HTML is generated on the server for each request. This can improve performance and SEO, but may increase server load.
- **SSG (Static Site Generation)**: The HTML is generated at build time and served as static files. This can improve performance and reduce server load, but may not be suitable for dynamic content.

## Basic routing, with nested routing in Next.js

Next.js uses a file-based routing system. Each file in the `pages` directory corresponds to a route in the application.

Example:

```javascript
// pages/index.js
export default function Home() {
  return <h1>Home Page</h1>;
}

// pages/about.js
export default function About() {
  return <h1>About Page</h1>;
}

// pages/blog/index.js
export default function Blog() {
  return <h1>Blog Home</h1>;
}

// pages/blog/[id].js
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Blog Post {id}</h1>;
}
```

## Dynamic routing, catch-all routes, searchParams, etc.

Next.js supports dynamic routing using brackets in the file name.

Example:

```javascript
// pages/product/[id].js
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Product {id}</h1>;
}

// Catch-all routes
// pages/docs/[...slug].js
import { useRouter } from 'next/router';

export default function Docs() {
  const router = useRouter();
  const { slug } = router.query;

  return <h1>Docs {slug.join('/')}</h1>;
}
```

## Deep dive into server components

Server components in Next.js allow you to render components on the server, which can improve performance and reduce the amount of JavaScript sent to the client.

Example:

```javascript
// pages/server-component.js
export default function ServerComponent() {
  return <h1>This is a server component</h1>;
}
```

## Link and programmatic navigation

Next.js provides a `Link` component for client-side navigation and the `useRouter` hook for programmatic navigation.

Example:

```javascript
// pages/index.js
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/about">Go to About</Link>
      <button onClick={handleClick}>Go to About Programmatically</button>
    </div>
  );
}
```

## Group routing with different layouts

Next.js allows you to group routes and apply different layouts to them.

Example:

```javascript
// pages/admin/_app.js
import AdminLayout from "../../components/AdminLayout";

function MyApp({ Component, pageProps }) {
  return (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}

export default MyApp;
```

## Built-in CSS module support

Next.js has built-in support for CSS modules, which allows you to scope CSS to a specific component.

Example:

```javascript
// components/Button.module.css
.button {
  background-color: blue;
  color: white;
}

// components/Button.js
import styles from './Button.module.css';

export default function Button() {
  return <button className={styles.button}>Click Me</button>;
}
```
