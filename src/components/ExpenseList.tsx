import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { budgetState } = useBudget();

  const emptyExpenses = useMemo(
    () => budgetState.expenses.length < 1,
    [budgetState.expenses]
  );

  return (
    <div className="mt-10">
      {emptyExpenses ? (
        <p className=" text-gray-700 capitalize text-center p-3.5 bg-white shadow-lg rounded-lg mx-auto py-8 px-5 text-2xl">
          no expenses
        </p>
      ) : (
        <>
          <p className="text-gray-700 capitalize text-center text-2xl mb-10">
            expense list
          </p>
          {budgetState.expenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}
