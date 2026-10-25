// IMPORTANT: Replace the placeholder number below with Kusi Car Rental's WhatsApp number.
 // Use international digits only, with country code. For Ethiopia, the country code is 251.
const KUSI_WHATSAPP_NUMBER = "2519XXXXXXXX"; // Example format only; replace before publishing.

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
  if (returnDate.value < pickup.value) {
    document.querySelector("#form-message").textContent = "Please choose a return date on or after your pickup date.";
    return;
  }
  const message = [
    "Hello Kusi Car Rental, I'd like to request a booking.",
    "",
    `Name: ${form.get("name")}`,
    `Phone: ${form.get("phone")}`,
    `Vehicle: ${form.get("car")}`,
    `Pickup date: ${form.get("pickup")}`,
    `Return date: ${form.get("return")}`,
    `Pickup location: ${form.get("location")}`,
    `Additional details: ${form.get("notes") || "None"}`,
    "",
    "Please confirm availability, total price, payment options, and rental terms."
  ].join("\n");
  const messageEl = document.querySelector("#form-message");
  if (!/^251\d{9}$/.test(KUSI_WHATSAPP_NUMBER)) {
    messageEl.textContent = "The booking form is ready, but the business WhatsApp number is still a placeholder. The request text will be copied so you can test it. Add Kusi's WhatsApp number in script.js before publishing.";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message).catch(() => {});
    }
    return;
  }
  const url = `https://wa.me/${KUSI_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  messageEl.textContent = "Your WhatsApp message is ready. Send it in WhatsApp to submit your booking request.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
