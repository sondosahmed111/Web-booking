// ============ START: Book Stage ============
document.addEventListener("DOMContentLoaded", () => {
  const movieName = localStorage.getItem("movieName") || "غير محدد";
  const ticketPrice = +localStorage.getItem("ticketPrice") || 0;
  const movieDay = localStorage.getItem("movieDay") || "غير محدد";

  document.getElementById("movie-name").innerText = movieName;
  document.getElementById("ticket-price").innerText = ticketPrice + " EGP";
  document.getElementById("movie-day").innerText = movieDay;

  const ticketInput = document.getElementById("ticket-count");
  const totalPriceEl = document.getElementById("total-price");

  function updateTotalPrice() {
    const count = parseInt(ticketInput?.value) || 1;
    const total = count * ticketPrice;
    totalPriceEl.innerText = total + " EGP";
    localStorage.setItem("totalAmount", total);
  }

  ticketInput.addEventListener("input", updateTotalPrice);
  updateTotalPrice();
});

// ============ END: Book Stage ============