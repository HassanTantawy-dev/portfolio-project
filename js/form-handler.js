// تفعيل الحساب بمفتاحك العام (الـ Public Key بتجيبه من Account Settings تحت خالص على الشمال في موقع EmailJS)
emailjs.init("e5gZOFDvJ2mimdmGG"); 

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // منع الصفحة من الـ Refresh

    const submitBtn = document.getElementById('submitBtn');
    const successAlert = document.getElementById('successMessage');

    // تغيير نص الزرار علشان اليوزر يعرف إنه بيحمل
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    // إرسال البيانات فوراً باستخدام الـ IDs بتاعتك من الصور
    emailjs.sendForm('service_4b3kedo', 'template_xm4mofv', this)
        .then(() => {
            // إظهار رسالة النجاح الخضراء اللي في كود الـ HTML بتاعك
            if (successAlert) {
                successAlert.classList.remove('d-none');
                successAlert.innerText = 'Your message has been sent successfully!';
            }
            
            // تصفير الفورم بعد الإرسال
            document.getElementById('contactForm').reset(); 
        }, (error) => {
            console.error('Failed...', error);
            alert('Something went wrong, please try again.');
        })
        .finally(() => {
            // إرجاع الزرار لحالته الطبيعية
            submitBtn.innerText = 'Send Message';
            submitBtn.disabled = false;
        });
});