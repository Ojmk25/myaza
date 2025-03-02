export const userColors = [
  { border: "border-orange-400", bg: "bg-orange-50", eventBg: "bg-orange-100", eventBorder: "border-orange-300" },
  { border: "border-green-400", bg: "bg-green-50", eventBg: "bg-green-100", eventBorder: "border-green-300" },
  { border: "border-blue-400", bg: "bg-blue-50", eventBg: "bg-blue-100", eventBorder: "border-blue-300" },
  { border: "border-pink-400", bg: "bg-pink-50", eventBg: "bg-pink-100", eventBorder: "border-pink-300" },
  { border: "border-yellow-400", bg: "bg-yellow-50", eventBg: "bg-yellow-100", eventBorder: "border-yellow-300" },
  { border: "border-teal-400", bg: "bg-teal-50", eventBg: "bg-teal-100", eventBorder: "border-teal-300" },
  { border: "border-red-400", bg: "bg-red-50", eventBg: "bg-red-100", eventBorder: "border-red-300" },
  { border: "border-cyan-400", bg: "bg-cyan-50", eventBg: "bg-cyan-100", eventBorder: "border-cyan-300" },
  { border: "border-amber-400", bg: "bg-amber-50", eventBg: "bg-amber-100", eventBorder: "border-amber-300" },
  { border: "border-lime-400", bg: "bg-lime-50", eventBg: "bg-lime-100", eventBorder: "border-lime-300" },
  { border: "border-rose-400", bg: "bg-rose-50", eventBg: "bg-rose-100", eventBorder: "border-rose-300" },
  { border: "border-sky-400", bg: "bg-sky-50", eventBg: "bg-sky-100", eventBorder: "border-sky-300" },
  { border: "border-indigo-400", bg: "bg-indigo-50", eventBg: "bg-indigo-100", eventBorder: "border-indigo-300" },
];

export const getColorForUser = (userIndex: number) => {
  return userColors[userIndex % userColors.length];
};
