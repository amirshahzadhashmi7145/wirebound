export function playHintAnimation() {
    const hintElement = document.querySelector('.hint');
    if (hintElement) {
        hintElement.classList.add('hint-animation');
        setTimeout(() => {
            hintElement.classList.remove('hint-animation');
        }, 1000); // Duration of the animation
    }
}

export function playUndoAnimation() {
    const undoElement = document.querySelector('.undo');
    if (undoElement) {
        const audio = new Audio('path/to/rotate-click-sound.mp3');
        audio.playbackRate = 0.8; // Lower pitch
        audio.play();
        undoElement.classList.add('undo-animation');
        setTimeout(() => {
            undoElement.classList.remove('undo-animation');
        }, 500); // Duration of the animation
    }
}

export function formatLevel(currentLevel) {
  return `Current Level: ${currentLevel}`;
}

export function formatProgress(puzzlesSolved, totalPuzzles) {
  return `Progress: ${puzzlesSolved} / ${totalPuzzles} puzzles solved`;
}

export function renderEndlessHud(element, { currentLevel, puzzlesSolved, totalPuzzles }) {
  if (!element) throw new Error("HUD element is required");
  element.dataset.mode = "endless";
  element.textContent = `${formatLevel(currentLevel)} · ${formatProgress(puzzlesSolved, totalPuzzles)}`;
  return element.textContent;
}
