import { BRAND, type Product } from '../data/brand'

/**
 * Build a https://wa.me/<number>?text=<message> deep link.
 *
 *   - Phone is taken from BRAND.whatsappNumber (international format, no +).
 *   - Message is URL-encoded; never paste raw user input here without
 *     sanitising — but our messages are all template-generated, so they're
 *     safe.
 *   - Returns a fully-qualified https URL the browser can navigate to. On
 *     mobile, WhatsApp intercepts the URL and opens the chat; on desktop,
 *     wa.me redirects to web.whatsapp.com (or the desktop app if installed).
 *
 * Safety net: if BRAND.whatsappNumber still has the `TODO:` prefix OR strips
 * down to nothing but zeros, we refuse to build a wa.me link and instead
 * point at the "phone is unset" wa.me error page. wa.me happily resolves any
 * valid-looking digit string to whoever owns it, so shipping a placeholder
 * would silently DM a stranger.
 */
function buildWhatsappUrl(message: string): string {
  const raw = BRAND.whatsappNumber
  const phone = raw.replace(/\D/g, '')

  const looksUnset =
    /todo/i.test(raw) || phone.length === 0 || /^0+$/.test(phone)

  if (looksUnset) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        '[whatsapp] BRAND.whatsappNumber is still a placeholder ' +
          `(${JSON.stringify(raw)}). Set it in src/data/brand.ts before going live.`,
      )
    }
    // wa.me with no number opens a "phone number shared via link is not on
    // WhatsApp" page — annoying for the user, but FAR safer than randomly
    // DM-ing whoever happens to own the placeholder digits.
    return 'https://wa.me/'
  }

  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}

/**
 * Build a polite, pre-framed enquiry message for a specific product. This is
 * what runs when a customer taps "Shop KING / Shop EE / Shop PLAY".
 *
 * The message includes the frame name, edition, and current price so we
 * remove guesswork on the support team's end — they immediately know which
 * SKU the customer is asking about.
 */
export function buildOrderInquiryUrl(product: Product): string {
  const message = [
    `Hi PLAY BOLD team 👋`,
    ``,
    `I'd like to enquire about ordering this frame:`,
    ``,
    `• ${product.name}`,
    `• ${product.subtitle}`,
    `• Price: ${product.price}`,
    ``,
    `Could you please confirm availability, shipping timeline to my city, and the available payment options (UPI / card / EMI / COD)?`,
    ``,
    `Thanks!`,
  ].join('\n')

  return buildWhatsappUrl(message)
}

/**
 * Generic "I have a question" deep link — used by the floating support FAB,
 * the navbar Shop Now button (when no specific product is in context), and
 * the footer contact link.
 */
export function buildSupportUrl(context?: string): string {
  const lines = [`Hi PLAY BOLD team 👋`, ``]
  if (context) {
    lines.push(`I have a question about ${context}.`, ``)
  } else {
    lines.push(`I have a question about your frames — could you help me out?`, ``)
  }
  lines.push(`Thanks!`)

  return buildWhatsappUrl(lines.join('\n'))
}
