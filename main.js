const scriptURL = "https://script.google.com/macros/s/AKfycbyCLNOE8KRlG-sPz-h2YEu0BGvf5AtvBgTOdKOz_ckuKbazHQewEBCpkLVojn3kAEnl/exec";
const form = document.forms["submit-to-google-sheet"];
const submitButton = document.querySelector('input[type="submit"]'); // Submit tugmasini tanlash

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Submit tugmasini o'chirib qo'yish
  submitButton.disabled = true;
  submitButton.style.cursor = "not-allowed";

  const formData = new FormData(form);

  fetch(scriptURL, { method: "POST", body: formData })
    .then(response => {
      swal("Done", "Submitted Successfully.", "success");
      form.reset();
    })
    .catch(error => {
      swal("Error", "Something went wrong. Please try again!", "error");
      console.error("Error:", error);
    })
    .finally(() => {
      // Submit tugmasini qayta yoqish
      submitButton.disabled = false;
      submitButton.style.cursor = "pointer";
    });
});