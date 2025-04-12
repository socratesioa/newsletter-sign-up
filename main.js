console.log("Script loaded");

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const submitButton = document.getElementById("submit-btn");
const emailDisplay = document.getElementById("email-display");
const newsletterDiv = document.querySelector(".newsletter");
const successSection = document.getElementById("success");

emailInput.addEventListener("input", () => {
  if (emailInput.value.trim() !== "") {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

const displayEmail = (email) => {
  const registered = document.querySelector("#email-display");
  if (registered) {
    registered.textContent = email;
  }

  if (newsletterDiv) {
    newsletterDiv.style.display = "none";
  }
  if (successSection) {
    successSection.style.display = "block";
  }

  document.querySelector("#success").style.display = "block";
};

const handleSubmit = (e) => {
  e.preventDefault();

  const emailError = document.getElementById("email-error");

  emailInput.classList.remove("input-error");
  emailError.textContent = "";

  const data = Object.fromEntries(new FormData(e.target));
  const errors = {};

  const email = data.email.trim();

  if (!email) {
    errors.email = "Valid email required";
    emailInput.classList.add("input-error");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Valid email required";
    emailInput.classList.add("input-error");
  }

  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
  } else {
    console.log("Form is Valid", data);
    displayEmail(email);
  }

  function displayErrors(errors) {
    for (const key in errors) {
      const errorElement = document.getElementById(`${key}-error`);
      if (errorElement) {
        errorElement.textContent = errors[key];
      }
    }
  }
};

form.addEventListener("submit", handleSubmit);
