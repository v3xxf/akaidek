# Aidek – Registration redirect

Redirects **aidek.com/registration** to the Shortink registration page.

## Deploy on Vercel

1. **Push this project to GitHub** (or GitLab/Bitbucket), or use Vercel CLI.

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com) → Add New → Project
   - Import your repo and deploy (no build step needed).

3. **Add your domain**
   - Project → **Settings** → **Domains**
   - Add **aidek.com**
   - Follow Vercel’s instructions to add the DNS records at your domain registrar (usually an A record or CNAME as shown).

4. **Optional: redirect root**
   - If you want aidek.com (no path) to also go to registration, say so and we can add that redirect.

## What’s in this repo

- **vercel.json** – Redirect from `/registration` to the Shortink URL (302, so links stay correct).
- **index.html** – Simple landing page; visitors to the root can click through to registration.

After deployment, **https://aidek.com/registration** will send users to the registration URL.
