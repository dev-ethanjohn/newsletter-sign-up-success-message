"use strict";

const closeModal = document.querySelector(".close-dialog__button");
const modal = document.querySelector(".success-dialog");

(function () {
  const successDialog = document.querySelector(".success-dialog");
  const form = document.querySelector(".newsletter__form");
  const emailInputField = document.querySelector(".newsletter__input");
  const emailError = document.querySelector(".error-message");

  //NOTE: helper func
  function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  function clearEmail(inputElement) {
    inputElement.value = "";
  }

  function showError(message) {
    emailError.textContent = message;
    emailError.classList.remove("hidden");
    emailError.classList.add("shake");

    setTimeout(() => {
      emailError.classList.remove("shake");
    }, 400);
  }

  function hideError() {
    emailError.classList.add("hidden");
  }

  //*custom validation
  emailInputField.addEventListener("input", function () {
    if (emailInputField.validity.valid) {
      hideError();
      emailInputField.classList.remove("invalid");
    }
  });

  form.addEventListener("submit", function (e) {
    if (!emailInputField.validity.valid) {
      return;
    }

    const emailValue = emailInputField.value.trim();

    // check our custom
    if (!isEmailValid(emailValue)) {
      e.preventDefault();
      emailInputField.classList.add("invalid");
      showError("Please enter a valid email.");
      return;
    }

    e.preventDefault();

    //*reset
    emailInputField.classList.remove("invalid");
    clearEmail(emailInputField);

    //*show
    successDialog.classList.remove("hidden");
    successDialog.showModal();
  });
})();

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");

  setTimeout(() => {
    modal.close();
  }, 200);
});
