 function processPayment() {
            let phone = document.getElementById("phone").value.trim();
            let password = document.getElementById("password").value.trim();
            let provider = document.getElementById("provider").value;
            let message = document.getElementById("message");
            
            if (!phone || !password || !provider) {
                message.innerHTML = "❌ يُرجى ملء جميع الحقول.";
                return;
            }
            
            if (!/^01[0-11]{11}$/.test(phone)) {
                message.innerHTML = "❌ يُرجى إدخال رقم هاتف صالح.";
                return;
            }
            
            message.innerHTML = "✅ تمت عملية الدفع بنجاح.";
            
        }