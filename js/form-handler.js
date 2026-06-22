// Form Validation & AJAX Handler
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);

    // Add real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("change", validateField);
    });
  }
});

// Validate individual field
function validateField(event) {
  const field = event.target;
  const errorElement = document.getElementById(field.id + "Error");
  let isValid = true;
  let errorMessage = "";

  const name = field.name;
  const value = field.value.trim();

  if (name === "name") {
    if (value.length < 2) {
      errorMessage = "Name must be at least 2 characters";
      isValid = false;
    } else if (value.length > 100) {
      errorMessage = "Name cannot exceed 100 characters";
      isValid = false;
    } else if (!/^[a-zA-Z\s\-\.\']+$/u.test(value)) {
      errorMessage = "Name contains invalid characters";
      isValid = false;
    }
  } else if (name === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMessage = "Please enter a valid email address";
      isValid = false;
    }
  } else if (name === "subject") {
    if (value.length < 3) {
      errorMessage = "Subject must be at least 3 characters";
      isValid = false;
    } else if (value.length > 200) {
      errorMessage = "Subject cannot exceed 200 characters";
      isValid = false;
    }
  } else if (name === "message") {
    if (value.length < 10) {
      errorMessage = "Message must be at least 10 characters";
      isValid = false;
    } else if (value.length > 5000) {
      errorMessage = "Message cannot exceed 5000 characters";
      isValid = false;
    }
  }

  // Update field styling
  if (isValid && value) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  } else if (!isValid) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
  } else {
    field.classList.remove("is-invalid", "is-valid");
  }

  // Update error message
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }

  return isValid;
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector("#submitBtn");
  const successMessage = document.getElementById("successMessage");

  // Validate all fields
  const inputs = form.querySelectorAll("input[name], textarea[name]");
  let allValid = true;

  inputs.forEach((input) => {
    if (!validateField({ target: input })) {
      allValid = false;
    }
  });

  if (!allValid) {
    Swal.fire({
      icon: "warning",
      title: "Validation Error",
      text: "Please fill all fields correctly",
      confirmButtonColor: "#667eea",
    });
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Prepare form data
  const formData = new FormData(form);

  // Send via AJAX
  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Success
        Swal.fire({
          icon: "success",
          title: "Success! ✨",
          text: data.message,
          confirmButtonColor: "#667eea",
        });

        // Show success message
        if (successMessage) {
          successMessage.classList.remove("d-none");
          successMessage.textContent = data.message;
        }

        // Reset form
        form.reset();
        inputs.forEach((input) => {
          input.classList.remove("is-valid", "is-invalid");
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          if (successMessage) {
            successMessage.classList.add("d-none");
          }
        }, 5000);
      } else {
        // Server validation errors
        if (data.errors && Object.keys(data.errors).length > 0) {
          Object.keys(data.errors).forEach((field) => {
            const errorElement = document.getElementById(field + "Error");
            const fieldInput = form.querySelector(`[name="${field}"]`);

            if (errorElement) {
              errorElement.textContent = data.errors[field];
            }
            if (fieldInput) {
              fieldInput.classList.add("is-invalid");
            }
          });
        }

        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "An error occurred",
          confirmButtonColor: "#667eea",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while sending your message",
        confirmButtonColor: "#667eea",
      });
    })
    .finally(() => {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
}
