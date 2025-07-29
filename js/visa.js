function validateForm() {
  let name = document.getElementById("name").value.trim();
  let cardNumber = document.getElementById("card-number").value.trim().replace(/\s+/g, '');
  let expiry = document.getElementById("expiry").value;
  let cvc = document.getElementById("cvc").value.trim();
  let errorMessage = document.getElementById("error-message");

  if (name === "" || cardNumber.length < 14 || expiry === "" || cvc.length < 3) {
    errorMessage.style.display = "block";
    errorMessage.innerText = "❌ Please fill out all fields correctly.";
    return false;
  }

  // ✅ البيانات سليمة، كمّل الإرسال
  return true;
}
