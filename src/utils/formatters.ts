export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export const fuzzyMatch = (text: string, search: string): boolean => {
  const searchLower = search.toLowerCase();
  const textLower = text.toLowerCase();
  let searchIndex = 0;

  for (let i = 0; i < textLower.length; i++) {
    if (
      searchIndex < searchLower.length &&
      textLower[i] === searchLower[searchIndex]
    ) {
      searchIndex++;
    }
  }

  return searchIndex === searchLower.length;
};
