import { describe, expect, it } from "vitest";
import { navItems } from "@/components/app/AppNav";
import { todaysSession } from "@/lib/mock-data";

describe("Product focus", () => {
  it("keeps debate as the last main navigation destination", () => {
    expect(navItems.at(-1)?.to).toBe("/debate");
  });

  it("makes the daily session a problem-solving activity", () => {
    expect(todaysSession.mode).toBe("practice");
  });
});
