# Next.js Caching, Fetching, and Rendering Methods

## Caching in Next.js

Next.js provides different caching strategies to optimize data fetching and improve performance.

### How Cache Works in Next.js

Next.js uses caching to store fetched data and reduce the number of network requests. It helps improve performance by serving cached data instead of making repeated API calls.

## Fetching Methods in Next.js

Next.js offers multiple ways to fetch data on the server and client sides.

### Example Fetch with Revalidation

```tsx
const res = await fetch("http://localhost:3001/products", {
  next: {
    revalidate: 5, //! revalidate every 5 seconds
  },
});
const data = await res.json();
```

**Explanation:** This method automatically refetches the data every 5 seconds, ensuring the data stays up-to-date.

### Cache Control

Next.js provides different cache options for data fetching:

- `force-cache`: Use cached data if available, otherwise fetch new data.
- `no-store`: Always fetch fresh data without caching.
- `reload`: Fetch new data and update the cache.
- `only-if-cached`: Use cached data only.

Example:

```tsx
const res = await fetch("http://localhost:3001/products", {
  cache: "force-cache", //! Use cache if available
});
const data = await res.json();
```

### Server Side Rendering (SSR)

SSR fetches data on each request and sends the HTML with the data to the client.

Example:

```tsx
const res = await fetch("http://localhost:3001/products", {
  cache: "no-store", //! No cache, always fetch fresh data
});
const data = await res.json();
```

**When to Use:** Use SSR when data needs to be up-to-date on every request (e.g., user authentication, dynamic content).

### Static Site Generation (SSG)

SSG pre-renders the page at build time and serves the same HTML for every request.

Example:

```tsx
export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/products");
  const data = await res.json();
  return {
    props: { data },
    revalidate: 10, //! Regenerate the page every 10 seconds
  };
}
```

**When to Use:** Use SSG for static content that doesn't change frequently (e.g., blog posts, product listings).

## Error Handling

Next.js automatically handles errors and provides custom error pages.

### Error Page (`error.tsx`)

Must be inside the `use client` directory.

```tsx
"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>;
}
```

### Not Found Page (`not-found.tsx`)

Automatically shown when a route is not found.

```tsx
export default function NotFoundPage() {
  return <div>Page Not Found</div>;
}
```

### Loading Page (`loading.tsx`)

Displays a loading indicator while data is fetching.

```tsx
export default function LoadingPage() {
  return <div>Loading...</div>;
}
```

## Handling Active Links

Next.js provides `useRouter` to detect active links.

Example:

```tsx
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <a style={{ color: isActive ? "red" : "black" }}>{children}</a>
    </Link>
  );
}
```

## Conclusion

Next.js provides powerful methods for data fetching and rendering. Choose the appropriate method depending on your application's requirements to optimize performance and user experience.
