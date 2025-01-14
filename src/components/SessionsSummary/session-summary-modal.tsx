"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  MessageSquare,
  ThumbsUp,
  Zap,
  Users,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionData } from "./type";

interface SessionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SessionData | null;
}

export default function EnhancedSessionSummaryModal({
  isOpen,
  onClose,
  data,
}: SessionSummaryModalProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimationComplete(false);
    }
  }, [isOpen]);

  if (!data) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Enhanced Session Summary
            </h2>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SummaryItem
                    icon={<MessageSquare className="h-6 w-6" />}
                    label="Total Messages"
                    value={data.session_summary.total_messages.toString()}
                  />
                  <SummaryItem
                    icon={<Clock className="h-6 w-6" />}
                    label="Total Time Spent"
                    value={data.session_summary.total_time_spent}
                  />
                  <SummaryItem
                    icon={<ThumbsUp className="h-6 w-6" />}
                    label="Overall Sentiment"
                    value={data.sentiment_analysis.overall_sentiment}
                  />
                  <SummaryItem
                    icon={<Zap className="h-6 w-6" />}
                    label="Avg. Response Time"
                    value={data.response_time_analysis.average_response_time}
                  />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    User Satisfaction
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Progress
                      value={
                        parseFloat(data.feedback_summary.user_satisfaction) * 10
                      }
                      className="h-2"
                    />
                    <span className="text-sm font-medium">
                      {data.feedback_summary.user_satisfaction}
                    </span>
                  </div>
                </div>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Sentiment Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      {Object.entries(
                        data.sentiment_analysis.sentiment_distribution
                      ).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold">{value}%</div>
                          <div className="text-sm text-gray-500 capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="engagement">
                <div className="space-y-4">
                  <SummaryItem
                    icon={<Users className="h-6 w-6" />}
                    label="Active User Percentage"
                    value={`${data.user_engagement.active_user_percentage}%`}
                  />
                  <SummaryItem
                    icon={<BarChart className="h-6 w-6" />}
                    label="Engagement Level"
                    value={data.session_summary.engagement_level}
                  />
                  <Card>
                    <CardHeader>
                      <CardTitle>Main Topics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5">
                        {data.session_summary.main_topics.map(
                          (topic, index) => (
                            <li key={index}>{topic}</li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Most Frequented Topics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5">
                        {data.user_engagement.most_frequented_topics.map(
                          (topic, index) => (
                            <li key={index}>{topic}</li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="insights">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5">
                        {data.insights.map((insight, index) => (
                          <li key={index} className="mb-2">
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Suggestions for Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5">
                        {data.feedback_summary.feedback_comments.map(
                          (suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 5 }}
              onAnimationComplete={() => setAnimationComplete(true)}
              className="absolute bottom-0 left-0 h-1 bg-blue-500"
            />
            {animationComplete && (
              <p className="text-center text-sm text-gray-500 mt-4">
                You Can Now Close This Modal
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}
