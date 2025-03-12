import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { budgetState } = useBudget();

  const existsCategoryFilter = useMemo(
    () => budgetState.categoryFilter !== "",
    [budgetState.categoryFilter]
  );

  // array of filtered expenses
  const filterdExpenses = useMemo(() => {
    return existsCategoryFilter
      ? budgetState.expenses.filter(
          (expense) => expense.expenseCategoryId === budgetState.categoryFilter
        )
      : [];
  }, [budgetState.categoryFilter, budgetState.expenses]);

  const activeExpenses = useMemo(
    () => (existsCategoryFilter ? filterdExpenses : budgetState.expenses),
    [existsCategoryFilter, budgetState.expenses, filterdExpenses]
  );

  // activeExpenses empty?
  const emptyExpenses = useMemo(
    () => activeExpenses.length < 1,
    [activeExpenses]
  );

  return (
    <div className="mt-10">
      {emptyExpenses ? (
        <p className="text-white capitalize text-center py-32 bg-[#2a2a3a] shadow-lg rounded-lg mx-auto px-5 text-2xl">
          No Expenses
        </p>
      ) : (
        <>
          <p className="text-white capitalize text-center text-2xl mb-10">
            Expense List
          </p>
          <div className="bg-[#1e1e2e] p-10 px-3.5 md:px-5 rounded-lg shadow-xl max-h-[600px] overflow-y-auto">
            {activeExpenses.map((expense) => (
              <ExpenseDetail key={expense.id} expense={expense} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
