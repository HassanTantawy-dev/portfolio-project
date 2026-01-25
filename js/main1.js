const toggleBtn = document.getElementById("darkModeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // تغيير الأيقونة
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.innerText = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.innerText = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// حفظ الاختيار
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.innerText = "☀️";
}

document.querySelector("#massege").addEventListener("click", function (event) {
  if (!document.querySelector("form").checkValidity()) {
    return;
  } else {
    Swal.fire({
      icon: "success",
      title: "A message has been sent successfully",
      showConfirmButton: false,
      timer: 1400,
    });
  }
  event.preventDefault();
});
