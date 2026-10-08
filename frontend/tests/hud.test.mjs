import { describe, expect, it } from "vitest";
import { formatLevel, formatProgress, renderEndlessHud } from "../src/hud.mjs";

describe("Endless HUD", () => {
  it("shows the current level on the HUD during gameplay", () => {
    expect(formatLevel(5)).toMatch(/Current Level: 5/i);
  });

  it("shows progress as puzzles solved out of total available", () => {
    expect(formatProgress(10, 20)).toMatch(/Progress: 10 \/ 20 puzzles solved/i);
  });

  it("renders both signals into a DOM node", () => {
    const el = { dataset: {}, textContent: "" };
    const text = renderEndlessHud(el, {
      currentLevel: 5,
      puzzlesSolved: 10,
      totalPuzzles: 20,
    });
    expect(el.dataset.mode).toBe("endless");
    expect(text).toMatch(/Current Level: 5/i);
    expect(text).toMatch(/Progress: 10 \/ 20 puzzles solved/i);
  });
});
