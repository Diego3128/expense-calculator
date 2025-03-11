import { Expense } from "../types";

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export const formatDate = (dateString: string, language = "en-En"): string => {
  const dateObject = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(language, options).format(dateObject);
};

export const calcExpenseTotal = (expenses: Expense[] = []): number => {
  if (expenses.length === 0) return 0;

  return expenses.reduce(
    (accumulator, expense) =>
      accumulator + (Number(expense.expenseAmount) || 0),
    0
  );
};

export const calcPercentage = (value: number, whole: number): number => {
  return parseFloat(((value / whole) * 100).toFixed(3));
};
