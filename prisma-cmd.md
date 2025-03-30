## Next.js Setup

If you don't have a Next.js application yet, you can create one by running the following command in your terminal:

```bash
npx create-next-app@latest
```

I personally prefer using all the default options when creating a new Next.js application. After your project is created, navigate into the project folder:

```bash
cd my-next-app
```

Next, let's update the default page to something more minimalistic. Open `src/app/page.tsx` and modify it to:

```tsx
const Home = () => {
  return <h2>Home</h2>;
};

export default Home;
```

Finally, start the Next.js application:

```bash
npm run dev
```

---

## SQLite Setup

SQLite is a simple, file-based database that doesn't require an external database server. To use SQLite, install it with the following command:

```bash
npm install sqlite3
```

SQLite creates a database file directly within your project. This makes it a great option for initial development.

---

## Prisma Setup

Prisma is a powerful ORM for JavaScript/TypeScript applications. To integrate Prisma with your project, first install it:

```bash
npm install prisma --save-dev
```

Then, initialize Prisma with SQLite as the data source provider:

```bash
npx prisma init --datasource-provider sqlite
```

Your `prisma/schema.prisma` file should look like this:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Additionally, create a `.env` file to define the SQLite database file path:

```env
DATABASE_URL="file:./dev.db"
```

Next, create the database file by running:

```bash
cd prisma
touch dev.db
```

This will create an empty SQLite database file.

---

## Prisma Migrations

Prisma migrations help you manage changes to your database schema. For example, to add a `Post` table, update your `prisma/schema.prisma` like this:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Post {
  id      String   @id @default(cuid())
  name    String
}
```

After updating the schema, run the following command to push changes to the database:

```bash
npx prisma db push
```

You can also check the database state with Prisma Studio:

```bash
npx prisma studio
```

---

## Prisma Client

In your application, you’ll need to initialize a Prisma Client to interact with the database. To do so, create a `prisma.ts` file inside the `src/lib` directory:

```ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
```

It's important to use a singleton pattern when initializing Prisma Client, especially with server-side frameworks like Next.js, to avoid multiple instances being created during hot reloads. Here's the code for creating a singleton:

```ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
```

---

## Reading from the Database in Next.js

Next.js uses the App Router, which treats every component as a **React Server Component** by default. This allows you to directly query the database in these components.

To fetch posts from the database, modify your `src/app/page.tsx` like so:

```tsx
import { prisma } from '@/lib/prisma';

const Home = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <ul className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
```