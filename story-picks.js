// Shows up to 3 random notice-board notes tagged with this story, pulling
// straight from the same notes the Notice Board page writes (see
// js/notes-render.js, which must be loaded before this file).
(function () {
  const PICK_COUNT = 3;
  const STORY_PAGE = /^story[1-8]\.html$/;

  const currentPage = window.location.pathname.split("/").pop();
  if (!STORY_PAGE.test(currentPage)) return;

  const grid = document.getElementById("storyPicksGrid");
  const emptyEl = document.getElementById("storyPicksEmpty");
  if (!grid) return;

  const storyId = currentPage.replace(".html", "");

  function pickRandom(arr, count) {
    const pool = arr.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  const matches = AthenaeumNotes.load().filter((note) => note.storyId === storyId);
  const picks = pickRandom(matches, PICK_COUNT);

  if (emptyEl) emptyEl.classList.toggle("is-hidden", picks.length > 0);

  picks.forEach((note) => grid.appendChild(AthenaeumNotes.createCard(note)));
})();
