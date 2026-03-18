# AIDEK Private Deposit System

Professional dark-themed intake form at `/private` with admin-only dashboard at `/admin`.

## Features

- Public no-login form for high-intent registration and deposit details.
- Admin-only login and secure dashboard.
- MongoDB Atlas storage via Prisma.
- Input validation on client + server.
- Basic request rate limiting on submission API.
- Existing redirect preserved: `/registration` -> Shortink URL.

## Stack

- Next.js App Router
- Tailwind CSS
- NextAuth (Credentials)
- Prisma + MongoDB Atlas

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Fill in values in `.env.local`:

- `DATABASE_URL` (MongoDB Atlas connection string)
- `NEXTAUTH_URL` (local: `http://localhost:3000`, prod: `https://aidek.in`)
- `NEXTAUTH_SECRET` (long random string)
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_PASSWORD`

4. Generate Prisma client and push schema:

```bash
npm run db:generate
npm run db:push
```

5. Seed admin account:

```bash
npm run db:seed
```

6. Run dev server:

```bash
npm run dev
```

## Production on Vercel + MongoDB Atlas

1. Create MongoDB Atlas cluster, copy connection string.
2. In Vercel project settings, add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_URL=https://aidek.in`
   - `NEXTAUTH_SECRET`
   - `ADMIN_SEED_EMAIL`
   - `ADMIN_SEED_PASSWORD`
3. Deploy app from GitHub or with CLI:

```bash
npm run deploy
```

4. Run Prisma deploy tasks (once per environment):

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## Important routes

- Public form: `https://aidek.in/private`
- Admin login: `https://aidek.in/admin/login`
- Admin dashboard: `https://aidek.in/admin`
- Existing redirect: `https://aidek.in/registration`
