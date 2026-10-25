// Replace this placeholder with Kusi's real WhatsApp number before launch.
// Use country code and digits only, e.g. 251911234567. Never put card details in this form.
const KUSI_WHATSAPP_NUMBER = "251911731850";
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".car-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});
const carSelect = document.querySelector("#car-select");
document.querySelectorAll(".card-book").forEach(button => {
  button.addEventListener("click", () => {
    carSelect.value = button.dataset.car;
    document.querySelector("#booking").scrollIntoView({behavior: "smooth"});
    carSelect.focus({preventScroll: true});
  });
});
const pickup = document.querySelector('input[name="pickup"]');
const returnDate = document.querySelector('input[name="return"]');
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
pickup.min = localDate;
returnDate.min = localDate;
pickup.addEventListener("change", () => { returnDate.min = pickup.value || localDate; });
document.querySelector("#booking-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const messageEl = document.querySelector("#form-message");
  if (returnDate.value < pickup.value) {
    messageEl.textContent = "Please choose a return date on or after your pickup date.";
    return;
  }
  const message = [
    "Hello Kusi Car Rental, I'd like to request a booking.",
    "",
    `Name: ${form.get("name")}`,
    `Phone: ${form.get("phone")}`,
    `Vehicle: ${form.get("car")}`,
    `Driving preference: ${form.get("driver")}`,
    `Pickup date: ${form.get("pickup")}`,
    `Return date: ${form.get("return")}`,
    `Pickup location: ${form.get("location")}`,
    `Trip purpose / destination: ${form.get("destination") || "Not specified"}`,
    `Additional details: ${form.get("notes") || "None"}`,
    "",
    "Please confirm vehicle availability, driver availability (if requested), total price, payment options, security deposit/pre-authorisation terms (if self-drive), and rental conditions.",
    "I will not send card numbers, CVV, PIN, or banking passwords by message."
  ].join("\n");
  if (!/^251\d{9}$/.test(KUSI_WHATSAPP_NUMBER)) {
    messageEl.textContent = "Your request form is working, but Kusi's real WhatsApp number has not been added yet. The request text will be copied if your browser permits it. Replace the placeholder in script.js before launch.";
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(message).catch(() => {});
    return;
  }
  const url = `https://wa.me/${KUSI_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  messageEl.textContent = "Your booking request is ready in WhatsApp. Review it and press Send to contact Kusi Car Rental. This is a request, not a confirmed reservation.";
});
document.querySelector("#year").textContent = new Date().getFullYear();
