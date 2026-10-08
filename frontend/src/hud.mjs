let isPaused = false;

export function togglePauseMenu() {
    isPaused = !isPaused;
    const pauseMenu = document.getElementById('pauseMenu');
    if (isPaused) {
        pauseMenu.style.display = 'block';
        // Pause animations and sounds here
    } else {
        pauseMenu.style.display = 'none';
        // Resume animations and sounds here
    }
}

export function setupPauseMenu() {
    const pauseMenu = document.createElement('div');
    pauseMenu.id = 'pauseMenu';
    pauseMenu.style.display = 'none';
    pauseMenu.innerHTML = `
        <h1>Paused</h1>
        <button id='resume'>Resume</button>
        <button id='restart'>Restart</button>
        <button id='settings'>Settings</button>
    `;
    document.body.appendChild(pauseMenu);

    document.getElementById('resume').onclick = togglePauseMenu;
    document.getElementById('restart').onclick = () => { /* Restart logic */ togglePauseMenu(); };
    document.getElementById('settings').onclick = () => { /* Open settings logic */ togglePauseMenu(); };

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            togglePauseMenu();
        }
    });
}

export function formatLevel(currentLevel) {
  return `Current Level: ${currentLevel}`;
}

export function formatProgress(puzzlesSolved, totalPuzzles) {
  return `Progress: ${puzzlesSolved} / ${totalPuzzles} puzzles solved`;
}

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

export function renderEndlessHud(element, { currentLevel, puzzlesSolved, totalPuzzles }) {
  if (!element) throw new Error("HUD element is required");
  element.dataset.mode = "endless";
  element.textContent = `${formatLevel(currentLevel)} · ${formatProgress(puzzlesSolved, totalPuzzles)}`;
  return element.textContent;
}
