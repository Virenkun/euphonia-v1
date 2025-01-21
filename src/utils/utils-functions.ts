type AccessObject = Record<string, boolean | number>;

export function fetchModuleAccess(
  accessObj: AccessObject
): { name: string; code: string }[] {
  return Object.entries(accessObj)
    .filter(([, value]) => value)
    .map(([key]) => ({
      name: formatName(key),
      code: key,
    }));
}

// Helper function to format the name
function formatName(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
    .replace(/Access$/, ""); // Remove 'Access' from the end
}

export function getNextBillingInfo(timestamp: string): {
  nextBillingDate: string;
  daysRemaining: number;
} {
  // Parse the timestamp into a Date object
  const date = new Date(timestamp);

  // Calculate the next billing date (1 month later)
  const nextBillingDate = new Date(date);
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in days
  const timeDifference = nextBillingDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Format the next billing date to an ISO string
  return {
    nextBillingDate: nextBillingDate.toISOString(),
    daysRemaining: daysRemaining,
  };
}
