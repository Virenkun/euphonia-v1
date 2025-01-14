import { SessionData } from "@/components/SessionsSummary/type";
import { redirect } from "next/navigation";

export function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export function isValidPhoneNumber(phoneNumber: string) {
  // Ensure the phone number contains only digits (optional "+" at the beginning)
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  // Check if the phone number matches the regex
  return phoneRegex.test(phoneNumber);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
      process?.env?.NEXT_PUBLIC_VERCEL_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : // If neither is set, default to localhost for local development.
        "http://localhost:3000/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export const toDateTime = (secs: number) => {
  const t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined
) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined;
  }

  const currentDate = new Date(); // Current date and time
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000
  ); // Add trial days
  return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp in seconds
};

const toastKeyMap: { [key: string]: string[] } = {
  status: ["status", "status_description"],
  error: ["error", "error_description"],
};

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType];

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(
      toastDescription
    )}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect(
    path,
    "status",
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  );

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect(
    path,
    "error",
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  );

interface DataArray {
  summary: SessionData;
}

export function getOverallSentimentAndScore(dataArray: DataArray[]) {
  const sentimentCounts = { positive: 0, neutral: 0, negative: 0 };

  // Aggregate sentiment counts from all session summaries
  dataArray.forEach((session) => {
    const sentimentDistribution =
      session.summary.sentiment_analysis.sentiment_distribution;
    sentimentCounts.positive += sentimentDistribution.positive || 0;
    sentimentCounts.neutral += sentimentDistribution.neutral || 0;
    sentimentCounts.negative += sentimentDistribution.negative || 0;
  });

  // Calculate the total sentiment count
  const total =
    sentimentCounts.positive +
    sentimentCounts.neutral +
    sentimentCounts.negative;

  if (total === 0)
    return { overallSentiment: "No Sentiment Data", sentimentScore: 0 };

  // Compute the sentiment score
  const sentimentScore =
    (sentimentCounts.positive * 1 +
      sentimentCounts.neutral * 0 +
      sentimentCounts.negative * -1) /
    total;

  // Determine the overall sentiment
  const overallSentiment =
    sentimentCounts.positive >= sentimentCounts.neutral &&
    sentimentCounts.positive >= sentimentCounts.negative
      ? "Positive"
      : sentimentCounts.neutral >= sentimentCounts.negative
      ? "Neutral"
      : "Negative";

  return {
    overallSentiment,
    sentimentScore: Number(sentimentScore.toFixed(2)),
  };
}

export function getMainTopicsSummary(data: DataArray[]) {
  const topicCount: { [key: string]: number } = {};

  // Count occurrences of each topic
  data.forEach((item) => {
    const { main_topics } = item.summary.session_summary;

    main_topics.forEach((topic) => {
      topicCount[topic] = (topicCount[topic] || 0) + 1;
    });
  });

  // Convert the result into an array of objects
  const topicOccurrencesArray = Object.entries(topicCount).map(
    ([topic, occurrence]) => ({
      topic,
      occurrence,
    })
  );

  return topicOccurrencesArray;
}
