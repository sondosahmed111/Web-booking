document.addEventListener("DOMContentLoaded", function () {

  // ======= Hover animation on book-now buttons =======
  document.querySelectorAll('.book-now').forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.animation = 'vibrate 0.3s linear';
    });
    button.addEventListener('mouseleave', () => {
      button.style.animation = '';
    });
  });

  // ======= Scroll To Top =======
  const scrollBtn = document.getElementById("scrollToTop");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ======= Slider =======
  const cards = document.getElementById('cardSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (cards && prevBtn && nextBtn) {
    let counter = 0;
    let cardWidth = cards.children[0]?.offsetWidth + 20 || 0;
    const getVisibleCards = () => Math.floor(cards.parentElement.offsetWidth / cardWidth);
    const getMaxCounter = () => Math.max(cards.children.length - getVisibleCards(), 0);
    const updateSlider = () => {
      const maxCounter = getMaxCounter();
      counter = Math.max(0, Math.min(counter, maxCounter));
      cards.style.transform = `translateX(-${counter * cardWidth}px)`;
      prevBtn.disabled = counter <= 0;
      nextBtn.disabled = counter >= maxCounter;
    };
    prevBtn.addEventListener('click', () => { counter--; updateSlider(); });
    nextBtn.addEventListener('click', () => { counter++; updateSlider(); });
    window.addEventListener('resize', () => { 
      cardWidth = cards.children[0]?.offsetWidth + 20 || 0;
      updateSlider();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') counter++;
      if (e.key === 'ArrowLeft') counter--;
      updateSlider();
    });
    updateSlider();
  }

  // ======= Show More generic =======
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

  // ======= Animation for gallery images =======
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const images = document.querySelectorAll('.gallery-item img');
          images.forEach((img, i) => {
            setTimeout(() => {
              img.style.animation = 'fadeInImage 0.6s ease forwards';
            }, i * 500);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(gallery);
  }

  // ======= Show initial matches =======
  displayMatches(matches.slice(0, 3));

  // ======= Intersection animations =======
  const observerSections = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(
    '.hotel-card-text-custom, .hotel-pricing-card, .hotel-card-image, ' + 
    '.cinema-card-text-custom, .cinema-card-image, ' +
    '.stage-card-text-custom, .stage-card-image'
  ).forEach(el => observerSections.observe(el));

  // ======= Animate cards with data-animation =======
  const animatedCards = document.querySelectorAll('.card[data-animation]');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.getAttribute('data-animation');
        const delay = entry.target.getAttribute('data-delay') || '0s';
        entry.target.style.setProperty('--animate-delay', delay);
        entry.target.classList.add('animate__animated', animation);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  animatedCards.forEach(card => cardObserver.observe(card));

  // ======= AOS init =======
  AOS.init({
    duration: 2500,
    once: false
  });

}); // end DOMContentLoaded

// ======= Google Maps & Locations =======
function openMap(query, alertMsg) {
  const city = document.getElementById('search-input')?.value;
  if (city) {
    alert(`You are being directed to the ${alertMsg}.`);
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}+${encodeURIComponent(city)}`, "_blank");
  } else {
    alert("Please enter a city or location.");
  }
}
function searchTrain() { openMap("train stations", "nearest train station available"); }
function searchMetro() { openMap("metro stations", "nearest metro station available"); }
function searchFlight() { openMap("flights", "nearest flight location available"); }

function locateOnMap(place) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      window.open(`https://www.google.com/maps/search/${place}/@${lat},${lon},15z`, '_blank');
    }, function() {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function goToNearestCinema() { locateOnMap("cinema"); }
function goToNearestStage() { locateOnMap("theater"); }
function goToNearestHotel() { locateOnMap("hotel+near+me"); }
function goToNearestGameCenter() { locateOnMap("game+center+near+me"); }
function goToNearestMatch() { locateOnMap("stadium+near+me"); }

// ======= Matches table & Filter =======
  const matches = [
      { team1: "Al Ahly", team2: "Zamalek", date: "2025-04-10", time: "18:00", stadium: "Cairo International Stadium", price: 150 },
      { team1: "Ismaily", team2: "Al Masry", date: "2025-04-12", time: "20:00", stadium: "Ismailia Stadium", price: 120 },
      { team1: "Ittihad Alexandria", team2: "Smouha", date: "2025-04-14", time: "19:30", stadium: "Alexandria Stadium", price: 100 },
      { team1: "Al Ahly", team2: "El Entag El Harby", date: "2025-05-01", time: "21:00", stadium: "Ismailia Stadium", price: 130 },
      { team1: "Al Ahly", team2: "Pyramids", date: "2025-05-05", time: "20:30", stadium: "Cairo International Stadium", price: 160 },
      { team1: "Arab Contractors", team2: "Tala'ea El Gaish", date: "2025-05-10", time: "19:45", stadium: "Arab Contractors Stadium", price: 110 },
      { team1: "Pyramids", team2: "Ghazl El Mahalla", date: "2025-05-15", time: "22:00", stadium: "Military Production Stadium", price: 140 },
      { team1: "Farco", team2: "Enppi", date: "2025-06-01", time: "18:30", stadium: "Alexandria Stadium", price: 90 },
      { team1: "Haras El Hodoud", team2: "El Dakhleya", date: "2025-06-08", time: "21:45", stadium: "Haras El Hodoud Stadium", price: 80 },
      { team1: "National Bank of Egypt", team2: "Aswan", date: "2025-06-15", time: "20:00", stadium: "PetroSport Stadium", price: 85 },
      { team1: "Arab Contractors", team2: "Ismaily", date: "2025-06-20", time: "19:00", stadium: "Arab Contractors Stadium", price: 100 },
      { team1: "Zamalek", team2: "Tala'ea El Gaish", date: "2025-07-01", time: "18:45", stadium: "Cairo International Stadium", price: 150 },
      { team1: "El Tersana", team2: "Al Qanah", date: "2025-07-05", time: "17:30", stadium: "El Tersana Stadium", price: 95 },
      { team1: "Wadi Degla", team2: "Petrojet", date: "2025-07-10", time: "19:15", stadium: "Military Academy Stadium", price: 105 },
      { team1: "El Mansoura", team2: "Tanta", date: "2025-07-15", time: "18:00", stadium: "El Mansoura Stadium", price: 90 },
      { team1: "El Sharqiya", team2: "El Nogoom", date: "2025-07-20", time: "20:30", stadium: "El Sharqiya Stadium", price: 100 },
      { team1: "Zamalek", team2: "Al Masry", date: "2025-07-08", time: "19:30", stadium: "Cairo International Stadium", price: 140 },
      { team1: "Zamalek", team2: "Ismaily", date: "2025-07-15", time: "20:00", stadium: "Cairo International Stadium", price: 130 },
      { team1: "Zamalek", team2: "Ittihad Alexandria", date: "2025-07-22", time: "21:15", stadium: "Cairo International Stadium", price: 145 }
    ];
function displayMatches(matchesList) {
  const container = document.getElementById("matches");
  if (!container) return;
  container.innerHTML = "";
  matchesList.forEach(match => {
    container.innerHTML += `
      <tr>
        <td>${match.team1}</td><td>${match.team2}</td><td>${match.date}</td>
        <td>${match.time}</td><td>${match.stadium}</td><td>${match.price} EGP</td>
        <td><a href="book-match.html?name=${match.team1}🆚${match.team2}&stadium=${match.stadium}&date=${match.date}&time=${match.time}&price=${match.price}" 
        class="btn1" onclick="saveBookingInfo(this)">Book now</a></td>
      </tr>`;
  });
}
function filterMatches() {
  const value = document.getElementById("search")?.value.trim();
  const filtered = value === "" ? matches.slice(0, 3) : matches.filter(m =>
    m.team1.includes(value) || m.team2.includes(value));
  displayMatches(filtered);
}

// ======= Save Info for cinema & stage =======
function savecinemaInfo(button) {
  let card = button.closest(".discount-card");
  localStorage.setItem("movieName", card.querySelector("h3").innerText);
  localStorage.setItem("ticketPrice", card.querySelector("span").innerText);
  localStorage.setItem("movieDay", card.querySelectorAll("p")[0].innerText);
}
function savestageInfo(button) {
  let card = button.closest(".discount-card");
  localStorage.setItem("movieName", card.querySelector("h3").innerText);
  localStorage.setItem("ticketPrice", card.querySelector(".price").innerText);
  localStorage.setItem("movieDay", card.querySelectorAll("p")[0].innerText);
}






// animationnn
document.addEventListener("DOMContentLoaded", function () {
  const observerSections = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // اجمع كل العناصر اللي محتاجة الأنيميشن
  document.querySelectorAll(
    '.hotel-card-text-custom, .hotel-pricing-card, .hotel-card-image, ' + 
    '.cinema-card-text-custom, .cinema-card-image, ' +
    '.stage-card-text-custom, .stage-card-image'
  ).forEach(el => observerSections.observe(el));
});


// animation stage
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // يراقب كل عناصر المسرح
  document.querySelectorAll('.stage-card, .card[data-animation]').forEach(el => {
    observer.observe(el);
  });
});
  const animatedCards = document.querySelectorAll('.card[data-animation]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.getAttribute('data-animation');
        const delay = entry.target.getAttribute('data-delay') || '0s';
        entry.target.style.setProperty('--animate-delay', delay);
        entry.target.classList.add('animate__animated', animation);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  animatedCards.forEach(card => {
    observer.observe(card);
  });

// Categories Section cinema
   AOS.init({
  duration: 2500, // مدة الأنميشن بطيئة
  once: false     // الأنميشن يشتغل كل مرة توصلي عنده
});
// end : animation

