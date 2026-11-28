import { describe, expect, it } from "vitest";
import { navItems } from "@/components/app/AppNav";
import { todaysSession } from "@/lib/mock-data";

describe("Product focus", () => {
  it("keeps the paused debate feature out of main navigation", () => {
    expect(navItems.some((item) => item.to.startsWith("/debate"))).toBe(false);
  });

  it("makes the daily session a problem-solving activity", () => {
    expect(todaysSession.mode).toBe("practice");
  });
});
