// Per-story reactions, saved in localStorage (one entry set per story
// page, keyed off the page's own filename). Swap the load/save functions
// for API calls later to move this to a real backend.
(function () {
  const STORY_PAGE = /^story[1-8]\.html$/;

  const currentPage = window.location.pathname.split("/").pop();
  if (!STORY_PAGE.test(currentPage)) return;

  const storyId = currentPage.replace(".html", "");
  const REACTIONS_KEY = `athenaeum-reactions-${storyId}`;
  const REACTED_KEY = `athenaeum-reacted-${storyId}`;

  function loadJSON(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const reactionButtons = document.querySelectorAll(".reaction-btn");
  if (!reactionButtons.length) return;

  const counts = loadJSON(REACTIONS_KEY, {});
  const reacted = new Set(loadJSON(REACTED_KEY, []));

  function renderReactions() {
    reactionButtons.forEach((btn) => {
      const emoji = btn.dataset.emoji;
      btn.querySelector(".reaction-count").textContent = counts[emoji] || 0;
      btn.classList.toggle("is-active", reacted.has(emoji));
    });
  }

  reactionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const emoji = btn.dataset.emoji;
      const isActive = reacted.has(emoji);

      counts[emoji] = Math.max(0, (counts[emoji] || 0) + (isActive ? -1 : 1));
      if (isActive) {
        reacted.delete(emoji);
      } else {
        reacted.add(emoji);
      }

      saveJSON(REACTIONS_KEY, counts);
      saveJSON(REACTED_KEY, [...reacted]);
      renderReactions();
    });
  });

  renderReactions();
})();
