import { AssessmentResult, RiskLevel } from "../types";

const NEGATIVE_WORDS = ['sad', 'depressed', 'unhappy', 'lonely', 'miserable', 'hopeless', 'useless', 'worthless', 'tired', 'exhausted', 'pain', 'hurts', 'darkness', 'alone', 'crying', 'tears', 'end', 'stop', 'quit', 'die', 'kill', 'suicide', 'hurt myself', 'goodbye'];
const ANXIETY_WORDS = ['anxious', 'worried', 'nervous', 'panic', 'scared', 'fear', 'shaking', 'heart racing', 'breathless', 'dread', 'uncertainty', 'pressure', 'stress', 'overwhelmed'];
const STRESS_WORDS = ['stressed', 'busy', 'work', 'deadline', 'burned out', 'tension', 'heavy', 'burden', 'struggling', 'managing', 'cope'];

export const analyzeText = (text: string): AssessmentResult => {
  const words = text.toLowerCase().split(/\W+/);
  
  let depressionCount = 0;
  let anxietyCount = 0;
  let stressCount = 0;
  let suicideTrigger = false;

  words.forEach(word => {
    if (NEGATIVE_WORDS.includes(word)) depressionCount++;
    if (ANXIETY_WORDS.includes(word)) anxietyCount++;
    if (STRESS_WORDS.includes(word)) stressCount++;
    if (['die', 'kill', 'suicide', 'end it'].some(term => text.toLowerCase().includes(term))) {
      suicideTrigger = true;
    }
  });

  const total = words.length || 1;
  const depressionScore = Math.min(10, (depressionCount / total) * 100);
  const anxietyScore = Math.min(10, (anxietyCount / total) * 100);
  const stressScore = Math.min(10, (stressCount / total) * 100);

  let suicideRisk: RiskLevel = "Low";
  if (suicideTrigger || depressionScore > 7) {
    suicideRisk = "High";
  } else if (depressionScore > 4 || anxietyScore > 5) {
    suicideRisk = "Medium";
  }

  let explanation = "Based on your input, we've detected patterns consistent with ";
  if (suicideRisk === "High") {
    explanation += "significant emotional distress and high risk. Please reach out for immediate help.";
  } else if (suicideRisk === "Medium") {
    explanation += "moderate levels of anxiety or low mood. It might be helpful to talk to someone.";
  } else {
    explanation += "generally stable emotional health, though there are signs of minor stress.";
  }

  return {
    depressionScore,
    anxietyScore,
    stressScore,
    suicideRisk,
    explanation
  };
};

export const getQuestionnaireScore = (answers: string[]): AssessmentResult => {
  // Simple scoring for demo: A=0, B=1, C=2, D=3
  let scoreTotal = 0;
  answers.forEach(ans => {
    if (ans === 'B') scoreTotal += 1;
    if (ans === 'C') scoreTotal += 2;
    if (ans === 'D') scoreTotal += 3;
  });

  const avg = scoreTotal / answers.length;
  
  return {
    depressionScore: Math.min(10, avg * 3.3),
    anxietyScore: Math.min(10, avg * 3.1),
    stressScore: Math.min(10, avg * 3.5),
    suicideRisk: avg > 2 ? "High" : avg > 1 ? "Medium" : "Low",
    explanation: "Results from your self-assessment questionnaire."
  };
};
