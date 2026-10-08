import { describe, expect, it } from "vitest";
import {
  formatMaxHintsLabel,
  maximumHintsForGrid,
  renderMaxHintsInSettings,
} from "../src/settings.mjs";

describe("settings overlay max hints", () => {
  it("caps maximum hints at 3 for grids larger than 8x8", () => {
    expect(maximumHintsForGrid(9)).toBe(3);
    expect(maximumHintsForGrid(12)).toBe(3);
  });

  it("displays the maximum number of hints in the settings overlay", () => {
    expect(formatMaxHintsLabel(10)).toMatch(/Maximum hints: 3/i);
    const overlay = {
      children: [],
      querySelector() { return null; },
      appendChild(node) { this.children.push(node); return node; },
    };
    const text = renderMaxHintsInSettings(overlay, 10);
    expect(text).toMatch(/Maximum hints: 3/i);
    expect(overlay.children[0].dataset.maxHints).toBe("3");
    expect(overlay.children[0].textContent).toMatch(/Maximum hints: 3/i);
  });
});
