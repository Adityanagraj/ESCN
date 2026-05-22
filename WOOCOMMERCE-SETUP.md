# Wiring this site to WooCommerce

This site is a **storefront / marketing front-end**. The actual cart, checkout, payments, inventory, and order management live on your **WooCommerce store** (on a separate domain or subdomain like `shop.playboldframes.com`).

When a customer clicks **Shop now** on any product, they get redirected to your WooCommerce store. There are three ways to do that — pick the one that matches how you want the experience to feel.

---

## TL;DR — the only file you have to edit

All product URLs live in **one place**:

```
src/data/brand.ts
```

For each product, set the `shopUrl` field to one of the URL patterns below. That's it. Save → redeploy → done.

```ts
// src/data/brand.ts
{
  id: 'king-kohli',
  shopUrl: 'https://shop.playboldframes.com/product/king-kohli-shadow-box/',
  // ...
}
```

---

## Option 1 — Link to the WooCommerce product page (recommended)

**What happens:** customer clicks Shop now → lands on your full WooCommerce product page → they pick options (custom name, EMI plan, etc.) → add to cart → checkout.

**Best for:** when you want customers to read reviews, see more photos, choose variants.

**URL pattern:**

```
https://YOUR-WOO-DOMAIN/product/PRODUCT-SLUG/
```

**How to find the slug:**

1. WordPress Admin → Products → Edit your product
2. Look at the **Permalink** field under the title — the last segment is the slug
3. Example: if the permalink is `https://shop.playboldframes.com/product/king-kohli-shadow-box/` then the slug is `king-kohli-shadow-box`

**Drop it into `brand.ts`:**

```ts
shopUrl: 'https://shop.playboldframes.com/product/king-kohli-shadow-box/',
```

---

## Option 2 — Add to cart in one click (skip product page)

**What happens:** customer clicks Shop now → product is added to cart → they land directly on the cart page (or checkout).

**Best for:** when you want minimum friction and the marketing site already shows all the product info.

**URL pattern:**

```
https://YOUR-WOO-DOMAIN/?add-to-cart=PRODUCT_ID&quantity=1
```

**To find the product ID:**

1. WordPress Admin → Products → All Products
2. Hover over the product name — the URL in the status bar shows `post=123` — that number (`123`) is the product ID

**Drop it into `brand.ts`:**

```ts
shopUrl: 'https://shop.playboldframes.com/?add-to-cart=123&quantity=1',
```

**Optional — go straight to checkout instead of the cart:**
WooCommerce → Settings → Advanced → Page setup → set **Cart page redirect** to the **Checkout page**.

---

## Option 3 — External / affiliate product (most flexible)

**What happens:** WooCommerce stores the product but the "Buy Now" button just links anywhere you want (Amazon, your old Shopify, a Google Form, even a WhatsApp link).

**Best for:** dropshipping where the actual fulfilment happens on a different platform.

**How to set it up:**

1. WordPress Admin → Products → Add New
2. Under **Product data**, change the dropdown from "Simple product" to **"External/Affiliate product"**
3. Set the **Product URL** to wherever the customer should land (your supplier, Amazon, a payment link, etc.)
4. Then in `brand.ts`, set the `shopUrl` to the WooCommerce permalink (Option 1) **or** directly to the external URL (Option 3 bypassing Woo).

---

## Step-by-step: wiring all three products

### 1. Set up the products in WooCommerce

In WordPress Admin → Products → Add New, create three products with these slugs (so the URLs are predictable):

| Product in this site                | Recommended WooCommerce slug   |
| ----------------------------------- | ------------------------------ |
| KING KOHLI SHADOW BOX               | `king-kohli-shadow-box`        |
| EE SALA CUP NAMDE FRAME             | `ee-sala-cup-namde-frame`      |
| PLAY BOLD BOBBLEHEAD FRAME          | `play-bold-bobblehead-frame`   |

Fill in your **real price** under Product data → General. (You can leave description blank — your marketing site already has it.)

### 2. Edit `src/data/brand.ts`

Find the three product blocks and replace the `shopUrl` lines:

```ts
// Replace 'shop.playboldframes.com' with YOUR actual WooCommerce domain.
shopUrl: 'https://shop.playboldframes.com/product/king-kohli-shadow-box/',
shopUrl: 'https://shop.playboldframes.com/product/ee-sala-cup-namde-frame/',
shopUrl: 'https://shop.playboldframes.com/product/play-bold-bobblehead-frame/',
```

While you're in `brand.ts`, also update:

- `price` and `compareAt` — your real numbers
- `BRAND.supportEmail`, `BRAND.supportPhone`, `BRAND.domain`
- `BRAND.socials.instagram`, `youtube`, `twitter` — your real handles

Anything still saying `TODO:` is yours to fill.

### 3. Test it locally

```bash
npm run dev
```

Click each Shop now button. It should open your WooCommerce product page in a new tab.

### 4. Ship it

```bash
npm run build
```

Upload the `dist/` folder to your host (Vercel, Netlify, Cloudflare Pages, or your own VPS).

---

## CORS / cross-domain — anything to worry about?

**No.** This site doesn't talk to WooCommerce via JavaScript or an API. It just redirects the browser to your Woo URL. The browser handles the rest. There's nothing to configure on the WordPress side beyond having the products live.

If you later want a real **headless** setup (cart and checkout embedded inside this React site), that needs the WooCommerce REST API and a different architecture — happy to build that, but it's a bigger project. For dropshipping, redirect-to-Woo is the standard pattern.

---

## Going live checklist

- [ ] Three products created in WooCommerce, with correct slugs
- [ ] Real prices and inventory set in WooCommerce
- [ ] `src/data/brand.ts` — all `TODO:` strings replaced
- [ ] WooCommerce payment gateways configured (Razorpay for India, Stripe for international)
- [ ] WooCommerce → Settings → Shipping → set up India + international zones
- [ ] WooCommerce → Settings → Tax → configure GST if you cross the threshold
- [ ] Privacy Policy, Terms, Refund Policy pages — link them from the footer (`TODO: Privacy` etc.)
- [ ] DNS — point `playboldframes.com` at this React site, `shop.playboldframes.com` at WooCommerce
- [ ] Test order — place a real test order on Woo with a small amount, confirm payment + email confirmations work
- [ ] Google Analytics / Meta Pixel — add the snippets to `index.html`
