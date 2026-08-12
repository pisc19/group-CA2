// The Notice Board page: renders every pinned note, filters them by story,
// and adds new ones. Storage and card markup live in js/notes-render.js,
// which must be loaded before this file.

// Single source of truth: story id (matches storyN.html), title, and short label for chips.
const STORIES = [
  { id: "story1", title: "The Christmas Truce of 1914", short: "Christmas Truce" },
  { id: "story2", title: "Apollo-Soyuz: A Handshake in Orbit", short: "Apollo-Soyuz" },
  { id: "story3", title: "The Fall of the Berlin Wall", short: "Berlin Wall" },
  { id: "story4", title: "One Station, Fifteen Nations", short: "ISS" },
  { id: "story5", title: "One Genome, Six Nations", short: "Genome Project" },
  { id: "story6", title: "The Rescue of the 33", short: "Rescue of the 33" },
  { id: "story7", title: "One Flag, Two Koreas", short: "Two Koreas" },
  { id: "story8", title: "One Disaster, Ninety Nations", short: "Ninety Nations" }
];

const boardGrid = document.getElementById("boardGrid");
const boardEmpty = document.getElementById("boardEmpty");
const boardFilters = document.getElementById("boardFilters");
const noteForm = document.getElementById("noteForm");
const noteNameInput = document.getElementById("noteName");
const noteMessageInput = document.getElementById("noteMessage");

const boardPagination = document.getElementById("boardPagination");
const boardPageStatus = document.getElementById("boardPageStatus");
const boardPrevPage = document.getElementById("boardPrevPage");
const boardNextPage = document.getElementById("boardNextPage");

const NOTES_PER_PAGE = 12;

let currentFilter = "all";
let currentPage = 1;

function buildFilterChips() {
  const chips = STORIES.map(
    (story) => `<button type="button" class="filter-chip" data-story="${story.id}">${story.short}</button>`
  );
  boardFilters.innerHTML =
    `<button type="button" class="filter-chip active" data-story="all">All notes</button>` + chips.join("");
}

function renderNotes() {
  const allNotes = AthenaeumNotes.load();
  const notes = currentFilter === "all"
    ? allNotes
    : allNotes.filter((note) => note.storyId === currentFilter);

  const totalPages = Math.max(1, Math.ceil(notes.length / NOTES_PER_PAGE));
  currentPage = Math.min(currentPage, totalPages);

  const start = (currentPage - 1) * NOTES_PER_PAGE;
  const pageNotes = notes.slice(start, start + NOTES_PER_PAGE);

  boardGrid.innerHTML = "";
  boardEmpty.classList.toggle("is-hidden", notes.length > 0);

  pageNotes.forEach((note) => {
    const story = STORIES.find((entry) => entry.id === note.storyId);
    boardGrid.appendChild(AthenaeumNotes.createCard(note, story));
  });

  boardPagination.classList.toggle("is-hidden", totalPages <= 1);
  boardPageStatus.textContent = `Page ${currentPage} of ${totalPages}`;
  boardPrevPage.disabled = currentPage === 1;
  boardNextPage.disabled = currentPage === totalPages;
}

function goToPage(page) {
  currentPage = page;
  renderNotes();
  boardGrid.scrollIntoView({ behavior: "smooth", block: "start" });
}

// One listener on the row rather than one per chip, so the chips can be
// rebuilt without rewiring anything.
boardFilters.addEventListener("click", (e) => {
  const chip = e.target.closest(".filter-chip");
  if (!chip) return;

  boardFilters.querySelectorAll(".filter-chip").forEach((other) => other.classList.remove("active"));
  chip.classList.add("active");
  currentFilter = chip.dataset.story;
  currentPage = 1;
  renderNotes();
});

boardPrevPage.addEventListener("click", () => {
  if (currentPage > 1) goToPage(currentPage - 1);
});

boardNextPage.addEventListener("click", () => {
  goToPage(currentPage + 1);
});

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = noteMessageInput.value.trim();
  if (!message) return;

  const selectedStory = noteForm.querySelector('input[name="storyId"]:checked');

  const notes = AthenaeumNotes.load();
  notes.unshift({
    name: noteNameInput.value.trim(),
    message: message,
    storyId: selectedStory && selectedStory.value ? selectedStory.value : null,
    time: new Date().toISOString()
  });
  AthenaeumNotes.save(notes);

  noteForm.reset();
  currentPage = 1;
  renderNotes();

  boardGrid.scrollIntoView({ behavior: "smooth", block: "start" });
});

buildFilterChips();
renderNotes();
