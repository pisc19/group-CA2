// Fades/slides ".reveal" elements in as they scroll into view.
// ".reveal-immediate" elements (e.g. hero content already on screen at
// load) play the same animation right away instead of waiting on scroll.
(function () {
  const immediateEls = document.querySelectorAll(".reveal-immediate");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      immediateEls.forEach((el) => el.classList.add("is-visible"));
    });
  });

  const scrollEls = document.querySelectorAll(".reveal:not(.reveal-immediate)");
  if (!scrollEls.length) return;

  if (!("IntersectionObserver" in window)) {
    scrollEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  scrollEls.forEach((el) => observer.observe(el));
})();
