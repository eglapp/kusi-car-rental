# Kusi Car Rental website

A responsive luxury black-and-gold car rental website for Kusi Car Rental in Addis Ababa, Ethiopia.

## Files
- `index.html`: website structure and copy
- `styles.css`: responsive styling and visual design
- `script.js`: fleet filters, mobile navigation, booking form, and WhatsApp request preparation

## Before launch
1. Open `script.js` and replace `2519XXXXXXXX` with Kusi's real WhatsApp number, using country code and digits only (example format: `251911234567`).
2. Replace sample vehicle categories and stock photos with actual vehicles and approved photos. The sample fleet is illustrative, not live inventory.
3. Add real prices, contact details, rental hours, eligibility rules, insurance information, driver service rates, and cancellation terms.
4. Test all links and the booking request on desktop and mobile.

## Important payment and deposit notes
- This is a static front-end website. It does not process payments, store booking requests, check live vehicle availability, or place card holds.
- Never collect card numbers, CVV, PINs, or banking passwords in this website or via WhatsApp.
- A temporary card pre-authorisation is different from a charge and requires a payment provider/acquirer that explicitly supports pre-authorisation for the business's country, currency, card types, and account. Confirm availability and fees with the provider before promising card holds.
- Publish the deposit amount, release timing, damage/fuel/late-return rules, and refund conditions in a written rental agreement. Consider legal and consumer-protection advice before taking deposits.
- Do not advertise a payment method until Kusi has a live merchant account and has tested it.

## GitHub Pages
The site can be published from the public repository using GitHub Pages and a GitHub Actions static HTML workflow. Updates are made by replacing the three website files in the repository and committing the changes.
