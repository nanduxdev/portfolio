# NestJS + Turborepo + Shared DB Packages

## Raw TS (JIT) vs Compiled Packages – What I Learned

Today I dug deep into how to wire **NestJS** into a **Turborepo** monorepo with a shared **database package** (Drizzle/Prisma style), and why there are **two distinct patterns**:

1. **Raw TypeScript / JIT internal packages**
2. **Compiled `dist/` packages (industry standard for backends)**

This note is my mental model of both, plus how to actually integrate Nest + Turborepo + shared DB packages without shooting myself in the foot.

---

## 1. Monorepo Baseline

The typical Turborepo layout:

```ruby
text.├── apps│   ├── web        // Next.js frontend│   └── api        // NestJS backend└── packages    └── database   // shared Drizzle/Prisma DB package

```

Common goals:

- `apps/api` (Nest) uses `@repo/database` to talk to the DB.
- `apps/web` (Next) uses `@repo/database` **types** (and sometimes DB client) for full-stack type safety.
- Turborepo manages caching and task graph (`build`, `dev`, `lint`, etc.).[[turborepo](https://turborepo.dev/docs/guides/tools/typescript)]

The question is: **what exactly does `@repo/database` export, and how do apps consume it?**

---

## 2. Pattern 1 – Raw TypeScript (JIT “internal packages”)

## Idea

In this pattern, the **shared package exports TypeScript source directly**, and the consuming apps (Nest, Next) are responsible for **compiling it as part of their own build**. No `dist/` for the package itself.

Package example:

```json
//packages/database/package.json
{
  "name": "@repo/database",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./schema": "./src/schema/index.ts",
    "./types": "./src/types.ts"
  }
}
```

Key point: **`main` and `exports` point to `.ts` files**, not compiled `.js` or `.d.ts`.

Next imports:

```tsx
// apps/web/src/some-component.tsx
import type { User } from '@repo/database/types';
```

Nest imports:

```tsx
// apps/api/src/database/users.repository.ts
import { db, users } from '@repo/database';
```

## How it works technically

- Turborepo workspaces wire `@repo/database` into `apps/web` and `apps/api` via `node_modules` symlinks.[[turborepo](https://turborepo.dev/docs/guides/tools/typescript)]
- TypeScript in the apps (via `tsconfig` and `moduleResolution: "bundler"` or `"NodeNext"`) resolves `@repo/database` to the **source files** for type checking.[[typescriptlang](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html)]
- For **Next**:&#x20;
  - Next’s bundler (webpack/Turbopack) compiles the raw TS from `packages/database/src` into the app bundle.
  - `next.config.js` uses `transpilePackages: ["@repo/database"]` so the bundler transpiles that workspace package.[[nextjs](https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages)]
- For **Nest + SWC**:&#x20;
  - Nest CLI uses SWC as the builder (`builder: "swc"`).
  - TS `paths` can tell TS/SWC: “When you see `@repo/database`, actually compile `../../packages/database/src/index.ts` as part of the app build.”
  - SWC compiles those `.ts` files into `dist/` along with the app’s own `src`.[[docs.nestjs](https://docs.nestjs.com/recipes/swc)]

The runtime JS is produced by **SWC/Next’s bundler**, not by `tsc` in the package itself.

## Pros

- **Zero build step in the package**: No `tsc` per package, no `dist/` directory.
- **Fast dev loop**: Edit a schema → apps pick it up immediately via their own compilers.
- **Great for types & shared logic**: Internal-only packages with TS source integrate smoothly with Next’s bundler and SWC when configured correctly.[[dev](https://dev.to/ayc0/typescript-50-new-mode-bundler-esm-1jic)]

## Cons (especially for Nest)

- **Node cannot run TS**: If compiled JS ends up doing `require('../../../../../packages/database/src')`, Node will fail because it can’t load `.ts`.[[stackoverflow](https://stackoverflow.com/questions/75522940/swc-not-resolving-import-path-aliases)]
- **SWC must be configured carefully**:&#x20;
  - Needs `.swcrc` with `baseUrl` / `paths` or loader config to handle aliases and workspace packages.[[stackoverflow](https://stackoverflow.com/questions/75522940/swc-not-resolving-import-path-aliases)]
  - Must compile everything that Node will use at runtime (not just `apps/api/src`).
- **Decorators + metadata + isolatedModules**:&#x20;
  - With `isolatedModules: true` + `emitDecoratorMetadata: true`, TS becomes strict about imports used in decorated signatures (TS1272 errors).
  - Requires `import type { Response }` / `import type { Cache }` instead of normal imports in decorated parameters for SWC + TS to be happy.[[totaltypescript](https://www.totaltypescript.com/workshops/typescript-pro-essentials/configuring-typescript/the-moduleresolution-option-in-tsconfigjson)]

Bottom line: **raw TS packages are best when all consumers are bundler‑based (Next, Vite, React)** and you’re comfortable with SWC and TS config. They’re more fragile for backend runtimes that expect clean JS modules.

---

## 3. Pattern 2 – Compiled Packages (`dist/` – industry standard)

This is the pattern you see in **most production Nest + monorepo + shared DB setups** (e.g. Drizzle/Prisma schemas shared between backend and frontend).[[stackoverflow](https://stackoverflow.com/questions/74746708/how-to-use-monorepo-packages-with-nestjs-using-turborepo)]

## Idea

Here, the shared `packages/database` is a **proper compiled package**:

- Source in `src/`.
- Build step (`tsc`) that emits JS and `.d.ts` into `dist/`.
- Apps import **package name** (`@repo/database`) which points to `dist/index.js` and `dist/index.d.ts`.

Package example:

```json
// packages/database/package.json
{
  "name": "@repo/database",
  "version": "1.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
    "./schema": {
      "types": "./dist/schema/index.d.ts",
      "default": "./dist/schema/index.js"
    },
    "./types": { "types": "./dist/types.d.ts", "default": "./dist/types.js" }
  },
  "scripts": { "build": "tsc -p tsconfig.build.json" }
}
```

Build config:

```json
// packages/database/tsconfig.build.json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "module": "commonjs",
    "target": "ES2020",
    "strict": true
  },
  "include": ["src"]
}
```

Now both apps import `@repo/database` like any other npm package.

Next:

```tsx
import type { NewUser, User } from '@repo/database/types';
```

Nest:

```tsx
import { db, users } from '@repo/database';
```

## How it works technically

- Turborepo’s `build` pipeline ensures `packages/database` build runs **before** `apps/api` and `apps/web` builds:[[turborepo](https://turborepo.dev/docs/guides/tools/typescript)]

  ```json
  // turbo.json
  {
    "pipeline": {
      "build": { "dependsOn": ["^build"], "outputs": ["dist/**", ".next/**"] }
    }
  }
  ```

- When you run `pnpm turbo run build`:
  - `packages/database` runs `tsc -p tsconfig.build.json` → emits JS + `.d.ts` to `dist`.
  - `apps/api` and `apps/web` then build, importing `@repo/database` from `node_modules`.

At runtime:

- **Node (Nest)** loads `/node_modules/@repo/database/dist/index.js` – pure JS.
- TS in apps loads `/node_modules/@repo/database/dist/index.d.ts` for types.
- There’s no attempt to require raw `.ts` files.

This is exactly how shared DB packages are wired in many production monorepos (Juejin article, Pliszko blog, oNo500 NestJS boilerplate).[[github](https://github.com/oNo500/nestjs-boilerplate)]

## Pros

- **Node-safe**: Backend runtime only ever sees `.js` modules, which is what Node expects.[[betterstack](https://betterstack.com/community/guides/scaling-nodejs/typescript-module-resolution/)]
- **Clear build boundaries**: Each package has its own build step and `dist/`; apps depend on built artifacts.
- **Works with any compiler**:&#x20;
  - Nest can use `tsc` or SWC for the app.
  - Next uses its bundler.
  - Shared DB package is just a normal dependency.

## Cons

- **Extra build step** for the database package.
- Slightly slower dev loop if you constantly change DB schema (you need to rebuild the package or run `tsc --watch` there).
- More moving parts – but they’re well understood and easier for teams to reason about.

---

## 4. How to Integrate Nest + Turborepo + Shared DB (Pattern 2 – Compiled)

Here’s a clean step‑by‑step recipe for the compiled package pattern.

## Step 1 – DB package (`packages/database`)

**File structure:**

```
packages/database├── src│   ├── schema│   │   └── users.ts│   ├── client.ts│   ├── types.ts│   └── index.ts├── tsconfig.build.json└── package.json

```

**`src/index.ts`:**

```tsx
export * from './schema';
export * from './client';
export * from './types';
```

**`src/types.ts`:**

```tsx
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

import { posts, socialAccounts, users } from './schema';

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;
export type SocialAccount = InferSelectModel<typeof socialAccounts>;
export type NewSocialAccount = InferInsertModel<typeof socialAccounts>;
```

**`tsconfig.build.json`:**

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "module": "commonjs",
    "target": "ES2020",
    "strict": true
  },
  "include": ["src"]
}
```

**`package.json`:**

```json
{
  "name": "@repo/database",
  "version": "1.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
    "./schema": {
      "types": "./dist/schema/index.d.ts",
      "default": "./dist/schema/index.js"
    },
    "./types": { "types": "./dist/types.d.ts", "default": "./dist/types.js" }
  },
  "scripts": { "build": "tsc -p tsconfig.build.json" },
  "dependencies": { "drizzle-orm": "latest" }
}
```

Now your DB package behaves like a real library.

## Step 2 – Turborepo `turbo.json`

Ensure apps depend on package builds:[[turborepo](https://turborepo.dev/docs/guides/tools/typescript)]

```json
{
  "$schema": "<https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "lint": {},
    "test>": {}
  }
}
```

## Step 3 – Nest app (`apps/api`)

**`apps/api/tsconfig.json`** (simplified):

```json
{"extends":"@repo/typescript-config/nestjs.json","compilerOptions":{"outDir":"./dist","strictNullChecks":true// no custom paths for @repo/database}}

```

No `paths` mapping for `@repo/database` – it’s treated as a normal dependency.

Nest imports:

```tsx
// apps/api/src/database/db.module.ts
import { Module } from '@nestjs/common';
import { db } from '@repo/database'; // runtime client
import type { User, NewUser } from '@repo/database/types'; // types
@Module({
  providers: [{ provide: 'DB', useValue: db }],
  exports: ['DB'],
})
export class DbModule {}
```

Build & run:

```bash
pnpm turbo run build# builds packages/database first, then appspnpm turbo run dev# Nest dev server, Next dev servernode apps/api/dist/main.js

```

## Step 4 – Next app (`apps/web`)

**`apps/web/tsconfig.json`:**

```json
{
  "extends": "@repo/typescript-config/next.json",
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true
  }
}
```

**`apps/web/next.config.ts`:**

```tsx
import type{ NextConfig}from"next";const nextConfig: NextConfig={  transpilePackages:["@repo/database"]};exportdefault nextConfig;

```

Next imports types:

```tsx
import type{ User}from"@repo/database/types";functionUserRow(props:{ user: User}){// ...}

```

Now Next gets types from `dist/types.d.ts`, and bundler compiles `dist/types.js` only if needed.

---

## 5. How to Integrate Nest + Turborepo + Shared DB (Pattern 1 – Raw TS)

If you still want to document the JIT/raw TS pattern for comparison:

## DB package (raw TS)

```json
{
  "name": "@repo/database",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./schema": "./src/schema/index.ts",
    "./types": "./src/types.ts"
  }
}
```

No `build` script, no `dist/`.

## Nest app – `tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/nestjs.json",
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "@repo/database": ["../../packages/database/src/index.ts"],
      "@repo/database/*": ["../../packages/database/src/*"]
    }
  }
}
```

## Nest CLI – `nest-cli.json`

```json
{
  "$schema": "<https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "builder": "swc",
    "typeCheck>": true
  }
}
```

SWC compiles `apps/api/src` **and** the TS files from `packages/database/src` (via `paths`) into `apps/api/dist`. Node runs `dist/main.js`.

This works **as long as** every TS file Node touches gets compiled by SWC and `require()` points to JS outputs, not `.ts`. Misconfiguration here is exactly what produces `MODULE_NOT_FOUND` on raw TS.[[stackoverflow](https://stackoverflow.com/questions/75522940/swc-not-resolving-import-path-aliases)]

---

## 6. TL;DR for your blog

- There are **two valid patterns** for shared DB packages in a Nest + Turborepo monorepo:&#x20;
  - Raw TS / JIT internal packages (TS source shared, apps compile it).
  - Compiled `dist/` packages (TS compiled once, apps consume JS + `.d.ts`).
- For **production Nest backends**, the **compiled package pattern** is:&#x20;
  - Simpler to reason about.
  - More compatible with Node’s expectations.
  - What most real monorepos use for shared DB/client packages.[[stackoverflow](https://stackoverflow.com/questions/74746708/how-to-use-monorepo-packages-with-nestjs-using-turborepo)]
- Raw TS / JIT is great for:&#x20;
  - Next-only or frontend-focused monorepos.
  - Shared types/utils where bundler is always in the loop.
  - But requires careful SWC/bundler config and can be brittle around decorators + metadata.

You can turn this note into a blog by:

- Explaining your journey: trying raw TS + SWC + paths, hitting `MODULE_NOT_FOUND`, understanding why Node can’t load `.ts`.
- Then contrasting that with the compiled package pattern and showing how smoothly Nest + Turborepo + DB work once `@repo/database` is a normal compiled dependency.
