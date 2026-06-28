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
    const icon = button.querySelector(".theme-icon");
    if (!icon) return;

    icon.textContent = isDark ? "☀" : "☾";
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

// Smooth scroll for in-page links.
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

// Close mobile menu after clicking a nav link.
const navbarCollapse = document.getElementById("navbarSupportedContent");
const navbarToggler = document.querySelector(".navbar-toggler");

if (navbarCollapse && navbarToggler) {
  navbarCollapse.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });
}

// Scroll progress bar and back-to-top button.
const backToTopBtn = document.getElementById("backToTopBtn");
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  if (backToTopBtn) {
    backToTopBtn.classList.toggle("show", scrollTop > 400);
  }
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

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
