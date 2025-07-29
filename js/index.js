document.addEventListener("DOMContentLoaded", function () {
  // ================== start : home background & navbar =======
  const backgroundImages = ["./img/im.jpg", "./img/im2.jpg", "./img/im3.jpg", "./img/cinema101.jpeg"];
  let bgIndex = 0;
  setInterval(() => {
    bgIndex = (bgIndex + 1) % backgroundImages.length;
    document.getElementById("background-image").src = backgroundImages[bgIndex];
  }, 2000);

  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function () {
      document.querySelectorAll(".nav-link").forEach(nav => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });
  // ================== end : home background & navbar =======


  // ================== start : numbers animation =======
  function animateNumber(elementId, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = range / (duration / 10);
    let element = document.getElementById(elementId);

    let interval = setInterval(function() {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 10);
  }

  animateNumber("bookingCount", 0, 254786, 2000);
  animateNumber("visitorCount", 0, 1125342, 3000);
  animateNumber("subscriptionCount", 0, 68920, 2500);
  // ================== end : numbers animation =======


  // ================== start : contact form =======
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      fetch('send_message.php', {
        method: 'POST',
        body: formData
      })
      .then(res => res.text())
      .then(data => {
        if (data === "success") {
          const messageBox = document.getElementById('successMessage');
          messageBox.style.display = 'block';
          contactForm.reset();
          setTimeout(() => {
            messageBox.style.display = 'none';
          }, 3000);
        } else {
          alert("❌ حصل خطأ: " + data);
        }
      });
    });
  }
  // ================== end : contact form =======
});


// ================== start : session status onload =========
window.onload = function() {
  fetch("session_status.php")
  .then(res => res.json())
  .then(data => {
    const loginLink = document.getElementById("loginLink");
    const logoutBtn = document.getElementById("logoutBtn");
    const welcomeMsg = document.getElementById("welcomeMsg");

    if (loginLink && logoutBtn && welcomeMsg) {
      if (data.loggedIn) {
        loginLink.style.display = "none";
        logoutBtn.style.display = "inline-block";
        welcomeMsg.innerText = "Welcome user#" + data.userId;
      } else {
        loginLink.style.display = "inline-block";
        logoutBtn.style.display = "none";
      }

      if (data.accountCreated) {
        loginLink.style.display = "none";
        alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
      }
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = function() {
      if (confirm("هل تريد تسجيل الخروج؟")) {
        fetch("logout.php")
        .then(() => window.location.reload());
      } else {
        console.log("لم يتم تسجيل الخروج");
      }
    };
  }
};
// ================== end : session status onload =========
	function animateNumber(elementId, start, end, duration) {
	  let range = end - start;
	  let current = start;
	  let increment = range / (duration / 10);
	  let element = document.getElementById(elementId);
	  
	  let interval = setInterval(function() {
		current += increment;
		if (current >= end) {
		  current = end;
		  clearInterval(interval);
		}
		element.textContent = Math.floor(current).toLocaleString();
	  }, 10);
	}
  
	// Animation on page load
	window.onload = function() {
	  animateNumber("bookingCount", 0, 254786, 2000);
	  animateNumber("visitorCount", 0, 1125342, 3000);
	  animateNumber("subscriptionCount", 0, 68920, 2500);
	}
