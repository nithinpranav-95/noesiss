import { frameworkProgress, weakSpots, type Framework } from "@/lib/mock-data";

export type LearningActivityType = "problem-lab" | "lesson" | "reasoning-game" | "debate";

export type LearningActivity = {
  type: LearningActivityType;
  title: string;
  description: string;
  frameworkId?: string;
  optional?: boolean;
};

export type PracticeSession = {
  id: string;
  activityType: LearningActivityType;
  frameworkId?: string;
  startedAt: string;
  completedAt?: string;
  response?: string;
  score?: number;
};

export type LearningFeedback = {
  score: number;
  strengths: string[];
  focusNext: string;
  nextPractice: string;
};

export type LearnerProgress = {
  sessionsCompleted: number;
  frameworkProgress: typeof frameworkProgress;
  weakSpots: typeof weakSpots;
};

export function createPracticeSession(activity: LearningActivity): PracticeSession {
  return {
    id: `session-${Date.now()}`,
    activityType: activity.type,
    frameworkId: activity.frameworkId,
    startedAt: new Date().toISOString(),
  };
}

export function completePracticeSession(session: PracticeSession, response: string, feedback: LearningFeedback): PracticeSession {
  return {
    ...session,
    response,
    score: feedback.score,
    completedAt: new Date().toISOString(),
  };
}

export function chooseNextActivity(progress: LearnerProgress, frameworks: Framework[]): LearningActivity {
  const weakestFramework = [...progress.frameworkProgress].sort((a, b) => a.mastery - b.mastery)[0];
  const framework = frameworks.find((item) => item.id === weakestFramework?.id) ?? frameworks[0];

  if (framework) {
    return {
      type: "lesson",
      title: `Practise ${framework.name}`,
      description: framework.practice_prompt,
      frameworkId: framework.id,
    };
  }

  return {
    type: "problem-lab",
    title: "Work through a practical problem",
    description: "Define the problem, test the cause and choose a measured next step.",
  };
}

export function updateFrameworkProgress(progress: LearnerProgress, frameworkId: string, score: number): LearnerProgress {
  return {
    ...progress,
    sessionsCompleted: progress.sessionsCompleted + 1,
    frameworkProgress: progress.frameworkProgress.map((item) => item.id === frameworkId ? {
      ...item,
      times: item.times + 1,
      mastery: Math.min(5, Math.max(item.mastery, Math.round(score))),
    } : item),
  };
}

export function updateWeakSpot(progress: LearnerProgress, ref: string, score: number): LearnerProgress {
  const existing = progress.weakSpots.find((item) => item.ref === ref);
  const severity = Math.max(0, Math.min(1, 1 - score / 5));
  const nextWeakSpot = { type: "technique", ref, severity, note: severity > 0.5 ? "Practise this technique again with a smaller, concrete problem." : "Keep applying this technique to build consistency." };

  return {
    ...progress,
    weakSpots: existing ? progress.weakSpots.map((item) => item.ref === ref ? nextWeakSpot : item) : [...progress.weakSpots, nextWeakSpot],
  };
}
