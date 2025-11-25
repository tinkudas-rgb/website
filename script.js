const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".primary-nav");
const heroVisual = document.querySelector(".hero__visual");
const orbitCard = document.querySelector(".orbit-card");
const yearTarget = document.getElementById("year");
const guideButton = document.querySelector(".btn-ghost");

yearTarget.textContent = new Date().getFullYear();

navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", (!expanded).toString());
  header.classList.toggle("nav-open");
});

nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  })
);

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("compressed");
  } else {
    header.classList.remove("compressed");
  }
});

if (heroVisual && orbitCard) {
  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    orbitCard.style.transform = `rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  });

  heroVisual.addEventListener("pointerleave", () => {
    orbitCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

guideButton?.addEventListener("click", () => {
  const originalText = guideButton.dataset.originalText || guideButton.textContent;
  guideButton.dataset.originalText = originalText;
  guideButton.disabled = true;
  guideButton.textContent = "Preparing field guide…";
  setTimeout(() => {
    guideButton.textContent = "Guide scheduled for inbox";
    setTimeout(() => {
      guideButton.textContent = guideButton.dataset.originalText;
      guideButton.disabled = false;
    }, 1400);
  }, 900);
});
