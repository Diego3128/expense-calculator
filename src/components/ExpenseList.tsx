import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { budgetState } = useBudget();

  const categoryFilter = useMemo(
    () => budgetState.categoryFilter !== "",
    [budgetState.categoryFilter]
  );

  const emptyExpenses = useMemo(
    () =>
      categoryFilter
        ? budgetState.filteredExpenses.length < 1
        : budgetState.expenses.length < 1,
    [budgetState.expenses, budgetState.filteredExpenses]
  );

  return (
    <div className="mt-10">
      {emptyExpenses ? (
        <p className=" text-gray-700 capitalize text-center py-32 bg-white shadow-lg rounded-lg mx-auto px-5 text-2xl">
          no expenses
        </p>
      ) : (
        <>
          <p className="text-gray-700 capitalize text-center text-2xl mb-10">
            expense list
          </p>
          <div className="bg-gray-100 p-10 px-3.5 md:px-5 rounded-lg shadow-xl max-h-[600px] overflow-y-auto">
            {categoryFilter
              ? budgetState.filteredExpenses.map((expense) => (
                  <ExpenseDetail key={expense.id} expense={expense} />
                ))
              : budgetState.expenses.map((expense) => (
                  <ExpenseDetail key={expense.id} expense={expense} />
                ))}
          </div>
        </>
      )}
    </div>
  );
}
