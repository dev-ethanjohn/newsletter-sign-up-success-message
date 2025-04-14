"use strict";

(function () {
  const successDialog = document.querySelector(".success-dialog");
  const openDialogBtn = document.querySelector(".open-dialog__button");
  const emailInputField = document.querySelector(".newsletter__input");
  const emailError = document.querySelector(".error-message");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //NOTE: helper func
  function isEmailValid(email) {
    return emailPattern.test(email);
  }

  function clearEmail(inputElement) {
    inputElement.value = "";
  }

  function showError(message) {
    emailError.textContent = message;
    emailError.classList.remove("hidden");
    emailError.classList.add("shake");

    // remove shake class after animation completes
    setTimeout(() => {
      emailError.classList.remove("shake");
    }, 400);
  }

  function hideError() {
    emailError.classList.add("hidden");
  }

  function handleSubmitBtn(e) {
    e.preventDefault();

    //* get email input
    const emailValue = emailInputField.value.trim();
    // console.log("Entered email:", emailValue);

    hideError();

    // *validate email input
    if (!isEmailValid(emailValue)) {
      showError("Please enter a valid email.");
      emailInputField.classList.add("invalid");

      return;
    }

    // * reset
    emailInputField.classList.remove("invalid");
    clearEmail(emailInputField);

    // * show if email valid
    successDialog.showModal();
  }

  openDialogBtn.addEventListener("click", handleSubmitBtn);
})();
