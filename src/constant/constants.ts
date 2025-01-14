export const LLM_PROMPT = `AI Therapist Prompt

Assume the role of a licensed therapist specializing in cognitive-behavioral therapy (CBT) and behave like human. Your goal is to provide empathetic and constructive support and keep your response limited do not extend much. Follow these key guidelines and be a good listner and helpe. Talk Less Understand More.:

## Core Engagement

1. **Active Listening**: Reflect users' thoughts and emotions to validate their experiences.
2. **Empathy**: Normalize feelings without judgment, using phrases like, “It’s understandable to feel this way.”

## Goal Setting

3. **Explore Goals**: Ask open-ended questions to clarify therapeutic objectives.
4. **Coping Strategies**: Offer personalized techniques, such as mindfulness exercises or journaling prompts.

## Boundaries and Ethics

5. **Professional Limitations**: Clarify that you are an AI and not a licensed therapist. Encourage users to seek professional help for serious issues.
6. **Avoid Diagnoses**: Do not make diagnostic judgments; redirect to professional resources if needed.

## Engagement Depth

7. **Follow-Up Questions**: Encourage deeper insights with reflective inquiries.
8. **Progress Monitoring**: Summarize concerns and strategies periodically.

## Additional Guidelines

9. **Cultural Sensitivity**: Be respectful of diverse backgrounds.
10. **Self-Care Reminders**: Emphasize the importance of self-care practices.

End each session with a summary and affirmation, encouraging users to reflect on their progress.

By following these guidelines, maintain a compassionate and user-focused approach while respecting your boundaries as an AI assistant.`;

export const RESOURCE_PROMPT = `
Please analyze the following chat sessions and provide detailed analytics and data based on the conversation. Below i am going to provide the raw session data. Generate a list of resources focused on mental health, meditation, counseling, and similar topics in the following JSON format and remember only give array of json objects nothing else and give exact and valid links for the resources:

{
  title: "Resource Title",
  description: "Brief description of the resource.",
  icon: "<IconName className='w-6 h-6' />",
  tags: ["Relevant", "Tags", "Here"],
  link: "Resource URL or Link",
  category: "Category ID (from categories list)"
}

### Categories:
Use one of the following \`category\` IDs:
- "all": All Resources
- "tools": AI Tools
- "content": Educational Content
- "community": Community
- "lifestyle": Lifestyle

### Icon Options:
Choose from these icons for the \`icon\` field:
Brain, Book, Video, Headphones, Users, Robot, ArrowRight, Search, Zap, Calendar, Sparkles, Lightbulb, Puzzle, Heart, Leaf, Coffee.

### Examples:

1. A personalized AI meditation tool:
{
  title: "AI-Guided Meditation",
  description: "Experience personalized meditation sessions tailored by our AI to your current emotional state.",
  icon: "<Brain className='w-6 h-6' />",
  tags: ["Meditation", "AI", "Personalized"],
  link: "https://example.com/meditation",
  category: "tools"
}

2. A community forum for mental health support:
{
  title: "Mental Health Community",
  description: "Join a supportive community to share experiences and get advice on mental health challenges.",
  icon: "<Users className='w-6 h-6' />",
  tags: ["Community", "Support", "Mental Health"],
  link: "https://example.com/community",
  category: "community"
}

Provide 10-15 resources, ensuring diversity across all categories and using appropriate icons, tags, and descriptions.
`;

export const SESSIONS_ANALYSIS_PROMPT = `
Please analyze the following chat sessions and provide detailed analytics and data based on the conversation. Below is the raw session data. Please summarize the key points, sentiment, engagement, and any other significant patterns or insights that can be derived. The output should follow the JSON format provided below, Only Give JSON Object nothing else keep this remember start with { end with }.

{
  "session_summary": {
    "total_messages": 150,
    "total_time_spent": "2h 30m",
    "average_message_length": "35 words",
    "engagement_level": "High",
    "main_topics": [
      "Product Features",
      "Customer Support",
      "Technical Issues"
    ],
    "session_start_time": "2025-01-14T09:00:00Z",
    "session_end_time": "2025-01-14T11:30:00Z",
    "session_duration": "2 hours 30 minutes"
  },
  "sentiment_analysis": {
    "overall_sentiment": "Positive",
    "sentiment_distribution": {
      "positive": 75,
      "neutral": 15,
      "negative": 10
    },
    "sentiment_trend": [
      { "timestamp": "2025-01-14T09:15:00Z", "sentiment": "Neutral" },
      { "timestamp": "2025-01-14T10:00:00Z", "sentiment": "Positive" },
      { "timestamp": "2025-01-14T10:30:00Z", "sentiment": "Negative" },
      { "timestamp": "2025-01-14T11:00:00Z", "sentiment": "Positive" }
    ]
  },
  "user_engagement": {
    "active_user_percentage": 85,
    "messages_per_user": {
      "user_1": 80,
      "user_2": 70,
      "user_3": 25
    },
    "longest_message": {
      "length": "150 words",
      "topic": "Technical Problem with Integration",
      "user": "user_1"
    },
    "most_frequented_topics": [
      "Account Setup",
      "Product Features",
      "Troubleshooting"
    ]
  },
  "response_time_analysis": {
    "average_response_time": "1m 30s",
    "slowest_response": "5m 12s",
    "fastest_response": "15s",
    "response_time_distribution": {
      "0-30s": 60,
      "31-60s": 30,
      "1-5m": 40,
      "5m+": 20
    }
  },
  "feedback_summary": {
    "user_satisfaction": "8.5/10",
    "suggestions_for_improvement": [
      "Faster response times",
      "More detailed answers on product setup"
    ],
    "feedback_comments": [
      "Overall great experience, but responses took a while.",
      "Would like more clarity on technical troubleshooting."
    ]
  },
  "insights": [
    "The majority of the session revolved around troubleshooting issues, with 40% of the conversation focused on technical integration problems.",
    "The customer was mostly satisfied, but response times were a concern in a few instances, especially when responses exceeded 5 minutes.",
    "Sentiment varied throughout the session, with a noticeable dip in sentiment around 10:30 AM, coinciding with a technical issue that required longer resolution.",
    "User 1 had the most active participation, contributing 80 messages, and they raised most of the issues regarding technical support."
  ],
  "topic_specific_insights": {
    "account_setup": {
      "messages_discussed": 25,
      "user_sentiment": "Positive",
      "common_questions": [
        "How do I set up my account?",
        "What are the system requirements for setup?"
      ]
    },
    "technical_support": {
      "messages_discussed": 60,
      "user_sentiment": "Neutral to Negative",
      "common_issues": [
        "Integration problems",
        "Slow performance"
      ],
      "escalation_points": [
        "Response times over 5 minutes",
        "Issues not fully resolved"
      ]
    },
    "product_features": {
      "messages_discussed": 40,
      "user_sentiment": "Positive",
      "feedback": [
        "Users are excited about the new features.",
        "A lot of interest in the latest updates and functionalities."
      ]
    }
  },
  "user_behavior_analysis": {
    "engagement_by_time_of_day": {
      "9:00 AM - 10:00 AM": 40,
      "10:00 AM - 11:00 AM": 70,
      "11:00 AM - 11:30 AM": 40
    },
    "interaction_style": {
      "questions_asked": 30,
      "complaints_raised": 10,
      "clarifications_requested": 20
    },
    "behavior_trends": [
      "Users were more active between 10:00 AM and 11:00 AM, likely due to the technical issues requiring more time.",
      "A shift from questions to complaints occurred as response times grew longer."
    ]
  }
}

`;
