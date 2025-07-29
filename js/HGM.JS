// BOOK HOTEL
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  document.getElementById("price").value = urlParams.get('price') || '';
  document.getElementById("hotelName").value = urlParams.get('hotelName') || '';
  document.getElementById("checkInDate").value = urlParams.get('checkInDate') || '';
  document.getElementById("checkOutDate").value = urlParams.get('checkOutDate') || '';
  document.getElementById("roomType").value = urlParams.get('roomType') || '';
});

