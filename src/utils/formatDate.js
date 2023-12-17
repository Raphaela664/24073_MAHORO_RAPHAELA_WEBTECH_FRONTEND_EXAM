export const formatDate = (dateString) => {
  // eslint-disable-next-line no-unused-vars
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear();

  const daySuffix =
    day >= 11 && day <= 13
      ? "th"
      : day % 10 === 1
      ? "st"
      : day % 10 === 2
      ? "nd"
      : day % 10 === 3
      ? "rd"
      : "th";

  return `${day}${daySuffix} ${month}, ${year}`;
};
