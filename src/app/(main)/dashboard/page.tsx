"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as Tool,
  Cell,
  Legend,
} from "recharts";
import {
  Clock,
  MessageCircle,
  TrendingUp,
  User,
  Brain,
  Target,
  Award,
} from "lucide-react";
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
import { useAsyncEffect } from "@/hooks/useAysncEffect";
import { GetDashboardData } from "@/services/dashboard/action";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SessionTable } from "@/components/Dashboard/SessionsTable";

const topicsData = [
  { name: "Anxiety", value: 30 },
  { name: "Depression", value: 25 },
  { name: "Stress", value: 20 },
  { name: "Relationships", value: 15 },
  { name: "Self-esteem", value: 10 },
];

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
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Dashboard() {
  const [timeFrame, setTimeFrame] = useState("week");
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    session_count: 0,
    sessions: [
      {
        session_id: "",
        user_word_count: 0,
        min_created_at: "",
        assistant_word_count: 0,
        duration_seconds: 0,
      },
    ],
    streaks: {
      current_streak: 0,
      max_streak: 0,
    },
    avg_session_duration: 0,
    user_avg_word_count: 0,
    assistant_avg_word_count: 0,
  });

  useAsyncEffect(async () => {
    const response = await GetDashboardData();
    setDashboardData(response);
  }, []);

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
          <RainbowButton>Begin Session</RainbowButton>
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
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.streaks.current_streak} days
            </div>
            <Progress
              value={dashboardData.streaks.current_streak * 10}
              className="mt-2 bg-blue-100"
            />
            <p className="text-xs text-blue-600 font-semibold mt-2">
              Maximum Streaks: {dashboardData.streaks.max_streak} Days
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
              {(
                Number(dashboardData.avg_session_duration.toFixed(2)) / 60
              ).toFixed(2)}{" "}
              minutes
            </div>
            <p className="text-xs text-gray-500">Optimal: 15-25 minutes</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Overall Mood Improvement
            </CardTitle>
            <Brain className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">+23%</div>
            <p className="text-xs text-green-600">Since starting therapy</p>
          </CardContent>
        </Card>
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
                  {dashboardData.user_avg_word_count.toFixed(2)}
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
                  {dashboardData.assistant_avg_word_count.toFixed(2)}
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
              <BarChart data={dashboardData.sessions}>
                <XAxis
                  // dataKey="min_created_at"
                  stroke="#6B7280"
                  reversed={true}
                />
                <YAxis stroke="#6B7280" />
                <Tool
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                  }}
                />
                <Bar dataKey="duration_seconds" fill="#3B82F6" />
              </BarChart>
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
                  data={topicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {topicsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tool
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
              <LineChart data={dashboardData.sessions}>
                <XAxis dataKey="week" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Legend />
                <Tool
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="user_word_count"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Users Words Count"
                />
                <Line
                  type="monotone"
                  dataKey="assistant_word_count"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Assistant Words Count"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">
              Goals & Achievements
            </CardTitle>
            <CardDescription className="text-gray-600">
              Your therapy milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <Avatar className="h-9 w-9 bg-blue-100">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                    <Target className="h-4 w-4 text-blue-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-700">
                    Stress Reduction
                  </p>
                  <Progress value={70} className="w-[60%] bg-blue-100" />
                  <p className="text-xs text-gray-500">70% Complete</p>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9 bg-green-100">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>
                    <Target className="h-4 w-4 text-green-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-700">
                    Improve Sleep Quality
                  </p>
                  <Progress value={45} className="w-[60%] bg-green-100" />
                  <p className="text-xs text-gray-500">45% Complete</p>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9 bg-yellow-100">
                  <AvatarImage src="/avatars/03.png" alt="Avatar" />
                  <AvatarFallback>
                    <Award className="h-4 w-4 text-yellow-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-700">
                    30-Day Meditation Streak
                  </p>
                  <p className="text-xs text-gray-500">
                    Achieved on May 15, 2023
                  </p>
                </div>
              </div>
            </div>
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
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <Avatar className="h-9 w-9 bg-purple-100">
                  <AvatarImage src="/avatars/04.png" alt="Avatar" />
                  <AvatarFallback>
                    <User className="h-4 w-4 text-purple-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-700">
                    Cognitive Restructuring
                  </p>
                  <p className="text-sm text-gray-500">
                    Identifying and challenging negative thought patterns shows
                    promising results
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9 bg-blue-100">
                  <AvatarImage src="/avatars/05.png" alt="Avatar" />
                  <AvatarFallback>
                    <User className="h-4 w-4 text-blue-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-700">
                    Mindfulness Practices
                  </p>
                  <p className="text-sm text-gray-500">
                    Regular mindfulness exercises are helping to reduce anxiety
                    symptoms
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9 bg-green-100">
                  <AvatarImage src="/avatars/06.png" alt="Avatar" />
                  <AvatarFallback>
                    <User className="h-4 w-4 text-green-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-700">
                    Social Support Network
                  </p>
                  <p className="text-sm text-gray-500">
                    Expanding social connections is contributing to improved
                    mood and resilience
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
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
