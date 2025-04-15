"use strict";

const closeModal = document.querySelector(".close-dialog__button");
const modal = document.querySelector(".success-dialog");
const successDialogEmail = document.querySelector(".success-dialog__email");

(function () {
  const successDialog = document.querySelector(".success-dialog");
  const form = document.querySelector(".newsletter__form");
  const emailInputField = document.querySelector(".newsletter__input");
  const emailError = document.querySelector(".error-message");

  // NOTE helper func
  function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  function clearEmail(inputElement) {
    inputElement.value = "";
  }

  let shakeTimeout;
  function showError(message) {
    emailError.textContent = message;
    emailError.classList.remove("hidden");
    emailError.classList.add("shake");

    clearTimeout(shakeTimeout); //* ensure animation doesn't conflict
    shakeTimeout = setTimeout(() => {
      emailError.classList.remove("shake");
    }, 400);
  }

  function hideError() {
    emailError.classList.add("hidden");
  }

  // NOTE: Event listeners
  emailInputField.addEventListener("input", function () {
    if (emailInputField.validity.valid) {
      hideError();
      emailInputField.classList.remove("invalid");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailValue = emailInputField.value.trim();
    if (!isEmailValid(emailValue)) {
      emailInputField.classList.add("invalid");
      showError("Please enter a valid email.");
      return;
    }

    //* show dialog + bind email text
    successDialogEmail.textContent = emailValue;
    emailInputField.classList.remove("invalid");
    clearEmail(emailInputField);

    successDialog.classList.remove("hidden");
    successDialog.showModal();

    closeModal.focus();

    setTimeout(() => {
      closeModal.classList.add("highlight-button");
    }, 300);
  });
})();

//* close modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  closeModal.classList.remove("highlight-button");
  setTimeout(() => {
    modal.close();
  }, 200);
});

//* exit on esc
modal.addEventListener("cancel", () => {
  modal.classList.add("hidden");
  closeModal.classList.remove("highlight-button");
});
