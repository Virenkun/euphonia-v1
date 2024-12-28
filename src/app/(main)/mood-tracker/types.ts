export type ChatSession = {
  id: string;
  date: Date;
  duration: number;
  messageCount: number;
  topicsCovered: string[];
  sentimentScore: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  emotionDistribution: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
  };
  userResponseTime: number;
  aiResponseTime: number;
};

export const TOPICS = [
  "Anxiety",
  "Depression",
  "Stress",
  "Relationships",
  "Self-esteem",
  "Work-life balance",
  "Personal growth",
];

export const EMOTIONS = ["Joy", "Sadness", "Anger", "Fear", "Surprise"];
