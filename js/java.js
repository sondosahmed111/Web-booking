document.addEventListener("DOMContentLoaded", () => {

  // ============ START: Show More ============ 
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hiddenDestinations = document.querySelectorAll(".hidden");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function () {
      hiddenDestinations.forEach((dest, index) => {
        if (index < 12) dest.classList.remove("hidden");
      });
      if (document.querySelectorAll(".hidden").length === 0) {
        showMoreBtn.style.display = "none";
      }
    });
  }

  // ============ START: Match Booking ============ 
  if (document.getElementById("match-name")) {
    const matchNameEl = document.getElementById("match-name");
    const ticketPriceEl = document.getElementById("ticket-price");
    const matchPlaceEl = document.getElementById("match-place");
    const matchTimeEl = document.getElementById("match-time");
    const ticketInput = document.getElementById("ticket-count");
    const totalPrice = document.getElementById("match-total-price");

    matchNameEl.innerText = localStorage.getItem("matchName") || "غير محدد";
    ticketPriceEl.innerText = (localStorage.getItem("matchTicketPrice") || 0) + " EGP";
    matchPlaceEl.innerText = localStorage.getItem("matchPlace") || "غير محدد";
    matchTimeEl.innerText = localStorage.getItem("matchTime") || "غير محدد";

    function updateMatchTotal() {
      let count = parseInt(ticketInput.value) || 1;
      let price = parseFloat(localStorage.getItem("matchTicketPrice")) || 0;
      let total = count * price;
      totalPrice.innerText = total + " EGP";
      localStorage.setItem("matchTotalAmount", total);
    }

    ticketInput.addEventListener("input", updateMatchTotal);
    updateMatchTotal();
  }

  // ============ START: Hotel Booking ============ 
  if (document.getElementById("hotelName")) {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById("price").value = urlParams.get('price') || '';
    document.getElementById("hotelName").value = urlParams.get('hotelName') || '';
    document.getElementById("checkInDate").value = urlParams.get('checkInDate') || '';
    document.getElementById("checkOutDate").value = urlParams.get('checkOutDate') || '';
    document.getElementById("roomType").value = urlParams.get('roomType') || '';
  }

  // // ============ START: Games Booking ============ 
  const params = new URLSearchParams(window.location.search);
  const placeNameEl = document.getElementById("place-name");
  const pricePerTicketEl = document.getElementById("price-per-ticket");

  if (placeNameEl && pricePerTicketEl) {
    placeNameEl.textContent = params.get("name");
    pricePerTicketEl.textContent = params.get("price") + " EGP";

    function updateTotalGames() {
      const price = parseInt(params.get("price"));
      const quantity = parseInt(document.getElementById("quantity").value) || 1;
      const total = price * quantity;
      document.getElementById("total-price").textContent = `${total} EGP`;
      localStorage.setItem("totalAmount", total);
    }

    document.getElementById("quantity").addEventListener("input", updateTotalGames);
    updateTotalGames();
  }

  // ============ START: Stars Rating ============ 
  const stars = document.querySelectorAll('.star');
  let savedStars = JSON.parse(localStorage.getItem('activeStars')) || [];

  stars.forEach((star, index) => {
    if (savedStars.includes(index)) {
      star.classList.add('active');
    }
    star.addEventListener('click', () => {
      if (star.classList.contains('active')) {
        star.classList.remove('active');
        savedStars = savedStars.filter(i => i !== index);
      } else {
        star.classList.add('active');
        savedStars.push(index);
      }
      localStorage.setItem('activeStars', JSON.stringify(savedStars));
    });
  });

});

//start : book cinema / stage

function savestageInfo(element) {
  let card = element.closest(".discount-card");
  let name = card.querySelector("h3").innerText.trim();
  let price = card.querySelector(".price").innerText.trim();
  let day = card.querySelectorAll("p")[0].innerText.trim();

  localStorage.setItem("movieName", name);
  localStorage.setItem("ticketPrice", price);
  localStorage.setItem("movieDay", day);
}

function savecinemaInfo(element) {
  let card = element.closest(".discount-card");
  let name = card.querySelector("h3").innerText.trim();
  let price = card.querySelector(".price").innerText.trim();
  let day = card.querySelectorAll("p")[0].innerText.trim();

  localStorage.setItem("movieName", name);
  localStorage.setItem("ticketPrice", price);
  localStorage.setItem("movieDay", day);
}
// end : book cinema / stage

