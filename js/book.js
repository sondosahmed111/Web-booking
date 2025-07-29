console.log("book.js loaded...");

let trains = []; // عشان نستخدمها في أي مكان

// ============ START: Book Train ============
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  // تعبئة الحقول تلقائيًا من الـ URL
  const trainFields = ["trainNumber", "from", "to", "time", "price"];
  trainFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = urlParams.get(id === "trainNumber" ? "train" : id);
  });

  // التحقق من المدخلات الأساسية فقط، بدون توجيه
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      const fullName = document.getElementById("fullName")?.value.trim();
      const payment = document.getElementById("payment")?.value;
      const date = document.getElementById("date")?.value;
      const message = document.getElementById("form-message");

      if (!fullName || !payment || !date) {
        e.preventDefault(); // نمنع الحفظ لو في نقص
        if (message) message.classList.remove("d-none");
      } else {
        if (message) message.classList.add("d-none");
      }
    });
  }
});

// ============ END: Book Train ============


// ============ START: Book Metro ============
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const metroNumber = urlParams.get('metro');
  const from = urlParams.get('from');
  const to = urlParams.get('to');
  const price = urlParams.get('price');
  const time = urlParams.get('time');

  document.getElementById("metroNumber").value = metroNumber;
  document.getElementById("from").value = from;
  document.getElementById("to").value = to;
  document.getElementById("price").value = price;
  document.getElementById("time").value = time;
});

// ============ END: Book Metro ============


// ============ START: Book Flight ============
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const flightFields = { flightNumber: "flight", price: "price", time: "time", from: "from", to: "to" };
  Object.keys(flightFields).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = urlParams.get(flightFields[id]);
  });

  const flightForm = document.querySelector('#flightForm');
  if (flightForm) {
    flightForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const payment = document.getElementById("payment")?.value;
      if (payment === "Visa") {
        window.location.href = "visaflight.html";
      } else if (payment === "Cash") {
        window.location.href = "cashflight.html";
      }
    });
  }
});
// ============ END: Book Flight ============

// ============ START: Book Match ============
document.addEventListener("DOMContentLoaded", () => {
  const ticketInput = document.getElementById("ticket-count");
  const matchNameEl = document.getElementById("match-name");
  const ticketPriceEl = document.getElementById("ticket-price");
  const matchPlaceEl = document.getElementById("match-place");
  const matchTimeEl = document.getElementById("match-time");
  const totalPriceEl = document.getElementById("match-total-price");

  const matchName = localStorage.getItem("matchName") || "غير محدد";
  const ticketPrice = +localStorage.getItem("ticketPrice") || 0;
  const matchPlace = localStorage.getItem("matchPlace") || "غير محدد";
  const matchTime = localStorage.getItem("matchTime") || "غير محدد";

  if (matchNameEl) matchNameEl.innerText = matchName;
  if (ticketPriceEl) ticketPriceEl.innerText = ticketPrice + " EGP";
  if (matchPlaceEl) matchPlaceEl.innerText = matchPlace;
  if (matchTimeEl) matchTimeEl.innerText = matchTime;

  function updateTotalPrice() {
    const count = parseInt(ticketInput?.value) || 1;
    const total = count * ticketPrice;
    if (totalPriceEl) totalPriceEl.innerText = total + " EGP";
    localStorage.setItem("totalAmount", total);
  }

  ticketInput?.addEventListener("input", updateTotalPrice);
  updateTotalPrice();
});

// ============ END: Book Match ============


// ============ START: Book Hotel ============
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  ["price", "hotelName", "checkInDate", "checkOutDate", "roomType"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = urlParams.get(id);
  });

  const hotelForm = document.getElementById("hotelForm");
  hotelForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payment = document.getElementById("payment")?.value;
    const page = payment === "Visa" ? "visa.html" : "cash.html";
    window.location.href = page;
  });
});
// ============ END: Book Hotel ============


// ============ START: Internal Trains ============
document.addEventListener("DOMContentLoaded", () => {
  const cities = ["Cairo", "Alexandria", "Luxor", "Aswan", "Giza", "Sohag", "Mansoura", "Tanta", "Zagazig", "Beni Suef", "Minya", "Qena", "Damanhur", "Fayoum", "Port Said", "Ismailia", "Suez", "Damietta", "Beheira", "Assiut"];
  const classes = ["First Class", "Second Class"];

  function generateRandomTime() {
    const h = Math.floor(Math.random() * 12) + 1;
    const m = Math.floor(Math.random() * 60);
    const p = Math.random() > 0.5 ? "AM" : "PM";
    return `${h}:${m < 10 ? '0'+m : m} ${p}`;
  }

  let trainNumber = 201;
  for (let from of cities) {
    for (let to of cities) {
      if (from !== to) {
        for (let i = 0; i < 10; i++) {
          trains.push({
            number: `TR${trainNumber++}`,
            from, to,
            time: generateRandomTime(),
            class: classes[Math.floor(Math.random() * classes.length)],
            price: Math.floor(Math.random() * 100) + 50
          });
        }
      }
    }
  }

  function displayTrains(filteredTrains = trains) {
    const tableBody = document.getElementById("trainsBody");
    let content = filteredTrains.length ? filteredTrains.map(t =>
      `<tr><td>${t.number}</td><td>${t.from}</td><td>${t.to}</td><td>${t.time}</td><td>${t.class}</td><td>${t.price} EGP</td><td><button onclick="bookTrain('${t.number}','${t.from}','${t.to}','${t.time}',${t.price})">Book</button></td></tr>`
    ).join("") : "<tr><td colspan='7'>No available trains</td></tr>";
    if (tableBody) tableBody.innerHTML = content;
  }

  displayTrains();

  const searchBtn = document.querySelector("button[onclick='filterTrains()']");
  searchBtn?.addEventListener("click", () => {
    const from = document.getElementById("from")?.value;
    const to = document.getElementById("to")?.value;
    const filtered = trains.filter(t =>
      (!from || t.from === from) && (!to || t.to === to)
    );
    displayTrains(filtered);
  });
});

function bookTrain(trainNumber, from, to, time, price) {
  window.location.href = `book-train.html?train=${trainNumber}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&time=${encodeURIComponent(time)}&price=${price}`;
}
// ============ END: Internal Trains ============

// =============== start : metro =========
const metros = [];
const cities = {
    line1: [ "Helwan", "Ain Helwan", "Helwan University", "Wadi Hof", "Hadayek Helwan", 
        "Hadayek El Maadi","Maadi", "Sakanat El Maadi", "Tora El Balad", "Kozzika", "Tora El Asmant", "El Maasara",
        "Dar El Salam","El Zahraa","Mar Girgis","El Malek El Saleh","Al Sayyeda Zeinab","Saad Zaghloul","Sadat","Gamal Abdel Nasser",
        "Orabi","Al Shohadaa","Ghamra","El Demerdash","Manshiet El Sadr","Kobri El Qobba","Hammamat El Qobba","New El Marg",  
         "Saray El Qobba","Hadayeq El Zaitoun","Helmeyet El Zaitoun","El Matariya","Ain Shams","Ezbet El Nakhl","El Marg"],

    line2: ["Shubra El-Kheima","Koliet El-Zeraa","Mezallat","Khalafawy","St. Teresa","Rod El-Farag","Masarra",
        "Shuhada","Ataba","Mohamed Naguib","Sadat","Opera","Dokki","Bohooth","Cairo University","Faisal","Giza","Omm El-Masryeen",
        "Sakiat Mekki","El-Mounib"],

    line3: ["Attaba","Mohamed Naguib","Sadat","Tahrir",
        "Cairo University","Faisal","Giza","Omm El-Masryeen","Sakiat Mekki","El-Mounib","Al-Omraniya"]
};

const airlines = ["EgyptAir", "Nile Air", "Air Cairo"];
const gates = ["A1", "B3", "C2"];
const prices = ["5", "10", "15", "20", "30", "50"];

function getRandomTime() {
    const hours24 = Math.floor(Math.random() * 24);
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const hours12 = hours24 % 12 || 12;
    const ampm = hours24 < 12 ? "AM" : "PM";
    return `${hours12}:${minutes} ${ampm}`;
}

let metroNumber = 101;
for (let line in cities) {
    for (let from of cities[line]) {
        for (let to of cities[line]) {
            if (from !== to) {
                for (let i = 0; i < 4; i++) {
                    metros.push({
                        number: `EGS${metroNumber++}`,
                        from: from,
                        to: to,
                        time: getRandomTime(),
                        airline: airlines[Math.floor(Math.random() * airlines.length)],
                        gate: gates[Math.floor(Math.random() * gates.length)],
                        price: prices[Math.floor(Math.random() * prices.length)],
                        line: line
                    });
                }
            }
        }
    }
}

function displayMetros(filteredMetros = metros) {
    const tableBody = document.getElementById("metrosBody");
    const fragment = document.createDocumentFragment();
    tableBody.innerHTML = "";

    if (filteredMetros.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = "<td colspan='8'>No available metros</td>";
        fragment.appendChild(row);
    } else {
        filteredMetros.forEach(metro => {
            const randomPrice = prices[Math.floor(Math.random() * prices.length)];

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${metro.number}</td>
                <td>${metro.from}</td>
                <td>${metro.to}</td>
                <td>${metro.time}</td>
                <td>${metro.airline}</td>
                <td>${metro.gate}</td>
                <td>${randomPrice}</td>
                <td><button onclick="choosePayment('${metro.number}', '${metro.from}', '${metro.to}', '${metro.time}', '${randomPrice}')">Book</button></td>
            `;
            fragment.appendChild(row);
        });
    }

    tableBody.appendChild(fragment);
}

function filterMetros() {
    const lineValue = document.getElementById("metroLine").value;
    const fromValue = document.getElementById("station1").value;
    const toValue = document.getElementById("station2").value;

    let filteredMetros = metros.filter(metro => 
        (lineValue === "" || metro.line === lineValue) && 
        (fromValue === "" || metro.from === fromValue) && 
        (toValue === "" || metro.to === toValue)
    );

    displayMetros(filteredMetros);
}

function showStations() {
    const selectedLine = document.getElementById("metroLine").value;
    const station1Select = document.getElementById("station1");
    const station2Select = document.getElementById("station2");

    station1Select.innerHTML = '';
    station2Select.innerHTML = '';

    if (cities[selectedLine]) {
        cities[selectedLine].forEach(station => {
            const option1 = document.createElement("option");
            option1.value = station;
            option1.textContent = station;
            station1Select.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = station;
            option2.textContent = station;
            station2Select.appendChild(option2);
        });
    }
}

function choosePayment(metroNumber, from, to, time, price) {
    const params = new URLSearchParams({
        metro: metroNumber,
        from: from,
        to: to,
        time: time,
        price: price
    });
    window.location.href = `book-metro.html?${params.toString()}`;
}

// ✅ لما الصفحة تفتح، نعرض كل المتروهات
document.addEventListener("DOMContentLoaded", () => {
    displayMetros();
});

// ============ END: Internal metro ============
