import { describe, expect, it } from "vitest";
import { frameworks, frameworkProgress, weakSpots } from "@/lib/mock-data";
import { chooseNextActivity, completePracticeSession, createPracticeSession, updateFrameworkProgress, updateWeakSpot } from "@/lib/workflows";

describe("learning workflows", () => {
  it("creates a practice session without an optional framework", () => {
    const session = createPracticeSession({ type: "problem-lab", title: "Problem", description: "Practise" });
    expect(session.activityType).toBe("problem-lab");
    expect(session).not.toHaveProperty("frameworkId");
    expect(session.startedAt).toBeDefined();
  });

  it("preserves the framework when creating a lesson session", () => {
    const session = createPracticeSession({ type: "lesson", title: "Five Whys", description: "Practise", frameworkId: "five-whys" });
    expect(session.frameworkId).toBe("five-whys");
  });

  it("chooses the least-mastered framework for the next activity", () => {
    const activity = chooseNextActivity({ sessionsCompleted: 0, frameworkProgress, weakSpots }, frameworks);
    expect(activity.type).toBe("lesson");
    expect(activity.frameworkId).toBe("steelman");
  });

  it("completes a practice session with feedback", () => {
    const session = createPracticeSession({ type: "lesson", title: "Five Whys", description: "Practise", frameworkId: "five-whys" });
    const completed = completePracticeSession(session, "I would check the root cause first.", { score: 4, strengths: ["Clear"], focusNext: "Evidence", nextPractice: "Repeat" });
    expect(completed.completedAt).toBeDefined();
    expect(completed.score).toBe(4);
    expect(completed.response).toContain("root cause");
  });

  it("updates mastery and weak spots after practice", () => {
    const progress = updateFrameworkProgress({ sessionsCompleted: 0, frameworkProgress, weakSpots }, "steelman", 4);
    const next = updateWeakSpot(progress, "steelman", 4);
    expect(next.sessionsCompleted).toBe(1);
    expect(next.frameworkProgress.find((item) => item.id === "steelman")?.times).toBe(1);
    expect(next.weakSpots.find((item) => item.ref === "steelman")?.severity).toBeCloseTo(0.2);
  });
});
