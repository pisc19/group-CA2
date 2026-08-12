// Opens/closes the mobile nav, and closes it again once a link is tapped.
document.querySelectorAll(".navbar").forEach((navbar) => {
  const toggle = navbar.querySelector(".nav-toggle");
  const links = navbar.querySelector(".nav-links");
  if (!toggle || !links) return;

  function setOpen(isOpen) {
    links.classList.toggle("nav-open", isOpen);
    toggle.classList.toggle("nav-toggle-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", () => {
    setOpen(!links.classList.contains("nav-open"));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
});
