// Dark Mode Toggle
const themeToggleBtns = document.querySelectorAll(".theme-toggle");

themeToggleBtns.forEach((button) => {
  Array.from(button.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.remove();
    }
  });
});

function setThemeIcon(isDark) {
  themeToggleBtns.forEach((button) => {
    const icon = button.querySelector("i");
    if (!icon) return;

    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  });
}

themeToggleBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");

    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setThemeIcon(isDark);

    button.classList.remove("is-switching");
    void button.offsetWidth;
    button.classList.add("is-switching");
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("theme") === "dark";

  document.body.classList.toggle("dark-mode", isDark);
  setThemeIcon(isDark);
});

// Legacy contact message handler.
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
      title: "Message Sent Successfully!",
      text: "Thank you for your message. I'll get back to you soon!",
      showConfirmButton: true,
      confirmButtonColor: "#667eea",
      timer: 2000,
    });

    setTimeout(() => {
      form.reset();
    }, 500);
  });
}

// Smooth scroll for page links.
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

// Reveal cards while scrolling.
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

document.querySelectorAll(".skill-card, .project-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});
