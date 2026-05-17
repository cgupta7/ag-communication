import info from './info.json'

export const brand = info.brand
export const contact = info.contact
export const social = info.social
export const location = info.location

/** Returns a wa.me URL for a product inquiry, or a general inquiry if no name given. */
export function waLink(productName = '') {
  const base = `https://wa.me/${info.contact.whatsapp}`
  const msg = productName
    ? `Hi! I'm interested in the ${productName}. Please share the latest price and availability.`
    : info.contact.whatsappDefaultMessage
  return `${base}?text=${encodeURIComponent(msg)}`
}

export default info
