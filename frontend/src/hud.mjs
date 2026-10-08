/** Endless-mode HUD helpers (plain DOM — no UI framework). */

export function formatLevel(currentLevel) {
  return `Current Level: ${currentLevel}`;
}

export function formatProgress(puzzlesSolved, totalPuzzles) {
  return `Progress: ${puzzlesSolved} / ${totalPuzzles} puzzles solved`;
}

/** Paint level + progress into a HUD element during Endless gameplay. */
export function renderEndlessHud(element, { currentLevel, puzzlesSolved, totalPuzzles }) {
  if (!element) throw new Error("HUD element is required");
  element.dataset.mode = "endless";
  element.textContent = `${formatLevel(currentLevel)} · ${formatProgress(puzzlesSolved, totalPuzzles)}`;
  return element.textContent;
}
