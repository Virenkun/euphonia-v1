"use client";

import { useState } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  YAxis,
  Tooltip as RechartsTooltip,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Clock, MessageCircle, User, Brain, Flame } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RainbowButton } from "@/components/ui/rainbow-button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SessionTable } from "@/components/Dashboard/SessionsTable";
import Link from "next/link";

// const topicsData = [
//   { name: "Anxiety", value: 30 },
//   { name: "Depression", value: 25 },
//   { name: "Stress", value: 20 },
//   { name: "Relationships", value: 15 },
//   { name: "Self-esteem", value: 10 },
// ];

interface DashboardData {
  session_count: number;
  sessions: [
    {
      session_id: string;
      min_created_at: string;
      user_word_count: number;
      assistant_word_count: number;
      duration_seconds: number;
    }
  ];
  streaks: {
    current_streak: number;
    max_streak: number;
  };
  avg_session_duration: number;
  user_avg_word_count: number;
  assistant_avg_word_count: number;
  sentiment: {
    sentimentScore: number;
    overallSentiment: string;
  };
  topics: {
    topic: string;
    occurrence: number;
  }[];
  keytakeaways: {
    title: string | undefined;
    description: string | undefined;
  }[];
  sentiment_distribution: {
    positive: number;
    negative: number;
    neutral: number;
  }[];
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Dashboard({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  const [timeFrame, setTimeFrame] = useState("week");

  console.log(dashboardData.sentiment_distribution, "dashboardData.topics");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <nav className="flex flex-col items-start justify-between p-4 z-10">
          <h1 className="text-2xl font-bold">Euphonic Dashboard</h1>
          <p className="text-md text-muted-foreground">
            Take a comprehensive moment to assess your mental well-being with
            our advanced AI assistant
          </p>
        </nav>
        <div className="flex items-center space-x-4">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/main">
            <RainbowButton className="p-2">Begin Session</RainbowButton>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Sessions
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-800">
              {dashboardData.session_count}
            </div>
            <p className="text-xs text-green-600 mt-2">+2 from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Consistency Streak
            </CardTitle>
            <Flame className="h-6 w-6 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.streaks ? dashboardData.streaks.current_streak : 0}{" "}
              days
            </div>
            <Progress
              value={
                dashboardData.streaks
                  ? dashboardData.streaks.current_streak * 10
                  : 0
              }
              className="mt-2 bg-blue-100"
            />
            <p className="text-xs text-blue-600 font-semibold mt-2">
              Maximum Streaks:{" "}
              {dashboardData.streaks ? dashboardData.streaks.max_streak : 0}{" "}
              Days
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Session Length
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.avg_session_duration
                ? (
                    Number(dashboardData.avg_session_duration.toFixed(2)) / 60
                  ).toFixed(2)
                : 0}{" "}
              minutes
            </div>
            <p className="text-xs text-gray-500">Optimal: 15-25 minutes</p>
          </CardContent>
        </Card>
        <Tooltip>
          <TooltipTrigger>
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Overall Sentiment Score
                </CardTitle>
                <Brain className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                {dashboardData.sentiment.sentimentScore > 0 ? (
                  <div className="text-4xl font-bold text-green-500">
                    {dashboardData.sentiment.sentimentScore}
                  </div>
                ) : dashboardData.sentiment.sentimentScore < 0 ? (
                  <div className="text-4xl font-bold text-red-500">
                    {dashboardData.sentiment.sentimentScore}
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-gray-500">
                    {dashboardData.sentiment.sentimentScore}
                  </div>
                )}
                <p className="text-xs font-semibold">
                  {dashboardData.sentiment.overallSentiment === "Positive" ? (
                    <span className="text-green-500">
                      {dashboardData.sentiment.overallSentiment}
                    </span>
                  ) : dashboardData.sentiment.overallSentiment ===
                    "Negative" ? (
                    <span className="text-red-500">
                      {dashboardData.sentiment.overallSentiment}
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      {dashboardData.sentiment.overallSentiment}
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent className="p-2 text-sm border border-gray-200 rounded-md shadow-md">
            <p className="font-semibold">Sentiment Analysis</p>
            <p>Reflects the mood of sessions.</p>
            <p className="mt-1 font-semibold">Score</p>
            <p>Ranges from -1 (Negative) to +1 (Positive).</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-600">
                  <MessageCircle className="h-4 w-4" />
                  Average Words Count (You)
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-end gap-1">
                <p className="text-4xl font-bold text-center">
                  {dashboardData.user_avg_word_count
                    ? dashboardData.user_avg_word_count.toFixed(2)
                    : 0}
                </p>
                <p className="text-sm font-medium text-end mb-1">
                  words per session
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
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-600">
                  <MessageCircle className="h-4 w-4" />
                  Average Words Count (Euphonia)
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-end gap-1">
                <p className="text-4xl font-bold text-center">
                  {dashboardData.assistant_avg_word_count
                    ? dashboardData.assistant_avg_word_count.toFixed(2)
                    : 0}
                </p>
                <p className="text-sm font-medium text-end mb-1">
                  words per session
                </p>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <p>The average number of messages exchanged per session</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">
              Session Duration Tracker
            </CardTitle>
            <CardDescription className="text-gray-600">
              Duration of your therapy sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                data={dashboardData.sessions.sort(
                  (a, b) =>
                    new Date(a.min_created_at).getTime() -
                    new Date(b.min_created_at).getTime()
                )}
              >
                {/* <XAxis stroke="#6B7280" reversed={true} /> */}
                <Legend verticalAlign="top" height={36} />
                <YAxis stroke="#6B7280" />
                <RechartsTooltip
                  wrapperStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.375rem",
                    padding: "0.5rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="duration_seconds"
                  name="Session Duration"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Topics Discussed</CardTitle>
            <CardDescription className="text-gray-600">
              Main themes in your therapy sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.topics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="occurrence"
                  label={({ topic, percent }) =>
                    `${topic} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {dashboardData.topics.map((entry, index) => (
                    <Cell
                      key={`cell-${index}-${entry.topic}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Progress Over Time</CardTitle>
            <CardDescription className="text-gray-600">
              Your therapy progress score
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                data={dashboardData.sessions}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {/* <XAxis dataKey="week" /> */}
                <YAxis />

                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Area
                  type="monotone"
                  name="User Words Count"
                  dataKey="user_word_count"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  name="Assistant Words Count"
                  dataKey="assistant_word_count"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">
              Sentiment Distribution
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sentiment analysis of your therapy sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={dashboardData.sentiment_distribution}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                {/* Define gradients */}
                <defs>
                  <linearGradient
                    id="positiveGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4CAF50" stopOpacity={1} />
                    <stop offset="100%" stopColor="#4CAF50" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="negativeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#F44336" stopOpacity={1} />
                    <stop offset="100%" stopColor="#F44336" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="neutralGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#9E9E9E" stopOpacity={1} />
                    <stop offset="100%" stopColor="#9E9E9E" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="positive"
                  stackId="1"
                  stroke="#4CAF50"
                  fill="url(#positiveGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="negative"
                  stackId="1"
                  stroke="#F44336"
                  fill="url(#negativeGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="neutral"
                  stackId="1"
                  stroke="#9E9E9E"
                  fill="url(#neutralGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Insights</CardTitle>
            <CardDescription className="text-gray-600">
              Key takeaways from your recent sessions
            </CardDescription>
          </CardHeader>
          {dashboardData.keytakeaways.map((keytakeaway) => (
            <CardContent key={keytakeaway.title}>
              <div className="space-y-8">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9 bg-purple-100">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>
                      <User className="h-4 w-4 text-purple-500" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-semibold leading-none text-gray-700">
                      {keytakeaway.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {keytakeaway.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          ))}
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Recent Chat Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {dashboardData.sessions.slice(0, 10).map((session) => (
              <li
                key={session.session_id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    Duration: {(session.duration_seconds / 60).toFixed(2)} min -
                    Messages: {session.user_word_count}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {session.min_created_at &&
                      format(session?.min_created_at, "MMMM d, yyyy h:mm a")}
                  </p>
                  {/* <p className="text-sm mt-1">
                    Topics: {session.topicsCovered.join(", ")}
                  </p> */}
                  {/* <p
                    className={`text-sm ${
                      session.sentimentScore > 0
                        ? "text-green-500"
                        : session.sentimentScore < 0
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    Sentiment: {session.sentimentScore.toFixed(2)}
                  </p> */}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="mx-auto mt-8 rounded-xl">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Users Session Table
            </CardTitle>
          </CardHeader>
          <SessionTable data={dashboardData?.sessions} />
        </Card>
      </div>
    </div>
  );
}
