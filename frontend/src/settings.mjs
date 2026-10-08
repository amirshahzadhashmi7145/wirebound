/** Settings overlay helpers (plain DOM — leave hud.mjs alone). */

/** Mirror of backend/hints.py: caps at 3 for grids larger than 8x8. */
export function maximumHintsForGrid(gridSize) {
  const size = Number(gridSize);
  if (!Number.isFinite(size) || size < 1) return 0;
  if (size > 8) return 3;
  return Math.floor(size / 2);
}

export function formatMaxHintsLabel(gridSize) {
  return `Maximum hints: ${maximumHintsForGrid(gridSize)}`;
}

/**
 * Ensure the settings overlay shows the max-hints line.
 * `overlay` is a DOM element or a test double with querySelector/appendChild.
 */
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
