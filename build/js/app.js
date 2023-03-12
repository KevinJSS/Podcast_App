const scrollDownBtn = document.querySelector("#scroll-down-button");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    scrollDownBtn.style.display = "none";
  } else {
    scrollDownBtn.style.display = "block";
  }
});

scrollDownBtn.addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
});