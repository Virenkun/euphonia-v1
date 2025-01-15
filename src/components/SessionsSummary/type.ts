interface SessionSummary {
  total_messages: number;
  total_time_spent: string;
  average_message_length: string;
  engagement_level: string;
  main_topics: string[];
  session_start_time: string;
  session_end_time: string;
  session_duration: string;
}

interface SentimentAnalysis {
  overall_sentiment: string;
  sentiment_distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  sentiment_trend: {
    timestamp: string;
    sentiment: string;
  }[];
}

interface UserEngagement {
  active_user_percentage: number;
  messages_per_user: {
    [key: string]: number;
  };
  longest_message: {
    length: string;
    topic: string;
    user: string;
  };
  most_frequented_topics: string[];
}

interface ResponseTimeAnalysis {
  average_response_time: string;
  slowest_response: string;
  fastest_response: string;
  response_time_distribution: {
    "0-30s": number;
    "31-60s": number;
    "1-5m": number;
    "5m+": number;
  };
}

interface FeedbackSummary {
  user_satisfaction: string;
  suggestions_for_improvement: string[];
  feedback_comments: string[];
}

interface TopicSpecificInsights {
  [key: string]: {
    messages_discussed: number;
    user_sentiment: string;
    common_questions?: string[];
    common_issues?: string[];
    escalation_points?: string[];
    feedback?: string[];
  };
}

interface UserBehaviorAnalysis {
  engagement_by_time_of_day: {
    "9:00 AM - 10:00 AM": number;
    "10:00 AM - 11:00 AM": number;
    "11:00 AM - 11:30 AM": number;
  };
  interaction_style: {
    questions_asked: number;
    complaints_raised: number;
    clarifications_requested: number;
  };
  behavior_trends: string[];
}

export interface SessionData {
  session_summary: SessionSummary;
  sentiment_analysis: SentimentAnalysis;
  user_engagement: UserEngagement;
  response_time_analysis: ResponseTimeAnalysis;
  feedback_summary: FeedbackSummary;
  insights: [string];
  topic_specific_insights: TopicSpecificInsights;
  user_behavior_analysis: UserBehaviorAnalysis;
}
