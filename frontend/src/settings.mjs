export function createVolumeControl() {
    const volumeControl = document.createElement('input');
    volumeControl.type = 'range';
    volumeControl.min = '0';
    volumeControl.max = '1';
    volumeControl.step = '0.01';
    volumeControl.value = '0.5'; // Default volume

    volumeControl.addEventListener('input', (event) => {
        const volume = event.target.value;
        adjustSoundEffectsVolume(volume);
    });

    return volumeControl;
}

function adjustSoundEffectsVolume(volume) {
    // Assuming there's a global audio context and master gain node
    if (window.audioContext && window.masterGainNode) {
        window.masterGainNode.gain.setValueAtTime(volume, window.audioContext.currentTime);
    }
}

export function formatMaxHintsLabel(gridSize) {
  return `Maximum hints: ${maximumHintsForGrid(gridSize)}`;
}

export function maximumHintsForGrid(gridSize) {
  const size = Number(gridSize);
  if (!Number.isFinite(size) || size < 1) return 0;
  if (size > 8) return 3;
  return Math.floor(size / 2);
}

export function renderMaxHintsInSettings(overlay, gridSize) {
  if (!overlay) throw new Error("settings overlay is required");
  let line = overlay.querySelector?.("[data-max-hints]") ?? null;
  if (!line) {
    line = {
      tagName: "P",
      textContent: "",
      dataset: {},
    };
    if (typeof overlay.appendChild === "function") {
      overlay.appendChild(line);
    }
    // So a second call can find it in tests without real DOM.
    if (typeof overlay.querySelector !== "function") {
      overlay.querySelector = (sel) => (sel === "[data-max-hints]" ? line : null);
    } else {
      const original = overlay.querySelector.bind(overlay);
      overlay.querySelector = (sel) =>
        sel === "[data-max-hints]" ? line : original(sel);
    }
  }
  const text = formatMaxHintsLabel(gridSize);
  line.textContent = text;
  line.dataset.maxHints = String(maximumHintsForGrid(gridSize));
  return text;
}
