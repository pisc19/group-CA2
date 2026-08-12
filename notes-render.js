// Shared helpers for the visitor notes: the one localStorage entry they live
// in, and the markup for a single pinned note card. Loaded as a plain script
// tag BEFORE js/notice-board.js (which writes notes) and js/story-picks.js
// (which reads a few back), both of which use it via window.AthenaeumNotes.
window.AthenaeumNotes = (function () {
  const STORAGE_KEY = "athenaeum-notice-board";

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function save(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }

  function formatTime(isoString) {
    return new Date(isoString).toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  // Builds one pinned note card. Pass a story ({ id, title }) to add the
  // linked story chip the Notice Board shows; leave it out on story pages,
  // where every note on screen already belongs to the story being read.
  function createCard(note, story) {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
      <div class="note-pin"></div>
      <div class="note-name"></div>
      <div class="note-message"></div>
      <div class="note-time"></div>
    `;

    const name = card.querySelector(".note-name");
    name.textContent = note.name || "Anonymous";
    card.querySelector(".note-message").textContent = note.message;
    card.querySelector(".note-time").textContent = formatTime(note.time);

    if (story) {
      const tag = document.createElement("a");
      tag.className = "note-story-tag";
      tag.href = `${story.id}.html`;
      tag.textContent = story.title;
      name.after(tag);
    }

    return card;
  }

  return { load, save, formatTime, createCard };
})();
