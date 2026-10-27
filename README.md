# TravelGo Booking Website

A React + Vite travel booking demo with responsive pages for Home, Destinations, Trip Details, Booking, and My Bookings.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The `prebuild` script checks the Vite executable's permissions on Linux before the build. `netlify.toml` configures Netlify to install dependencies and publish the `dist` directory. The `.gitignore` excludes `node_modules` and generated build output so dependencies are installed cleanly on the deployment server.

## If `node_modules` was already committed to Git

The `.gitignore` does not untrack files that Git already tracks. Run these commands from the repository root, then commit and push:

```bash
git rm -r --cached node_modules
git add .gitignore package.json netlify.toml scripts/fix-vite-permissions.cjs
git commit -m "Fix Vite deployment permissions"
git push
```

Booking is a demo feature; it does not process real payments.
