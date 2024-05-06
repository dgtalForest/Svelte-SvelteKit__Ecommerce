# SvelteKit E-Commerce Site: Sediment Art

This is a real world e-commerce site which uses Stripe for payments and Cloudinary for image hosting. It is built with SvelteKit and TypeScript, and is currently in production!


- ⚙️ [SvelteKit]("https://kit.svelte.dev/docs/introduction"): Full stack JS framework that handles our server and client side code
- 💦 [Drizzle]("https://orm.drizzle.team/docs/overview"): Lightweight high power ORM for interfacing with our DB
- 🌩️ [Cloudinary]("https://svelte.cloudinary.dev/"): Image hosting and manipulation
- 💳 [Stripe]("https://stripe.com/docs"): Payment processing
- 💽 [PlanetScale]("https://planetscale.com/"): Cloud hosted MySQL database (with data branching)
- 🚀 [Vercel]("https://vercel.com/home"): Serverless hosting
- 🎨 [ShadCN for Svelte]("https://www.shadcn-svelte.com/"): Beautifully designed components
- 🖌️ [TailwindCSS]("https://tailwindcss.com/docs/installation"): Inline styles
- 🔒 [Lucia V3]("https://v3.lucia-auth.com/"): Authentication library and OAuth helpers
- 📦 [Pnpm]("https://pnpm.io/"): Package manager

## Getting Started

### Stripe

1. Create a Stripe account: https://dashboard.stripe.com/register
2. Get your (TEST) public and secret keys, and add them to the ```.env```:
```PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."```
```STRIPE_SECRET_KEY="sk_test_..."```
3. Create your products in stripe, then add them to the ```seed.ts``` file where it is marked "TODO STRIPE:" (it is also a good idea to change the products, prices, and images in the ```seed.ts``` file to match your own products)
4. Install the stripe CLI and get webhook signing secret: https://stripe.com/docs/stripe-cli, then add it your your ```.env```:
```STRIPE_WEBHOOK_SECRET="whsec_..."```

### Run the project

1. Install the dependencies with ```pnpm i```
2. Run the project with ```pnpm run dev```
