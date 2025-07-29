// book cinema
document.addEventListener("DOMContentLoaded", function () {
  // جلب بيانات الفيلم من localStorage
  let movieName = localStorage.getItem("movieName") || "غير محدد";
  let ticketPrice = Number(localStorage.getItem("ticketPrice")) || 0;
  let movieDay = localStorage.getItem("movieDay") || "غير محدد";

  document.getElementById("movie-name").innerText = movieName;
  document.getElementById("ticket-price").innerText = ticketPrice;
  document.getElementById("movie-day").innerText = movieDay;

  let ticketInput = document.getElementById("ticket-count");
  let totalPrice = document.getElementById("total-price");

  function updateTotalPrice() {
    let count = parseInt(ticketInput.value) || 1;
    let total = count * ticketPrice;
    totalPrice.innerText = total + " EGP";
  }

  ticketInput.addEventListener("input", updateTotalPrice);
  updateTotalPrice();
});

  // ============== START: Book games ============

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const placeNameEl = document.getElementById("place-name-display");
  const pricePerTicketEl = document.getElementById("price-per-ticket-display");
  const totalPriceEl = document.getElementById("total-price");
  const quantityInput = document.getElementById("quantity");

  const placeName = params.get("name") || "Not Found";
  const price = parseInt(params.get("price")) || 0;

  // عرض الاسم والسعر
  placeNameEl.textContent = placeName;
  pricePerTicketEl.textContent = price + " EGP";

  // تعبئة البيانات في hidden inputs
  document.getElementById("place-name").value = placeName;
  document.getElementById("price-per-ticket").value = price;

  function updateTotal() {
    const qty = parseInt(quantityInput.value) || 1;
    const total = qty * price;
    totalPriceEl.textContent = `${total} EGP`;
  }

  quantityInput.addEventListener("input", updateTotal);
  updateTotal();
});

// ============== END: Book games ============