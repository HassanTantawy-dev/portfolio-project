// Dark Mode Toggle
const toggleBtn = document.getElementById("darkModeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // تغيير الأيقونة مع تأثير متقدم
    if (document.body.classList.contains("dark-mode")) {
      toggleBtn.innerText = "☀️";
      localStorage.setItem("theme", "dark");
      // تأثير الدوران والتكبير
      toggleBtn.style.transform = "rotate(360deg) scale(1.2)";
      setTimeout(() => {
        toggleBtn.style.transform = "rotate(0deg) scale(1)";
      }, 600);
    } else {
      toggleBtn.innerText = "🌙";
      localStorage.setItem("theme", "light");
      toggleBtn.style.transform = "rotate(-360deg) scale(1.2)";
      setTimeout(() => {
        toggleBtn.style.transform = "rotate(0deg) scale(1)";
      }, 600);
    }
  });
}

// حفظ الاختيار عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
  if (toggleBtn) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.innerText = "☀️";
    } else {
      toggleBtn.innerText = "🌙";
    }
  }
});

// معالجة إرسال رسالة التواصل (Legacy - for old form)
const oldMessageBtn = document.querySelector("#massege");
if (oldMessageBtn) {
  oldMessageBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const form = document.querySelector("form");

    if (!form.checkValidity()) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
        text: "Make sure to fill all required fields correctly",
        confirmButtonColor: "#667eea",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Message Sent Successfully! ✨",
      text: "Thank you for your message. I'll get back to you soon!",
      showConfirmButton: true,
      confirmButtonColor: "#667eea",
      timer: 2000,
    });

    // مسح النموذج بعد الإرسال
    setTimeout(() => {
      form.reset();
    }, 500);
  });
}

// تأثير التمرير السلس (Smooth Scroll)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// إضافة تأثير الظهور عند التمرير
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// مراقبة العناصر
document.querySelectorAll(".skill-card, .project-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});
