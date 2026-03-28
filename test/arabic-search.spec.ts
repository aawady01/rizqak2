import {
  getArabicSearchScore,
  normalizeArabicSearchText,
} from "~/shared/utils/string";

describe("Arabic search normalization", () => {
  it("normalizes common Arabic character variants", () => {
    expect(normalizeArabicSearchText("مدرسة")).toBe("مدرسه");
    expect(normalizeArabicSearchText("مدرسه")).toBe("مدرسه");
    expect(normalizeArabicSearchText("أحمد")).toBe("احمد");
    expect(normalizeArabicSearchText("الى")).toBe("الي");
    expect(normalizeArabicSearchText("علي")).toBe("علي");
  });

  it("matches ta marbuta and haa as equivalent", () => {
    expect(getArabicSearchScore("مدرسة", "مدرسه")).toBeGreaterThan(0);
    expect(getArabicSearchScore("مدرسه", "مدرسة")).toBeGreaterThan(0);
  });

  it("matches alef variants and alef maqsura", () => {
    expect(getArabicSearchScore("أطباء", "اطباء")).toBeGreaterThan(0);
    expect(getArabicSearchScore("مصطفى", "مصطفي")).toBeGreaterThan(0);
  });

  it("matches compound parent-child style phrases", () => {
    expect(getArabicSearchScore("دول الخليج العربي السعودية", "الخليج السعودية")).toBeGreaterThan(0);
  });
});
