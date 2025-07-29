
// ===== دالة للحصول على قيمة من الرابط =====
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ===== بيانات الرحلات =====
const flights = [];
const cities = [
  "Cairo", "Alexandria", "Luxor", "Aswan", "Sharm El-Sheikh",
  "Hurghada", "Marsa Matruh", "Saint Catherine", "Taba",
  "Arish", "Assiut", "Marsa Alam"
];
const airlines = ["EgyptAir", "Nile Air", "Air Cairo"];
const gates = ["A1", "B3", "C2"];
const statuses = ["On Time", "Delayed", "Departed"];

function generateRandomTime() {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const period = Math.random() > 0.5 ? 'AM' : 'PM';
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}

let flightNumber = 101;
for (let from of cities) {
  for (let to of cities) {
    if (from !== to) {
      for (let i = 0; i < 4; i++) {
        flights.push({
          number: `EGS${flightNumber++}`,
          from,
          to,
          time: generateRandomTime(),
          airline: airlines[Math.floor(Math.random() * airlines.length)],
          gate: gates[Math.floor(Math.random() * gates.length)],
          price: Math.floor(Math.random() * 1000) + 1000
        });
      }
    }
  }
}

// ===== عرض الرحلات =====
function displayFlights(filteredFlights = flights) {
  const tableBody = document.getElementById("flightsBody");

  if (!tableBody) {
    console.error("Element flightsBody is not found in this page.");
    return;
  }

  tableBody.innerHTML = "";

  if (filteredFlights.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='8'>No available flights</td></tr>";
    return;
  }

  filteredFlights.forEach(flight => {
    let row = `<tr>
      <td>${flight.number}</td>
      <td>${flight.from}</td>
      <td>${flight.to}</td>
      <td>${flight.time}</td>
      <td>${flight.airline}</td>
      <td>${flight.gate}</td>
      <td>${flight.price} EGP</td>
      <td><button onclick="choosePayment('${flight.number}', ${flight.price}, '${flight.from}', '${flight.to}', '${flight.time}')">Book</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// ===== تصفية الرحلات =====
function filterFlights() {
  const fromValue = document.getElementById("from").value;
  const toValue = document.getElementById("to").value;

  const filteredFlights = flights.filter(flight =>
    (fromValue === "" || flight.from === fromValue) &&
    (toValue === "" || flight.to === toValue)
  );

  displayFlights(filteredFlights);
}

// ===== اختيار الحجز =====
function choosePayment(flightNumber, price, from, to, time) {
  const paymentParams = new URLSearchParams({
    flight: flightNumber,
    price: price,
    from: from,
    to: to,
    time: time
  });
  window.location.href = `book-flight.html?${paymentParams.toString()}`;
}

// book flight
// ===== تعبئة بيانات صفحة الحجز تلقائيًا =====
document.addEventListener("DOMContentLoaded", function () {
  const flightNumber = getQueryParam('flight');
  const price = getQueryParam('price');
  const time = getQueryParam('time');
  const from = getQueryParam('from');
  const to = getQueryParam('to');
  const destination = getQueryParam("destination");

  if (document.getElementById('flightNumber') && flightNumber)
    document.getElementById('flightNumber').value = flightNumber;
  if (document.getElementById('price') && price)
    document.getElementById('price').value = price;
  if (document.getElementById('time') && time)
    document.getElementById('time').value = time;
  if (document.getElementById('from') && from)
    document.getElementById('from').value = from;
  if (document.getElementById('to') && to)
    document.getElementById('to').value = to;
  if (document.getElementById('to') && destination)
    document.getElementById('to').value = destination;

  if (document.getElementById("flightsBody")) {
    displayFlights(); // نعرض الرحلات عند تحميل الصفحة فقط إن وجدت
  }

  
});
