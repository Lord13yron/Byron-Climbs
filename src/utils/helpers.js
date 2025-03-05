import { differenceInDays, format } from "date-fns";

export const formatDate = function (date) {
  const today = new Date();

  const daysAgo = differenceInDays(today, date);

  if (daysAgo === 0) {
    return "Today";
  } else if (daysAgo === 1) {
    return "Yesterday";
  } else if (daysAgo < 7) {
    return `${daysAgo} Days ago`;
  } else {
    return format(date, "MMMM dd, yyyy");
  }
};

export const getValuesAsString = function (object) {
  const excludeFields = ["id", "created_at", "images", "videos"];
  return Object.entries(object)
    .filter(([key]) => !excludeFields.includes(key))
    .map(([, value]) => value)
    .join(" ")
    .toLowerCase();
};
