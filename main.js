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
const scrollbar = document.getElementById('myScrollbar');
const scrollbarThumb = document.getElementById('scrollbarThumb');
const qiyshayganDiv = document.querySelector('.qiyshaygan-div');

let isDragging = false;
let startY = 0;

scrollbarThumb.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY - scrollbarThumb.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  e.preventDefault();

  const y = e.clientY - startY;
  const scrollbarHeight = scrollbar.offsetHeight;
  const thumbHeight = scrollbarThumb.offsetHeight;
  const maxScroll = scrollbarHeight - thumbHeight;

  const scrollPercent = y / maxScroll;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const maxWindowScroll = documentHeight - windowHeight;

  // Sahifa va divni scroll qilish
  window.scrollTo(0, scrollPercent * maxWindowScroll);
  qiyshayganDiv.scrollTo(scrollPercent * (qiyshayganDiv.scrollWidth - qiyshayganDiv.clientWidth), 0);

  // Tugmaning pozitsiyasini yangilang
  scrollbarThumb.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

window.addEventListener('scroll', () => {
  // Sahifa scroll qilinganda tugmaning pozitsiyasini yangilang
  const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
  const scrollbarHeight = scrollbar.offsetHeight;
  const thumbHeight = scrollbarThumb.offsetHeight;
  const maxScroll = scrollbarHeight - thumbHeight;
  scrollbarThumb.style.top = `${scrollPercent * maxScroll}px`;

  // Divni ham scroll qilish
  qiyshayganDiv.scrollTo(scrollPercent * (qiyshayganDiv.scrollWidth - qiyshayganDiv.clientWidth), 0);
});