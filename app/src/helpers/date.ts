import dayjs from "dayjs";

export const createMonthDateRange = (
  month: number = dayjs().month() + 1,
  year: number = dayjs().year()
): { min: string; max: string } => {
  const startOfMonth = dayjs(new Date(year, month - 1, 1)).startOf("month");
  const endOfMonth = startOfMonth.endOf("month");
  return {
    min: startOfMonth.format("YYYY/MM/DD"),
    max: endOfMonth.format("YYYY/MM/DD"),
  };
};
