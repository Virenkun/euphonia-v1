"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { format, subDays, startOfWeek } from "date-fns";
import {
  Clock,
  MessageCircle,
  Smile,
  Calendar,
  TrendingUp,
  Users,
  Brain,
  Clock3,
  BarChart2,
  PieChartIcon,
} from "lucide-react";
import { ChatSession, TOPICS } from "./types";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
  "#ffc658",
];

export default function ChatInsightsDashboard() {
  const [chatSessions] = useState<ChatSession[]>(generateMockData());
  const [selectedTimeRange, setSelectedTimeRange] = useState("30");

  function generateMockData(): ChatSession[] {
    const data: ChatSession[] = [];
    for (let i = 30; i >= 0; i--) {
      const sentimentBreakdown = {
        positive: Math.random(),
        neutral: Math.random(),
        negative: Math.random(),
      };
      const total =
        sentimentBreakdown.positive +
        sentimentBreakdown.neutral +
        sentimentBreakdown.negative;
      sentimentBreakdown.positive /= total;
      sentimentBreakdown.neutral /= total;
      sentimentBreakdown.negative /= total;

      const emotionDistribution = {
        joy: Math.random(),
        sadness: Math.random(),
        anger: Math.random(),
        fear: Math.random(),
        surprise: Math.random(),
      };
      const emotionTotal = Object.values(emotionDistribution).reduce(
        (sum, value) => sum + value,
        0
      );
      Object.keys(emotionDistribution).forEach((key) => {
        emotionDistribution[key as keyof typeof emotionDistribution] /=
          emotionTotal;
      });

      data.push({
        id: i.toString(),
        date: subDays(new Date(), i),
        duration: Math.floor(Math.random() * 30) + 10,
        messageCount: Math.floor(Math.random() * 30) + 20,
        topicsCovered: TOPICS.filter(() => Math.random() > 0.6),
        sentimentScore: Math.random() * 2 - 1,
        sentimentBreakdown,
        emotionDistribution,
        userResponseTime: Math.floor(Math.random() * 60) + 30,
        aiResponseTime: Math.floor(Math.random() * 5) + 1,
      });
    }
    return data;
  }

  const filteredSessions = useMemo(() => {
    const daysToSubtract = parseInt(selectedTimeRange);
    const startDate = subDays(new Date(), daysToSubtract);
    return chatSessions.filter((session) => session.date >= startDate);
  }, [chatSessions, selectedTimeRange]);

  const averageDuration =
    filteredSessions.reduce((sum, session) => sum + session.duration, 0) /
    filteredSessions.length;
  const averageMessageCount =
    filteredSessions.reduce((sum, session) => sum + session.messageCount, 0) /
    filteredSessions.length;
  const averageSentiment =
    filteredSessions.reduce((sum, session) => sum + session.sentimentScore, 0) /
    filteredSessions.length;
  const totalSessions = filteredSessions.length;

  const sessionData = filteredSessions.map((session) => ({
    date: format(session.date, "MMM d"),
    duration: session.duration,
    messageCount: session.messageCount,
    sentiment: session.sentimentScore,
  }));

  const weeklyAverages = filteredSessions.reduce((acc, session) => {
    const weekStart = format(startOfWeek(session.date), "MMM d");
    if (!acc[weekStart]) {
      acc[weekStart] = { totalDuration: 0, totalSentiment: 0, count: 0 };
    }
    acc[weekStart].totalDuration += session.duration;
    acc[weekStart].totalSentiment += session.sentimentScore;
    acc[weekStart].count += 1;
    return acc;
  }, {} as Record<string, { totalDuration: number; totalSentiment: number; count: number }>);

  const weeklyData = Object.entries(weeklyAverages).map(([week, data]) => ({
    week,
    averageDuration: data.totalDuration / data.count,
    averageSentiment: data.totalSentiment / data.count,
  }));

  const topicData = TOPICS.map((topic) => ({
    name: topic,
    value: filteredSessions.filter((session) =>
      session.topicsCovered.includes(topic)
    ).length,
  }));

  const responseTimeData = filteredSessions.map((session) => ({
    date: format(session.date, "MMM d"),
    user: session.userResponseTime,
    ai: session.aiResponseTime,
  }));

  const averageSentimentBreakdown = filteredSessions.reduce(
    (acc, session) => {
      acc.positive += session.sentimentBreakdown.positive;
      acc.neutral += session.sentimentBreakdown.neutral;
      acc.negative += session.sentimentBreakdown.negative;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  Object.keys(averageSentimentBreakdown).forEach((key) => {
    averageSentimentBreakdown[key as keyof typeof averageSentimentBreakdown] /=
      filteredSessions.length;
  });

  const sentimentBreakdownData = Object.entries(averageSentimentBreakdown).map(
    ([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value * 100,
    })
  );

  const averageEmotionDistribution = filteredSessions.reduce(
    (acc, session) => {
      Object.keys(session.emotionDistribution).forEach((key) => {
        acc[key as keyof typeof acc] +=
          session.emotionDistribution[
            key as keyof typeof session.emotionDistribution
          ];
      });
      return acc;
    },
    { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0 }
  );

  Object.keys(averageEmotionDistribution).forEach((key) => {
    averageEmotionDistribution[
      key as keyof typeof averageEmotionDistribution
    ] /= filteredSessions.length;
  });

  const emotionDistributionData = Object.entries(
    averageEmotionDistribution
  ).map(([key, value]) => ({
    emotion: key.charAt(0).toUpperCase() + key.slice(1),
    value: value * 100,
  }));

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: unknown[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded-md shadow-md">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((pld: unknown, index: number) => (
            <p key={index} style={{ color: (pld as { color: string }).color }}>
              {`${(pld as { name: string; value: number }).name}: ${(
                pld as { name: string; value: number }
              ).value.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="flex justify-end">
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Tooltip>
            <TooltipTrigger>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Average Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-center">
                    {averageDuration.toFixed(1)} min
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>The average length of your chat sessions</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Average Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-center">
                    {averageMessageCount.toFixed(1)}
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>The average number of messages exchanged per session</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smile className="h-4 w-4" />
                    Average Sentiment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-4xl font-bold text-center ${
                      averageSentiment > 0
                        ? "text-green-500"
                        : averageSentiment < 0
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {averageSentiment.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>The average emotional tone of your conversations (-1 to 1)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Total Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-center">
                    {totalSessions}
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                The total number of chat sessions in the selected time range
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Chat Session Metrics Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-[4/3] min-h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sessionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="duration"
                        stroke="#8884d8"
                        name="Duration (min)"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="messageCount"
                        stroke="#82ca9d"
                        name="Message Count"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="sentiment"
                        stroke="#ffc658"
                        name="Sentiment"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Visualizes session duration, message count, and sentiment score
              over time
            </p>
          </TooltipContent>
        </Tooltip>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Tooltip>
            <TooltipTrigger>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Weekly Averages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-[4/3] min-h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="averageDuration"
                          fill="#8884d8"
                          name="Avg Duration (min)"
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="averageSentiment"
                          fill="#82ca9d"
                          name="Avg Sentiment"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Shows average session duration and sentiment score for each week
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Topics Covered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-[4/3] min-h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={topicData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius="80%"
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {topicData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Displays the distribution of topics discussed during chat
                sessions
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-[4/3] min-h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="user"
                        stroke="#8884d8"
                        name="User Response Time (s)"
                      />
                      <Line
                        type="monotone"
                        dataKey="ai"
                        stroke="#82ca9d"
                        name="AI Response Time (s)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <p>Compares user and AI response times over time</p>
          </TooltipContent>
        </Tooltip>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Tooltip>
            <TooltipTrigger>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    Sentiment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-[4/3] min-h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sentimentBreakdownData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Percentage" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Shows the breakdown of positive, neutral, and negative
                sentiments in your conversations
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-4 w-4" />
                    Emotion Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-[4/3] min-h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={emotionDistributionData}
                      >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="emotion" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Emotion"
                          dataKey="value"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                        <RechartsTooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Displays the distribution of emotions detected in your
                conversations
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Recent Chat Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {filteredSessions.slice(0, 5).map((session) => (
                <li
                  key={session.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      Duration: {session.duration} min - Messages:{" "}
                      {session.messageCount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(session.date, "MMMM d, yyyy h:mm a")}
                    </p>
                    <p className="text-sm mt-1">
                      Topics: {session.topicsCovered.join(", ")}
                    </p>
                    <p
                      className={`text-sm ${
                        session.sentimentScore > 0
                          ? "text-green-500"
                          : session.sentimentScore < 0
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Sentiment: {session.sentimentScore.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
