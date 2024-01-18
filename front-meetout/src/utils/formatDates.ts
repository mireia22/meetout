import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (dateString: string | null | undefined) => {
  if (!dateString) {
    return "Unknown time ago";
  }

  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};
