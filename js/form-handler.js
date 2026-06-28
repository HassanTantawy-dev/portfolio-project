// تفعيل الحساب بمفتاحك العام (الـ Public Key بتجيبه من Account Settings تحت خالص على الشمال في موقع EmailJS)
emailjs.init("e5gZOFDvJ2mimdmGG"); 

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const successAlert = document.getElementById("successMessage");

    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    emailjs.sendForm("service_gvuoqca", "template_xm4mofv", this)
      .then(() => {
        if (successAlert) {
          successAlert.classList.remove("d-none");
          successAlert.innerText = "Your message has been sent successfully!";
        }

        contactForm.reset();
      }, (error) => {
        console.error("Failed...", error);
        alert("Something went wrong, please try again.");
      })
      .finally(() => {
        submitBtn.innerText = "Send Message";
        submitBtn.disabled = false;
      });
  });
}